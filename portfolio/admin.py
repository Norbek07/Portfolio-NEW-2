from django.contrib import admin
from .models import Contact, Book, Comment, PortfolioCategory, Gallery, Portfolio, Blog, About, Category,GalleryCategory
from django.utils.html import format_html

# Registering models directly
admin.site.register((Contact, PortfolioCategory, Gallery, Portfolio, Blog, About, Category,GalleryCategory))

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'cover_image', 'pages')
    
    def cover_image(self, obj):
        if obj.cover_image:
            return format_html('<img width="100" height="100" src="{}" />', obj.cover_image.url)
        return 'No Image'
    cover_image.short_description = 'Cover Image'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('image_display', 'full_name', 'created_date', 'email', 'message', 'blog')
    
    def image_display(self, obj):
        if obj.image:
            return format_html('<img width="100" height="100" src="{}" />', obj.image.url)
        return 'No Image'
    image_display.short_description = 'Image'
