# Generated by Django 5.0.6 on 2024-05-30 13:24

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField()),
                ('title_audio_url', models.URLField(blank=True, null=True)),
                ('about', models.TextField()),
                ('about_audio_url', models.URLField(blank=True, null=True)),
                ('steps', models.PositiveIntegerField()),
                ('scenes_narrative', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True, null=True), blank=True, size=None)),
                ('scenes_narrative_audio', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True, null=True), blank=True, size=None)),
                ('scenes_artwork', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), size=None)),
                ('items_artwork', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True, null=True), blank=True, size=None)),
                ('is_archived', models.BooleanField(default=False)),
                ('is_hidden', models.BooleanField(default=False)),
            ],
        ),
    ]
