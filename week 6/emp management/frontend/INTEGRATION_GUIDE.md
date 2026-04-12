# Blog Frontend - Backend Integration Guide

## Backend Connection Configuration

### API Base URL
- **Backend Server**: `http://localhost:2907`
- **Frontend Server**: `http://localhost:5174`

### Authentication
- Uses **JWT tokens** stored in HTTP-only cookies
- Credentials included automatically in all API requests
- User state managed via React Context (AuthContext)

## Available API Endpoints

### Authentication (Common API)
- `POST /common-api/user` - Register new user
- `POST /common-api/auth` - Login user

### User Routes
- `GET /user-api/profile` - Get user profile
- `PUT /user-api/profile` - Update user profile

### Author Routes
- `GET /author-api/profile` - Get author profile
- `POST /author-api/articles` - Create new article
- `GET /author-api/articles` - Get author's articles
- `PUT /author-api/articles/:id` - Update article
- `DELETE /author-api/articles/:id` - Delete article

### Common Routes
- `GET /common-api/articles` - Get all articles
- `GET /common-api/articles/:id` - Get article by ID

### Admin Routes
- `GET /admin-api/profile` - Get admin profile
- `GET /admin-api/users` - Get all users
- `GET /admin-api/authors` - Get all authors
- `DELETE /admin-api/users/:id` - Remove user
- `DELETE /admin-api/authors/:id` - Remove author

## Frontend Architecture

### Services
- **apiService.js** - Centralized API calls with helper functions

### Context
- **AuthContext.jsx** - Manages user authentication state
  - `useAuth()` hook for accessing user state and auth functions
  - `register()` - User registration
  - `login()` - User login
  - `logout()` - User logout

### Components Structure
```
src/
├── pages/
│   └── HomePage.jsx
├── components/
│   ├── Auth/
│   │   ├── Register.jsx
│   │   └── Login.jsx
│   ├── Profile/
│   │   ├── UserProfile.jsx
│   │   ├── AuthorProfile.jsx
│   │   └── AdminProfile.jsx
│   ├── Articles/
│   │   ├── Articles.jsx
│   │   ├── WriteArticle.jsx
│   │   ├── AuthorArticles.jsx
│   │   └── EditArticle.jsx
│   ├── Lists/
│   │   ├── UsersList.jsx
│   │   └── AuthorsList.jsx
│   └── Common/
│       ├── CommentBlog.jsx
│       └── DeleteArticle.jsx
├── services/
│   └── apiService.js
├── context/
│   └── AuthContext.jsx
└── App.jsx
```

## How to Run

### Start Backend
```bash
cd backend
npm install (if not already done)
node server.js
```

### Start Frontend
```bash
cd frontend
npm install (if not already done)
npm run dev
```

The application will be available at `http://localhost:5174`

## Key Features

✅ **JWT Authentication** - Secure token-based authentication
✅ **User Registration & Login** - Complete auth flow
✅ **Protected Routes** - User/Author/Admin specific pages
✅ **CRUD Operations** - Create, Read, Update, Delete articles
✅ **Admin Dashboard** - Manage users and authors
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Async operation feedback

## Form Fields

### Registration
- First Name
- Last Name
- Email
- Password
- Role (User/Author)

### Login
- Email
- Password

### Article (Create/Edit)
- Title
- Content
- Category
- Tags (comma-separated)

## Data Models

### User Model
```javascript
{
  firstname: String,
  lastname: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'author' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Article Model
```javascript
{
  title: String,
  content: String,
  category: String,
  tags: [String],
  authorId: ObjectId,
  publishDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables (Frontend)
Currently using hardcoded API base URL: `http://localhost:2907`

Future enhancement: Create `.env` file for configuration
```
VITE_API_BASE_URL=http://localhost:2907
```

## Common Issues & Solutions

### CORS Errors
- Ensure backend is running on port 2907
- Check that credentials are included in requests

### Authentication Fails
- Clear localStorage and cookies
- Ensure user role is correctly set during registration

### Token Expiration
- Default token expiry: 1 week
- User needs to login again after expiration

## Future Enhancements

- [ ] Implement refresh token mechanism
- [ ] Add pagination for articles list
- [ ] Implement search and filter functionality
- [ ] Add comments section on articles
- [ ] Implement user profile edit functionality
- [ ] Add image upload for articles/profiles
- [ ] Implement article categories/tags filtering
- [ ] Add notification system
- [ ] Implement email verification
- [ ] Add password reset functionality
