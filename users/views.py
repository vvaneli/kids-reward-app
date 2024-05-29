from rest_framework.views import generics
from .serializers.common import UserSerializer
from .models import User

# Create your views here

#? Index/List view:
# GET
# /stories
class UserIndexView(generics.ListCreatAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	

  #? Item view
# GET/UPDATE/DELETE
# /stories/<int:pk>
class ModelDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer