# Generated by Django 5.0.6 on 2024-06-11 20:35

import lib.fallbacks
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rewards_define', '0004_alter_rewarddefine_image1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rewarddefine',
            name='image1',
            field=models.URLField(default=lib.fallbacks.default_reward_def_image),
        ),
    ]
