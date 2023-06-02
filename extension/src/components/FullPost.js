import React from "react";
import { Card, Button} from "react-bootstrap";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function FullPost ({ title, author, body, comments, score, date, sub, link, secure_media_embed, url }) {

  const [showMorePost, setShowMorePost] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(false);

  const bodyMarkDown = body.replace(/&gt;+/g, '>').replace(/&amp;nbsp;/g, '&nbsp;  ');
  const commentsMarkDown = comments[0][0].replace(/&gt;+/g, '>').replace(/&amp;nbsp;/g, '&nbsp;  ');

  const upvotes = chrome.runtime.getURL('/images/upvotes.png');

  return (
    <Card>
      <Card.Header>
        <h2 className="text-start post-title"><a href={"https://www.reddit.com" + link} target="_blank" rel="noreferrer" className="text-decoration-none"><ReactMarkdown children={title} /></a></h2>
        <img src={upvotes} alt="Upvotes" width={15} className="float-start upvotes" />
        <p className="float-start">{score}</p>
        <p className="float-end">Posted in <b>{sub}</b> by <b>u/{author}</b> on <b>{new Date(date*1000).toDateString()}</b></p>
        { Object.keys(secure_media_embed).length !== 0 && url.search(/^.*\.(gifv)$/) === -1 &&
          <iframe 
            title={secure_media_embed.media_domain_url}
            src={secure_media_embed.media_domain_url} 
            scrolling={secure_media_embed.scrolling ? 'yes' : 'no'}
            width={secure_media_embed.width} 
            height={secure_media_embed.height}
            loading='lazy'
            className="my-2"
          /> 
        }
        { url.search(/^.*\.(JPG|jpg|PNG|png|GIF|gif)$/) !== -1 &&
          <img 
            src={url}
            className="my-2"
          />
        }
        { url.search(/^.*\.(gifv)$/) !== -1 &&
          <video 
            controls
            src={url.replace('.gifv', '.mp4')}
            type="video/mp4"
            className="my-2"
          />
        }
        {body.length > 0 && body !== '[deleted]' && body !== '[removed]' && 
        <div className="text-start clear">
          {body.length < 500 ? 
          <ReactMarkdown children={bodyMarkDown} remarkPlugins={[remarkGfm]} /> : 
          showMorePost ? 
          <ReactMarkdown children={bodyMarkDown} remarkPlugins={[remarkGfm]}/> : 
          <ReactMarkdown children={`${bodyMarkDown.substring(0, 450)}...`} remarkPlugins={[remarkGfm]} /> }

          {body.length >= 500 && 
          <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMorePost(!showMorePost)} >
              {showMorePost ? 'Show less' : 'Show more'}
          </Button>}
        </div>}
      </Card.Header>
      {comments.length === 1 && comments[0][0] !== '[deleted]' && comments[0][0] !== '[removed]' && 
      <Card.Body className="post-body text-start" >
        <b><i>u/{comments[0][1]}</i></b>
        <br />
        <br />
        {comments[0][0].length < 500 ? 
          <ReactMarkdown children={commentsMarkDown} remarkPlugins={[remarkGfm]} /> : 
          showMoreComment ? 
          <ReactMarkdown children={commentsMarkDown} remarkPlugins={[remarkGfm]} /> : 
          <ReactMarkdown children={`${commentsMarkDown.substring(0, 450)}...`} remarkPlugins={[remarkGfm]} />}

        {comments[0][0].length >= 500 && <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMoreComment(!showMoreComment)} >
              {showMoreComment ? 'Show less' : 'Show more'}
        </Button>}
      </Card.Body> }
    </Card>
  )
}
