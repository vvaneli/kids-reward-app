from .common import TaskDefineSerializer
from users.serializers.common import UserSerializer

class PopulatedTaskDefineSerializer(TaskDefineSerializer):
  ref_owner = UserSerializer()