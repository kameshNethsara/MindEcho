# 🧠 MindEcho  
## AI-Powered Mood Journal & Wellness Management System

MindEcho is a full-stack mental wellness application that combines mood tracking, journaling, and AI-powered insights. Users can log their daily emotions, receive personalized AI suggestions, and visualize their emotional trends through comprehensive analytics. The platform includes both user and admin interfaces for complete wellness management.

---

## 🛠 Technologies & Tools Used

### Frontend (React + TypeScript)
- **React 18** with TypeScript for type-safe development
- **React Router** for navigation and routing
- **Tailwind CSS** for responsive and modern UI
- **Context API** for state management (Auth, Journal, Analytics)
- **Axios** for HTTP requests
- **SweetAlert2** for interactive alerts
- **Chart.js/Recharts** for data visualization

### Backend (Node.js + Express)
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication & authorization
- **bcrypt** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment management

### AI Integration (Python/Flask)
- **Python Flask** server for AI features
- **Natural Language Processing** for mood analysis
- **Machine Learning** models for personalized suggestions
- **OpenRouter AI** (GPT-based models)
- **REST API** for communication with Node.js backend

### Development & Deployment
- **Git & GitHub** for version control
- **Postman/Thunder Client** for API testing
- **Vercel** (Frontend deployment)
- **Render** (Backend & AI Server deployment)
- **npm/yarn** for package management

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)
- Python 3.8+ (for AI features)
- npm or yarn package manager

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kameshNethsara/MindEcho
cd MindEcho 
```

### 2️⃣ Backend Setup (Node.js)
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```
Server will run at: **http://localhost:5000**

### 3️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AI_SERVER_URL=http://localhost:5001
```

Start the frontend development server:
```bash
npm start
```
Application will open at: **http://localhost:3000**

### 4️⃣ AI Server Setup (Python)
```bash
cd ai-server
pip install -r requirements.txt
```

Create a `.env` file in the `ai-server` directory:
```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=gpt-4o-mini
PORT=5001
```

Start the AI server:
```bash
python app.py
```
AI server will run at: **http://localhost:5001**

### 5️⃣ Database Setup
- Create a MongoDB database (local or Atlas)
- Update the connection string in backend `.env`
- The application will create necessary collections automatically

---

## 🌐 Deployed URLs

**Frontend** - https://mind-echo-frontend.vercel.app 

---

## ✨ Main Features

### 1. User Authentication & Profile Management
- Secure registration/login with JWT
- Profile editing with image upload
- Password reset functionality
- Role-based access (User/Admin)

### 2. Mood Journaling
- 12+ emotion selections with emojis
- Rich text journal entries
- Timestamped entries with mood tags
- CRUD operations for journal entries

### 3. AI-Powered Features
- **AI Wellness Assistant**: Chat-based support for mental wellness
- **Mood Analysis**: AI-driven emotional pattern recognition
- **Personalized Suggestions**: Context-aware wellness recommendations
- **Journal Summaries**: Automated entry summarization

### 4. Analytics Dashboard
- **Mood Distribution**: Visual breakdown of emotional states
- **Weekly/Monthly Trends**: Time-based mood analysis
- **Emotional Patterns**: Identification of recurring moods
- **AI Insights**: Automated wellness recommendations

### 5. Admin Panel
- **User Management**: View, edit, delete users
- **Role Management**: Assign admin/moderator roles
- **Platform Analytics**: Overview of all user activities
- **Content Moderation**: Monitor journal entries

### 6. Responsive Design
- Mobile-first approach
- Dark/Light mode support
- Accessible UI components
- Cross-browser compatibility

---

## 📸 Screenshots

### Landing Page
![Landing Page](/frontend/src/assets/screenshots/mindecho-landing-1.png),
![Landing Page](/frontend/src/assets/screenshots/mindecho-landing-2.png),
![Landing Page](/frontend/src/assets/screenshots/mindecho-landing-3.png),
![Landing Page](/frontend/src/assets/screenshots/mindecho-landing-4.png)
*Modern gradient design with floating leaves animation*

### Journal Interface
![Journal Interface](/frontend/src/assets/screenshots/mindecho-journal-1.png),
![Journal Interface](/frontend/src/assets/screenshots/mindecho-journal-2.png),
![Journal Interface](/frontend/src/assets/screenshots/mindecho-journal-3.png)

*Interactive mood selector with 12 emotional states*

### Analytics Dashboard
![AI Assistant](/frontend/src/assets/screenshots/mainecho-analytics-1.png),
![AI Assistant](/frontend/src/assets/screenshots/mainecho-analytics-2.png),
![AI Assistant](/frontend/src/assets/screenshots/mainecho-analytics-3.png),
![AI Assistant](/frontend/src/assets/screenshots/mainecho-analytics-4.png)

*Comprehensive mood charts and statistics*

### AI Assistant
![AI Assistant](/frontend/src/assets/screenshots/mindecho-ai-1.png),
![AI Assistant](/frontend/src/assets/screenshots/mindecho-ai-2.png)

*Chat interface for AI-powered wellness support*

### Admin Panel
![Admin Panel](/frontend/src/assets/screenshots/mindecho-admin-panel-1.png),
![Admin Panel](/frontend/src/assets/screenshots/mindecho-admin-panel-2.png),
![Admin Panel](/frontend/src/assets/screenshots/mindecho-admin-panel-3.png),
![Admin Panel](/frontend/src/assets/screenshots/mindecho-admin-panel-4.png)

*User management and platform analytics*

---

## 📁 Project Structure
```
mindecho/
├── frontend/                 # React TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── backend/                  # Node.js Express backend
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   └── package.json
│
├── ai-server/               # Python Flask AI server
│   ├── models/              # ML models
│   ├── services/            # AI service logic
│   ├── app.py               # Flask application
│   └── requirements.txt
│
└── README.md
```

---

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### API Testing with Postman
<!-- 1. Import the Postman collection from `/docs/postman-collection.json` -->
1. Create and then use the Postman collection
2. Set environment variables
3. Run the collection tests

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy as Node.js service

### AI Server (Render)
1. Deploy as Python service
2. Set Python version to 3.8+
3. Add `requirements.txt`

---

## 👥 Contributors

- **N.H.K.N. De Silva** - Full Stack Developer

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OpenRouter AI for AI capabilities
- MongoDB Atlas for cloud database
- Vercel & Render for hosting services
- The open-source community for amazing tools

---

<!-- ## 📞 Contact & Support

For questions, issues, or suggestions:
- **Email**: contact@mindecho.app
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/mindecho/issues) -->

---

<div align="center">
  <p>Made with ❤️ for mental wellness</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>