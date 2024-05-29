from rest_framework.views import generics
from .serializers.common import TaskLogSerializer
from .models import TaskLog

# Create your views here

#? Index/List view:
# GET
# /stories
class TaskLogIndexView(generics.ListCreatAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = TaskLog.objects.all()
	serializer_class = TaskLogSerializer