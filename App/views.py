from django.shortcuts import render, redirect, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
import json
import stripe

# This is your test secret API key.
stripe.api_key = 'sk_test_51NVEPXSFQ9HBnfWBF9Fm3fL9JXvkNVVHaTGEjRDOQuULTj40YkqR5UBx4UOc3Dcj1tdfr4gn3mqY7ZFcUjQyPBbJ00wARkP5V4'
import json
from App.models import *


# Create your views here.
def index(request):
    if request.user.is_authenticated:
        context = Courses.objects.all()

        user = User.objects.get(username = request.user)
        request.session["is_pro"] = request.session.get("is_pro") or user.is_pro

        is_pro = request.session.get("is_pro")
        return render(request, 'App/index.html', {"context": context, "is_pro": is_pro})
    return HttpResponseRedirect('login')

@csrf_exempt
def courses(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            data = json.loads(request.body)
            print(data["search"])
            all_courses = Courses.objects.all()
            searched_courses = []
            for course in all_courses:
                if data["search"].lower() in course.title.lower():
                    searched_courses.append(course.id)
            
            
            return JsonResponse({"response":searched_courses})
        else:
            context = Courses.objects.all()
            is_pro = request.session.get("is_pro")
            return render(request, "App/courses.html", {"context":context , "is_pro": is_pro})
        
    return HttpResponseRedirect('login')

def course(request, slug):
    if request.user.is_authenticated:
        if request.method == "POST":
            user = request.user
            sub_course = Courses.objects.get(slug=slug)
            sub_course.subscribers.add(user)
        else:
            context = Courses.objects.get(slug=slug)
            lectures_text = context.lecture_links
            lectures_titles = context.lecture_titles
            lectures = None
            if (lectures_text):
                lectures = lectures_text.split()
            if(lectures_titles):
                lectures_titles = lectures_titles.split()

            lecture_data = None
            if lectures:
                for i in range(len(lectures)):
                    video_id = lectures[i][17:]
                    lectures[i] = f"https://www.youtube.com/embed/{video_id}"
                    lecture_data = zip(lectures_titles, lectures)
                
            check_sub = False
            if(request.user in context.subscribers.all()):
                check_sub = True

            check_like = False
            if(request.user in context.rating.all()):
                check_like = True

            is_pro = request.session.get("is_pro")
            return render(request, "App/course.html", {"course":context, "is_sub":check_sub, "is_liked":check_like, "lecture_data":lecture_data, "is_pro": is_pro})
    return HttpResponseRedirect('login')


def like(request):
    if request.method == "POST":
        body = json.loads(request.body)
        slug = body["course"]
        user = body["user"]
        user = User.objects.get(username = user)

        course = Courses.objects.get(slug=slug)
        course.rating.add(user)

    return HttpResponse()
    

def dislike(request):
    if request.method == "POST":
        body = json.loads(request.body)
        slug = body["course"]
        user = body["user"]
        user = User.objects.get(username = user)
        
        course = Courses.objects.get(slug=slug)
        course.rating.remove(user)

    return HttpResponse()
    


def about(request):
    if request.user.is_authenticated:
        context = About.objects.first()
        is_pro = request.session.get("is_pro")
        return render(request, "App/about.html", {"context":context, "is_pro": is_pro})
    return HttpResponseRedirect('login')

def contact(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            content = json.loads(request.body)
            newContact = Contact(name=content['name'], email = content['email'], feedback = content['feedback'])
            newContact.save()
            return HttpResponse()
        else:
            is_pro = request.session.get("is_pro")
            return render(request, "App/contact.html", {"is_pro": is_pro})
    else :
        return HttpResponseRedirect('login')


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "App/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "App/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]     
        

        if password != confirmation:
            return render(request, "App/login.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            return render(request, "App/login.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "App/login.html")


@csrf_exempt
def create_payment(request):
    try:
        data = json.loads(request.body)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=200,
            currency='inr',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return JsonResponse({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return JsonResponse(error=str(e)), 403

@csrf_exempt
def setUserPro(request):
    if request.method == "POST":
        user = User.objects.get(username = request.user)
        user.is_pro = True
        user.save()

        request.session["is_pro"] = True

    return HttpResponseRedirect(reverse("index"))
    
