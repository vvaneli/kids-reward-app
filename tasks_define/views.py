from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
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
	permission_class = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L4 (item: view)
# GET (item)
# /tasks-define/<int:pk>
class TaskDefineDetailView_R(RetrieveAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L2 (item: create)
# POST
# /tasks-define/
class TaskDefineCreateView_C(ObjectOwnerView, ListCreateAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]

#? L1 to L2 (item: view, update, delete)
# GET/UPDATE/DELETE (item)
# /tasks-define/<int:pk>
class TaskDefineEditView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]