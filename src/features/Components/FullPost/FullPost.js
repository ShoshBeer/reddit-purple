import { Card, Button} from "react-bootstrap";
import { useState } from "react";
import upvotes from "../../../resources/upvotes.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './FullPost.css';

export function FullPost ({ title, author, body, comments, score, date, sub, link, media_embed, secure_media, secure_media_embed, media, url }) {

  const [showMorePost, setShowMorePost] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(false);

  const bodyMarkDown = body.replace(/&gt;+/g, '>').replace(/&amp;nbsp;/g, '&nbsp;  ');
  const commentsMarkDown = comments[0][0].replace(/&gt;+/g, '>').replace(/&amp;nbsp;/g, '&nbsp;  ');

  const leftAlign = {
    textAlign: 'left'
  };

  const titleStyle = {
    textAlign: 'left',
    fontSize: '130%',
  }

  return (
    <Card>
      <Card.Header>
        <h2 style={titleStyle}><a href={link} target="_blank" className="text-decoration-none"><ReactMarkdown children={title} /></a></h2>
        <img src={upvotes} width={15} style={{
          paddingTop: '4px', 
          float: 'left',
          display: "inline-block", 
          marginRight: 3}}/>
        <p style={{float: 'left', }}>{score}</p>
        <p style={{float: 'right'}} >Posted in <b>{sub}</b> by <b>u/{author}</b> on <b>{new Date(date*1000).toDateString()}</b></p>
        { Object.keys(secure_media_embed).length !== 0 &&
          <iframe 
            src={secure_media_embed.media_domain_url} 
            scrolling={secure_media_embed.scrolling ? 'yes' : 'no'}
            width={secure_media_embed.width} 
            height={secure_media_embed.height}
            loading='lazy'
            style={{clear: 'both'}}
            className="my-2"
          /> 
        }
        { url.search(/^.*\.(JPG|jpg|PNG|png|GIF|gif)$/) !== -1 &&
          <img 
            src={url}
            style={{maxWidth: '-webkit-fill-available'}}
            className="my-2"
          />
        }
        { url.search(/^.*\.(gifv)$/) !== -1 &&
          <video 
            controls
            src={url.replace('.gifv', '.mp4')}
            type="video/mp4"
            style={{maxWidth: '-webkit-fill-available'}}
            className="my-2"
          />
        }
        {body.length > 0 && body !== '[deleted]' && body !== '[removed]' && <div style={{textAlign: 'left', clear: 'both'}}>
          {body.length < 500 ? <ReactMarkdown children={bodyMarkDown} remarkPlugins={[remarkGfm]} /> : showMorePost ? <ReactMarkdown children={bodyMarkDown} remarkPlugins={[remarkGfm]}/> : <ReactMarkdown children={`${bodyMarkDown.substring(0, 450)}...`} remarkPlugins={[remarkGfm]} /> }
          {body.length >= 500 && <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMorePost(!showMorePost)} >
              {showMorePost ? 'Show less' : 'Show more'}
          </Button>}
          </div>}
      </Card.Header>
      {comments.length === 1 && comments[0][0] !== '[deleted]' && comments[0][0] !== '[removed]' && <Card.Body className="post-body" style={leftAlign} >
        <b><i>u/{comments[0][1]}</i></b>
        <br />
        <br />
        {comments[0][0].length < 500 ? <ReactMarkdown children={commentsMarkDown} remarkPlugins={[remarkGfm]} /> : showMoreComment ? <ReactMarkdown children={commentsMarkDown} remarkPlugins={[remarkGfm]} /> : <ReactMarkdown children={`${commentsMarkDown.substring(0, 450)}...`} remarkPlugins={[remarkGfm]} />}
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
