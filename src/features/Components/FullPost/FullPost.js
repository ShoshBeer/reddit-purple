import { Card, Button} from "react-bootstrap";
import { useState } from "react";
import upvotes from "../../../resources/upvotes.png";

export function FullPost ({ title, author, body, comments, score, date, sub, link, media_embed, secure_media, secure_media_embed, media }) {

  const [showMorePost, setShowMorePost] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(false);

  const leftAlign = {
    textAlign: 'left'
  };

  const titleStyle = {
    textAlign: 'left',
    fontSize: '130%',
  }

  const htmlChars = (str) => {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  return (
    <Card>
      <Card.Header>
        <h2 style={titleStyle}>{title}</h2>
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
          style={{clear: 'both', display: 'block'}}
          ></iframe> }
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
      {/* { Object.keys(secure_media_embed).length !== 0 && <Card.Body>
        <iframe 
          src={secure_media_embed.media_domain_url} 
          scrolling={secure_media_embed.scrolling ? 'yes' : 'no'}
          width={secure_media_embed.width} 
          // height={secure_media_embed.height}
          height={secure_media_embed.width}
          ></iframe>  
      </Card.Body>} */}
      {/* { Object.keys(media_embed).length !== 0 && <Card.Body dangerouslySetInnerHTML={{__html: htmlChars(media_embed.content)}}></Card.Body> }
      <hr />
      { secure_media && <Card.Body dangerouslySetInnerHTML={{__html: htmlChars(secure_media.oembed.html)}}></Card.Body> }
      <hr />
      { Object.keys(secure_media_embed).length !== 0 && <Card.Body dangerouslySetInnerHTML={{__html: htmlChars(secure_media_embed.content)}}></Card.Body> }
      <hr />
      { media && <Card.Body dangerouslySetInnerHTML={{__html: htmlChars(media.oembed.html)}}></Card.Body> } */}
      {body.length > 0 && body !== '[deleted]' && <Card.Body style={leftAlign}>
        <Card.Text className="post-body">
          {body.length < 500 ? body : showMorePost ? body : `${body.substring(0, 450)}...`}
          {body.length >= 500 && <Button 
            className='d-grid' 
            size="sm"
            variant="outline-secondary"
            onClick={() => setShowMorePost(!showMorePost)} >
              {showMorePost ? 'Show less' : 'Show more'}
          </Button>}
        </Card.Text>
      </Card.Body>}
      {comments.length === 1 && <Card.Footer className="post-body" style={leftAlign} >
        <b><i>u/{comments[0][1]}</i></b>
        {comments[0][0].length < 500 ? comments[0][0] : showMoreComment ? comments[0][0] : `${comments[0][0].substring(0, 450)}...`}
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
