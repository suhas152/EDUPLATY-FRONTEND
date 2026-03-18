EduPlaty – DevOps Enabled Educational Evaluation Platform

A full-stack educational platform with a production-grade CI/CD pipeline, containerization using Docker, and orchestration via Kubernetes.

📌 Overview

EduPlaty is an end-to-end Educational Project Evaluation Platform designed to streamline:

👨‍🏫 Teacher-based project evaluation

👨‍🎓 Student submissions & tracking

🧑‍💼 Admin-controlled workflows

📊 Structured grading & feedback system

This project is enhanced with a complete DevOps lifecycle, ensuring scalability, automation, and high availability.

🧱 Tech Stack
🔹 Backend

Java + Spring Boot

Hibernate / JPA

MySQL

🔹 Frontend

React.js

Axios

Bootstrap

🔹 DevOps & Cloud

Docker 🐳

Kubernetes ☸️

Jenkins ⚙️

GitHub (Version Control)

⚙️ Key Features

🔐 Role-based authentication (Admin / Teacher / Student)

📁 Project & team management

📝 Evaluation templates with grading criteria

📊 Marks tracking & reporting

🔁 Automated CI/CD pipeline

📦 Containerized microservices

☁️ Scalable Kubernetes deployment

🔄 CI/CD Pipeline Architecture
        Developer Push (GitHub)
                 ↓
           Jenkins Pipeline
                 ↓
        Build (Maven / npm)
                 ↓
        Run Tests (Optional)
                 ↓
        Build Docker Images
                 ↓
        Push to Docker Hub
                 ↓
        Deploy to Kubernetes
                 ↓
         Application Live 🚀
🐳 Docker Setup
Build Images
# Backend
docker build -t eduplaty-backend .

# Frontend
docker build -t eduplaty-frontend .
Run Containers
docker run -d -p 8080:8080 eduplaty-backend
docker run -d -p 3000:3000 eduplaty-frontend
☸️ Kubernetes Deployment
Apply Kubernetes Configs
kubectl apply -f k8s/
Components

Deployment (Backend & Frontend)

Services (ClusterIP / NodePort)

ConfigMaps & Secrets

Persistent Volume (MySQL)

📂 Project Structure
EduPlaty/
│
├── backend/              # Spring Boot Application
├── frontend/             # React App
├── k8s/                  # Kubernetes YAML files
├── docker/               # Dockerfiles
├── jenkins/              # Jenkins Pipeline (Jenkinsfile)
└── README.md
🔐 Environment Variables

Create .env or configure in Kubernetes:

DB_HOST=your-db-host
DB_USER=root
DB_PASSWORD=your-password
JWT_SECRET=your-secret
📸 Screenshots (Optional)

Add UI screenshots here to increase impact

🚀 How to Run Locally
# Clone repo
git clone https://github.com/your-username/eduplaty.git

# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend
npm install
npm start
📈 Future Enhancements

🔔 Real-time notifications (WebSockets)

🤖 AI-based evaluation suggestions

📊 Advanced analytics dashboard

☁️ Cloud deployment (AWS/GCP)

🙌 Contribution

Contributions are welcome! Feel free to fork and submit PRs.
<img width="1919" height="1022" alt="Screenshot 2026-03-18 142204" src="https://github.com/user-attachments/assets/203131ae-fe53-4275-b5c5-4b366bcf3ab8" />
