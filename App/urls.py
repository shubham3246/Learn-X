from django.urls import path
from App.views import *

urlpatterns = [
    path('', index, name="index"),
    path('login', login_view, name="login"),
    path('register', register, name="register"),
    path('courses', courses, name="courses"),
    path('course/<str:slug>', course, name="course"),
    path('about', about, name="about"),
    path('contact', contact, name="contact"),
    path('like', like, name="like"),
    path('dislike', dislike, name="dislike"),
    path('logout', logout_view, name="logout"),
    path("create-payment-intent", create_payment),
    path('setUserPro', setUserPro, name="setUserPro"),
]