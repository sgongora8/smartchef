# 🍽️ SmartChef

## Overview

**SmartChef** is a full-stack, AI-powered recipe web application that helps users discover personalized meal ideas based on available ingredients. Built with React, Node.js, and MongoDB, it combines third-party APIs with locally hosted LLMs (via Ollama) to deliver fast, intelligent recommendations.

While currently deployed for local development, SmartChef is architected for scalability and public deployment. The frontend offers an intuitive interface, while the backend handles recipe matching, user data, and secure API communication.

---

## 🔑 Features

- **🔍 Personalized AI Search**  
  Generate unique recipe ideas using Ollama-powered large language models based on user ingredients, preferences, and dietary needs.

- **🧮 Ingredient-Based Search & Ranking**  
  Input a list of ingredients and receive recipes ranked by match percentage and missing items.

- **📚 All Recipes Browser**  
  View a curated recipe library with metadata like cooking time, tags, nutrition, and photos.

- **📖 Recipe Detail View**  
  Click into recipes to see step-by-step instructions, nutrition info, and detailed breakdowns.

- **🔐 Google OAuth Authentication**  
  Sign in using Google to save favorite recipes and personalize your cooking dashboard.

- **🧠 LLM Integration (Ollama)**  
  Local LLMs power smart recommendations and contextual interactions — no external API dependency.

- **📦 Scalable REST API**  
  Built on Express + MongoDB, optimized for fast queries and extensible endpoints.

- **🧼 Secure Input Handling**  
  Full input validation and sanitation to prevent malformed data and ensure user safety.

- **🌐 Responsive UI**  
  Clean React + Tailwind CSS design for seamless experience across devices.

- **🧪 Developer-Focused Architecture**  
  Modular file structure, clear API routes, and self-documented code for easy expansion.

---

## 🛠️ Tech Stack

### Frontend
- React (with React Router)
- Tailwind CSS
- Vite

### Backend
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- Ollama (Local LLM hosting)

### Auth & APIs
- Google OAuth via Passport.js
- USDA API (Nutrition data)
- Pexels API (Recipe imagery)

---
## 👥 Credits & Contribution

This project was originally created as a team project and later forked and enhanced by Steven Gongora.

Frontend development, authentication flow, AI integration, and UI design by Steven Gongora

Original architecture and base logic from team repository: sarinjet1008/recipe-retrieval-system

---

## 🚀 Getting Started

### Prerequisites

- Git
- Node.js v16+ and npm
- MongoDB (local or Atlas cloud)
- Ollama installed with Mistral model

### Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/smartchef.git
cd smartchef

# 2. Backend setup
cd backend
npm install
# Create .env file
touch .env  # or use New-Item on PowerShell
# Add your MONGODB_URI, SESSION_SECRET, and OLLAMA_MODEL to .env

# 3. Frontend setup
cd ../frontend
npm install
npm run dev
