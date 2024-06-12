from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django.db.models import Q
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
# /tasks
class TaskLogIndexView_R(ListAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# queryset = TaskLog.objects.all()
	def get_queryset(self):
		return TaskLog.objects.filter(Q(ref_owner__ref_head=self.request.user.ref_head))
	# serializer_class = TaskLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedTaskLogSerializer
		return TaskLogSerializer

#? L1 to L4: (item: view)
# GET (item)
# /tasks/view/<int:pk>
class TaskLogDetailView_R(RetrieveAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	queryset = TaskLog.objects.all()
	# serializer_class = TaskLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedTaskLogSerializer
		return TaskLogSerializer

#? L1 to L3: (item: create)
# POST (item)
# /tasks/add
class TaskLogCreateView_C(ObjectOwnerView, CreateAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL3]
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer

#? L1 to L3: (item: get, edit, delete)
# GET/UPDATE/DELETE (item)
# /tasks/<int:pk>
class TaskLogEditlView_RUD(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL3]
	queryset = TaskLog.objects.all()
	# serializer_class = TaskLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedTaskLogSerializer
		return TaskLogSerializer