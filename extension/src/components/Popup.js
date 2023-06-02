import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

const [tab] = await chrome.tabs.query({ active: true });
const status = await chrome.storage.session.get({[tab.id]: false});

function Popup() {

  const [toggleValue, setToggleValue] = useState(status[tab.id]);
  const [numOfLinks, setNumOfLinks] = useState(null);

  function handleToggle() {
    setToggleValue(!toggleValue);
    chrome.runtime.sendMessage('toggle');
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (tab.url in message) {
      setNumOfLinks(message[tab.url]);
    }
  });

  if (!numOfLinks && numOfLinks !== 0) {
    chrome.storage.local.get(tab.url).then((result) => {
      setNumOfLinks(result[tab.url]);
    });
  }

  const regexPostLink = /http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^/) ]+))/g;

  return (
    <div style={styles.main} className='redditPurple'>
      <h1>Reddit Purple</h1>
      {tab.url.match(regexPostLink) ? 
        <div className='validURL' >
          {!numOfLinks && numOfLinks !== 0 ? 
            <p>Counting...</p> : 
            (numOfLinks < 10 ?
            <p>Not enough posts: {numOfLinks} Reddit links in the comments</p> :
            (<div>
              <p>{numOfLinks} Reddit posts found!</p>
              <Form>
                <Form.Label htmlFor='toggle-reddit-purple'>
                  Toggle to see posts linked in the comments
                </Form.Label>
                <Form.Switch
                  id='toggle-reddit-purple'
                  checked={toggleValue}
                  onChange={handleToggle}
                  disabled={numOfLinks < 10}
                />
              </Form>
            </div>))
          }
        </div> :
        <div className='invalidURL' >
          <p>Go to a post on Reddit.com to use Reddit Purple</p>
        </div>
      }
    </div>
  )
}
const styles = {
  main: {
    textAlign: 'center',
    width: '150px'
  }
}
export default Popup;