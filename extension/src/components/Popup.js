import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

//Grab the current tab, and some data from storage. To be used to update the popup if it does not receive messages (like when it's closed)
const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
const content = await chrome.storage.session.get([tab.id.toString()]);
// const status = await chrome.storage.session.get({[tab.id]: false});
// const min = await chrome.storage.sync.get({minimum: 10});

export default function Popup() {
  console.log('Conent: ', content);
  // const [toggleValue, setToggleValue] = useState(status[tab.id]);
  const [numOfLinks, setNumOfLinks] = useState(0);
  const [activeTab, setActiveTab] = useState(tab);
  const [doneChecking, setDoneChecking] = useState(false);

  // function handleToggle() {
  //   setToggleValue(!toggleValue);
  //   chrome.runtime.sendMessage({action: 'toggle', target: tab.id});
  // }

  //Message Handler: listen for messages, set variables appropriately
  chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Popup recieved message: ", message, "\nFrom: ", sender, "\nType: ", message.type, "\nSender ID matches Tab ID ? ", sender.tab.id === tab.id);
    if(message.type === "startCheck" && sender.tab.id === tab.id) {
      setDoneChecking(false);
    }
    if (message.type === "storeLinks" && sender.tab.id === tab.id) {
      setNumOfLinks(message.links.length);
      setDoneChecking(false);
    };
    if (message.type === "doneCheck" && sender.tab.id === tab.id) {
      setDoneChecking(true);
    }
  });

  //Grab data from storage, and set variables appropriately. Used each time popup is rendered in case it did not update.
  if(numOfLinks === 0 && content?.[tab.id] !== undefined) {
    console.log('Links Length: ', content[tab.id].links.length);
    setNumOfLinks(content[tab.id].links.length);
  }

  if(doneChecking === false && content?.[tab.id] !== undefined) {
    console.log('Done: ', content[tab.id].done);
    setDoneChecking(content[tab.id].done);
  }

  const regexPostLink = /http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^/) ]+))/g;

  return (
    <div style={styles.main} className='text-center'>
      <h1>Reddit Purple</h1>
      {tab.url.match(regexPostLink) ? 
        <div className='validURL' >
          {doneChecking ? <p>Found all links</p> : <p>Checking...</p>}
          <p>Links Found: {numOfLinks}</p>
          {/* {!numOfLinks && numOfLinks !== 0 ? 
            <p>Counting...</p> : 
            (numOfLinks < min.minimum ?
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
                  disabled={numOfLinks < min.minimum}
                />
              </Form>
            </div>))
          } */}
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
    width: '150px'
  }
}