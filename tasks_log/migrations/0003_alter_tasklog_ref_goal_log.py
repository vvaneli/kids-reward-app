# Generated by Django 5.0.6 on 2024-05-31 10:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals_log', '0002_initial'),
        ('tasks_log', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasklog',
            name='ref_goal_log',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='goal', to='goals_log.goallog'),
        ),
    ]
