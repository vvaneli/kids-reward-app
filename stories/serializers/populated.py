from .common import StorySerializer
from users.serializers.common import UserSerializer

class PopulatedStorySerializer(StorySerializer):
  ref_owner = UserSerializer()