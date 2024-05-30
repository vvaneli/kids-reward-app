from django.urls import path
from .views import CommentIndexView_R, CommentDetailView_R, CommentDetailView_C, CommentDetailView_RUD

# Index endpoint: /comments
# Show endpoint: /comments/:commentId

# This route starts with:
#? /comments/

urlpatterns = [
    path('', CommentIndexView_R.as_view()), # /comments
    path('<int:pk>/', CommentDetailView_R.as_view()), # /:pk/comments/:commentId
    path('<int:pk>/', CommentDetailView_C.as_view()), # /:pk/comments/:commentId
    path('<int:pk>/', CommentDetailView_RUD.as_view()), # /:pk/comments/:commentId
]

"""
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
"""