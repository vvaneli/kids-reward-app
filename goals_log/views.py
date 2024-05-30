from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers.common import GoalLogSerializer
from .models import GoalLog

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list
# y y y y     get item
# y y n n     create item
# y y n n     edit item
# y y n n     delete item

#? Index/List view:
# GET/POST (list)
# /goals-log
class GoalLogIndexView(ListCreateAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	

#? Item view
# GET/UPDATE/DELETE (item)
# /goals-log/<int:pk>
class GoalLogDetailView(RetrieveUpdateDestroyAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer