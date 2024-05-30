from django.urls import path
from .views import RewardDefineIndexView, RewardDefineDetailView

# Index endpoint: /rewards-define
# Show endpoint: /rewards-define/:rewarddefineId

# This route starts with:
#? /rewards-define/

urlpatterns = [
    path('', RewardDefineIndexView.as_view()), # /rewards-define
    path('<int:pk>/', RewardDefineDetailView.as_view()) # /rewards-define/:pk/
]