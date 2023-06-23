/*
This service worker receives messages and manages session storage. It also converts urls to JSON objects to be used to display posts.
*/

// chrome.webNavigation.onCompleted.addListener((details) => {
//   const tabId = details.tabId;
//   console.log('This should be called first with tabID: ', tabId)

//   // Set CSS injection property to false for any page that loads for the badge to turn 'OFF'
//   chrome.storage.session.get(function(data) {
//     chrome.storage.session.set({...data, [tabId]: false});
//   });
// });


//this function converts an array reddit post links to JSON objects to be displayed on a user toggle.
async function getPostObjects(jsonlinkList) {
  let fulfilledLinks = [];
  const JSONDataPromises = jsonlinkList.map(async (page) => {
    if(page === undefined) {
      console.log('this is undefined for some reason');
    }
    return await fetch(page);
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

//Message handler: receives messages, and updates storage appropirately
chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('Service Worker recieved Message: ', message.type, '\nFrom Sender: ', sender.id,);
  //Possibly check num of links before storing, to keep larger list.
  if(message.type === 'storeLinks') {
    console.log('Trying to store links: ', { [sender.tab.id]: {url: message.url, links: message.links}});
    chrome.storage.session.set({[sender.tab.id]: {url: message.url, links: await getPostObjects(message.links)}})
  };
  if(message.type === 'doneCheck') {
    chrome.storage.session.get(sender.tab.id.toString())
    .then(res => {
      console.log('Result of get: ', res, '\nTrying to set: ', {...res[sender.tab.id.toString()], done: true});
      chrome.storage.session.set({[sender.tab.id]: {...res[sender.tab.id.toString()], done: true}});
    })
  };
  if(message.type === 'startCheck') {
    chrome.storage.sesssion.get(sender.tab.id.toString())
    .then(res => {
      console.log('Starting Check. \nSetting Done: false \nTrying to set: ', {...res[sender.tab.id.toString()], done: true});
      chrome.storage.session.set({[sender.tab.id]: {...res[sender.tab.id.toString()], done: false}});
    })
  }
});

//This injects the extensions scripts to reddit post pages.
chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.scripting.executeScript({
    target: {tabId: details.tabId},
    files: [ './inject_script.js' ] 
  }).then(() => {
    chrome.scripting.executeScript({
      target: {tabId: details.tabId},
      files: [ './foreground.bundle.js' ] 
    })
  });  
}, {
  url: [
    {urlMatches: "reddit\.com\/r\/[^/]+\/comments\/[^/]+"},
  ]
});

// chrome.storage.session.setAccessLevel({
//   accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
// });

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "OFF",
//   });
// });

// chrome.runtime.onMessage.addListener(async (message) => {

//   // If badge wasn't set to 'ON' because the message was missed, then this will change it to 'ON' when the user clicks the toggle
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//   const min = await chrome.storage.sync.get({minimum: 10});

//   chrome.storage.session.get(tab.url).then(results => {
//     if (results[tab.url] >= min.minimum) {
//       chrome.action.setBadgeText({
//         tabId: tab.id,
//         text: 'ON',
//       });
//     }
//   })

//   if (message.action === 'toggle' && message.target === tab.id) {

//     const prevState = await chrome.storage.session.get({[tab.id]: false});
//     const nextState = prevState[tab.id] === true ? false : true;

//     if (nextState === true) {
//       // Insert the CSS file when the user turns the extension on
//       await chrome.scripting.insertCSS({
//         files: ["displayPosts.css"],
//         target: { tabId: tab.id },
//       });
//       // Store status of injection in session storage for toggle display in Popup.js
//       chrome.storage.session.get(function(data) {
//         chrome.storage.session.set({...data, [tab.id]: true});
//       });

//     } else if (nextState === false) {
//       // Remove the CSS file when the user turns the extension off
//       await chrome.scripting.removeCSS({
//         files: ["displayPosts.css"],
//         target: { tabId: tab.id },
//       });

//       chrome.storage.session.get(function(data) {
//         chrome.storage.session.set({...data, [tab.id]: false});
//       });
//     }
//   }
// });

// chrome.runtime.onMessage.addListener(async (message) => {
//   // If the user focuses on a different tab before the message is sent from index-foreground, then the badge does not change

//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   const min = await chrome.storage.sync.get({minimum: 10});
  
//   if (message[tab.url] >= min.minimum) {
//     chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: 'ON',
//     });
//   }
// })
