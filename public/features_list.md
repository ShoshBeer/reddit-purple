# Reddit Purple

## What do we want it to do?

Users can browse posts linked by 'top threads' with previews instead of comment hyperlinks.

## How will it work?

Users paste a reddit URL with 'top thread' post, and the hyperlinks will tell the app which posts to render.

 - Next level: Identify posts that are about memorable posts in Reddit history and automatically render.

## Broad Strokes Implementation:

 - UI describes/shows how it works and the URL input field
    - Validate that the link is to a reddit post that has other posts/comments linked (either in post or in comments)
 - Component to find hyperlinks in post
    - Filter down to Reddit post and comment links
 - Component to display posts (and comments) on the page (previews?)
    - Each item is clickable and links to the full comment/post
 - CSS/styling for display page

---

### InputField Component:

 - checkForLinks(redditPostLink)
    - Checks post and comments for links to other reddit posts/comment
 - Update state with URL
 - Export selector for URL in state

---

### FindHyperlinksToReddit Component:

 - `filterHyperlinks(JSONdata) {
     // Find hyperlinks to Reddit posts and comments
 }`
 - Eliminate duplicates
 - Convert google AMP links to regular links and add them too
 - Look for links in first level replies? Or just top reply/comment?
 - Look for links in 'more' top level comments, only given as comment IDs in the JSON
 - Update state with array of links
 - Export selector for array of links

---

### DisplayPosts Component:

 - Take JSON data from each link in state array
 - Add array of post objects to state
 - Map over array of post objects in state to render a Post Component for each
 - Display number of comments searched and number of links found
 - Pass post object prop to each <Post />

---

### Post Component:

 - Displays data for a single post or comment
   - Title, date, author, comments, image, award(s)?, cat tax?, net upvotes?
 - Routes to new page that displays the post in full with more comments
 - Button to link to original reddit post or comment

---

### FilterResults Component:

 - User can filter or sort by some criteria 
   - Date, subreddit, upvotes, post length?, gold or specific award, search word


## Tools:

 - React
 - @reduxjs/toolkit
 - React-router

## Bugs:

 - Invalid reddit link doesn't have title or back to home button
 - Some markdown not displaying correctly
   - Blockquotes in last post of default example from r/AskHistorians
   - \&nbsp; not showing as whitespace on [this](https://www.reddit.com/r/ireland/comments/3dpuxy/visiting_your_beautiful_country_this_weekend_want/) post linked in [this](https://www.reddit.com/r/AskReddit/comments/96fs1m/whats_one_piece_of_reddit_folklore_that_every/) thread
   - Headers don't work without a space after the #

## To do:

 - Add context of original comment that linked it?
 - Display posts as they load?

## Done

 - Posts aren't updated if you put in a second link until hard refresh
   - Link list isn't cleared until the page is refreshed so new links are added to end of list
   - State is now cleared when navigating home with home button, but bug still happens when using browser back button
   - Update: bug fixed! Added useEffect to input field page to reset both slices of state
 - Make post title link back to reddit post
   - Done, but no hover effect except cursor
 - Media not always shown
   - Reddit jpg images should show now
   - Unclear if reddit hosted images will always be jpg
 - Still some duplicate posts showing up
   - Happens because queries not the same
   - Changed linklist regex to stop at query
 - Markdown not formatted
   - Fixed
 - Change title and logo of site and repo
 - Error page should link back to home
 - Show more than 15 posts
 - Centre media and move it to where text goes
 - Still some media that doesn't display
   - Examples: https://www.reddit.com/r/BetterEveryLoop/comments/4xf1uc/timescape/ and https://www.reddit.com/r/blackpeoplegifs/comments/70i6n5/when_bpt_wpf_meet_up/ linked by https://www.reddit.com/r/AskReddit/comments/7b5jzx/whats_your_favorite_reddit_post_that_you_have/
   - Seems to be when url is of the form "https://i.imgur.com/wgWAg7u.gifv"
   - Update: .gifv files working by changing the suffix to .mp4 and displaying in a <video> tag

