from rest_framework.views import generics
from .serializers.common import RewardDefineSerializer
from .models import RewardDefine

# Create your views here

#? Index/List view:
# GET
# /stories
class RewardDefineIndexView(generics.ListCreatAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = RewardDefine.objects.all()
	serializer_class = RewardDefineSerializer