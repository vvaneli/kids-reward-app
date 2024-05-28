from django.db import models
# from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

# from lib/fallback.py import get_past_member

# def get_past_member():
#   return get_user_model().objects.get_or_create(username='Past member')[0]

def get_default_profile_image():
  return 'https://res.cloudinary.com/vli/image/upload/v1716910772/smelly-earnie/default_profile.svg'

# Create your models here
class User(AbstractUser):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  nickname = models.CharField(max_length=50, blank=True, null=True)
  # Access levels: new account = 0; Account owner 'Head' = 1; Editors 'Elders' = 2; Contributors 'Helpers' = 3; Viewers 'Youngsters' = 4.
  access_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)], default=0)
  # image_profile = models.ImageField()
  image_profile = models.CharField(default=get_default_profile_image)
  ref_uuid_tribe = models.ManyToManyField('self', blank=True)
  # ref_uuid_tribe = models.ManyToManyField('self', on_delete=models.SET(get_past_member), related_name='uuid', blank=True, null=True)
  ref_uuid_head = models.OneToOneField('self', on_delete=models.CASCADE, blank=True, null=True)