from django.contrib import admin
from .models import User

# from django.contrib.auth.admin import UserAdmin

# class CustomUserAdmin(UserAdmin): # <--- Extend the UserAdmin class, this will allow us to update later if needed

#   def save(self, *args, **kwargs):
#     if self.password and not self.password.startswith('pbkdf2_sha256$'):
#       self.set_password(self.password)
#     super().save(*args, **kwargs)

# Register your models here.
# admin.site.register(User, CustomUserAdmin) # <--- We have subclassed our CustomUserAdmin class
admin.site.register(User)