from django.urls import path
from base.views import users_views

urlpatterns = [
    path('', users_views.getUsers, name="users"),
    path('login/', users_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', users_views.registerUser, name="user-register"),
    path('profile/', users_views.getUserProfile, name="user-profile"),
]