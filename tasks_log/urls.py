from django.urls import path
from .views import TaskLogIndexView, TaskLogDetailView, TaskLogCreateView_C, TaskLogEditlView_RUD

# Index endpoint: /tasks/
# Show endpoint: /tasks/:taskId/

# This route starts with:
#? /tasks/

urlpatterns = [
    path('', TaskLogIndexView.as_view()), # /tasks/
    path('<int:pk>/', TaskLogDetailView.as_view()), # /tasks/:taskId/
    path('add/', TaskLogCreateView_C.as_view()), # /tasks/add/
    path('<int:pk>/', TaskLogEditlView_RUD.as_view()), # /tasks/:taskId/
]