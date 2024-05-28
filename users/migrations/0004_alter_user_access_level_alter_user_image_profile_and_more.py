# Generated by Django 5.0.6 on 2024-05-28 15:43

import django.core.validators
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_ref_account_id_head'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='access_level',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)]),
        ),
        migrations.AlterField(
            model_name='user',
            name='image_profile',
            field=models.ImageField(default='https://res.cloudinary.com/vli/image/upload/v1716910772/smelly-earnie/profile.svg', upload_to=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='ref_account_id_head',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
