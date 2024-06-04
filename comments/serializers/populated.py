from .common import CommentSerializer
from goals_log.serializers.common import GoalLogSerializer
from tasks_log.serializers.common import TaskLogSerializer
from users.serializers.common import UserSerializer

class PopulatedCommentSerializer(CommentSerializer):
  ref_owner = UserSerializer()
  ref_goal_log = GoalLogSerializer()
  ref_task_log = TaskLogSerializer()