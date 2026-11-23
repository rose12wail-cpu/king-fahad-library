from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# جدول المستخدمين المسجلين
class Register(db.Model):
    __tablename__ = 'register'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(100), nullable=False)

    address = db.Column(db.String(200))

    phone = db.Column(db.String(20))


# جدول الوظائف
class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100), nullable=False)

    description = db.Column(db.String(200))

    location = db.Column(db.String(100))

    status = db.Column(db.String(20), default='Open')
