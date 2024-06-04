from django.urls import path
from .views import CommentIndexView_R, CommentDetailView_R, CommentDetailView_C, CommentDetailView_RUD

# Index endpoint: /comments
# Show endpoint: /comments/:commentId

# This route starts with:
#? /comments/

urlpatterns = [
    path('', CommentIndexView_R.as_view()), # /comments/
    path('<int:pk>/', CommentDetailView_RUD.as_view()), # /comments/:commentId
    path('view/<int:pk>/', CommentDetailView_R.as_view()), # /comments/:commentId
    path('add/', CommentDetailView_C.as_view()), # /comments/add
]