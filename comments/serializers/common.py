from rest_framework import serializers
from ..models import Comment

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
      model = Comment		# which model
      fields = '__all__'	# which fields in that model