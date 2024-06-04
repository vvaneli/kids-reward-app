"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('api/admin/', admin.site.urls),
    # path('login/', TokenObtainPairView.as_view()),
    path('api/account/', include('users.urls')),
    path('api/rewards-define/', include('rewards_define.urls')),
    path('api/tasks-define/', include('tasks_define.urls')),
    path('api/tasks/', include('tasks_log.urls')),
    path('api/goals/', include('goals_log.urls')),
    path('api/stories/', include('stories.urls')),
    path('api/comments/', include('comments.urls')),
]
