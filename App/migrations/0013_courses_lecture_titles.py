# Generated by Django 4.2.3 on 2023-07-16 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0012_courses_lecture_links'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='lecture_titles',
            field=models.TextField(blank=True, null=True),
        ),
    ]
