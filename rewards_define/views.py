from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers.common import RewardDefineSerializer
from .models import RewardDefine
from lib.permissions import IsUpToAccessL2, IsUpToAccessL4_ViewOnly
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
# /rewards-define
class RewardDefineIndexView_R(ListAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	permission_classes = [IsAuthenticated, IsUpToAccessL4_ViewOnly]
	# def get(self, request):
	# 	if IsUpToAccessL4_ViewOnly:
	# 		queryset = RewardDefine.objects.all()
	# 		serializer_class = RewardDefineSerializer
	# 	else:
	# 		return Response('false')

#? L1 to L4 (item: view)
# GET (item)
# /rewards-define/<int:pk>
class RewardDefineDetailView_R(RetrieveAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL4_ViewOnly]

#? L1 to L2 (item: create)
# POST
# /rewards-define/
class RewardDefineCreateView_C(ObjectOwnerView, CreateAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]

#? L1 to L2 (item: view, update, delete)
# GET/UPDATE/DELETE (item)
# /rewards-define/<int:pk>
class RewardDefineEditView_RUD(RetrieveUpdateDestroyAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	permission_class = [IsAuthenticated, IsUpToAccessL2]	