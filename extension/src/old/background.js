//Should just fire when Installed, moved to top of file.
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

//grabs tab ID (position in window) from a new page when it loads
chrome.webNavigation.onCompleted.addListener((details) => {
  const tabId = details.tabId;
  console.log('This should fire first and grab tab ID: ', tabId);
  // Set CSS injection property to false for any page that loads for the badge to turn 'OFF'
  chrome.storage.session.get(function(data) {
    chrome.storage.session.set({...data, [tabId]: false});
  });
})

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('This should fire second and inject foreground script')
  chrome.scripting.executeScript({
    target: {tabId: details.tabId},
    files: [ './inject_script.js' ] 
  }).then(() => {
    chrome.scripting.executeScript({
      target: {tabId: details.tabId},
      files: [ './foreground.bundle.js' ] 
      //changed from './foreground.bundle.js'
    })
  });  
}, {
  url: [
    {urlMatches: "reddit\.com\/r\/[^/]+\/comments\/[^/]+"},
  ]
});

//Unsure about this
chrome.storage.session.setAccessLevel({
  accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
});

/*
_______________________________________INSTALLED USED TO BE HERE______________________________________________
*/



chrome.runtime.onMessage.addListener(async (message) => {

  // If badge wasn't set to 'ON' because the message was missed, then this will change it to 'ON' when the user clicks the toggle
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const min = await chrome.storage.sync.get({minimum: 10});

  chrome.storage.local.get(tab.url).then(results => {
    if (results[tab.url] >= min.minimum) {
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: 'ON',
      });
    }
  })

  if (message.action === 'toggle' && message.target === tab.id) {

    const prevState = await chrome.storage.session.get({[tab.id]: false});
    const nextState = prevState[tab.id] === true ? false : true;

    if (nextState === true) {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["displayPosts.css"],
        target: { tabId: tab.id },
      });
      // Store status of injection in session storage for toggle display in Popup.js
      chrome.storage.session.get(function(data) {
        chrome.storage.session.set({...data, [tab.id]: true});
      });

    } else if (nextState === false) {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["displayPosts.css"],
        target: { tabId: tab.id },
      });

      chrome.storage.session.get(function(data) {
        chrome.storage.session.set({...data, [tab.id]: false});
      });
    }
  }
});

chrome.runtime.onMessage.addListener(async (message) => {
  // If the user focuses on a different tab before the message is sent from index-foreground, then the badge does not change

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const min = await chrome.storage.sync.get({minimum: 10});
  
  if (message[tab.url] >= min.minimum) {
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'ON',
    });
  }
})
