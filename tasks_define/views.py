from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.db.models import Q
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from lib.views import ObjectOwnerView
from lib.permissions import IsUpToAccessL2, IsUpToAccessL4_ViewOnly
from .serializers.common import TaskDefineSerializer
from .models import TaskDefine

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list      ListAPIView
# y y y y     get item      RetrieveAPIView
# y y n n     create item   CreateListAPIView
# y y n n     edit item     RetrieveUpdateDestroyAPIView
# y y n n     delete item

#? L1 to L4 (list: view)
# GET (list)
# /tasks-define
class TaskDefineIndexView_R(ListAPIView):
	# def get(self,request):
	# 	return Response('At task definition index view')
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# def get_queryset(self):
	# 	return TaskDefine.objects.filter(Q(self.request.user.ref_head = tasks_define.ref_owner) | Q(id = 4))

#! In TaskDefine, find items that are: Owned by people (who are) Owned by the same Group Head as me
#! id = 4 (this is a default owner for all starter items you get by default with an account)

#? L1 to L4 (item: view)
# GET (item)
# /tasks-define/<int:pk>
class TaskDefineDetailView_R(RetrieveAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L2 (item: create)
# POST
# /tasks-define/add/
class TaskDefineCreateView_C(ObjectOwnerView, ListCreateAPIView):
  queryset = TaskDefine.objects.all()
  serializer_class = TaskDefineSerializer
  permission_classes = [IsUpToAccessL2]
  # permission_classes = [IsAuthenticated, IsUpToAccessL2]

#? L1 to L2 (item: view, update, delete)
# GET/UPDATE/DELETE (item)
# /tasks-define/<int:pk>
class TaskDefineEditView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL2]