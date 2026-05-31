from django.db import models


class Profile(models.Model):
    """Single profile row — the owner of this portfolio."""
    name            = models.CharField(max_length=100)
    title           = models.CharField(max_length=200)
    tagline         = models.CharField(max_length=300, blank=True)
    summary         = models.TextField()
    email           = models.EmailField()
    phone           = models.CharField(max_length=25)
    whatsapp        = models.CharField(max_length=25, blank=True)
    location        = models.CharField(max_length=150)
    github          = models.URLField(blank=True)
    linkedin        = models.URLField(blank=True)
    portfolio_url   = models.URLField(blank=True)
    photo           = models.ImageField(
        upload_to='profile/', blank=True, null=True,
        help_text='Upload your profile photo (JPG/PNG, square recommended)'
    )
    resume          = models.FileField(
        upload_to='resume/', blank=True, null=True,
        help_text='Upload your latest resume (PDF)'
    )
    years_experience    = models.PositiveIntegerField(default=1)
    projects_count      = models.PositiveIntegerField(default=5)
    internships_count   = models.PositiveIntegerField(default=2)
    is_available        = models.BooleanField(default=True)

    class Meta:
        verbose_name = verbose_name_plural = 'Profile'

    def __str__(self):
        return self.name


class Certificate(models.Model):
    """Internship / Experience / Training certificates (uploadable files)."""
    CERT_TYPE = [
        ('internship', 'Internship Certificate'),
        ('experience', 'Experience Certificate'),
        ('training',   'Training Certificate'),
        ('course',     'Course Certificate'),
        ('achievement','Achievement'),
    ]
    title        = models.CharField(max_length=200)
    issued_by    = models.CharField(max_length=200)
    cert_type    = models.CharField(max_length=20, choices=CERT_TYPE, default='internship')
    issue_date   = models.DateField(null=True, blank=True)
    description  = models.TextField(blank=True)
    file         = models.FileField(
        upload_to='certificates/',
        help_text='Upload PDF or image of the certificate'
    )
    thumbnail    = models.ImageField(
        upload_to='certificates/thumbs/', blank=True, null=True,
        help_text='Optional preview image of the certificate'
    )
    is_featured  = models.BooleanField(default=True)
    order        = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-issue_date']

    def __str__(self):
        return f"{self.title} — {self.issued_by}"


class SkillCategory(models.Model):
    name  = models.CharField(max_length=100)
    icon  = models.CharField(max_length=10, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.name


class Skill(models.Model):
    category   = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name       = models.CharField(max_length=100)
    percentage = models.PositiveIntegerField(default=80, help_text='0-100')
    icon_url   = models.URLField(blank=True, help_text='DevIcon / custom image URL')
    order      = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Project(models.Model):
    STATUS = [('live','Live'),('development','In Development'),('completed','Completed')]
    title       = models.CharField(max_length=200)
    subtitle    = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    tech_stack  = models.CharField(max_length=400,
                                    help_text='Comma-separated list, e.g. Python, Django, React')
    thumbnail   = models.ImageField(
        upload_to='projects/', blank=True, null=True,
        help_text='Project screenshot or banner (16:9 recommended)'
    )
    live_url    = models.URLField(blank=True)
    github_url  = models.URLField(blank=True)
    status      = models.CharField(max_length=20, choices=STATUS, default='completed')
    featured    = models.BooleanField(default=False)
    order       = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    def __str__(self):
        return self.title


class Experience(models.Model):
    EXP_TYPE = [
        ('internship', 'Internship'),
        ('fulltime',   'Full-time'),
        ('training',   'Training'),
        ('freelance',  'Freelance'),
    ]
    role        = models.CharField(max_length=200)
    company     = models.CharField(max_length=200)
    company_url = models.URLField(blank=True)
    duration    = models.CharField(max_length=100)
    start_date  = models.DateField(null=True, blank=True)
    end_date    = models.DateField(null=True, blank=True)
    is_current  = models.BooleanField(default=False)
    location    = models.CharField(max_length=150, blank=True)
    description = models.TextField(help_text='One bullet point per line')
    exp_type    = models.CharField(max_length=20, choices=EXP_TYPE, default='internship')
    certificate = models.ForeignKey(
        Certificate, null=True, blank=True, on_delete=models.SET_NULL,
        related_name='experiences',
        help_text='Attach the internship/experience certificate for this role'
    )
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def bullet_points(self):
        return [b.strip() for b in self.description.split('\n') if b.strip()]

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(models.Model):
    degree           = models.CharField(max_length=200)
    institution      = models.CharField(max_length=200)
    board_university = models.CharField(max_length=200, blank=True)
    duration         = models.CharField(max_length=100)
    status           = models.CharField(max_length=30, default='Completed',
                                         choices=[('Pursuing','Pursuing'),('Completed','Completed')])
    grade            = models.CharField(max_length=50, blank=True)
    order            = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.degree} — {self.institution}"


class Certification(models.Model):
    """Short certification entries for the About section."""
    title          = models.CharField(max_length=200)
    issuer         = models.CharField(max_length=200)
    year           = models.CharField(max_length=10, blank=True)
    credential_url = models.URLField(blank=True)
    order          = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Saves every contact form submission."""
    name       = models.CharField(max_length=150)
    email      = models.EmailField()
    subject    = models.CharField(max_length=200)
    message    = models.TextField()
    is_read    = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject}"
