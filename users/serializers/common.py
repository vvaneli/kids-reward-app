from rest_framework import serializers
from ..models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User		# which model
    fields = '__all__'	# which fields in that model

class RegisterSerializer(serializers.ModelSerializer):
  # for hiding password during deserialization
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  class Meta:
    model = User		# which model
    fields = ('id', 'email', 'username', 'nickname', 'password', 'password_confirmation')

  def validate(self, data): # request.data
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    if password != password_confirmation:
      raise serializers.ValidationError('Passwords do not match.')
    return data
  
  def create(self, validated_data):
      return User.objects.create_user(**validated_data)