from flask import Flask, render_template,url_for

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'asdasdasd'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather")
def weather():
    return render_template("weather.html")

@app.route("/ex")
def example():
    array = [1,2,3,4,5,6,7,8,9,10]
    return render_template("ssr_ex.html",array=array)

if __name__ == "__main__":
    app.run()