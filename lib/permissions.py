# from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import BasePermission

# from lib.permissions import IsUpToAccessL4_View
# https://www.django-rest-framework.org/api-guide/permissions/#custom-permissions

class IsOwner(BasePermission):
  def has_object_permission(self, request, view, obj):
    return obj.ref_owner == request.user
  
class IsOwneOrAccessUpToL2(BasePermission):
  def has_object_permission(self, request, view, obj):
    return obj.ref_owner == request.user

#! NEED TO SET FAMILY GROUP
# class IsInMyGroup(BasePermission):
#   def has_object_permission(self, request, view, obj):
#     if self.User.ref_head == 
#       return True
#     return False
#? Goal.objects.filter(owner=request.user.head)
#? Goal.objects.filter(ref_owner=request.user.ref_head) //? owner of the goal is the group head

# up to helpers
class IsUpToAccessL3(BasePermission):
  def has_object_permission(self, request, view, obj):
    if self.User.access_level <= 3:
      return True
    return False

# up to elders
class IsUpToAccessL2(BasePermission):
  def has_object_permission(self, request, view, obj):
    if self.User.access_level <= 2:
      return True
    return False

# up to youngsters, view only
class IsUpToAccessL4_ViewOnly(BasePermission):
  def has_permission(self, request, view):
    if request.user in User.access_level <= 4:
      return True
    return False 
  # def has_object_permission(self, request, view, obj):
  #   return obj.owner == request.user

# head
class IsAccessL1(BasePermission):
  def has_object_permission(self, request, view, obj):
    if self.User.access_level == 1:
      return True
    return False

# new head account, pre-setup
class IsAccessL0(BasePermission):
  def has_object_permission(self, request, view, obj):
    if self.User.access_level == 0:
      return True
    return False