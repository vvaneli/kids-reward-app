# Generated by Django 5.0.6 on 2024-06-05 17:30

import lib.fallbacks
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals_log', '0003_alter_goallog_image1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goallog',
            name='image1',
            field=models.URLField(blank=True, default=lib.fallbacks.default_goal_log_image),
        ),
    ]
