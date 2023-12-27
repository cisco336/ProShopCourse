from django.urls import path
from base.views import products_views

urlpatterns = [
    path('', products_views.getProducts, name="products"),
    path('<str:pk>', products_views.getProduct, name="product"),
]