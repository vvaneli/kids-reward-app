from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from lib.views import ObjectOwnerView
from .serializers.common import TaskLogSerializer
from .serializers.populated import PopulatedTaskLogSerializer
from .models import TaskLog
from lib.permissions import IsUpToAccessL3, IsUpToAccessL4_ViewOnly

# PERMISSIONS:
# 1 2 3 4     level

# TaskLogIndexView
# y y y y     get list        ListAPIView

# TaskLogDetailView
# y y y y     get item        RetrieveAPIView

# TaskLogCreateView_C
# y y y n     create item     CreateAPIView

# TaskLogEditlView_RUD
# y y y n     edit item       RetrieveUpdateDestroyAPIView
# y y y n     delete item

#? L1 to L4: (list: view)
# GET (list)
# /tasks-log
class TaskLogIndexView_R(ListAPIView):
	queryset = TaskLog.objects.all()
	# serializer_class = TaskLogSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedTaskLogSerializer
		return TaskLogSerializer

#? L1 to L4: (item: view)
# GET (item)
# /tasks-log/<int:pk>
class TaskLogDetailView_R(RetrieveAPIView):
	queryset = TaskLog.objects.all()
	# serializer_class = TaskLogSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedTaskLogSerializer
		return TaskLogSerializer

#? L1 to L3: (item: create)
# POST (item)
# /tasks-log/add
class TaskLogCreateView_C(ObjectOwnerView, CreateAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL3]

#? L1 to L3: (item: get, edit, delete)
# GET/UPDATE/DELETE (item)
# /tasks-log/<int:pk>
class TaskLogEditlView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = PopulatedTaskLogSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL3]