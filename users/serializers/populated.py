from .common import GroupMemebersSerializer

class PopulatedGroupMemebersSerializer(GroupMemebersSerializer):
  ref_head = GroupMemebersSerializer()