# from django.shortcuts import render
from rest_framework.views import generics
from .serializers.common import StorySerializer
from .models import Story

# Create your views here

#? Index/List view:
# GET
# /stories
class StoryIndexView(generics.ListCreatAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer