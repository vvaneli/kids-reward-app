from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django.db.models import Q
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers.common import RewardDefineSerializer
from .models import RewardDefine
from lib.permissions import IsUpToAccessL2, IsUpToAccessL4_ViewOnly, IsAccessL0
from lib.views import ObjectOwnerView

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list      ListAPIView
# y y y y     get item      RetrieveAPIView
# y y n n     create item   CreateAPIView
# y y n n     edit item     RetrieveUpdateDestroyAPIView
# y y n n     delete item

#? L1 to L4 (list: view)
# GET (list)
# /api/rewards-define
class RewardDefineIndexView_R(ListAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	def get_queryset(self):
		return RewardDefine.objects.filter(Q(ref_owner__ref_head=self.request.user.ref_head))

#? L1 to L4 (item: view)
# GET (item)
# /api/rewards-define/<int:pk>
class RewardDefineDetailView_R(RetrieveAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer

#? L1 to L2 (item: create)
# POST
# /api/rewards-define/add
class RewardDefineCreateView_C(ObjectOwnerView, CreateAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL2]
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer

#? L1 to L2 (item: view, update, delete)
# GET/UPDATE/DELETE (item)
# /api/rewards-define/<int:pk>
class RewardDefineEditView_RUD(RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated, IsUpToAccessL2]
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	
# #? New Account -- copy starter items
# # POST
# # /api/rewards-define/add-list
# class RewardDefineNewAccountListView_C(ObjectOwnerView, ListCreateAPIView):
# 	queryset = RewardDefine.objects.all()
# 	serializer_class = RewardDefineSerializer
# 	permission_classes = [IsAuthenticated, IsAccessL0]
# 	# permission_classes = [IsAuthenticated, IsGroupHead]