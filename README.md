# 📌 Advance-DB-Project

## 🚀 Overview
This project is a **Full-Stack Database Application** built with:
- **Frontend:** Next.js  
- **Backend:** Laravel  
- **Database:** MySQL  

All SQL queries related to the project are stored in the **`Queries`** folder.  

---

## 🖥️ Frontend (Next.js)

### Installation
```bash
yarn install
```

### Development Server
```bash
yarn dev
```
This will start the frontend on [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Backend (Laravel)

### Installation
```bash
composer install
```


### Start Server
```bash
php artisan serve
```
This will run the backend on [http://localhost:8000](http://localhost:8000).

---

## 🗄️ Database Configuration

Update the **`.env`** file in the Laravel project with the following details:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=CensusDb
DB_USERNAME=root
DB_PASSWORD=HydotTech
```

---

## 📂 Queries
All raw SQL queries are stored in the **`Queries`** folder.  


---


## ✅ Project Structure
```
Advance-DB-Project/
│── frontend/   # Next.js UI
│── backend/    # Laravel project
│── Queries/    # SQL queries
│── README.md   # Project documentation
```

---
