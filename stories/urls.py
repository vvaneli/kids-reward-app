from django.urls import path
from .views import StoryIndexView_L1234, StoryDetailView_L1234

# Index endpoint: /stories
# Show endpoint: /stories/:storyId

# This route starts with:
#? /stories/

urlpatterns = [
    path('', StoryIndexView_L1234.as_view()), # /stories
    # path('<int:pk>/', StoryDetailView_L12.as_view()), # /stories/:pk/
    path('<int:pk>/', StoryDetailView_L1234.as_view()), # /stories/:pk/
]

"""
#? L1 to L4 -- Get single story
# GET (single)
# /stories/<int:pk>
class StoryDetailView_L1234(RetrieveAPIView):
	queryset = Story.objects.all()
	serializer_class = StorySerializer
"""