import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Alert, Form, Button, Container, Card, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Fetch posts function
const fetchPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

import "./i18n";
import { useTranslation } from 'react-i18next';
    const DisplayFilter = () => {
        const { t, i18n } = useTranslation();

        const changeLanguage = (language) => {
            i18n.changeLanguage(language);
        };

        const { data, isLoading, isError, error } = useQuery({
            queryKey: ['info'],
            queryFn: fetchPost,
        });

        const [postId, setPostId] = useState('');

        // Handle input change
        const handleInputChange = (e) => {
            setPostId(e.target.value);
        };

        // Memoize filtered post
        const filteredPost = useMemo(() => {
            return data ? data.find(post => post.id === parseInt(postId)) || null : null;
        }, [data, postId]);

        if (isLoading) {
            return (
                <div role="alert" aria-live="assertive">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        if (isError) {
            return (
                <div role="alert" aria-live="assertive">
                    <Alert variant="danger">{error.message}</Alert>
                </div>
            );
        }

        if (!data || !Array.isArray(data)) {
            return null;
        }

        return (
            <Container className="mt-5">
                <header>
                    <h1>{t('welcomeMessage')}</h1> 
                </header>

                <nav aria-label="Main navigation">
                    <ul>
                        <li><NavLink to="/Add" aria-label={t('Add a new post')}>{t('addMessage')}</NavLink></li>
                        <li><NavLink to="/Delete" aria-label={t('Delete an existing post')}>{t('deleteMessage')}</NavLink></li>
                        <li><NavLink to="/Put" aria-label={t('Update an existing post')}>{t('updateMessage')}</NavLink></li>
                        <li><NavLink to="/UserSelector" aria-label={t('Select a user')}>{t('selectMessage')}</NavLink></li>
                        <li><NavLink to="/CommentForm" aria-label={t('Comment on a post')}>{t('commentMessage')}</NavLink></li>
                    </ul>
                </nav>

                <Nav className="mr-auto" as="nav" role="menubar">
                    <Nav.Link onClick={() => changeLanguage('en')}>English</Nav.Link>
                    <Nav.Link onClick={() => changeLanguage('fr')}>Français</Nav.Link>
                </Nav>

                <section aria-labelledby="filterForm">
                    <Form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                        <Form.Group controlId="postId">
                            <Form.Label>{t('Enter Post ID')}</Form.Label>
                            <Form.Control
                                type="number"
                                value={postId}
                                onChange={handleInputChange}
                                placeholder={t('Enter post ID')}
                                aria-describedby="postIdHelp"
                            />
                            <Form.Text id="postIdHelp">
                                {t('Enter a post ID to search for a specific post. Leave blank to view all posts.')}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2" aria-label={t('Find Post')}>
                            {t('Find Post')}
                        </Button>
                    </Form>
                </section>

                <section aria-labelledby="postsList">
                    {filteredPost ? (
                        <Card className="mt-4 mb-3">
                            <Card.Body>
                                <Card.Title>{filteredPost.title}</Card.Title>
                                <Card.Text>{filteredPost.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        data.map((info) => (
                            <Card key={info.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{info.body}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </section>
            </Container>
        );
    };

export default DisplayFilter;
