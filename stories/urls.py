from django.urls import path
from .views import StoryIndexView_L123, StoryDetailView_L1234, StoryDetailView_L12

# Index endpoint: /stories
# Show endpoint: /stories/:storyId

# This route starts with:
#? /stories/

urlpatterns = [
    path('', StoryIndexView_L123.as_view()), # /stories
    path('<int:pk>/', StoryDetailView_L1234.as_view()), # /stories/:pk/
    # path('<int:pk>/', StoryDetailView_L12.as_view()), # /stories/:pk/
]