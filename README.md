# HELP STUDY ABROAD – Frontend Technical Assessment

A modern admin dashboard built with **Next.js**, **Material-UI**, and **Zustand**, integrating public APIs from **DummyJSON**.  
The application demonstrates authentication, state management, pagination, filtering, performance optimizations, and clean UI/UX patterns.

---

## Tech Stack

- **Next.js (App Router)**
- **Material UI (MUI)** – UI components & layout
- **Zustand** – State management
- **Axios** – API calls
- **DummyJSON API** – Public backend

---

## Features Overview

### Authentication
- Admin login page built using MUI
- Authentication via DummyJSON Auth API  
  `POST https://dummyjson.com/auth/login`
- JWT token stored in **Zustand state**
- Authenticated users are redirected to dashboard
- Protected dashboard routes (unauthenticated users cannot access)

> **Note:**  
> Authentication is implemented using Zustand for simplicity and clarity.  
> In a production system, **NextAuth** would be layered on top for OAuth providers, session handling, and SSR-based auth.

---

### Users Management

#### Users List
- API:
  - `GET /users?limit=10&skip=0`
  - `GET /users/search?q=...`
- Features:
  - Pagination (API-based)
  - Search filtering
  - Responsive MUI table
- Displayed fields:
  - Name
  - Email
  - Gender
  - Phone
  - Company

#### Single User View
- API:
  - `GET /users/{id}`
- Clean, card-based layout with information hierarchy
- Grouped sections:
  - Contact details
  - Location & education
- “Back to Users” navigation

---

### Products Management

#### Products List
- APIs:
  - `GET /products?limit=10&skip=0`
  - `GET /products/search?q=...`
  - `GET /products/category/{category}`
- Features:
  - Pagination
  - Search
  - Category filter
  - Responsive grid layout
- Displayed:
  - Image
  - Title
  - Price
  - Category
  - Rating

#### Single Product View
- API:
  - `GET /products/{id}`
- Product details:
  - Image
  - Description
  - Price
  - Rating
  - Category
- “Back to Products” navigation

> **Note:**  
> A single primary image is displayed for clarity.  
> An image carousel (e.g., MUI Carousel) can be added easily if required.

---

## State Management (Zustand)

Zustand is used to manage:
- Authentication state
- Users data
- Products data
- Loading & pagination state

### Why Zustand?
- Minimal boilerplate compared to Redux
- Built-in support for async actions
- Small bundle size
- Simple global state access
- Ideal for small–medium dashboards

---

## Performance Optimizations

- **API-side pagination** prevents loading large datasets
- **React.memo** used for reusable components (e.g., product cards)
- **useCallback** used for navigation handlers
- Avoided unnecessary re-renders
- Clean component separation

---

## Client-Side Caching Strategy

- Users and products list responses are cached in **Zustand store**
- Cache keys are based on:
  - Pagination
  - Search query
  - Category filter
- Cached data is reused when navigating pagination or revisiting filters

### Why caching?
- Reduces redundant API calls
- Improves perceived performance
- Enhances UX when navigating back and forth

---

## UI / UX Design

- Entire UI built with **Material-UI**
- Clean admin-style SaaS layout
- Proper spacing, hierarchy, and grouping
- Responsive design for:
  - Login page
  - Users list
  - Products list
  - Detail pages
- Neutral light background for better readability

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/help-study-abroad-frontend.git
cd help-study-abroad-frontend
```

2. Install dependencies
```
npm install
```
4. Run the development server
```
npm run dev
```
Open:
```http://localhost:3000```

---

## Folder Structure

```
app/
 ├─ login/
 ├─ dashboard/
 │   ├─ users/
 │   ├─ products/
store/
 ├─ authStore.ts
 ├─ userStore.ts
 ├─ productStore.ts
```

---

## Author

Shubham Das
- Frontend Developer
- Built as part of HELP STUDY ABROAD Frontend Technical Assessment
