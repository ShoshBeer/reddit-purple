import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const currentMin = await chrome.storage.sync.get({minimum: 10});

function Options() {

  const [min, setMin] = useState(currentMin.minimum);
  const [savedMin, setSavedMin] = useState(currentMin.minimum);

  function handleThreshold(e) {
    setMin(e.target.value);
  }

  function handleSave() {
    setSavedMin(min);
    chrome.storage.sync.get(function(data) {
      chrome.storage.sync.set({...data, minimum: min});
    });
  }

  function handleClear() {
    chrome.storage.sync.remove("minimum", function() {
      setSavedMin(10);
      alert("Sync Storage cleared");
    });
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Options</h1>

      <p className='fs-5 lh-base'>Upon navigating to any Reddit post, the extension will automatically count the number of Reddit posts linked in the comments.
        <br />
      If the number is above a certain threshold, it will retrieve the data for each post. The default threshold is 10, so if there are 10 or more Reddit posts linked, then the data will be fetched for all of them and made ready to display.
      </p>
      <p className='fs-5'>Current threshold: {savedMin}</p>
      <Form>
        <Row className='mb-3' sm={2} lg={3}>
          <Form.Group as={Col}>
            <Form.Label className='fs-5 pb-2' htmlFor='thresholdChoice'>Minimum number of links (1-15).</Form.Label>
            <Form.Control className='d-block' type='number' min='1' max='15' value={min} onChange={e => handleThreshold(e)} id='thresholdChoice' />
          </Form.Group>
        </Row>
        <Row className='mb-3' sm={2} lg={3}>
          <Col>
            <Button variant='outline-primary' onClick={handleSave}>Save</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Button className='text-center' variant='danger' onClick={handleClear}>Clear extension cache</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Options;