# Generated by Django 2.1.3 on 2018-12-01 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='code',
            field=models.IntegerField(),
        ),
    ]