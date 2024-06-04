# from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

# from lib.permissions import IsUpToAccessL4_View
# https://www.django-rest-framework.org/api-guide/permissions/#custom-permissions

class IsOwner(BasePermission):
  def has_object_permission(self, request, view, obj):
    return obj.ref_owner == request.user

#! Group head has permission to delete account
class IsGroupHead(BasePermission):
  def has_object_permission(self, request, view, obj):
    return obj.ref_head == request.user

# helpers own user profile
class IsMyProfile(BasePermission):
  def has_object_permission(self, request, view, obj):
    if obj.id == request.user.id:
      return True
    return False

# up to helpers
class IsUpToAccessL3(BasePermission):
  def has_permission(self, request, view):
    if request.user.access_level <= 3:
      return True
    return False

# up to elders
class IsUpToAccessL2(BasePermission):
  def has_permission(self, request, view):
    # print(f'access level: ', request.user.access_level)
    if request.user.access_level <= 2:
      return True
    return False

# up to youngsters, view only
class IsUpToAccessL4_ViewOnly(BasePermission):
  def has_permission(self, request, view):
    if request.user.access_level <= 4: # object has no attribute 'User'
      return True
    return False 

# head
class IsAccessL1(BasePermission):
  def has_permission(self, request, view):
    if request.user.access_level == 1:
      return True
    return False

# new head account, pre-setup
class IsAccessL0(BasePermission):
  def has_permission(self, request, view):
    if request.user.access_level == 0:
      return True
    return False