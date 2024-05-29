from django.db import models
from lib.fallbacks import default_reward_def_image

# Create your models here
class RewardDefine(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  title = models.CharField()
  image1  = models.URLField(default=models.SET(default_reward_def_image))
  value = models.PositiveIntegerField()
  description = models.TextField(blank=True, null=True)
  is_archived = models.BooleanField(default=False)
  is_hidden = models.BooleanField(default=False)
  timestamp_archived = models.DateTimeField(blank=True, null=True)
  ref_uuid_owner = models.ForeignKey(
    to='users.User',
    related_name='rewards_defined',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    # on_delete=models.SET(get_past_member) # if owner account is deleted, replace with placeholder 'Past member' account
    )