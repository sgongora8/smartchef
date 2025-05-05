#  SmartChef

##  Overview
SmartChef is a web-based application that allows users to enter a list of available ingredients and receive matching recipes. The system is designed to provide **accurate, fast, and personalized** recipe recommendations while integrating **third-party APIs** for enhanced functionality. 

This project focuses on backend development, ensuring a scalable, efficient, and well-documented API for recipe retrieval. The front end will serve as a minimal interface to interact with the backend.

## Features

- **Personalized AI Search**  
  Enter your available ingredients and preferences—our Ollama‑powered AI instantly generates recipe ideas tailored to your tastes and skill level.

- **Ingredient‑Based Search & Ranking**  
  Users supply a list of ingredients and the system returns best‑matching recipes, ranked by match percentage and missing items.

- **All Recipes Browser**  
  Browse our curated library of preset recipes, complete with cooking time, ingredient lists, images, and cuisine tags.

- **Recipe Detail View**  
  Click any recipe to see step‑by‑step instructions, full ingredient breakdown, nutritional info, and images.

- **Saved Recipes & User Accounts**  
  Register or sign in with Google OAuth to bookmark favorites, manage your personal collection, and access them anywhere.

- **Third‑Party API Integration**  
  Optional integrations with USDA for nutrition data and Pexels for high‑quality imagery.

- **Fast & Scalable API**  
  Built on Node.js & Express with a MongoDB backend, our RESTful API delivers sub‑second responses and can handle heavy load.

- **Secure Input Validation**  
  All user inputs are validated and sanitized to ensure data consistency and protect against malicious requests.

- **Content Sections**  
  Explore our Blog, Cooking Tips, and Ingredients Guide for cooking inspiration and expert advice.

- **Responsive UI**  
  A polished interface built with React and Tailwind CSS, optimized for seamless use on any device.


---

## Tech Stack

- **Frontend**  
  - React 
  - React Router  
  - Tailwind CSS  
  - Vite  

- **Backend**  
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)  
  - [MongoDB](https://www.mongodb.com/) (for user data and saved recipes)  
  - [Ollama](https://ollama.com/) (local AI model hosting)  

- **Authentication & APIs**  
  - Google OAuth (via Passport.js)  
  - Optional integrations: USDA API, Pexels API  

---

## Getting Started

### Prerequisites

- Git  
- Node.js v16+ & npm  
- MongoDB (Atlas or local install)  
- Ollama (install mistral model)  

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/SmartChef.git
cd SmartChef

# 2. Backend setup
cd backend
npm install
New-Item .env -ItemType File
# Edit `.env` with your MongoDB URI, session secret, and OLLAMA_MODEL

# 3. Frontend setup
cd ../frontend
npm install
