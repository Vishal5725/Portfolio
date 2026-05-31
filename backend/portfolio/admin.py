from django.contrib import admin
from django.utils.html import format_html
from .models import (Profile, Certificate, SkillCategory, Skill,
                     Project, Experience, Education, Certification, ContactMessage)

admin.site.site_header  = "Vishal Gupta — Portfolio Admin"
admin.site.site_title   = "Portfolio Admin"
admin.site.index_title  = "Welcome to Portfolio Manager"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display  = ['name', 'title', 'email', 'is_available', 'photo_preview']
    readonly_fields = ['photo_preview']

    def photo_preview(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;" />',
                obj.photo.url
            )
        return "No photo"
    photo_preview.short_description = "Photo"


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display  = ['title', 'issued_by', 'cert_type', 'issue_date', 'is_featured', 'file_link','order']
    list_filter   = ['cert_type', 'is_featured']
    list_editable = ['is_featured', 'order']
    ordering      = ['order']
    fields        = ['title', 'issued_by', 'cert_type', 'issue_date',
                     'description', 'file', 'thumbnail', 'is_featured', 'order']

    def file_link(self, obj):
        if obj.file:
            return format_html('<a href="{}" target="_blank">📄 View</a>', obj.file.url)
        return "—"
    file_link.short_description = "Certificate"


# @admin.register(SkillCategory)
# class SkillCategoryAdmin(admin.ModelAdmin):
#     list_display = ['name', 'icon', 'order']


class SkillInline(admin.TabularInline):
    model  = Skill
    extra  = 1
    fields = ['name', 'percentage', 'icon_url', 'order']


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'order']
    inlines      = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'percentage', 'order']
    list_filter   = ['category']
    list_editable = ['percentage', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'status', 'featured', 'order', 'thumb_preview']
    list_filter   = ['status', 'featured']
    list_editable = ['featured', 'order']
    readonly_fields = ['thumb_preview']

    def thumb_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="height:60px;border-radius:6px;" />', obj.thumbnail.url
            )
        return "No image"
    thumb_preview.short_description = "Preview"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'duration', 'exp_type', 'has_certificate', 'order']
    list_filter  = ['exp_type']
    raw_id_fields = ['certificate']

    def has_certificate(self, obj):
        return bool(obj.certificate)
    has_certificate.boolean = True
    has_certificate.short_description = "Certificate"


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'status', 'order']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuer', 'year', 'order']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter   = ['is_read']
    list_editable = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering      = ['-created_at']
