from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (Profile, Certificate, SkillCategory, Project,
                     Experience, Education, Certification, ContactMessage)
from .serializers import (
    ProfileSerializer, CertificateSerializer, SkillCategorySerializer,
    ProjectSerializer, ExperienceSerializer, EducationSerializer,
    CertificationSerializer, ContactMessageSerializer,
)


def ctx(request):
    return {'request': request}


class PortfolioView(APIView):
    """GET /api/portfolio/  — returns ALL portfolio data in one call."""

    def get(self, request):
        profile = Profile.objects.first()
        return Response({
            'profile':        ProfileSerializer(profile, context=ctx(request)).data if profile else {},
            'skill_categories': SkillCategorySerializer(
                SkillCategory.objects.all(), many=True, context=ctx(request)).data,
            'projects':       ProjectSerializer(
                Project.objects.all(), many=True, context=ctx(request)).data,
            'experiences':    ExperienceSerializer(
                Experience.objects.all(), many=True, context=ctx(request)).data,
            'education':      EducationSerializer(
                Education.objects.all(), many=True, context=ctx(request)).data,
            'certifications': CertificationSerializer(
                Certification.objects.all(), many=True, context=ctx(request)).data,
            'certificates':   CertificateSerializer(
                Certificate.objects.filter(is_featured=True), many=True, context=ctx(request)).data,
        })


class ProfileView(APIView):
    def get(self, request):
        p = Profile.objects.first()
        if not p:
            return Response({'detail': 'Profile not found'}, status=404)
        return Response(ProfileSerializer(p, context=ctx(request)).data)


class ProjectListView(APIView):
    def get(self, request):
        qs = Project.objects.all()
        feat = request.query_params.get('featured')
        if feat == 'true':
            qs = qs.filter(featured=True)
        return Response(ProjectSerializer(qs, many=True, context=ctx(request)).data)


class SkillListView(APIView):
    def get(self, request):
        return Response(SkillCategorySerializer(
            SkillCategory.objects.all(), many=True, context=ctx(request)).data)


class ExperienceListView(APIView):
    def get(self, request):
        return Response(ExperienceSerializer(
            Experience.objects.all(), many=True, context=ctx(request)).data)


class EducationListView(APIView):
    def get(self, request):
        return Response(EducationSerializer(
            Education.objects.all(), many=True, context=ctx(request)).data)


class CertificateListView(APIView):
    """GET /api/certificates/  — lists all uploaded certificates."""
    def get(self, request):
        cert_type = request.query_params.get('type')
        qs = Certificate.objects.all()
        if cert_type:
            qs = qs.filter(cert_type=cert_type)
        return Response(CertificateSerializer(qs, many=True, context=ctx(request)).data)


class ContactMessageView(APIView):
    """POST /api/contact/  — saves a contact form message."""
    def post(self, request):
        s = ContactMessageSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response(
                {'success': True, 'message': 'Your message was sent successfully!'},
                status=status.HTTP_201_CREATED
            )
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
