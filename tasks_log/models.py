from django.db import models
from lib.fallbacks import default_task_log_image

# Create your models here.
class TaskLog(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  notes = models.TextField(blank=True, null=True)
  image1 = models.URLField(default=default_task_log_image)
  image2 = models.URLField(blank=True, null=True)
  ref_owner = models.ForeignKey(
    to='users.User',
    related_name='tasks_logged',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    )
  # the children who performed this task
  refs_assignees = models.ManyToManyField(
    to='users.User',
    related_name='tasks_done'
    )
  # the task definition this task log was copied from:
  ref_task_define = models.ForeignKey(
    to='tasks_define.TaskDefine',
    related_name='tasks_created',
    on_delete=models.PROTECT,  # definition cannot be deleted from DB (but can be hidden from view)
    )
  # the goal a logged task belongs to:
  ref_goal_log = models.ForeignKey(
    to='goals_log.GoalLog',
    related_name='goal',
    on_delete=models.SET_DEFAULT,  # if goal is deleted, this task log can have no associated goal
    default='',
    blank=True, null=True
    )
  
  def __str__(self):
    return f'{self.timestamp_created}'