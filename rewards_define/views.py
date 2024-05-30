from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers.common import RewardDefineSerializer
from .models import RewardDefine

# PERMISSIONS:
# 1 2 3 4     level
# y y y y     get list
# y y y y     get item
# y y n n     create item
# y y n n     edit item
# y y n n     delete item

#? Index/List view:
# GET/POST (list)
# /rewards-define
class RewardDefineIndexView(ListCreateAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer

#? Item view
# GET/UPDATE/DELETE (item)
# /rewards-define/<int:pk>
class RewardDefineDetailView(RetrieveUpdateDestroyAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer