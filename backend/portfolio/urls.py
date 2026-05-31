from django.urls import path
from . import views

urlpatterns = [
    path('portfolio/',    views.PortfolioView.as_view(),       name='portfolio-all'),
    path('profile/',      views.ProfileView.as_view(),          name='profile'),
    path('projects/',     views.ProjectListView.as_view(),      name='projects'),
    path('skills/',       views.SkillListView.as_view(),        name='skills'),
    path('experience/',   views.ExperienceListView.as_view(),   name='experience'),
    path('education/',    views.EducationListView.as_view(),    name='education'),
    path('certificates/', views.CertificateListView.as_view(),  name='certificates'),
    path('contact/',      views.ContactMessageView.as_view(),   name='contact'),
]
