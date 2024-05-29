from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Story(models.Model):
  steps = models.PositiveIntegerField()
  about = models.TextField()
  scenes_narrative = ArrayField(models.TextField())
  scenes_artwork = ArrayField(models.TextField())
  items_artwork = ArrayField(models.TextField())