from django.urls import path
from .views import (
    home_view, ContactFormView,about_view, books_view,GalleryListView,PortfolioListView, BlogListView,BlogDetailView,GalleryDetailView,portfolio_single_view)

urlpatterns = [
    path('', home_view, name='home-page'),
    path('about/', about_view, name='about-page'),
    path('contact/', ContactFormView.as_view(), name='contact-page'),
    path('books/', books_view, name='books-page'),
    path('gallery/', GalleryListView.as_view(), name='gallery-page'),
    path('portfolio/', PortfolioListView.as_view(), name='portfolio-page'),
    path('blog/', BlogListView.as_view(), name='blog-page'),
    path('blog-single/ <int:pk>',BlogDetailView.as_view(),name='blog-single-page'),
    path('gallery-single/<int:pk>', GalleryDetailView.as_view(), name='gallery-single-page'),
     path('portfolio-single/', portfolio_single_view, name='portfolio-single-page'),
]
