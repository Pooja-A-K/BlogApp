import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col} from 'react-bootstrap';
import useBlogActions from '../hooks/useBlogActions';
import styles from '../styles/blogpost.module.css';
import BlogForm from './BlogForm';
import BlogNewPost from './BlogNewPost';
import CustomPagination from './CustomPagination';

const BlogPost = () => {

  const { handleDelete, handleUpdate } = useBlogActions();
  const [data, setData] = useState(null); 
  const [localBlogs, setLocalBlogs] = useState([]);
  const [updatePost, setUpdatePost] = useState({ id: '', title: '', body: '' });
  const [selectedPostId, setSelectedPostId] = useState('');
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  

   // Fetch data on component mount
   useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  // Add new blog
  const addBlog = (newBlog) => {
    setLocalBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  // Handle deleting a blog
  const handleDeletePost = (id, isLocal) => {
    if (isLocal) {
      setLocalBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
    } else {
      handleDelete(id, data, setData);
    }
  };

  // Update blog form data
  const handleUpdatePost = async () => {
    if (selectedPostId && updatePost.title && updatePost.body) {
      // Check if the blog is locally added or fetched
      const isLocalBlog = localBlogs.some(blog => blog.id === selectedPostId);
  
      if (isLocalBlog) {
        // Update locally added blog
        const updatedLocalBlogs = localBlogs.map(blog =>
          blog.id === selectedPostId ? { ...blog, title: updatePost.title, body: updatePost.body } : blog
        );
        setLocalBlogs(updatedLocalBlogs);
        setIsUpdateFormVisible(false);
      } else {
        // Update fetched blog
        const updatedData = await handleUpdate(selectedPostId, updatePost, data, setData, setIsUpdateFormVisible);
  
        // Update the DOM with the updated data
        if (updatedData) {
          setData(updatedData);
          setIsUpdateFormVisible(false);
        }
      }
    }
  };

  // Update post click handler
  const handleUpdateClick = (post) => {
    setUpdatePost({ id: post.id, title: post.title, body: post.body });
    setSelectedPostId(post.id);
    setIsUpdateFormVisible(true);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data && data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = data ? Math.ceil(data.length / postsPerPage) : 0;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className={styles.cardmain}>
      {isUpdateFormVisible && (
        <div className={`mt-3 ${styles.updatediv}`}>
          <h3>Update Post</h3>
          <div className="mb-">
            <label htmlFor="updateTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="updateTitle" value={updatePost.title} onChange={(e) => setUpdatePost({ ...updatePost, title: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="updateBody" className="form-label">Body</label>
            <textarea className="form-control" id="updateBody" rows="3" value={updatePost.body} onChange={(e) => setUpdatePost({ ...updatePost, body: e.target.value })}></textarea>
          </div>
          <Button variant="outline-primary" onClick={handleUpdatePost}>Update</Button>
        </div>
      )}
      <Container>
        <Row>
        <Col md={6}>
      <h3>Fetched Blogs</h3>
      {currentPosts && currentPosts.map((post) => (
        <div className="card" style={{ width: "100%" }} key={post.id}>
          <div className="card-body">
            <h5 className="card-title">Blog Title:- {post.title}</h5>
            <p className="card-text">Blog Content:- {post.body}</p>
            <Button variant="outline-danger" onClick={() => handleDeletePost(post.id, false)} className={styles.Button}>Delete</Button>
            <Button variant="outline-primary" onClick={() => handleUpdateClick(post)}>Update</Button>
          </div>
        </div>
      ))}

      <CustomPagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      

      </Col>
      
       {/* Newly Added Blogs */}
      <Col md={6}>
      <BlogNewPost
        localBlogs={localBlogs}
        handleDeletePost={handleDeletePost}
        handleUpdateClick={handleUpdateClick}
      />
      </Col>
      </Row>

      {/* Blog Form */}
      <Row>
        <Col>
        <BlogForm addBlog={addBlog} />
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogPost;
