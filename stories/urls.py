from django.urls import path
from .views import StoryIndexView_R, StoryDetailView_R, StoryNewAccountListView_C, StoryAdminListView_C, StoryAdminDetailView_RUD

# This route starts with:
# /api/stories/

urlpatterns = [
    path('', StoryIndexView_R.as_view()), # /api/stories/
    path('<int:pk>/', StoryDetailView_R.as_view()), # /api/stories/:id/
    path('add/', StoryNewAccountListView_C.as_view()), # /api/stories/add-list  #? for new account starter items
    path('admin/', StoryAdminListView_C.as_view()), # /api/stories/admin
    path('admin/<int:pk>/', StoryAdminDetailView_RUD.as_view()), # /api/stories/admin/:id/
]