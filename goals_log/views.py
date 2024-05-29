from rest_framework.views import generics
from .serializers.common import GoalLogSerializer
from .models import GoalLog

# Create your views here

#? Index/List view:
# GET
# /stories
class GoalLogIndexView(generics.ListCreatAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer