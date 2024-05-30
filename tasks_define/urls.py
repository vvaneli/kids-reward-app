from django.urls import path
from .views import TaskDefineIndexView_R, TaskDefineDetailView_R, TaskDefineDetailView_RUD

# Index endpoint: /tasks-define
# Show endpoint: /tasks-define/:taskdefineId

# This route starts with:
#? /tasks-define/

urlpatterns = [
    path('', TaskDefineIndexView_R.as_view()), # /tasks-define
    path('<int:pk>/', TaskDefineDetailView_R.as_view()), # /tasks-define/:taskdefineId/
    path('<int:pk>/', TaskDefineDetailView_RUD.as_view()), # /tasks-define/:taskdefineId/
]

"""
#? L1 to L4 (list, view only)
# GET (list)
# /tasks-define
class TaskDefineIndexView_R(ListAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	
#? L1 to L4 (item, view only)
# GET (item)
# /tasks-define/<int:pk>
class TaskDefineDetailView_R(RetrieveAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer

#? L1 to L2 (item)
# GET/UPDATE/DELETE (item)
# /tasks-define/<int:pk>
class TaskDefineDetailView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
"""