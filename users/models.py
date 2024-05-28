from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

# Create your models here.
class User(AbstractUser):
  timestamp_created = models.DateTimeField(auto_now_add=True)
  uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  # email = models.EmailField(unique=True)
  # name  = models.CharField(max_length=50)
  nickname  = models.CharField(max_length=50, blank=True, null=True)
  # Access levels: new account = 0; Account owner 'Head' = 1; Editors 'Elders' = 2; Contributors 'Helpers' = 3; Viewers 'Youngsters' = 4.
  access_level  = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)], default=0)
  image_profile  = models.ImageField(default='https://res.cloudinary.com/vli/image/upload/v1716910772/smelly-earnie/profile.svg')
  ref_account_id_head = models.ManyToManyField('self', blank=True)