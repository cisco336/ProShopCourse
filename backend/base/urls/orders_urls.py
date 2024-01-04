from django.urls import path
from base.views import orders_views as views

urlpatterns = [
    path("add/", views.addOrderItems, name="orders-add")
]
