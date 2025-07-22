from django.urls import path
from . import views
from .views import (
    ResumeUploadView,
    JobListView,
    ResumeListView,
    MatchResumeView,
    ResumeJobMatchView,
    AdzunaJobListView,
    MatchResumeWithAdzunaView,
    RegisterView,
    LoginView,
    LogoutView,
    ProfileView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),

    path('resumes/upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('resumes/', ResumeListView.as_view(), name='resume-list'),
    path('resume/match/', MatchResumeView.as_view(), name='resume-match'),
    path('resume/<int:pk>/', views.get_resume_by_id, name='get_resume_by_id'),
    path('resumes/<int:resume_id>/match_jobs/', ResumeJobMatchView.as_view(), name='match-resume-to-all-jobs'),

    path('jobs/', JobListView.as_view(), name='job-list'),
    path('online-jobs/', AdzunaJobListView.as_view(), name='online-jobs'),
    path('match-online-jobs/', MatchResumeWithAdzunaView.as_view(), name='match-online-jobs'),
]
