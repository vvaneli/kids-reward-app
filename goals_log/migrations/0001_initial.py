# Generated by Django 5.0.6 on 2024-05-30 11:50

import datetime
import lib.fallbacks
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GoalLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp_created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField()),
                ('title_audio_url', models.URLField(blank=True, null=True)),
                ('date_start', models.DateField(default=datetime.date.today)),
                ('date_end', models.DateField(blank=True, null=True)),
                ('image1', models.URLField(default=models.SET(lib.fallbacks.default_goal_log_image))),
                ('notes', models.TextField(blank=True, null=True)),
                ('reward_is_claimed', models.BooleanField(default=False)),
                ('timestamp_reward_claimed', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
