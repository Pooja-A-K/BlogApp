import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Navbar, Nav, Modal, Form, Button } from 'react-bootstrap';
import useBlogCreate from '../hooks/useBlogCreate';
import 'bootstrap/dist/css/bootstrap.min.css';

function BlogForm({ addBlog }) {
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Body is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

 
  const { handleCreate } = useBlogCreate();

  const onSubmit = async (data) => {
    await handleCreate(data, addBlog, handleClose);
    // Validate the data using the schema
    const isValid = await schema.isValid(data);
    if (!isValid) {
      // Handle validation errors
      console.error('Validation errors:', errors);
      return;
    }
    reset();
  };

  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" className='bg-body-tertiary' fixed='top'>
        <Container>
          <Navbar.Brand href="#home">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#addblog" onClick={handleShow}>Add Blog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control type="text" name="title" {...register('title')} />
              {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Blog Content</Form.Label>
              <Form.Control as="textarea" rows={3} name="body" {...register('body')} />
              {errors.body && <p className="text-danger">{errors.body.message}</p>}
            </Form.Group>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BlogForm;
