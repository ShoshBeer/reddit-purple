// chrome.webNavigation.onCompleted.addListener(fetchLinks, {
//   url: [
//     {urlMatches: "reddit\.com\/r\/[^/]+\/comments\/[^/]+"},
//   ]
// });

let linkList;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    createDisplayFromLinks(request).then(sendResponse);
    // console.log("Received the link list from Content.js");
    // console.log(request.message.length);
    // linkList = request.message;
    // console.log(`Inside message? ${linkList[4]}`);
    // if (request.message.length > 3) {
    //   sendResponse({farewell: `${request.message.length} links passed to the app :)`});
    // }
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
