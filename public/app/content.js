
function checkLinks() {
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

const linkList = checkLinks();

(async () => {
  const response = await chrome.runtime.sendMessage({message: linkList});
  // do something with response here, not outside the function
  console.log(response);
})();

// chrome.runtime.sendMessage({message: linkList.length}, (response) => {
//   console.log(response.farewell);
// });

// alert(`Found ${linkList.length} Reddit links on page.`);
// console.log(linkList);
