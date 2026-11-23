from flask import Flask, render_template, redirect, url_for, request, session, flash
import re
from database import db, Register
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import os

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
application.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-me')
db.init_app(application)

with application.app_context():
    db.create_all()
    print("Database created successfully!")

admin = Admin(application, name='Project Admin')
admin.add_view(ModelView(Register, db.session))

def is_registered():
    return session.get('isRegistered') is True

@application.route("/")
def home():
    if not is_registered():
        return redirect(url_for("register"))
    return render_template("index.html")

@application.route("/about")
def about():
    if not is_registered():
        return redirect(url_for("register"))
    return render_template("about.html")

@application.route("/services")
def services():
    if not is_registered():
        return redirect(url_for("register"))
    return render_template("services.html")

@application.route("/sections")
def sections():
    if not is_registered():
        return redirect(url_for("register"))
    return render_template("sections.html")

@application.route("/contactus")
def contactus():
    if not is_registered():
        return redirect(url_for("register"))
    return render_template("contactus.html")

@application.route("/register", methods=['GET', 'POST'])
def register():
    if is_registered():
        return redirect(url_for("home"))
    error = None
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        address = request.form.get('address', '').strip()
        phone = request.form.get('phone', '').strip()
        if not name or len(name) < 3:
            error = 'Please enter your full name (at least 3 characters).'
        elif not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            error = 'Please enter a valid email address.'
        elif not address or len(address) < 2:
            error = 'Please enter your address.'
        elif not re.match(r'^(05\d{8}|(\+?966)(5\d{8}))$', phone.replace(' ', '')):
            error = 'Please enter a valid Saudi phone number (e.g. 05xxxxxxxx).'
        else:
            new_user = Register(
                name=name,
                email=email,
                address=address,
                phone=phone
            )
            db.session.add(new_user)
            db.session.commit()
            session['isRegistered'] = True
            session['userName'] = name
            session['userEmail'] = email
            flash("Registration completed successfully!")
            return redirect(url_for("home"))
    return render_template("register.html", error=error)

@application.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("register"))

if __name__ == '__main__':
    application.run(debug=True, port=5001)