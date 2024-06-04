from django.urls import path
from .views import GoalLogIndexView_R, GoalLogDetailView_R, GoalLogCreateView_C, GoalLogDetailView_RUD

# Index endpoint: /goals
# Show endpoint: /goals/:goalId

# This route starts with:
#? /goals/

urlpatterns = [
    path('', GoalLogIndexView_R.as_view()), # /goals/
    path('<int:pk>/', GoalLogDetailView_RUD.as_view()), # /goals/:goalId/
    path('view/<int:pk>/', GoalLogDetailView_R.as_view()), # /goals/view/:goalId/
    path('add/', GoalLogCreateView_C.as_view()), # /goals/add/
]