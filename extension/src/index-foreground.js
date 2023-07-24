import React from 'react';
import { render } from 'react-dom';
import Foreground from './components/Foreground.js';
import './scss/styles.scss';
import checkLinks from './utils/checkLinks.js';
import getPostObjects from './utils/getPostObjects.js';


const titleElement = document.querySelector("h1._eYtD2XCVieq6emjKBH3m, a.title");
console.log('titleElement:\n', titleElement);
const url = window.location.href;
const { minimum } = await chrome.storage.sync.get({minimum: 10});
render(<Foreground title={titleElement.innerHTML} postObjects={postObjects} />, document.querySelector('#foreground'));

// console.log('Minimum: ', minimum);
// console.log('url: ', url);

// This message is received by Popup.js and background.js
// Popup.js updates the link count if it's open while this message sends
// Background.js turns the badge to 'ON' if there are 10 or more links
async function scrubPage(runningList = []) {
  // console.log('Running Page Scrubber');
  setTimeout( async () => {
    let checkList = checkLinks();
    // console.log('CheckLinks returned:\n', checkList)
    if( checkList.length > runningList.length) {
      //Send message to Popup to update if it's open.
      chrome.runtime.sendMessage({[url]: checkList.length});
      //Store number of links in session storage for popup to ref if opened later.
      chrome.storage.local.get(function(data) {
        chrome.storage.local.set({...data, [url]: checkList.length});
      });
      return scrubPage(checkList);
      //If the number of links found is larger than the minimum, grab their post data, and render them. The are hidden by default until the extension is toggled manually.
    } else if (checkList.length >= minimum) {
      console.log('attempting to render foreground.');
      const postObjects = await getPostObjects(checkList);
      console.log('postObjects:\n', postObjects);
    }
  }, 2*1000);
};

scrubPage();




