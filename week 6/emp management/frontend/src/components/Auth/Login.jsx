import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      // Redirect based on user role (you can enhance this later)
      navigate('/user-profile');
    } else {
      setLocalError(result.error);
    }
  };

  const errorMessage = localError || authError;

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
