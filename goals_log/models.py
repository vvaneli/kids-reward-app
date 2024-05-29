from django.db import models
from datetime import date

from lib.fallbacks import default_goal_log_image, default_story_id

# Create your models here.
class GoalLog(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=100)
  date_start = models.DateField(default=date.today)
  # end date optional (easier to achieve goal)
  date_end = models.DateField(blank=True, null=True)
  image1 = models.URLField(default=models.SET(default_goal_log_image))
  notes = models.TextField(blank=True, null=True)
  reward_is_claimed = models.BooleanField(default=False)
  timestamp_reward_claimed = models.DateTimeField(blank=True, null=True)
  ref_uuid_owner = models.ForeignKey(
    to='users.User',
    related_name='goals_created',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    )
  # the children assigned with this goal
  refs_uuid_assignees = models.ManyToManyField(
    to='users.User',
    related_name='goals_assigned',
    )
  # the reward definition for this goal:
  ref_reward_define_id = models.ForeignKey(
    to='rewards_define.RewardDefine',
    related_name='related_goals',
    on_delete=models.PROTECT,  # definition cannot be deleted from DB (but can be hidden from view)
    )
  # the story for this goal:
  ref_story_id = models.ForeignKey(
    to='stories.Story',
    related_name='related_goals',
    on_delete=models.SET(default_story_id)  # if stroy is deleted, replace with a placeholder story
  )