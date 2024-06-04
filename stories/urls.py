from django.urls import path
from .views import StoryIndexView_R, StoryDetailView_R, StoryAdminListView_C, StoryAdminDetailView_RUD

# Index endpoint: /stories
# Show endpoint: /stories/:storyId

# This route starts with:
#? /stories/

urlpatterns = [
    path('', StoryIndexView_R.as_view()), # /stories/
    path('<int:pk>/', StoryDetailView_R.as_view()), # /stories/:id/
    path('admin/', StoryAdminListView_C.as_view()), # /stories/
    path('admin/<int:pk>/', StoryAdminDetailView_RUD.as_view()), # /stories/admin/:id/
]