import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/apiService';

export default function AuthorArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      const result = await api.getAuthorArticles();
      
      if (result.success) {
        setArticles(result.data.articles || []);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const result = await api.deleteArticle(id);
      if (result.success) {
        setArticles(articles.filter(article => article._id !== id && article.id !== id));
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="author-articles">
      <h2>My Articles</h2>
      <Link to="/write-article" className="btn-primary">Write New Article</Link>
      
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article._id || article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>Published: {article.publishDate || new Date().toLocaleDateString()}</p>
              <div className="article-actions">
                <Link to={`/edit-article/${article._id || article.id}`}>Edit</Link>
                <button onClick={() => handleDelete(article._id || article.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles published yet</p>
      )}
    </div>
  );
}
