from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .serializers.common import GoalLogSerializer
from .serializers.populated import PopulatedGoalLogSerializer
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
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# queryset = GoalLog.objects.all()
	def get_queryset(self):
		return GoalLog.objects.filter(Q(ref_owner__ref_head=self.request.user.ref_head))
	# serializer_class = GoalLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedGoalLogSerializer
		return GoalLogSerializer

#? L1 to L4: (item: view)
# GET (item)
# /goals/<int:pk>
class GoalLogDetailView_R(RetrieveAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	queryset = GoalLog.objects.all()
	# serializer_class = GoalLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedGoalLogSerializer
		return GoalLogSerializer

#? L1 to L2: (item: create)
# POST (item)
# /goals/add
class GoalLogCreateView_C(ObjectOwnerView, CreateAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL2]
	queryset = GoalLog.objects.all()
	# queryset = GoalLog.objects.filter(ref_owner=request.user.head)  # NameError: name 'request' is not defined
	serializer_class = GoalLogSerializer

#? L1 to L2: (item: get, edit, delete)
# GET/UPDATE/DELETE (item)
# /goals/<int:pk>
class GoalLogDetailView_RUD(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL2]
	queryset = GoalLog.objects.all()
	# serializer_class = GoalLogSerializer
	def get_serializer_class(self):
		if self.request.method == 'GET':
			return  PopulatedGoalLogSerializer
		return GoalLogSerializer
	# def get_serializer_class(self):
  #   if self.request.method == 'GET' or 'POST' or 'PUT' or 'PATCH':
  #     return  PopulatedGoalLogSerializer
  #   return GoalLogSerializer