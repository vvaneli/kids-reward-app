from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers.common import TaskLogSerializer
from .models import TaskLog

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list
# y y y y     get item
# y y y n     create item
# y y y n     edit item
# y y y n     delete item

#? Index/List view:
# GET/POST (list)
# /tasks-log
class TaskLogIndexView(ListCreateAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer
	

  #? Item view
# GET/UPDATE/DELETE (item)
# /tasks-log/<int:pk>
class TaskLogDetailView(RetrieveUpdateDestroyAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer