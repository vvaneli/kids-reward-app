# from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers.common import StorySerializer
from lib.permissions import IsUpToAccessL4_ViewOnly
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
# /stories
class StoryIndexView_R(ListAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L4 -- Get single story
# GET (single)
# /stories/<int:pk>
class StoryDetailView_R(RetrieveAPIView):
	queryset = Story.objects.all()
	# queryset = Story.objects.filter()
	# queryset = GoalLog.objects.filter()
	serializer_class = StorySerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	
#? Admin -- post stories
# POST
# /stories/admin
class StoryAdminListView_C(ListCreateAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer
	permission_classes = [IsAdminUser]
	# permission_classes = [IsAuthenticated, IsAdminUser]

#? Admin -- post stories
# POST
# /stories/admin/<int:pk>
class StoryAdminDetailView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer
	permission_classes = [IsAdminUser]
	# permission_classes = [IsAuthenticated, IsAdminUser]