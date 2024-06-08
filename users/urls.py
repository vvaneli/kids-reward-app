from django.urls import path
from .views import RegisterView, AddGroupMemberView_C, GroupMemberDetailView_RUD, MyProfileEditView_RUD, GroupMembersIndexView_R, GroupMemberDetailView_R
from rest_framework_simplejwt.views import TokenObtainPairView

# This route starts with:
#? /account/

urlpatterns = [
    path('register/', RegisterView.as_view()),  # /account/register/
    path('login/', TokenObtainPairView.as_view()),  # /account/login/
    path('<int:pk>/', MyProfileEditView_RUD.as_view()),  # /account/:id/
    # path('view/<int:pk>/', MyProfileView_R.as_view()),  # /account/view/:id/
    path('group/add/', AddGroupMemberView_C.as_view()),  # /account/group/add/
    path('group/', GroupMembersIndexView_R.as_view()),  # /account/group/
    path('group/view/<int:pk>/', GroupMemberDetailView_R.as_view()),  # /account/group/view/:id/
    path('group/edit/<int:pk>/', GroupMemberDetailView_RUD.as_view()),  # /account/group/edit/:id/
]