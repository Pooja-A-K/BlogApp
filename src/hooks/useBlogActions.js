import axios from 'axios';

const useBlogActions = () => {
  const handleDelete = async (id, data, setData) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setData(data.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleUpdate = async (selectedPostId, updatePost, data, setData, setIsUpdateFormVisible) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}`, updatePost);
      setData(data.map(post => (post.id === selectedPostId ? response.data : post)));
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  return { handleDelete, handleUpdate };
};

export default useBlogActions;