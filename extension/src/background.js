chrome.webNavigation.onCompleted.addListener(injectScript, {
  url: [
    {urlMatches: "reddit\.com\/r\/[^/]+\/comments\/[^/]+"},
  ]
});

async function injectScript() {
  const [tab] = await chrome.tabs.query({ active: true });

  // Set CSS injection property to false for a page that loads
  chrome.storage.session.get(function(data) {
    chrome.storage.session.set({...data, [tab.id]: false});
  });
  
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [ './inject_script.js' ] 
  }).then(() => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: [ './foreground.bundle.js' ] 
    })
  });
}

chrome.storage.session.setAccessLevel({
  accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.runtime.onMessage.addListener(async (message) => {

  const [tab] = await chrome.tabs.query({ active: true });

  if (message === 'toggle') {

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
    // }
  }
});

chrome.runtime.onMessage.addListener(async (message) => {
  const [tab] = await chrome.tabs.query({ active: true });
  if (typeof message === "object" && message[tab.url] > 9) {
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'ON',
    });
  }
})
