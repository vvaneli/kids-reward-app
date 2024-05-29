from django.db import models

# Register your models here
class Comment(models.Model):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  text = models.TextField()
  audio_url = models.URLField(blank=True, null=True)
  # person who made the comment; if person is deleted, use placeholder account uuid
  ref_uuid_owner = models.ForeignKey(
    to='users.User',
    related_name='comments_made',
    on_delete=models.SET_NULL, # if owner account is deleted, set to null
    null=True, blank=True, # defined so that if owner is deleted, this field can be null
    )
  # the task this comment was made on; if task is deleted, comment is deleted
  ref_task_log_id = models.ForeignKey(
    to='tasks_log.TaskLog',
    related_name='related_comments',
    on_delete=models.CASCADE,
    blank=True, null=True,
    )
  # the goal this comment was made on; if goal is deleted, comment is deleted
  ref_goal_log_id = models.ForeignKey(
    to='goals_log.GoalLog',
    related_name='related_comments',
    on_delete=models.CASCADE,
    blank=True, null=True,
    )