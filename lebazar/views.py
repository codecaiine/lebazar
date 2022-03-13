from django.http import render

def home(request):
    return HttpResponse('Homepage')