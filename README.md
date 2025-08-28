# 🛒 Full E-Commerce Website

This is my **Ashinity Internship Final Project**, a complete e-commerce web application built with **React, TypeScript, Redux Toolkit, TailwindCSS, and Vite**.  
The project replicates a real-world shopping platform with modern UI/UX, user authentication, cart & wishlist management, and state persistence.  

Inspired by this [Figma community design](https://www.figma.com/design/T8wi5XpDx1Zso0c5wuVRhF/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=34-213&t=JesBGGS9OfcTnbPS-0), the project demonstrates my ability to translate design into production-ready code.

🔗 **Live Demo:** [ashinity-intenship-final-project.vercel.app](https://ashinity-intenship-final-project.vercel.app/)

---

## 🚀 Tech Stack

- **Frontend:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)  
- **Bundler / Dev Server:** [Vite](https://vitejs.dev/)  
- **Styling:** [TailwindCSS](https://tailwindcss.com/) with custom utilities  
- **UI & Icons:** Lucide Icons + custom SVGs  
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (cart, wishlist, users, products)  
- **Persistence:** LocalStorage (cart, wishlist, user sessions)  
- **Media Management:** [Cloudinary](https://cloudinary.com/) (product images)  
- **Mock API:** [MockAPI.io](https://mockapi.io/) (product & user data simulation)  
- **Code Quality:** ESLint + Prettier  

---

## 📌 Features

✅ **Landing Page** – clean homepage with featured sections  
✅ **Product Listings** – fetch products from MockAPI with section-based browsing  
✅ **Search & Filters** – filter products dynamically  
✅ **Product Details** – detailed view with related products  
✅ **Cart Management** – add, update, remove, persist across sessions  
✅ **Wishlist** – toggle wishlist, move items to cart  
✅ **Checkout Flow** – cart → checkout page (UI)  
✅ **User Authentication** – signup, login, logout, reset password  
✅ **User Profile** – edit profile & manage account info  
✅ **Password Reset** – simulated update with persistence  
✅ **Responsive Design** – fully responsive across devices  
✅ **State Persistence** – user, cart, wishlist persist in localStorage  

Planned Enhancements:
- 💳 Payment gateway integration  
- 📦 Order history & tracking  
- 🔔 Notifications & order updates  

---

## ⚙️ Project Setup

Clone repository and install dependencies:

```bash
git clone https://github.com/chilemati/ashinity-intenship-final-project.git
cd ashinity-intenship-final-project
npm install
npm run dev
