from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_pro = models.BooleanField(default=False)

class Courses(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    hours = models.FloatField()
    rating = models.ManyToManyField(User, related_name="like", default=None, blank=True)
    image = models.ImageField(upload_to="static/App/images/course", default="", null=True, blank=True)
    imageUrl = models.CharField(max_length=300, default="", null=True, blank=True)
    lectures = models.IntegerField()
    subscribers = models.ManyToManyField(User, related_name="subs", default=None, blank=True)
    is_free = models.BooleanField(default=False)
    slug = models.SlugField(blank=True, null=True)
    lecture_links = models.TextField(blank=True, null=True)
    lecture_titles = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title[:50]
    
class About(models.Model):
    about= models.TextField()
    learners = models.IntegerField(default=0)
    languages = models.IntegerField(default=0)
    instructors = models.IntegerField(default=0)
    courses = models.IntegerField(default=0)
    enrollments = models.IntegerField(default=0)

    def __str__(self):
        return self.about[:30]
    
class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    feedback = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name[:15]
