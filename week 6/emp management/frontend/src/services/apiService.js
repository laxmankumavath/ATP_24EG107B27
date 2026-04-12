// API Configuration
const API_BASE_URL = 'http://localhost:2907';

export const API_ENDPOINTS = {
  // Common/Auth
  REGISTER: `${API_BASE_URL}/common-api/user`,
  LOGIN: `${API_BASE_URL}/common-api/auth`,
  
  // User
  GET_USER_PROFILE: `${API_BASE_URL}/user-api/profile`,
  UPDATE_USER_PROFILE: `${API_BASE_URL}/user-api/profile`,
  
  // Author
  GET_AUTHOR_PROFILE: `${API_BASE_URL}/author-api/profile`,
  CREATE_ARTICLE: `${API_BASE_URL}/author-api/articles`,
  GET_AUTHOR_ARTICLES: `${API_BASE_URL}/author-api/articles`,
  UPDATE_ARTICLE: `${API_BASE_URL}/author-api/articles`,
  DELETE_ARTICLE: `${API_BASE_URL}/author-api/articles`,
  
  // Articles
  GET_ALL_ARTICLES: `${API_BASE_URL}/common-api/articles`,
  GET_ARTICLE_BY_ID: `${API_BASE_URL}/common-api/articles`,
  
  // Admin
  GET_ADMIN_PROFILE: `${API_BASE_URL}/admin-api/profile`,
  GET_USERS_LIST: `${API_BASE_URL}/admin-api/users`,
  GET_AUTHORS_LIST: `${API_BASE_URL}/admin-api/authors`,
  DELETE_USER: `${API_BASE_URL}/admin-api/users`,
  DELETE_AUTHOR: `${API_BASE_URL}/admin-api/authors`,
};

// Helper function to make API calls
export const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      throw new Error(responseData.message || 'API request failed');
    }

    return {
      success: true,
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
};

// Registration API call
export const registerUser = async (userData) => {
  return apiCall(API_ENDPOINTS.REGISTER, 'POST', userData);
};

// Login API call
export const loginUser = async (credentials) => {
  return apiCall(API_ENDPOINTS.LOGIN, 'POST', credentials);
};

// Get user profile
export const getUserProfile = async () => {
  return apiCall(API_ENDPOINTS.GET_USER_PROFILE, 'GET');
};

// Get author profile
export const getAuthorProfile = async () => {
  return apiCall(API_ENDPOINTS.GET_AUTHOR_PROFILE, 'GET');
};

// Get admin profile
export const getAdminProfile = async () => {
  return apiCall(API_ENDPOINTS.GET_ADMIN_PROFILE, 'GET');
};

// Create article
export const createArticle = async (articleData) => {
  return apiCall(API_ENDPOINTS.CREATE_ARTICLE, 'POST', articleData);
};

// Get author articles
export const getAuthorArticles = async () => {
  return apiCall(API_ENDPOINTS.GET_AUTHOR_ARTICLES, 'GET');
};

// Get all articles
export const getAllArticles = async () => {
  return apiCall(API_ENDPOINTS.GET_ALL_ARTICLES, 'GET');
};

// Get article by ID
export const getArticleById = async (id) => {
  return apiCall(`${API_ENDPOINTS.GET_ARTICLE_BY_ID}/${id}`, 'GET');
};

// Update article
export const updateArticle = async (id, articleData) => {
  return apiCall(`${API_ENDPOINTS.UPDATE_ARTICLE}/${id}`, 'PUT', articleData);
};

// Delete article
export const deleteArticle = async (id) => {
  return apiCall(`${API_ENDPOINTS.DELETE_ARTICLE}/${id}`, 'DELETE');
};

// Get users list (admin)
export const getUsersList = async () => {
  return apiCall(API_ENDPOINTS.GET_USERS_LIST, 'GET');
};

// Get authors list (admin)
export const getAuthorsList = async () => {
  return apiCall(API_ENDPOINTS.GET_AUTHORS_LIST, 'GET');
};

// Delete user (admin)
export const deleteUser = async (userId) => {
  return apiCall(`${API_ENDPOINTS.DELETE_USER}/${userId}`, 'DELETE');
};

// Delete author (admin)
export const deleteAuthor = async (authorId) => {
  return apiCall(`${API_ENDPOINTS.DELETE_AUTHOR}/${authorId}`, 'DELETE');
};
