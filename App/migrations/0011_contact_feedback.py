# Generated by Django 4.2.3 on 2023-07-15 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0010_contact'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='feedback',
            field=models.TextField(blank=True, null=True),
        ),
    ]
