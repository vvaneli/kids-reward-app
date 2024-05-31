from .common import TaskLogSerializer
from users.serializers.common import UserSerializer
from tasks_define.serializers.common import TaskDefineSerializer
from goals_log.serializers.common import GoalLogSerializer

class PopulatedTaskLogSerializer(TaskLogSerializer):
  ref_owner = UserSerializer()
  refs_assignees = UserSerializer(many=True)
  ref_tasks_define = TaskDefineSerializer()
  ref_goal_log = GoalLogSerializer()