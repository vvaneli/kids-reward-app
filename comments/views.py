from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from lib.views import ObjectOwnerView
from lib.permissions import IsOwner, IsUpToAccessL3, IsUpToAccessL4_ViewOnly
from .serializers.common import CommentSerializer
from .serializers.populated import PopulatedCommentSerializer
from .models import Comment

#? PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list      ListAPIView
# y y y y     get item      RetrieveAPIView
# y y y n     create item   CreateAPIView
# (if owner)  edit item     RetrieveUpdateDestroyAPIView
# (if owner)  delete item

#? L1 to L4 (list: view)
# GET (list)
# comments
class CommentIndexView_R(ListAPIView):
	queryset = Comment.objects.all()
	serializer_class = PopulatedCommentSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	
#? L1 to L4 (item: view)
# GET (item)
# comments/<int:pk>/
class CommentDetailView_R(RetrieveAPIView):
	queryset = Comment.objects.all()
	serializer_class = PopulatedCommentSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	
#? L1 to L3 (create)
# POST (item)
# comments/add
class CommentDetailView_C(ObjectOwnerView, CreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL3]

#? Comment owner
# GET/UPDATE/DELETE (item)
# comments/<int:pk>/
class CommentDetailView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permission_classes = [IsAuthenticated, IsOwner]