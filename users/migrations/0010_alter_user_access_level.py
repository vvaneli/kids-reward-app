# Generated by Django 5.0.6 on 2024-06-12 16:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_user_access_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='access_level',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)]),
        ),
    ]
