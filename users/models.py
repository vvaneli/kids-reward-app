from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
# from django.contrib.auth.admin import UserAdmin
from lib.fallbacks import default_profile_image

class User(AbstractUser):
  timestamp_created = models.DateTimeField(auto_now_add=True) #! surplus column
  nickname = models.CharField()
  # For youngsters:
  birthday = models.DateField(blank=True, null=True)
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
    return f'{self.username} - L{self.access_level}'

# class CustomUserAdmin(UserAdmin): # <--- Extend the UserAdmin class, this will allow us to update later if needed
  def save(self, *args, **kwargs):
    if self.password and not self.password.startswith('pbkdf2_sha256$'):
      self.set_password(self.password)
    super().save(*args, **kwargs)