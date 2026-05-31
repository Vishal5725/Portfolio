from rest_framework import serializers
from .models import (Profile, Certificate, SkillCategory, Skill,
                     Project, Experience, Education, Certification, ContactMessage)


class ProfileSerializer(serializers.ModelSerializer):
    photo_url   = serializers.SerializerMethodField()
    resume_url  = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'tagline', 'summary',
            'email', 'phone', 'whatsapp', 'location',
            'github', 'linkedin', 'portfolio_url',
            'photo', 'photo_url', 'resume', 'resume_url',
            'years_experience', 'projects_count', 'internships_count', 'is_available',
        ]

    def get_photo_url(self, obj):
        req = self.context.get('request')
        if obj.photo and req:
            return req.build_absolute_uri(obj.photo.url)
        return None

    def get_resume_url(self, obj):
        req = self.context.get('request')
        if obj.resume and req:
            return req.build_absolute_uri(obj.resume.url)
        return None


class CertificateSerializer(serializers.ModelSerializer):
    file_url      = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    cert_type_display = serializers.CharField(source='get_cert_type_display', read_only=True)

    class Meta:
        model = Certificate
        fields = [
            'id', 'title', 'issued_by', 'cert_type', 'cert_type_display',
            'issue_date', 'description',
            'file', 'file_url', 'thumbnail', 'thumbnail_url',
            'is_featured', 'order',
        ]

    def get_file_url(self, obj):
        req = self.context.get('request')
        if obj.file and req:
            return req.build_absolute_uri(obj.file.url)
        return None

    def get_thumbnail_url(self, obj):
        req = self.context.get('request')
        if obj.thumbnail and req:
            return req.build_absolute_uri(obj.thumbnail.url)
        return None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Skill
        fields = ['id', 'name', 'percentage', 'icon_url']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model  = SkillCategory
        fields = ['id', 'name', 'icon', 'skills']


class ProjectSerializer(serializers.ModelSerializer):
    tech_list     = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'subtitle', 'description', 'tech_stack',
            'tech_list', 'thumbnail', 'thumbnail_url',
            'live_url', 'github_url', 'status', 'featured', 'order',
        ]

    def get_tech_list(self, obj):
        return obj.tech_list()

    def get_thumbnail_url(self, obj):
        req = self.context.get('request')
        if obj.thumbnail and req:
            return req.build_absolute_uri(obj.thumbnail.url)
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    bullet_points = serializers.SerializerMethodField()
    certificate   = CertificateSerializer(read_only=True)

    class Meta:
        model = Experience
        fields = [
            'id', 'role', 'company', 'company_url', 'duration',
            'start_date', 'end_date', 'is_current', 'location',
            'description', 'bullet_points', 'exp_type', 'certificate',
        ]

    def get_bullet_points(self, obj):
        return obj.bullet_points()


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Education
        fields = ['id', 'degree', 'institution', 'board_university', 'duration', 'status', 'grade']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Certification
        fields = ['id', 'title', 'issuer', 'year', 'credential_url']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
