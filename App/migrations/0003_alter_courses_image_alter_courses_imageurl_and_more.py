# Generated by Django 4.2.3 on 2023-07-13 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0002_courses_image_courses_imageurl'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='image',
            field=models.ImageField(blank=True, default='', null=True, upload_to='static/App/images/course'),
        ),
        migrations.AlterField(
            model_name='courses',
            name='imageUrl',
            field=models.CharField(blank=True, default='', max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='courses',
            name='rating',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
