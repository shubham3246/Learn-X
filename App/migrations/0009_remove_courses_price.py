# Generated by Django 4.2.3 on 2023-07-14 15:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0008_courses_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courses',
            name='price',
        ),
    ]
