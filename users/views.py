from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from lib.views import GroupHeadView  # saves ref_head field on POST request
from lib.permissions import IsMyProfile, IsUpToAccessL2, IsUpToAccessL3, IsUpToAccessL4_ViewOnly
from .serializers.common import UserSerializer, RegisterSerializer
# from .serializers.populated import ProfileSerializer
# from rest_framework.permissions import IsAuthenticated
from .models import User

# PERMISSIONS:
# 1 2 3 4     level

# RegisterView:
# y - - -     register (starts a new group) + create my profile

#! y y y ?     login

# ProfileEditView_RUD:
# y y y y     get item (see my profile)         Profiles_ViewOnly
# y y y n     edit item (edit my profile)       ProfileEditView_RUD
# y y y n     delete item (delete my profile)   ProfileEditView_RUD

# ManageGroupMemberView:
# y y n n     create other profile (add a member to group)
# y y n n     edit single other profile (edit a group member's profile)
# y y n n     delete single other profile (delete group member's profile)
# y y n n     delete other profiles (delete group members' profiles)

# Profiles_ViewOnly:
# y y y y     get list of profiles (see group members)
# y y y y     get single other profile (see a group member's profile)


#? Register view:
# POST (item)
# /accounts/register
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

#? L1 to L3 My Profile edit view (item: view, update, delete)
# GET/UPDATE/DELETE (my item)
# /accounts/<int:pk>
class MyProfileEditView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL3, IsMyProfile]
	# permission_classes = [IsAuthenticated, IsUpToAccessL3]

#? L1 to L2 Register another member view:
# POST (item)
# /accounts/add
class AddGroupMemberView_C(GroupHeadView, CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  # serializer_class = UpdateProfileSerializer
  permission_classes = [IsAuthenticated, IsUpToAccessL2]

#? L1 to L4 Profile view (list: view only)
# GET (list)
# /accounts/group/
class GroupMembersIndexView_R(ListAPIView):
	# queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# Only see members from my own group
	def get_queryset(self):
		return User.objects.filter(Q(ref_head=self.request.user.ref_head) | Q(ref_head=self.request.user.id))

#? L1 to L4 Profile view (item: view only)
# GET (item)
# /accounts/group/view/<int:pk>
class GroupMemberDetailView_R(RetrieveAPIView):
	# queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# Only see members from my own group
	def get_queryset(self):
		return User.objects.filter(Q(ref_head=self.request.user.ref_head) | Q(ref_head=self.request.user.id))
	
#? L1 to L2 Profile edit view (item: view, update, delete)
# GET/UPDATE/DELETE (member item)
# /accounts/group/edit/<int:pk>
class GroupMemberDetailView_RUD(RetrieveUpdateDestroyAPIView):
	# queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL2]
	# Only see members from my own group
	def get_queryset(self):
		return User.objects.filter(Q(ref_head=self.request.user.ref_head) | Q(ref_head=self.request.user.id))
