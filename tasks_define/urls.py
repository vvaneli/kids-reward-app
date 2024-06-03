from django.urls import path
from .views import TaskDefineIndexView_R, TaskDefineDetailView_R, TaskDefineCreateView_C, TaskDefineEditView_RUD

# Index endpoint: /tasks-define
# Show endpoint: /tasks-define/:taskdefineId

# This route starts with:
#? /tasks-define/

urlpatterns = [
    path('', TaskDefineIndexView_R.as_view()), # /tasks-define/
    path('<int:pk>/', TaskDefineEditView_RUD.as_view()), # /tasks-define/:taskdefineId/
    path('<int:pk>/', TaskDefineDetailView_R.as_view()), # /tasks-define/:taskdefineId/
    path('add/', TaskDefineCreateView_C.as_view()), # /tasks-define/add
]