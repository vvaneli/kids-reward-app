from django.urls import path
from .views import StoryIndexView_R, StoryDetailView_R

# Index endpoint: /stories
# Show endpoint: /stories/:storyId

# This route starts with:
#? /stories/

urlpatterns = [
    path('', StoryIndexView_R.as_view()), # /stories/
    path('<int:pk>/', StoryDetailView_R.as_view()), # /stories/:id/
]