# Generated by Django 5.0.6 on 2024-06-07 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_legal_agree'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='onboarding_counter',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='timestamp_created',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
