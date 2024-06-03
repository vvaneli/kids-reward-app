from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers.common import GoalLogSerializer
from lib.views import ObjectOwnerView
from .models import GoalLog
from lib.permissions import IsUpToAccessL2, IsUpToAccessL4_ViewOnly

# PERMISSIONS:
# 1 2 3 4     level

# GoalLogIndexView
# y y y y     get list      ListAPIView

# GoalLogDetailView
# y y y y     get item      RetrieveAPIView

# GoalLogCreateView_C
# y y n n     create item   CreateAPIView

# GoalLogDetailView_RUD
# y y n n     edit item     RetrieveUpdateDestroyAPIView
# y y n n     delete item

#? L1 to L4: (list: view)
# GET (list)
# /goals
class GoalLogIndexView_R(ListAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L4: (item: view)
# GET (item)
# /goals/<int:pk>
class GoalLogDetailView_R(RetrieveAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L2: (item: create)
# POST (item)
# /goals/add
class GoalLogCreateView_C(ObjectOwnerView, CreateAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]

#? L1 to L2: (item: get, edit, delete)
# GET/UPDATE/DELETE (item)
# /goals/<int:pk>
class GoalLogDetailView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = GoalLog.objects.all()
	serializer_class = GoalLogSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]