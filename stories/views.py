# from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers.common import StorySerializer
from lib.permissions import IsUpToAccessL4_ViewOnly, IsUpToAccessL3, IsGroupHead, IsAccessL0
from lib.views import ObjectOwnerView
from .models import Story

# PERMISSIONS:
# 1 2 3 4     level
# n n n n     post/edit/delete item

# StoryIndexView_L1234
# y y y n     get list

# StoryDetailView_L1234
# y y y y     get item

#? L1 to L4 -- See list of stories
# GET (list)
# /api/stories
class StoryIndexView_R(ListAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# queryset = Story.objects.all()
	serializer_class = StorySerializer
	def get_queryset(self):
		return Story.objects.filter(Q(ref_owner__ref_head=self.request.user.ref_head))

#? L1 to L4 -- Get single story
# GET (single)
# /api/stories/<int:pk>
class StoryDetailView_R(RetrieveAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	queryset = Story.objects.all()
	# queryset = Story.objects.filter()
	# queryset = GoalLog.objects.filter()
	serializer_class = StorySerializer
	
#? New Account -- copy starter items
# POST
# /api/stories/add
class StoryNewAccountListView_C(ObjectOwnerView, CreateAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL3]
	queryset = Story.objects.all()
	serializer_class = StorySerializer
	# permission_classes = [IsAuthenticated, IsGroupHead]
	
#? Admin -- post stories
# POST
# /api/stories/admin
class StoryAdminListView_C(ListCreateAPIView):
	permission_classes = [IsAdminUser]
	queryset = Story.objects.all()
	serializer_class = StorySerializer

#? Admin -- post stories
# POST
# /api/stories/admin/<int:pk>
class StoryAdminDetailView_RUD(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAdminUser]
	queryset = Story.objects.all()
	serializer_class = StorySerializer