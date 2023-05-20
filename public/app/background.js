// chrome.webNavigation.onCompleted.addListener(fetchLinks, {
//   url: [
//     {urlMatches: "reddit\.com\/r\/[^/]+\/comments\/[^/]+"},
//   ]
// });

let linkList;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    createDisplayFromLinks(request).then(sendResponse);
    return true;
  }
);

async function createDisplayFromLinks(request) {
  linkList = request.message;
  const JSONlinks = await linkList.map(link => {
    const queryIndex = link.indexOf('?');
    if(queryIndex !== -1) {
      return link.slice(0, queryIndex) + '.json' + link.slice(queryIndex);
    } else {
      return link + '.json';
    };
  });
  return JSONlinks;
}
