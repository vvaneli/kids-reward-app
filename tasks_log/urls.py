from django.urls import path
from .views import TaskLogIndexView_R, TaskLogDetailView_R, TaskLogCreateView_C, TaskLogEditlView_RUD

# Index endpoint: /tasks/
# Show endpoint: /tasks/:taskId/

# This route starts with:
#? /tasks/

urlpatterns = [
    path('', TaskLogIndexView_R.as_view()), # /tasks/
    path('<int:pk>/', TaskLogEditlView_RUD.as_view()), # /tasks/:taskId/
    path('<int:pk>/', TaskLogDetailView_R.as_view()), # /tasks/:taskId/
    path('add/', TaskLogCreateView_C.as_view()), # /tasks/add/
]