from django.urls import path
from .views import RegisterView, AddGroupMemberView_C, GroupMemberDetailView_RUD, MyProfileEditView_RUD, GroupMembersIndexView_R, GroupMemberDetailView_R
from rest_framework_simplejwt.views import TokenObtainPairView

# This route starts with:
#? /account/

urlpatterns = [
    path('register/', RegisterView.as_view()),  # /account/register/
    path('add/', AddGroupMemberView_C.as_view()),  # /account/add/
    path('login/', TokenObtainPairView.as_view()),  # /account/login/
    path('<int:pk>/', MyProfileEditView_RUD.as_view()),  # /account/1/
    path('', GroupMembersIndexView_R.as_view()),  # /account/
    path('<int:pk>/', GroupMemberDetailView_R.as_view()),  # /account/1/
    path('<int:pk>/', GroupMemberDetailView_RUD.as_view()),  # /account/1/
]