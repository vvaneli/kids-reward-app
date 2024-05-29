from rest_framework import serializers
from ..models import RewardDefine

class RewardDefineSerializer(serializers.ModelSerializer):
  class Meta:
      model = RewardDefine		# which model
      fields = '__all__'	# which fields in that model