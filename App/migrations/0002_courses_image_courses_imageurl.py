# Generated by Django 4.2.3 on 2023-07-13 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='image',
            field=models.ImageField(default='', upload_to='static/App/images/course'),
        ),
        migrations.AddField(
            model_name='courses',
            name='imageUrl',
            field=models.CharField(default='', max_length=300),
        ),
    ]
