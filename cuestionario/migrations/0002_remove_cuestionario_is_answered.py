# Generated by Django 2.1.3 on 2018-12-07 03:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuestionario', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cuestionario',
            name='is_answered',
        ),
    ]