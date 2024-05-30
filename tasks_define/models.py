from django.db import models
from lib.fallbacks import default_task_def_image

# Create your models here
class TaskDefine(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  title = models.CharField()
  title_audio_url = models.URLField(blank=True, null=True)
  image1 = models.URLField(default=models.SET(default_task_def_image))
  value = models.IntegerField()
  description = models.TextField(blank=True, null=True)
  description_audio_url = models.URLField(blank=True, null=True)
  is_archived = models.BooleanField(default=False)
  is_hidden = models.BooleanField(default=False)
  timestamp_archived = models.DateTimeField(blank=True, null=True)
  ref_owner = models.ForeignKey(
    to='users.User',
    related_name='tasks_defined',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    # on_delete=models.SET(get_past_member) # if owner account is deleted, replace with placeholder 'Past member' account
    )
  
  def __str__(self):
    return f'{self.title}, value: {self.value}'