from rest_framework.views import generics
from .serializers.common import TaskDefineSerializer
from .models import TaskDefine

# Create your views here

#? Index/List view:
# GET
# /stories
class TaskDefineIndexView(generics.ListCreatAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = TaskDefine.objects.all()
	serializer_class = TaskDefineSerializer