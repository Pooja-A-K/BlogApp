import axios from 'axios';

const useBlogCreate = () => {
  const handleCreate = async (newBlog, addBlog, handleClose) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newBlog);
      addBlog(response.data);
      handleClose();
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return { handleCreate };
};

export default useBlogCreate;
