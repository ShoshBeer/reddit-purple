// import DisplayPosts from "./DisplayPosts";
// import React from "react";
// import { createRoot } from "react-dom/client";
let DisplayPosts = chrome.runtime.getURL("./DisplayPosts.js");

function checkLinks() {
  // Get all anchor tags from the user text in the comment area, all any hrefs that match reddit posts to linkList
  const linkList = [];
  aTags = document.querySelectorAll(".commentarea .usertext-body a");
  const regexLink = /(?!.+\\)http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^) \n?#]+))/g;
  for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].href.match(regexLink)) {
      if (!linkList.includes(aTags[i].href.match(regexLink)[0])) {
        linkList.push(aTags[i].href.match(regexLink)[0]);
      }
    }
  }
  return linkList;
}

function convertLinks(links) {
  // Convert each link in linkList to .json link
  const JSONlinks = links.map(link => {
    const queryIndex = link.indexOf('?');
    if(queryIndex !== -1) {
      return link.slice(0, queryIndex) + '.json' + link.slice(queryIndex);
    } else {
      return link + '.json';
    };
  });

  return JSONlinks;
}

async function getPostsFromLinks (jsonLinks) {
  // Fetch from each .json link the relevant post data
  let fulfilledLinks = [];
  const JSONDataPromises = jsonLinks.map( async (url) => {
      return await fetch(url);
  });
  const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
  const fulfilledPostData = await Promise.all(JSONSettledPromises.filter((response, index) => {
    return response.status === 'fulfilled' && response.value.ok === true && fulfilledLinks.push(jsonLinks[index]); //links corresponding to rejected promises are removed
    }).map(response => response.value.json()));
  const selectedData = fulfilledPostData.map((post, index) => {
      const { title, author, score, subreddit_name_prefixed, selftext, created_utc, url, media_embed, secure_media, secure_media_embed, media } = post[0].data.children[0].data;
      const comments = post[1].data.children.map(comment => [comment.data.body, comment.data.author, comment.data.score, comment.data.total_awards_received]);
      return {
          title,
          author,
          score,
          subreddit_name_prefixed,
          selftext,
          comments,
          url,
          created_utc,
          media_embed,
          secure_media,
          secure_media_embed,
          media,
          link: fulfilledLinks[index]
      };
  })
  return selectedData;
}

const linkList = checkLinks();
const titleElement = document.querySelector("a.title");
const postObjects = getPostsFromLinks(convertLinks(linkList));

console.log(DisplayPosts);
console.log(DisplayPosts());

// const postsToDisplay = DisplayPosts.DisplayPosts(titleElement, postObjects, linkList.length);

// const body = document.querySelector("body");
// body.insertAdjacentElement("beforebegin", postsToDisplay);

// const body = document.querySelector('body');
// const app = document.createElement('div');
// const component = DisplayPosts.DisplayPosts;

// app.id = 'react-root'

// if (body) {
//   body.prepend(app);
// }

// const container = document.getElementById('react-root');
// const root = createRoot(container);

// root.render(<DisplayPosts 
//   postTitle={titleElement} 
//   postObjects={postObjects} 
//   linkListLength={linkList.length} />);  // Render react component


// (async () => {
//   const response = await chrome.runtime.sendMessage({message: "hiya"});
//   // do something with response here, not outside the function
//   console.log(response);
// })();

// // chrome.runtime.sendMessage({message: linkList.length}, (response) => {
// //   console.log(response.farewell);
// // });

// async function getPostData(details) {
//   // Fetch Json data of main post
//   // Don't think this is necessary
//   const redditURL = details.url;
//   const regexPostLink = /(?!.+\\)http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^/) ]+))/g;
//   const jsonURL = redditURL.match(regexPostLink)[0] + '.json';

//   const response = await fetch(jsonURL);
//   const jsonResponse = await response.json();
//   return jsonResponse;
// }
