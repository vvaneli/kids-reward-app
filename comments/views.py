from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from .serializers.common import CommentSerializer
from .models import Comment

#? PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list
# y y y y     get item
# y y y n     create item
# (if owner)  edit item
# (if owner)  delete item

#? L1 to L4 (view only)
# GET (list)
# goals/<int:pk>/comments
# tasks/<int:pk>/comments
class CommentIndexView_R(ListAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer

#? L1 to L4 (view only)
# GET (item)
# goals/<int:pk>/comments/<int:pk>/
# tasks/<int:pk>/comments/<int:pk>/
class CommentDetailView_R(RetrieveAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	
#? L1 to L3 (create)
# POST (item)
# goals/<int:pk>/comments/add
# tasks/<int:pk>/comments/add
class CommentDetailView_C(CreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer

#? Comment owner
# GET/UPDATE/DELETE (item)
# goals/<int:pk>/comments/<int:pk>/
# tasks/<int:pk>/comments/<int:pk>/
class CommentDetailView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer