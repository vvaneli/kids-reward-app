from django.urls import path
from .views import GoalLogIndexView, GoalLogDetailView, GoalLogCreateView_C, GoalLogDetailView_RUD

# Index endpoint: /goals
# Show endpoint: /goals/:goalId

# This route starts with:
#? /goals/

urlpatterns = [
    path('', GoalLogIndexView.as_view()), # /goals/
    path('<int:pk>/', GoalLogDetailView.as_view()), # /goals/:goalId/
    path('add/', GoalLogCreateView_C.as_view()), # /goals/add/
    path('<int:pk>/', GoalLogDetailView_RUD.as_view()), # /goals/:goalId/
]