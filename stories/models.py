from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Story(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  sku = models.CharField()
  title = models.CharField()
  title_audio_url = models.URLField(blank=True, null=True)
  about = models.TextField()
  about_audio_url = models.URLField(blank=True, null=True)
  steps = models.PositiveIntegerField()
  scenes_narrative = ArrayField(models.TextField(blank=True, null=True),  null=True, blank=True)
  scenes_narrative_audio = ArrayField(models.TextField(blank=True, null=True),  null=True, blank=True)
  scenes_artwork = ArrayField(models.TextField())
  items_artwork = ArrayField(models.TextField(blank=True, null=True),  null=True, blank=True)
  is_archived = models.BooleanField(default=False)
  is_hidden = models.BooleanField(default=False)
  ref_owner = models.ForeignKey(
    to='users.User',
    related_name='stories',
    on_delete=models.SET_NULL,
    blank=True, null=True
    )

  def __str__(self):
    return f'{self.title}, steps: {self.steps}'