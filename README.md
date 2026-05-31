# 🚀 Vishal Gupta — Full-Stack Portfolio
> **Django REST API** (Backend) + **React** (Frontend)  
> Dynamic, admin-managed content with certificate uploads, profile photo, and project images.

---

## 📁 Project Structure

```
vishal-portfolio/
├── backend/                          ← Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── seed_data.py                  ← Populate DB with Vishal's data
│   ├── portfolio_backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── portfolio/
│       ├── models.py                 ← All models incl. Certificate, ContactMessage
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── admin.py                  ← Rich admin with file previews
│
└── frontend/                         ← React App
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── styles/global.css         ← Design tokens
        ├── hooks/
        │   ├── useApi.js             ← Axios API calls
        │   └── fallback.js           ← Offline static data
        └── components/
            ├── Navbar.js/css
            ├── Hero.js/css           ← Dynamic photo from backend
            ├── About.js/css
            ├── Skills.js/css         ← Animated skill bars
            ├── Projects.js/css       ← Dynamic thumbnails + filter tabs
            ├── Experience.js/css     ← Expandable + certificate links
            ├── Certificates.js/css   ← ⭐ Upload & preview certificates
            ├── Education.js/css
            ├── Contact.js/css        ← Saves to Django DB
            └── Footer.js/css
```

---

## ⚡ Quick Start (5 minutes)

### Step 1 — Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Seed all portfolio data (profile, skills, projects, experience, education)
python seed_data.py

# Create admin user (to upload certificates & photos)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

🟢 Backend live at: **http://localhost:8000**  
🔑 Admin panel at: **http://localhost:8000/admin/**

---

### Step 2 — Frontend

```bash
cd frontend
npm install
npm start
```

🟢 Frontend live at: **http://localhost:3000**

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | `/api/portfolio/`    | All portfolio data in one call |
| GET  | `/api/profile/`      | Profile / contact info |
| GET  | `/api/projects/`     | All projects |
| GET  | `/api/skills/`       | Skills by category |
| GET  | `/api/experience/`   | Work experience |
| GET  | `/api/education/`    | Education history |
| GET  | `/api/certificates/` | Uploaded certificates |
| POST | `/api/contact/`      | Save contact form message |
| —    | `/admin/`            | Django admin panel |

---

## 📜 Uploading Certificates (Key Feature)

1. Start Django backend: `python manage.py runserver`
2. Go to: **http://localhost:8000/admin/portfolio/certificate/add/**
3. Fill in:
   - **Title** — e.g. "Backend Developer Internship Certificate"
   - **Issued By** — e.g. "BTM Company"
   - **Cert Type** — Internship / Experience / Training / Course
   - **Issue Date** — select the date
   - **File** — upload your PDF certificate ← THE MAIN UPLOAD
   - **Thumbnail** — optional image preview of the certificate
   - **Is Featured** — ✅ to show on portfolio
4. Click **Save** → certificate appears instantly on the React frontend!

### Linking certificates to Experience entries:
1. Go to `/admin/portfolio/experience/`
2. Edit an experience entry
3. In the **Certificate** dropdown, select the uploaded certificate
4. Save → the "📜 View Certificate" button will appear on that experience card

---

## 📸 Adding Profile Photo

1. Go to `/admin/portfolio/profile/`
2. Click on your profile entry
3. Upload a **Photo** (square JPG/PNG recommended, min 300×300px)
4. Save → photo appears in the Hero section immediately

---

## 🖼️ Adding Project Screenshots

1. Go to `/admin/portfolio/project/`
2. Edit a project
3. Upload a **Thumbnail** (16:9 recommended, JPG/PNG)
4. Save → image shows on the project card

---

## 🌐 Live Projects

| Project | Stack | URL |
|---------|-------|-----|
| Borrow Management System | React + Django + DRF | https://rajupanshop-pvw8jpqcn-vishal5725s-projects.vercel.app/login |
| E-Commerce Website | Django MVT | https://vish221305.pythonanywhere.com/ |
| Portfolio API | Django + DRF | https://vish22portfolio.pythonanywhere.com/api/portfolio/ |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#0B1728` | Primary background |
| `--teal` | `#00C2E0` | Accent / brand colour |
| `--mint` | `#64FFDA` | Secondary highlight |
| `--font-head` | Syne | All headings |
| `--font-body` | DM Sans | Body text |

---

## 🚢 Deployment

### Backend → PythonAnywhere (Free)
```bash
# In PythonAnywhere console:
git clone <your-repo>
cd backend
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py createsuperuser

# Set in settings.py for production:
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.pythonanywhere.com']
CORS_ALLOWED_ORIGINS = ['https://your-frontend.vercel.app']
```

### Frontend → Vercel (Free)
```bash
# Create .env.production in frontend/:
REACT_APP_API_URL=https://yourdomain.pythonanywhere.com/api

# Deploy:
npm run build
# drag & drop build/ to vercel.com OR use Vercel CLI
```

---

## 📞 Contact

**Vishal Gupta** · Backend Developer · Python Engineer  
📧 vg016600@gmail.com · 📱 +91 88405 58318  
🔗 [github.com/Vishal5725](https://github.com/Vishal5725)  
💼 [linkedin.com/in/vgpython884055](https://linkedin.com/in/vgpython884055)
