from django.urls import path
from .views import GoalLogIndexView, GoalLogDetailView

# Index endpoint: /goals
# Show endpoint: /goals/:goalId

# This route starts with:
#? /goals/

urlpatterns = [
    path('', GoalLogIndexView.as_view()), # /goals
    path('<int:pk>/', GoalLogDetailView.as_view()), # /goals/:pk/
]