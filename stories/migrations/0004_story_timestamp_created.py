# Generated by Django 5.0.6 on 2024-06-11 13:23

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0003_story_ref_owner_story_sku'),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='timestamp_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
