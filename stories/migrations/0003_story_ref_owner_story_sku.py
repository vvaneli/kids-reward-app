# Generated by Django 5.0.6 on 2024-06-11 13:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stories', '0002_alter_story_items_artwork_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='story',
            name='ref_owner',
            field=models.ManyToManyField(related_name='stories', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='story',
            name='sku',
            field=models.CharField(default=1),
            preserve_default=False,
        ),
    ]
