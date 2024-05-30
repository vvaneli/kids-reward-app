from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin # <--- this is a new import 

class CustomUserAdmin(UserAdmin): # <--- Extend the UserAdmin class, this will allow us to update later if needed
  pass

# Register your models here.
admin.site.register(User, CustomUserAdmin) # <--- We have subclassed our CustomUserAdmin class