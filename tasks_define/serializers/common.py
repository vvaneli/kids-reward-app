from rest_framework import serializers
from ..models import TaskDefine

class TaskDefineSerializer(serializers.ModelSerializer):
  class Meta:
      model = TaskDefine		# which model
      fields = '__all__'	# which fields in that model