import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

const CommentForm = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !comment) {
            setError('Both name and comment are required.');
            return;
        }

        // Simulate form submission
        setSuccess('Comment posted successfully!');
        setName('');
        setComment('');
    };

    return (
        <Container className="mt-5">
            <header>
                <h1>Post a Comment</h1>
            </header>

            <section aria-labelledby="commentForm">
                <Form onSubmit={handleSubmit} aria-live="polite">
                    <Form.Group controlId="commentName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            aria-required="true"
                        />
                    </Form.Group>

                    <Form.Group controlId="commentText" className="mt-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment"
                            aria-required="true"
                        />
                    </Form.Group>

                    {error && (
                        <Alert variant="danger" role="alert">
                            {error}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert variant="success" role="alert">
                            {success}
                        </Alert>
                    )}

                    <Button variant="primary" type="submit" className="mt-3">
                        Submit Comment
                    </Button>
                </Form>
            </section>
        </Container>
    );
};

export default CommentForm;
