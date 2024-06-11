from django.urls import path
from .views import TaskDefineIndexView_R, TaskDefineDetailView_R, TaskDefineCreateView_C, TaskDefineEditView_RUD
# , TaskDefineNewAccountListView_C

# This route starts with:
# /api/tasks-define/

urlpatterns = [
    path('', TaskDefineIndexView_R.as_view()), # /api/tasks-define/
    path('<int:pk>/', TaskDefineEditView_RUD.as_view()), # /api/tasks-define/:taskdefineId/
    path('view/<int:pk>/', TaskDefineDetailView_R.as_view()), # /api/tasks-define/view/:taskdefineId/
    path('add/', TaskDefineCreateView_C.as_view()), # /api/tasks-define/add
    # path('add-list/', TaskDefineNewAccountListView_C.as_view()), # /api/tasks-define/add-list #? for new account starter items
]