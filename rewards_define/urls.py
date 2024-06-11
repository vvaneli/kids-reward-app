from django.urls import path
from .views import RewardDefineIndexView_R, RewardDefineDetailView_R, RewardDefineCreateView_C, RewardDefineEditView_RUD
# , RewardDefineNewAccountListView_C

# This route starts with:
# /api/rewards-define/

urlpatterns = [
    path('', RewardDefineIndexView_R.as_view()), # /rewards-define/
    path('view/<int:pk>/', RewardDefineDetailView_R.as_view()), # /rewards-define/view/:rewarddefineId/
    path('<int:pk>/', RewardDefineEditView_RUD.as_view()), # /rewards-define/:rewarddefineId/
    path('add/', RewardDefineCreateView_C.as_view()), # /rewards-define/add/
    # path('add-list/', RewardDefineNewAccountListView_C.as_view()), # /rewards-define/add-list/  #? for new account starter items
]