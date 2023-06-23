/*
This file periodically scrubs a Reddit page for anchors to Reddit posts and grabs their hrefs.
Each batch of hrefs is sent to the service worker to be stored in session storage.
Once it finds no more links it sends a message saying so, to update the popup (if it's open) the service worker then stores that tag in session storage.
*/
console.log('PostScrubber Initiated');

//This message lets the popup know it should read as "Checking..."
chrome.runtime.sendMessage({type: 'startCheck'});

//This function looks for links present in the comment area of a reddit post and compiles a list of all hrefs pointing to reddit posts. 
function checkLinks() {
  console.log('checkLinks has been called.');
  const jsonLinkList = [];
  const aTags = document.querySelectorAll(".commentarea .usertext-body a, ._1ump7uMrSA43cqok14tPrG ._3cjCphgls6DH-irkVaA0GM a, #-post-rtjson-content a");
  const regexLink = /(?!.+\\)http(s)?(:\/\/)?(www\.)?([^.]+\.)?reddit\.com\/r\/([^/]+)\/(comments\/([^) \n?#]+))/g;
  for (let i = 0; i < aTags.length; i++) {
    if (aTags[i].href.match(regexLink)) {
      let link = aTags[i].href.match(regexLink)[0];
      const httpIndex = link.indexOf('://');
      if (link[httpIndex - 1] !== 's') {
        link = link.slice(0, httpIndex) + 's' + link.slice(httpIndex);
      }
      link += '.json';
      if (!jsonLinkList.includes(link)) {
        jsonLinkList.push(link);
      }
    }
  }
  return jsonLinkList;
};

//This function grabs the JSON data from each reddit post, so we can use that to display the posts.
async function getPostObjects(jsonlinkList) {
  let fulfilledLinks = [];
  const JSONDataPromises = jsonlinkList.map(async (url) => {
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

//ADD FUNCTION TO: Check if there are more links on the JSON page than the DOM page, if there are, use the JSON data.


// function getThicc(fedList, doubleCheck = false) {
//   setTimeout(() => {
//     anchorSub = checkLinks();
//     if (anchorSub.length > fedList.length) {
//       console.log("Found some more links, going to keep looking.")
//       return getThicc(anchorSub);
//     } else {
//       console.log("Found these links: ", fedList);
//       return fedList;
//     }
//   }, 2*1000);
// };

//Grab current window URL
const url = window.location.href;

//This periodically runs checkLinks() and sends messages with the expanded list or a message letting the rest of the extension that it is done checking.
async function getThicc(runningList = []) {
  await setTimeout(() => {
    let checkList = checkLinks();
    if( checkList.length > runningList.length) {
      chrome.runtime.sendMessage({url: url, links: checkList, type: 'storeLinks'});
      return (getThicc(checkList))
    } else {
      chrome.runtime.sendMessage({type: 'doneCheck'});
    }
  }, 4*1000);
} 


// function thiccLoop() {
//   let builtList = [];
//   let checkList;
//   do {
//     console.log('checking')
//     checkList = builtList;
//     setTimeout(() => {
//       builtList = checkLinks();
//       chrome.runtime.sendMessage({url: url, links: builtList, type: 'storeLinks'});
//     }, 5*1000);
//   } while ( builtList.length > checkList.length);
//   console.log("returning:", builtList);
//   return builtList;
// };
getThicc();

