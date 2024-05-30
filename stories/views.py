# from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from .serializers.common import StorySerializer
from .models import Story

# PERMISSIONS:
# 1 2 3 4     level
# y y y n     get list
# y y y y     get item
# y y n n     edit item
# n n n n     post/delete item

#? L1 to L3 -- Index/List view
# GET (list)
# /stories
class StoryIndexView_L123(ListAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer

#? L1 to L4 -- Item view
# GET (single)
# /stories/<int:pk>
class StoryDetailView_L1234(RetrieveAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer

#? L1 to L2 -- Item view
# PUT/PATCH (single)
# /stories/<int:pk>
class StoryDetailView_L12(UpdateAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer