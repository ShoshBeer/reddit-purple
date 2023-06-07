import React from 'react';
import { render } from 'react-dom';
import Foreground from './components/Foreground.js';
import './scss/styles.scss';

function checkLinks() {
  // Get all anchor tags from the user text in the comment area, all any hrefs that match reddit posts to linkList
  const jsonLinkList = [];
  const aTags = document.querySelectorAll(".commentarea .usertext-body a, ._1ump7uMrSA43cqok14tPrG ._3cjCphgls6DH-irkVaA0GM a");
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
  return jsonLinkList;
}

async function getPostObjects(jsonlinkList) {

  let fulfilledLinks = [];
  const JSONDataPromises = jsonlinkList.map( async (url) => {
      return await fetch(url);
  });
  const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
  
  const fulfilledPostData = await Promise.all(JSONSettledPromises
    .filter((response, index) => {
      return response.status === 'fulfilled' && response.value.ok === true && fulfilledLinks.push(jsonlinkList[index]); //links corresponding to rejected promises are removed
      })
    .map(response => response.value.json())
    );

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

const titleElement = document.querySelector("a.title") ?? document.querySelector("h1._eYtD2XCVieq6emjKBH3m");

const url = window.location.href;

// This message is received by Popup.js and background.js
// Popup.js updates the link count if it's open while this message sends
// Background.js turns the badge to 'ON' if there are 10 or more links
chrome.runtime.sendMessage({[url]: jsonLinks.length});

chrome.storage.local.get(function(data) {
  chrome.storage.local.set({...data, [url]: jsonLinks.length});
});

chrome.storage.sync.get({minimum: 10}).then(async (result) => {
  if (jsonLinks.length >= result.minimum) {
      const postObjects = await getPostObjects(jsonLinks);
    
      render(<Foreground title={titleElement.innerHTML} postObjects={postObjects} />, document.querySelector('#foreground'));
    }
});
