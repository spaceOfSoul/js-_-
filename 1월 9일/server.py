from flask import Flask, render_template,url_for,session,request,redirect
from flask_wtf.csrf import CSRFProtect
from pymongo import MongoClient

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

csrf = CSRFProtect(app)
csrf.init_app(app)

mongo_client = MongoClient(os.getenv('DB_URL'))

@app.route("/")
def index():
    isLogined = False
    if session.get('userdata') is not None:
        isLogined = True
    return render_template("index.html",isLogined = isLogined)

@app.route("/weather")
def weather():
    return render_template("weather.html")

@app.route("/ex")
def example():
    array = [1,2,3,4,5,6,7,8,9,10]
    return render_template("ssr_ex.html",array=array)

@app.route("/login",methods = ['GET','POST'])
def login():
    if request.method == 'POST':
        print(request.form)
        email = request.form.get('id')
        pw = request.form.get('pw')
        
        member = mongo_client.onlineClass.member
        
        if email=='' or email is None:
            return render_template('login.html',state=1)
        elif pw=='' or pw is None:
            return render_template('login.html',state=2)
        
        if member.count_documents({'id':email}):
            client = member.find_one({'id':email})
            name = client['name']
            if client['password'] == pw:
                session['userdata'] = {"id": email,"pw":pw,"name":name}
                return redirect(url_for('index'))
            return render_template('login.html',state=3)
        else:
            return render_template('login.html',state=4)
    else:
        return render_template('login.html',state = 0)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route("/sign-up",methods = ['GET','POST'])
def signup():
    if request.method == 'POST':
        id = request.form.get('id')
        email = request.form.get('email')
        pw = request.form.get('pw')
        name = request.form.get('name')
        
        member = mongo_client.onlineClass.member
        
        if id=='' or id is None:
            return render_template('signup.html',state=1)
        elif email=='' or email is None:
            return render_template('signup.html',state=2)
        elif pw=='' or pw is None:
            return render_template('signup.html',state=3)
        elif name=='' or name is None:
            return render_template('signup.html',state=4)
        
        if member.count_documents({'id':id}):
            return render_template('signup.html',state=4)
        
        data = {'id' : id,
                'name' : name,
                'email' : email,
                'pw' : pw
                }
        member.insert_one(data)
        return render_template('index.html')
    return render_template('signup.html',state = 0)

if __name__ == "__main__":
    app.run()