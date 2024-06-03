from django.urls import path
from .views import CommentIndexView, CommentDetailView, CommentDetailView_C, CommentDetailView_RUD

# Index endpoint: /comments
# Show endpoint: /comments/:commentId

# This route starts with:
#? /comments/

urlpatterns = [
    path('', CommentIndexView.as_view()), # /comments/
    path('<int:pk>/', CommentDetailView_RUD.as_view()), # /comments/:commentId
    path('<int:pk>/', CommentDetailView.as_view()), # /comments/:commentId
    path('add/', CommentDetailView_C.as_view()), # /comments/add
]