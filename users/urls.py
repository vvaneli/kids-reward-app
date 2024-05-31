from django.urls import path
from .views import RegisterView, ManageGroupMemberView, ProfileEditView_RUD, Profiles_ViewOnly
from rest_framework_simplejwt.views import TokenObtainPairView

# This route starts with:
#? /account/

urlpatterns = [
    path('register/', RegisterView.as_view()),  # /account/register/
    path('add/', ManageGroupMemberView.as_view()),  # /account/add/
    path('login/', TokenObtainPairView.as_view()),  # /account/login/
    path('<int:pk>/', ProfileEditView_RUD.as_view()),  # /account/1/
    path('', Profiles_ViewOnly.as_view()),  # /account/
    path('<int:pk>/', Profiles_ViewOnly.as_view()),  # /account/1/
]