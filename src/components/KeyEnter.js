import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

import { checkApiIsValidAndSave } from '../api';

const KeyEnter = ({ show, handleModalClose }) => {
  const [notValid, setNotValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    checkApiIsValidAndSave(event.target.apikey.value)
      .then(res => {
        setIsLoading(false);
        handleModalClose();
      })
      .catch(error => {
        setNotValid(true);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      backdrop='static'
      backdropClassName='api-key-modal'
      centered
    >
      <Modal.Header>
        <Modal.Title>Welcome</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        please enter API Key
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control type='text' name='apikey' placeholder='API Key' />
          </Form.Group>
          {notValid && (
            <Alert variant={'danger'}>API Key is invalid - try again</Alert>
          )}

          <Button variant='primary' type='submit' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save API Key'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p>
          If you don't have an API Key. Please Sign up to{' '}
          <a href='https://twelvedata.com/' rel='noreferrer' target='_blank'>
            TwelveData
          </a>{' '}
          and get it.
        </p>
        <br />
        <p>
          <small>
            This app is made for my personal use. I have no intention to make
            profit out of it. I am not committing the app data is correct. The
            data calculation is made by me and with no professional knowledge.
          </small>
        </p>
      </Modal.Footer>
    </Modal>
  );
};

export default KeyEnter;
