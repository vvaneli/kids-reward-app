from .common import GoalLogSerializer
from users.serializers.common import UserSerializer
from rewards_define.serializers.common import RewardDefineSerializer
from stories.serializers.common import StorySerializer

class PopulatedGoalLogSerializer(GoalLogSerializer):
  ref_owner = UserSerializer()
  refs_assignees = UserSerializer(many=True)
  ref_rewards_define = RewardDefineSerializer()
  ref_story = StorySerializer()