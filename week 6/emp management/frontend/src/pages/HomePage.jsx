import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Blog App</h1>
      <p>Welcome to our Blog Application</p>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}
