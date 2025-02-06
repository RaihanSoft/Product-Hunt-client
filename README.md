# Products Hunt

## Project Overview
Products Hunt is a platform to discover and share tech products. It provides secure login, product management capabilities, a voting and review system, and analytics for admins to monitor the platform’s performance.

---


## Live Project Link
[Visit Products Hunt](https://product-hunt-9fc9a.web.app/)

---

## Technologies Used
- **Frontend**: React, Tailwind CSS, Framer Motion, Chart.js  
- **Backend**: Node.js, Express.js, MongoDB, JWT, Stripe for payment processing  
- **Deployment**: Cloud platform with CI/CD setup

---

## Core Features
- **User Authentication**: Secure login and registration system with JWT authentication.
- **Product Management**: Users can add, update, and delete their products. Each product can have tags, descriptions, and external links.
- **Voting System**: Users can upvote and unvote products. Product owners cannot vote on their own products.
- **Review System**: Users can post reviews and ratings for products. Reviews include the reviewer’s name and profile picture.
- **Admin Dashboard**: Admins can view site statistics, including the total number of products, reviews, and users, displayed in a pie chart.

---

## Dependencies
Here are the major dependencies used in the project:  
- `react`: ^18.x  
- `tailwindcss`: ^3.x  
- `framer-motion`: ^7.x  
- `chart.js`: ^4.x  
- `express`: ^4.x  
- `mongoose`: ^6.x  
- `jsonwebtoken`: ^9.x  
- `stripe`: ^12.x  

*(Ensure these versions match your actual project dependencies.)*

---

## How to Run the Project Locally

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/products-hunt.git
   cd products-hunt
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development server:  
   ```bash
   npm start
   ```

5. Open your browser and visit:  
   ```
   http://localhost:3000
   ```

---

## Relevant Resources
- **GitHub Repository**: [Products Hunt - Client](https://github.com/your-repo/products-hunt)  
- **Live Project**: [Visit Products Hunt](https://product-hunt-9fc9a.web.app/)

