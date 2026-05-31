"""
Run: python seed_data.py
(from the backend/ directory with virtual env active)
"""
import os, sys, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from portfolio.models import (Profile, SkillCategory, Skill, Project,
                               Experience, Education, Certification)

print("\n🌱  Seeding Vishal Gupta portfolio data...\n")

# ── Profile ──────────────────────────────────────────────────────────────────
Profile.objects.all().delete()
Profile.objects.create(
    name="Vishal Gupta",
    title="Backend Developer · Python Engineer",
    tagline="Building scalable APIs & robust backend systems",
    summary=(
        "Results-driven Python Backend Developer with hands-on experience designing "
        "scalable REST APIs using Django & Django REST Framework. Proficient in MySQL/SQLite "
        "database design, third-party API integration, and clean-code principles. "
        "I love turning complex requirements into elegant, production-ready backend solutions "
        "and am eager to contribute to high-impact engineering teams."
    ),
    email="vg016600@gmail.com",
    phone="+91 88405 58318",
    whatsapp="+918840558318",
    location="Lucknow, Uttar Pradesh, India",
    github="https://github.com/Vishal5725",
    linkedin="https://www.linkedin.com/in/vgpython884055",
    portfolio_url="https://vish22portfolio.pythonanywhere.com/api/portfolio/",
    years_experience=1,
    projects_count=5,
    internships_count=2,
    is_available=True,
)
print("  ✔  Profile")

# ── Skills ────────────────────────────────────────────────────────────────────
SkillCategory.objects.all().delete()

cat_be = SkillCategory.objects.create(name="Backend & Core", icon="⚙️", order=1)
for i, (n, p) in enumerate([
    ("Python", 92), ("Django", 88), ("Django REST Framework", 87),
    ("REST API Development", 88), ("MySQL", 83), ("SQLite", 80),
    ("Git & GitHub", 85), ("JWT Authentication", 80),
]):
    Skill.objects.create(category=cat_be, name=n, percentage=p, order=i)

cat_fe = SkillCategory.objects.create(name="Frontend (Supporting)", icon="🎨", order=2)
for i, (n, p) in enumerate([("HTML5", 78), ("CSS3", 72), ("Bootstrap", 70), ("React (Basic)", 65)]):
    Skill.objects.create(category=cat_fe, name=n, percentage=p, order=i)

cat_tools = SkillCategory.objects.create(name="Tools & Practices", icon="🛠️", order=3)
for i, (n, p) in enumerate([
    ("API Integration", 85), ("Postman", 82), ("Linux / CLI", 75), ("Agile / Scrum", 70),
]):
    Skill.objects.create(category=cat_tools, name=n, percentage=p, order=i)

print("  ✔  Skills")

# ── Projects ──────────────────────────────────────────────────────────────────
Project.objects.all().delete()

Project.objects.create(
    title="Borrow Management System",
    subtitle="React + Django REST API full-stack app",
    description=(
        "A full-featured borrow management application built with React on the frontend "
        "and Django REST Framework on the backend. Features include JWT-based authentication, "
        "complete CRUD operations for borrow records, user management dashboard, "
        "and a clean, responsive React UI deployed on Vercel."
    ),
    tech_stack="React, Django, Django REST Framework, JWT Auth, MySQL, Axios, Vercel",
    live_url="https://rajupanshop-pvw8jpqcn-vishal5725s-projects.vercel.app/login",
    github_url="https://github.com/Vishal5725",
    status="live", featured=True, order=1,
)
Project.objects.create(
    title="E-Commerce Website",
    subtitle="Django MVT full-stack online store",
    description=(
        "A complete e-commerce web application built on Django's MVT architecture. "
        "Features product catalogue browsing, shopping cart, order management, "
        "user registration & login, and a full-featured admin dashboard. "
        "Deployed live on PythonAnywhere."
    ),
    tech_stack="Python, Django, SQLite, HTML5, CSS3, Bootstrap, Django Admin, PythonAnywhere",
    live_url="https://vish221305.pythonanywhere.com/",
    github_url="https://github.com/Vishal5725",
    status="live", featured=True, order=2,
)
Project.objects.create(
    title="Personal Portfolio API",
    subtitle="RESTful API — live on PythonAnywhere",
    description=(
        "Production-deployed Django REST API powering this portfolio website. "
        "Built with DRF viewsets, serializers, and CORS configuration for secure "
        "React cross-origin consumption. Hosts all portfolio data dynamically."
    ),
    tech_stack="Python, Django, DRF, SQLite, CORS, PythonAnywhere",
    live_url="https://vish22portfolio.pythonanywhere.com/api/portfolio/",
    github_url="https://github.com/Vishal5725",
    status="live", featured=True, order=3,
)
Project.objects.create(
    title="Task Management REST API",
    subtitle="Full CRUD task backend with JWT & RBAC",
    description=(
        "Comprehensive task backend with JWT authentication, role-based permissions, "
        "and indexed MySQL schema. All endpoints documented via DRF's browsable API."
    ),
    tech_stack="Python, Django, DRF, MySQL, JWT, Postman",
    github_url="https://github.com/Vishal5725",
    status="completed", featured=False, order=4,
)
print("  ✔  Projects")

# ── Experience ────────────────────────────────────────────────────────────────
Experience.objects.all().delete()

Experience.objects.create(
    role="Backend Developer Intern", company="BTM (Business Technology Management)",
    duration="6 Months", exp_type="internship",
    description=(
        "Engineered robust RESTful APIs with Django REST Framework; improved query performance through ORM optimisation and selective field serialisation.\n"
        "Designed normalised MySQL schemas for high-traffic data operations in collaboration with frontend and product teams.\n"
        "Integrated third-party APIs to streamline data exchange between internal services and external platforms, reducing manual processing time.\n"
        "Delivered PEP 8-compliant code; actively participated in peer code reviews, reducing the team's bug rate.\n"
        "Assisted in deploying Django applications to production and performed debugging and performance profiling."
    ),
    order=1,
)
Experience.objects.create(
    role="Backend Developer Intern", company="BYTO",
    duration="6 Months", exp_type="internship",
    description=(
        "Architected and deployed REST APIs using Django & DRF powering both web and mobile client applications.\n"
        "Implemented JWT authentication and role-based access control, strengthening application security across all endpoints.\n"
        "Authored Python automation scripts that eliminated repetitive data-processing tasks, saving ~40% manual effort per sprint.\n"
        "Managed SQLite & MySQL databases; wrote optimised complex queries for business reporting and analytics dashboards.\n"
        "Participated in Agile sprint planning; consistently delivered tasks on schedule."
    ),
    order=2,
)
Experience.objects.create(
    role="Python Programming Trainee", company="Techpile Technology, Lucknow",
    duration="45 Days", exp_type="training",
    description=(
        "Completed intensive Python training covering core language fundamentals, OOP, and Django basics.\n"
        "Built CLI projects and a web scraper applying learned concepts to real-world scenarios.\n"
        "Gained foundational exposure to Django framework and SQLite database interactions."
    ),
    order=3,
)
print("  ✔  Experience")

# ── Education ─────────────────────────────────────────────────────────────────
Education.objects.all().delete()
for i, (deg, inst, board, status) in enumerate([
    ("B.Tech – Computer Science Engineering",
     "LDC Group of Institute of Technologies", "AKTU", "Pursuing"),
    ("Polytechnic Diploma – Computer Science Engineering",
     "Government Polytechnic Aurai, Bhadohi", "BTEUP", "Completed"),
    ("Intermediate – 12th (UP Board)",
     "Government Inter College Gyanpur, Bhadohi", "UP Board", "Completed"),
    ("High School – 10th (UP Board)",
     "Government Inter College Gyanpur, Bhadohi", "UP Board", "Completed"),
]):
    Education.objects.create(degree=deg, institution=inst,
                              board_university=board, duration=status, status=status, order=i)
print("  ✔  Education")

# ── Certifications ────────────────────────────────────────────────────────────
Certification.objects.all().delete()
for i, (t, iss, yr) in enumerate([
    ("Python Summer Training", "Techpile Technology, Lucknow", "2023"),
    ("Django REST Framework",  "Self-Driven Learning",          "2023"),
    ("Git & GitHub Version Control", "Online Course",           "2023"),
    ("Backend Development Best Practices", "Self-Learning",     "2024"),
]):
    Certification.objects.create(title=t, issuer=iss, year=yr, order=i)
print("  ✔  Certifications")

print("\n✅  Done! Now run:  python manage.py runserver")
print("   Then upload certificates via: http://localhost:8000/admin/portfolio/certificate/add/\n")
