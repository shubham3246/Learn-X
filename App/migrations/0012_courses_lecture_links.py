# Generated by Django 4.2.3 on 2023-07-15 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0011_contact_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='lecture_links',
            field=models.TextField(blank=True, null=True),
        ),
    ]
