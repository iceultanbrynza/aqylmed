from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.decorators import action

from thematics.models import Quiz

# Create your views here.

class QuizView(viewsets.ViewSet):
    queryset = Quiz.objects.all()
    # def create(self, request: Request):

    # @action()
    # def share

    # def de