# Modern Hotel Booking Platform

## Purpose
The Modern Hotel Booking Platform is a comprehensive solution for users to discover, book, and manage hotel reservations seamlessly. It combines an intuitive design with robust features to enhance the booking experience for users and administrators alike.

## Live URL
[Live Demo](https://mordern-hotel-booking-platform.web.app/)

## Key Features
- **Homepage**:
  - Dynamic banner with a slider showcasing hotel highlights.
  - Interactive map displaying the hotel's location using `react-leaflet`.
  - Featured Rooms: Highlights six top-rated rooms with a "Book Now" button.
  - User Reviews: Displays authentic reviews in a carousel format, sorted by the latest.
  - Special Offers: Popup/modal with promotions and discounts.

- **Authentication**:
  - Secure login and registration with validation and social login (Google/GitHub).
  - JWT-based authentication for secure access to private routes.

- **Room Management**:
  - Rooms Page: Displays all rooms with filters for price range.
  - Room Details Page: Comprehensive room information, user reviews, and booking options.

- **Booking System**:
  - Booking Modal: Displays room summary and allows date selection.
  - My Bookings Page: Lists all bookings by the logged-in user with options to update dates, cancel bookings, and leave reviews.

- **Additional Features**:
  - Fully responsive design for mobile, tablet, and desktop.
  - 404 Page: Creative design with a "Back to Home" button.

## npm Packages Used
### Frontend
- **`react`**: Library for building the user interface.
- **`react-router-dom`**: Handles client-side routing.
- **`axios`**: Facilitates API requests.
- **`react-leaflet`**: Integrates interactive maps.
- **`react-toastify`**: Provides toast notifications.
- **`moment`**: Manages date comparisons and formatting.
- **`react-datepicker`**: Implements a date picker for bookings.
- **`framer-motion`**: Adds animations to UI components.
- **`react-helmet`**: Manages metadata for SEO.

### Backend
- **`express`**: Simplifies server-side operations.
- **`jsonwebtoken`**: Ensures secure authentication with JWT.
- **`bcryptjs`**: Hashes passwords for secure storage.
- **`dotenv`**: Manages environment variables.
