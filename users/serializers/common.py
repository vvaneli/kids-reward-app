from rest_framework import serializers
from ..models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = User		# which model
      fields = '__all__'	# which fields in that model