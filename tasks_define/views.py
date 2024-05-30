from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .serializers.common import TaskDefineSerializer
from .models import TaskDefine

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list      ListAPIView
# y y y y     get item      RetrieveAPIView
# y y n n     create item   RetrieveUpdateDestroyAPIView
# y y n n     edit item
# y y n n     delete item

# class TaskDefineIndexView(generics.APIView):
# 	def get(self,request):
# 		return Response('At task definition index view')

#? L1 to L4 (list, view only)
# GET (list)
# /tasks-define
class TaskDefineIndexView_R(ListAPIView):
	def get(self,request):
		return Response('At task definition index view')
	# queryset = TaskDefine.objects.all()
	# serializer_class = TaskDefineSerializer
	
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