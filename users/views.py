from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
# from rest_framework import generics
from .serializers.common import UserSerializer, RegisterSerializer
# from .serializers.populated import ProfileSerializer
# from rest_framework.permissions import IsAuthenticated
from .models import User

# PERMISSIONS:
# 1 2 3 4     level
# y - - -     register (starts a new group) + create my profile

#! y y y ?     login
# y y y y     get item (see my profile)
# y y y n     edit item (edit my profile)
# y y y n     delete item (delete my profile)

# y y n n     create other profile (add a member to group)
# y y y y     get list of profiles (see group members)
# y y y y     get single other profile (see a group member's profile)
# y y n n     edit single other profile (edit a group member's profile)
# y y n n     delete single other profile (delete group member's profile)
# y y n n     delete other profiles (delete group members' profiles)

#? Register view:
# POST (item)
# /register
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

#? Item view
# GET/UPDATE/DELETE (item)
# /accounts/<int:pk>
class ProfileView(RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

#? Index/List view:
# GET/POST (list)
# /accounts
class GroupMembersView(ListCreateAPIView):
	queryset = User.objects.all() #! FILTER?
	serializer_class = UserSerializer