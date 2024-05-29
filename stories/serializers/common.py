from rest_framework import serializers
from ..models import Story

class StorySerializer(serializers.ModelSerializer):
  class Meta:
      model = Story		# which model
      fields = '__all__'	# which fields in that model