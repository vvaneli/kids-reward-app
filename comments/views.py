from rest_framework.views import generics
from .serializers.common import CommentSerializer
from .models import Comment

# Create your views here

#? Index/List view:
# GET
# /stories
class CommentIndexView(generics.ListCreatAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer