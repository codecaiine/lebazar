from django.http import render

def home(request):
    return render(request, 'home.html')