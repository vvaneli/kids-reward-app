from django.db import models
from datetime import date

from lib.fallbacks import default_goal_log_image

# Create your models here.
class GoalLog(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  title = models.CharField()
  title_audio_url = models.URLField(blank=True, null=True)
  date_start = models.DateField(default=date.today)
  # end date optional (easier to achieve goal)
  date_end = models.DateField(blank=True, null=True)
  image1 = models.URLField(default=default_goal_log_image, blank=True)
  notes = models.TextField(blank=True, null=True)
  reward_is_claimed = models.BooleanField(default=False)
  timestamp_reward_claimed = models.DateTimeField(blank=True, null=True)
  ref_owner = models.ForeignKey(
    to='users.User',
    related_name='goals_created',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    )
  # the children assigned with this goal
  refs_assignees = models.ManyToManyField(
    to='users.User',
    related_name='goals_assigned',
    )
  # the reward definition for this goal:
  ref_reward_define = models.ForeignKey(
    to='rewards_define.RewardDefine',
    related_name='related_goals',
    on_delete=models.PROTECT,  # definition cannot be deleted from DB (but can be hidden from view)
    )
  # the story for this goal:
  ref_story = models.ForeignKey(
    to='stories.Story',
    related_name='related_goals',
    on_delete=models.PROTECT,  # story cannot be deleted from DB (but can be hidden from view)
    # on_delete=models.SET(default_story)  # if stroy is deleted, replace with a placeholder story
  )

  def __str__(self):
    return f'{self.title}'