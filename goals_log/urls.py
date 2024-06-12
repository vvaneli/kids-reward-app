from django.urls import path
from .views import GoalLogIndexView_R, GoalLogDetailView_R, GoalLogCreateView_C, GoalLogDetailView_RUD

# This route starts with:
# /api/goals/

urlpatterns = [
    path('', GoalLogIndexView_R.as_view()), # /api/goals/
    path('<int:pk>/', GoalLogDetailView_RUD.as_view()), # /api/goals/:goalId/
    path('view/<int:pk>/', GoalLogDetailView_R.as_view()), # /api/goals/view/:goalId/
    path('add/', GoalLogCreateView_C.as_view()), # /api/goals/add/
]