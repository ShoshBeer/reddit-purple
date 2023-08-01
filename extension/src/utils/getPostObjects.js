export default async function getPostObjects(jsonLinkList) {
  let fulfilledLinks = [];
  const JSONDataPromises = jsonLinkList.map( async (url) => {
      return await fetch(url);
  });
  const JSONSettledPromises = await Promise.allSettled(JSONDataPromises);
  const fulfilledPostData = await Promise.all(JSONSettledPromises
    .filter((response, index) => {
      return response.status === 'fulfilled' && response.value.ok === true && fulfilledLinks.push(jsonLinkList[index]); //links corresponding to rejected promises are removed
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