# Generated by Django 4.2.3 on 2023-07-13 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0004_alter_courses_subscribers'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
