import { useState } from 'react';

export default function DeleteArticle({ articleId, onConfirmDelete, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    console.log('Deleting article:', articleId);
    // Call API to delete article
    try {
      // await deleteArticleAPI(articleId);
      onConfirmDelete?.();
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-article-modal">
      <div className="modal-content">
        <h3>Delete Article</h3>
        <p>Are you sure you want to delete this article? This action cannot be undone.</p>
        <div className="modal-actions">
          <button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="confirm-btn"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button onClick={onCancel} disabled={isDeleting} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
