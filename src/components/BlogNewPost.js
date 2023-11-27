import React from 'react';
import { Button } from 'react-bootstrap';

const BlogNewPost = ({ localBlogs, handleDeletePost, handleUpdateClick }) => {
  return (
    <>
      <h3>Newly Added Blogs</h3>
      {localBlogs.map((localBlog) => (
        <div className="card" style={{ width: "100%" }} key={localBlog.id}>
          <div className="card-body">
            <h5 className="card-title">Blog Title:- {localBlog.title}</h5>
            <p className="card-text">Blog Content:- {localBlog.body}</p>
            <Button variant="outline-danger" onClick={() => handleDeletePost(localBlog.id, true)}>Delete</Button>
            <Button variant="outline-primary" onClick={() => handleUpdateClick(localBlog, true)}>Update</Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogNewPost;
