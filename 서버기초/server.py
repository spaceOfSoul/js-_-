from flask import Flask, render_template,url_for,session,request,redirect
from flask_wtf.csrf import CSRFProtect
from pymongo import MongoClient

import os
from dotenv import load_dotenv

from Crypto.Hash import SHA256
import secrets

import re

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

csrf = CSRFProtect(app)
csrf.init_app(app)

mongo_client = MongoClient(os.getenv('DB_URL'))

#====================================================
def crypto_password(pw, salt=None):
    if salt is None:
        hash_obj = SHA256.new()
        salt = secrets.token_hex(32)
        hash_obj.update(bytes(pw + salt, 'utf-8'))
        h = hash_obj.hexdigest()

        for _ in range(10):
            hash_obj.update(bytes(h, 'utf-8'))
            h = hash_obj.hexdigest()

        return h, salt
    
    hash_obj = SHA256.new()
    hash_obj.update(bytes(pw + salt, 'utf-8'))
    h = hash_obj.hexdigest()
    for _ in range(10):
        hash_obj.update(bytes(h, 'utf-8'))
        h = hash_obj.hexdigest()
    return h

# 비밀번호
def pw_rule(pw):
    # 2종 이상 문자로 구성된 8자리 이상 비밀번호
    PT1 = re.compile('^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#$%^&*]{8,}$')
    PT2 = re.compile('^(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}$')
    PT3 = re.compile('^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')
    PT4 = re.compile('^(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$')
    PT5 = re.compile('^(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')
    PT6 = re.compile('^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')
    # 문자 구성 상관없이 10자리 이상 비밀번호 검사 정규식
    PT7 = re.compile('^[A-Za-z\d!@#$%^&*]{10,}$')
    
    #위의 정규식 중 하나라도 만족하면 비번 생성
    for pattern in [PT1, PT2, PT3, PT4, PT5, PT6, PT7]:
        if pattern.match(pw):
            return True
    #정규식을 모두 만족하지 못할시 비번 규칙에 어긋나므로
    return False
#====================================================
@app.route("/")
def index():
    crypto_password('apple')
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
            salt=client['salt']
            if client['password'] == crypto_password(pw,salt):
                session['userdata'] = {"id": email,"name":name}
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
        pw_check = request.form.get('pw_check')
        
        member = mongo_client.onlineClass.member
        
        if id=='' or id is None:
            return render_template('signup.html',state=1)
        elif email=='' or email is None:
            return render_template('signup.html',state=2)
        elif pw=='' or pw is None:
            return render_template('signup.html',state=3)
        elif name=='' or name is None:
            return render_template('signup.html',state=4)
        
        if pw_check!=pw:
            return render_template('signup.html',state=6)
        
        if not pw_rule(pw):
            return render_template('signup.html',state=7)
        
        if member.count_documents({'id':id}):
            return render_template('signup.html',state=5)
        
        password,salt = crypto_password(pw)
        
        data = {'id' : id,
                'name' : name,
                'email' : email,
                'password' : password,
                'salt' : salt
                }
        member.insert_one(data)
        return redirect(url_for('index'))
    return render_template('signup.html',state = 0)

if __name__ == "__main__":
    app.run()