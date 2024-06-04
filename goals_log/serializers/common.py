from rest_framework import serializers
from ..models import GoalLog

class GoalLogSerializer(serializers.ModelSerializer):
  class Meta:
      model = GoalLog		# which model
      fields = '__all__'	# which fields in that model
