import React from 'react';
import { render } from 'react-dom';
import Foreground from './components/Foreground.js';
import './scss/styles.scss';

function checkLinks() {
  // Get all anchor tags from the user text in the comment area, all any hrefs that match reddit posts to linkList
  const jsonLinkList = [];
  const aTags = document.querySelectorAll(".commentarea .usertext-body a, ._1ump7uMrSA43cqok14tPrG ._3cjCphgls6DH-irkVaA0GM a, #-post-rtjson-content a, .md p a, ._1qeIAgB0cPwnLhDF9XSiJM a");
  // console.log('Found anchors: \n', aTags);
  const regexLink = /(?!.+\\)http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^) \n?#]+))/g;
  for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].href.match(regexLink)) {
      let link = aTags[i].href.match(regexLink)[0];
      const httpIndex = link.indexOf('://');
      if (link[httpIndex -1] !== 's') {
        link = link.slice(0, httpIndex) + 's' + link.slice(httpIndex);
      }
      link += '.json';
      if (!jsonLinkList.includes(link)) {
        jsonLinkList.push(link);
      }
    }
  }
  // console.log('jsonLinkList:\n', jsonLinkList);
  return jsonLinkList;
}

async function getPostObjects(jsonLinkList) {
  console.log('jsonLinkList:\n', jsonLinkList);
  let fulfilledLinks = [];
  const JSONDataPromises = jsonLinkList.map( async (url) => {
      return await fetch(url);
  });
  const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
  console.log('JSONSettledPromises:\n', JSONSettledPromises);
  const fulfilledPostData = await Promise.all(JSONSettledPromises
    .filter((response, index) => {
      return response.status === 'fulfilled' && response.value.ok === true && fulfilledLinks.push(jsonLinkList[index]); //links corresponding to rejected promises are removed
      })
    .map(response => response.value.json())
    );
  console.log('fulfilledPostData:\n');
  const selectedData = fulfilledPostData
    .filter(post => post.length === 2)
    .map((post, index) => {
      const { title, author, score, subreddit_name_prefixed, selftext, created_utc, url, permalink, secure_media_embed } = post[0].data.children[0].data;
      const comments = post[1].data.children.map(comment => [comment.data.body, comment.data.author, comment.data.score, comment.data.total_awards_received]);
      const prunedObject = {
          title,
          author,
          score,
          subreddit_name_prefixed,
          selftext,
          comments,
          url,
          created_utc,
          secure_media_embed,
          jsonlink: fulfilledLinks[index],
          permalink
      };
      return prunedObject;
    });
  return selectedData;
}

const titleElement = document.querySelector("h1._eYtD2XCVieq6emjKBH3m, a.title");
console.log('titleElement:\n', titleElement);
const url = window.location.href;
const { minimum } = await chrome.storage.sync.get({minimum: 10});
// console.log('Minimum: ', minimum);
// console.log('url: ', url);

// This message is received by Popup.js and background.js
// Popup.js updates the link count if it's open while this message sends
// Background.js turns the badge to 'ON' if there are 10 or more links
async function scrubPage(runningList = []) {
  // console.log('Running Page Scrubber');
  setTimeout( async() => {
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
      render(<Foreground title={titleElement.innerHTML} postObjects={postObjects} />, document.querySelector('#foreground'));
    }
  }, 2*1000);
};

scrubPage();




