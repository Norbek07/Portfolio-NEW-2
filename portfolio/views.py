from django.shortcuts import render
from django.views.generic import DetailView
from django.contrib import messages
from portfolio.forms import ContactForm,CommentForm
from .models import Gallery, Book, Blog, About,Portfolio,PortfolioCategory,Category,Comment,GalleryCategory
from django.views.generic.edit import FormView,FormMixin
from .bot import send_message
from django.views.generic.list import ListView
from django.urls import reverse

class ContactFormView(FormView):
    template_name = "contact.html"
    form_class = ContactForm
    success_url = '/'

    def form_valid(self, form):
        name = form.cleaned_data.get('name')
        email = form.cleaned_data.get('email')
        content = form.cleaned_data.get('content')
        text = f"Name: {name}\nEmail: {email}\nContent: {content}"
        send_message(text)
        
        # form.save() o'rniga ma'lumotlarni saqlashni qo'shing agar kerak bo'lsa
        # example: 
        # form.instance.save()

        return super().form_valid(form)
def home_view(request):
    blogs=Blog.objects.all()
    context={
        "blogs":blogs
    }
    return render(request=request,template_name='index.html' ,context=context)

def contact_view(request):
 return render(request=request,template_name='contact.html')

def about_view(request):
     about = About.objects.all()
     context = {
          "about": about,
      }
     return render(request=request,template_name='about.html', context=context)

def books_view(request):
      books = Book.objects.all()
      context = {
          "books": books,
      }
      return render(request=request,template_name='books.html',context=context)

# def gallery_view(request):
#     gallery = Gallery.objects.all()
#     context = {
#         "gallery": gallery,
#     }
#   return render(request, template_name='gallery.html', context=context)

class GalleryListView(ListView):
    model = GalleryCategory
    # paginate_by = 100  # if pagination is desired
    context_object_name = 'gallery'
    template_name = "gallery.html"

class PortfolioListView(ListView):
    model = Portfolio
    # paginate_by = 100  # if pagination is desired
    context_object_name = 'portfolios'
    template_name = "portfolio.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = PortfolioCategory.objects.all()
        return context

class BlogListView(ListView):
    model = Blog
    paginate_by = 3
    context_object_name = 'blogs'
    template_name = "blog.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        return context

class BlogDetailView(FormMixin,DetailView):
    model = Blog
    template_name = "blog-single.html"
    context_object_name = "blog"
    form_class=CommentForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["comments"] = Comment.objects.filter(blog=context.get('blog'))
        context['comments_count'] = Comment.objects.filter(blog=context.get('blog')).count()

        return context
    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        form.instance.blog = self.object
        form.save()
        return super(BlogDetailView, self).form_valid(form)

    def get_success_url(self):
        return reverse('blog-single-page', kwargs={'pk': self.object.pk}) 
class GalleryDetailView(DetailView):
    model = GalleryCategory
    template_name = "gallery-single.html"
    context_object_name = "category"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["gallery"] = Gallery.objects.filter(category=context[self.context_object_name])
        return context

# def gallery_single_view(request):
#     gallery = Gallery.objects.all()
#     context = {
#         "gallery": gallery,
#     }
#     return render(request=request,template_name='gallery-single.html',context=context)
def portfolio_single_view(request):
    return render(request=request,template_name='portfolio-single.html')
def blog_single_view(request):
    return render(request=request,template_name='blog-single.html')