from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
# from django.contrib.auth.hashers import make_password

from ..models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User		# which model
    fields = '__all__'	# which fields in that model

#! Not used
class GroupMemebersSerializer(serializers.ModelSerializer):
  class Meta:
    model = User		# which model
    fields = '__all__'	# which fields in that model

class RegisterSerializer(serializers.ModelSerializer):
  # for hiding password during deserialization
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = ('id', 'email', 'username', 'nickname', 'password', 'password_confirmation', 'legal_agree')

  # obj level validation:
  def validate(self, data): # request.data
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    # pop removes and return the password confirmation, so we can check it but it never gets save to the DB
    if password != password_confirmation:
      raise serializers.ValidationError('Passwords do not match.')
    validate_password(password)
    return data
  
  def create(self, validated_data):
      return User.objects.create_user(**validated_data)

# hash an updated passord
# class UpdateProfileSerializer(serializers.ModelSerializer):
#   def perform_update(self, serializer):
#     password = serializer.validated_data.get('password')
#     if password:
#       serializer.validated_data['password'] = make_password(password)
#     serializer.save()