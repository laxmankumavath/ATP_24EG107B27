import { useState } from 'react';

export default function CommentBlog({ articleId, onCommentAdded }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        author: 'Current User',
        timestamp: new Date().toLocaleString(),
      };
      setComments((prev) => [newComment, ...prev]);
      setComment('');
      onCommentAdded?.(newComment);
      console.log('Comment added:', newComment);
      // Call API to save comment
    }
  };

  return (
    <div className="comment-blog">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows="4"
        />
        <button type="submit">Post Comment</button>
      </form>
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <strong>{c.author}</strong>
            <p>{c.text}</p>
            <small>{c.timestamp}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
