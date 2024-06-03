from django.urls import path
from .views import RewardDefineIndexView_R, RewardDefineDetailView_R, RewardDefineCreateView_C, RewardDefineEditView_RUD

# Index endpoint: /rewards-define
# Show endpoint: /rewards-define/:rewarddefineId

# This route starts with:
#? /rewards-define/

urlpatterns = [
    path('', RewardDefineIndexView_R.as_view()), # /rewards-define/
    path('<int:pk>/', RewardDefineEditView_RUD.as_view()), # /rewards-define/:rewarddefineId/
    path('<int:pk>/', RewardDefineDetailView_R.as_view()), # /rewards-define/:rewarddefineId/
    path('add/', RewardDefineCreateView_C.as_view()), # /rewards-define/add/
]