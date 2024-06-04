from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
  ref_head = UserSerializer()