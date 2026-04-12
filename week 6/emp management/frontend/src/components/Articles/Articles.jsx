import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/apiService';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      const result = await api.getAllArticles();
      
      if (result.success) {
        setArticles(result.data.articles || []);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article._id || article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.excerpt || article.content?.substring(0, 100)}...</p>
              <Link to={`/articles/${article._id || article.id}`}>Read More</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}
