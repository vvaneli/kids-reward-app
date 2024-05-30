from django.urls import path
from .views import RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

# This route starts with:
#? /account/

urlpatterns = [
    path('register/', RegisterView.as_view()),  # /account/register/
    path('login/', TokenObtainPairView.as_view()),  # /account/login/
    path('<int:pk>/', ProfileView.as_view())  # /account/1/
]