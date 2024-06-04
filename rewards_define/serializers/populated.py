from .common import RewardDefineSerializer
from users.serializers.common import UserSerializer

class PopulatedRewardDefineSerializer(RewardDefineSerializer):
  ref_owner = UserSerializer()