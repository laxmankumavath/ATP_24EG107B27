import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../services/apiService';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      const result = await api.getArticleById(id);
      
      if (result.success) {
        const data = result.data;
        setArticle({
          title: data.title || '',
          content: data.content || '',
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
        });
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    const articleData = {
      ...article,
      tags: article.tags.split(',').map(tag => tag.trim()),
    };

    const result = await api.updateArticle(id, articleData);
    
    if (result.success) {
      navigate('/author-articles');
    } else {
      setError(result.error);
    }
    setUpdating(false);
  };

  return (
    <div className="edit-article">
      <h2>Edit Article</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading article...</p>
      ) : (
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
          <button type="submit" disabled={updating}>
            {updating ? 'Updating...' : 'Update Article'}
          </button>
        </form>
      )}
    </div>
  );
}
