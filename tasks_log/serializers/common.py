from rest_framework import serializers
from ..models import TaskLog

class TaskLogSerializer(serializers.ModelSerializer):
  class Meta:
      model = TaskLog		# which model
      fields = '__all__'	# which fields in that model