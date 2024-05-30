from django.urls import path
from .views import TaskLogIndexView, TaskLogDetailView

# Index endpoint: /tasks
# Show endpoint: /tasks/:taskId

# This route starts with:
#? /tasks/

urlpatterns = [
    path('', TaskLogIndexView.as_view()), # /tasks
    path('<int:pk>/', TaskLogDetailView.as_view()) # /tasks/:pk/
]