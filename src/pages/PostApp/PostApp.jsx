import React, { useState, useEffect } from 'react';

// Simple SVG Icons components
const LoaderIcon = () => (
  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="42" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const PostApp = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      showAlert('Error fetching posts', 'error');
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json' }
      });
      const data = await response.json();
      setPosts((prev) => [data, ...prev]);
      setFormData({ title: '', body: '' });
      showAlert('Post added successfully! ✨', 'success');
      setShowForm(false);
    } catch (error) {
      showAlert('Error adding post 😢', 'error');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });
      setPosts((prev) => prev.filter(post => post.id !== id));
      showAlert('Post deleted successfully! 🗑️', 'success');
    } catch (error) {
      showAlert('Error deleting post 😢', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-50 p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">✨ Beautiful Posts ✨</h1>

      <div className="flex justify-end w-full max-w-4xl mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          {showForm ? <RefreshIcon /> : <PlusIcon />}
          {showForm ? 'Cancel' : '✨ New Post'}
        </button>
      </div>

      {alert.message && (
        <div className={`w-full max-w-4xl mb-4 p-4 rounded-md border-2 ${
          alert.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-600' 
            : 'bg-red-50 border-red-200 text-red-600'
        }`}>
          {alert.message}
        </div>
      )}

      {showForm && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border-2 border-pink-200 mb-8">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">✨ Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-semibold text-pink-600">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-2 p-3 w-full border-2 border-pink-200 rounded-md focus:outline-none focus:border-pink-400 bg-pink-50"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-semibold text-pink-600">Content</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                required
                className="mt-2 p-3 w-full border-2 border-pink-200 rounded-md focus:outline-none focus:border-pink-400 bg-pink-50"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-400 text-white p-3 rounded-md hover:bg-pink-500 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon />
                  Submitting...
                </>
              ) : (
                '✨ Create Post ✨'
              )}
            </button>
          </form>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">💖 All Posts 💖</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoaderIcon className="text-pink-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white text-center text-pink-500 py-8 rounded-lg border-2 border-pink-200">
            No posts available yet ✨
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-lg shadow-md border-2 border-pink-200 hover:border-pink-300 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-pink-600">{post.title}</h3>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-pink-400 hover:text-pink-500 transition-colors duration-200"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <p className="text-sm text-pink-500">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostApp;