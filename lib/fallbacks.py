from django.contrib.auth import get_user_model

# from lib.fallbacks import get_past_member, default_goal_log_image

# PLACEHOLDER IMAGES

def default_profile_image():
  return 'https://res.cloudinary.com/vli/image/upload/v1716910772/smelly-earnie/default/default_profile.svg'

def default_reward_def_image():
  return 'https://res.cloudinary.com/vli/image/upload/v1716922767/smelly-earnie/default/default_reward_definition.svg'

def default_task_def_image():
  return 'https://res.cloudinary.com/vli/image/upload/v1716922767/smelly-earnie/default/default_task_definition.svg'

def default_task_log_image():
  #! NEED TO MAKE A DEFAULT
  # if tasks_define.TaskDefine.value < 0:
    # return 'https://res.cloudinary.com/vli/image/upload/v1716923419/smelly-earnie/default/default_task_log_negative.svg'
  return 'https://res.cloudinary.com/vli/image/upload/v1716923419/smelly-earnie/default/default_task_log_positive.svg'

def default_goal_log_image():
  return 'https://res.cloudinary.com/vli/image/upload/v1716922792/smelly-earnie/default/default_goal_log.svg'

# PLACEHOLDER DATA VIZ (STORY)
# def default_story_id():
#   return 1  # Primary key of the default story

# PLACEHOLDER USER ACCOUNTS
# def get_past_member():
#     return get_user_model().objects.get_or_create(id=2)[0]