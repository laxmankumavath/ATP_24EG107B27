import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/apiService';

export default function WriteArticle() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare article data
    const articleData = {
      ...article,
      tags: article.tags.split(',').map(tag => tag.trim()),
    };

    const result = await api.createArticle(articleData);
    
    if (result.success) {
      navigate('/author-articles');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="write-article">
      <h2>Write New Article</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={article.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Article Content"
          value={article.content}
          onChange={handleChange}
          rows="10"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={article.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={article.tags}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
}
