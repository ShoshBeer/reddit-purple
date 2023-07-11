
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

//Initialized session storage on a new webpage with {TabId: false}. This this is used later to control the toggle between Reddit and this extensions view.
chrome.webNavigation.onCompleted.addListener((details) => {
  //Grabs Tab id from page just navigated to
  const tabId = details.tabId;
  //Sets false on Tabid in storage
  chrome.storage.local.get(function(data) {
    chrome.storage.local.set({...data, [tabId]: false});
  });
})
// possibly merge these two navigation listeners

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

chrome.storage.session.setAccessLevel({
  accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
});

//Listens for a message from the popup to toggle the view from reddit to our view and back
chrome.runtime.onMessage.addListener(async (message) => {
  //Grab current tab, and minimum links preference
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const min = await chrome.storage.sync.get({minimum: 10});

  // If badge wasn't set to 'ON' because the message was missed, then this will change it to 'ON' when the user clicks the toggle
  chrome.storage.local.get(tab.url).then(results => {
    if (results[tab.url] >= min.minimum) {
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: 'ON',
      });
    }
  })

  if (message.action === 'toggle' && message.target === tab.id) {

    const prevState = await chrome.storage.local.get({[tab.id]: false});
    const nextState = prevState[tab.id] === true ? false : true;

    if (nextState === true) {
      // Insert CSS to hide reddit view, and unhide purple view
      await chrome.scripting.insertCSS({
        files: ["displayPosts.css"],
        target: { tabId: tab.id },
      });
      // Store status of injection in session storage for toggle display in Popup.js
      chrome.storage.local.get(function(data) {
        chrome.storage.local.set({...data, [tab.id]: true});
      });

    } else if (nextState === false) {
      // Remove the CSS file that hides reddit view
      await chrome.scripting.removeCSS({
        files: ["displayPosts.css"],
        target: { tabId: tab.id },
      });

      chrome.storage.local.get(function(data) {
        chrome.storage.local.set({...data, [tab.id]: false});
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
