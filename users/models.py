from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

from lib.fallbacks import default_profile_image

# Create your models here
class User(AbstractUser):
  # uuid = models.UUIDField(default=uuid.uuid4, editable=False)
  timestamp_created = models.DateTimeField(auto_now_add=True)
  nickname = models.CharField()
  # Access levels: new account = 0; Account owner 'Head' = 1; Editors 'Elders' = 2; Contributors 'Helpers' = 3; Viewers 'Youngsters' = 4.
  access_level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)], default=0)
  image_profile = models.URLField(default=default_profile_image)
  # one-to-many foreign key for associated account members only
  ref_head = models.ForeignKey(
    'self',
    on_delete=models.CASCADE,
    blank=True, null=True, # this field is blank for the 'head' account owner
    )
  
  def __str__(self):
    return f'{self.username} -- L{self.access_level}'