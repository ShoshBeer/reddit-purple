import { Card, Button} from "react-bootstrap";
import { useState } from "react";
import upvotes from "../../../resources/upvotes.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function FullPost ({ title, author, body, comments, score, date, sub, link, media_embed, secure_media, secure_media_embed, media, url }) {

  const [showMorePost, setShowMorePost] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(false);

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
        <h2 style={titleStyle}><ReactMarkdown children={title} /></h2>
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
        { url && url.search(/^.*\.(JPG|jpg|PNG|png|GIF|gif)$/) !== -1 &&
          <img 
            src={url}
            style={{maxWidth: '-webkit-fill-available'}}
            className="my-2"
          />
        }
        <Button 
          href={link}
          target="_blank"
          size='sm' 
          variant='primary' 
          style={{
            clear: 'both',
            display: 'block'
          }} 
          >View Post in Reddit</Button>
      </Card.Header>
      {body.length > 0 && body !== '[deleted]' && body !== '[removed]' && <Card.Body style={leftAlign}>
          {body.length < 500 ? <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} /> : showMorePost ? <ReactMarkdown children={body} remarkPlugins={[remarkGfm]}/> : <ReactMarkdown children={`${body.substring(0, 450)}...`} remarkPlugins={[remarkGfm]} /> }
          {body.length >= 500 && <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMorePost(!showMorePost)} >
              {showMorePost ? 'Show less' : 'Show more'}
          </Button>}
      </Card.Body>}
      {comments.length === 1 && comments[0][0] !== '[deleted]' && comments[0][0] !== '[removed]' && <Card.Footer className="post-body" style={leftAlign} >
        <b><i>u/{comments[0][1]}</i></b>
        <br />
        <br />
        {comments[0][0].length < 500 ? <ReactMarkdown children={comments[0][0]} remarkPlugins={[remarkGfm]} /> : showMoreComment ? <ReactMarkdown children={comments[0][0]} remarkPlugins={[remarkGfm]} /> : <ReactMarkdown children={`${comments[0][0].substring(0, 450)}...`} remarkPlugins={[remarkGfm]} />}
        {comments[0][0].length >= 500 && <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMoreComment(!showMoreComment)} >
              {showMoreComment ? 'Show less' : 'Show more'}
        </Button>}
      </Card.Footer> }
    </Card>
  )
}
