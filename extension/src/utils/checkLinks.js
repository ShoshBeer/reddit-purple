export default function checkLinks() {
  // Get all anchor tags from the user text in the comment area, all any hrefs that match reddit posts to linkList
  const jsonLinkList = [];
  const aTags = document.querySelectorAll(".commentarea .usertext-body a, ._1ump7uMrSA43cqok14tPrG ._3cjCphgls6DH-irkVaA0GM a, #-post-rtjson-content a, .md p a, ._1qeIAgB0cPwnLhDF9XSiJM a");
  // console.log('Found anchors: \n', aTags);
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
  // console.log('jsonLinkList:\n', jsonLinkList);
  return jsonLinkList;
}