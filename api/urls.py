from django.urls import path
from .views import RoomView, CreateRoomView, GetRoomView, JoinRoomView, CheckIfUserInRoomView

urlpatterns = [
    path('rooms', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('join-room', JoinRoomView.as_view()),
    path('user-in-room', CheckIfUserInRoomView.as_view()),
]