import { Container, Row, Col, Card, Button} from "react-bootstrap";
import upvotes from "../../../resources/upvotes.png";

export function FullPost ({ title, author, body, comments, score, date, sub, link }) {

  const leftAlign = {
    textAlign: 'left'
  };

  const titleStyle = {
    textAlign: 'left',
    fontSize: '150%',
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
        <Button 
          href={link}
          target="_blank"
          size='sm' 
          variant='primary' 
          style={{
            clear: 'left',
            display: 'block'}} 
          >View Post in Reddit</Button>
      </Card.Header>
      <Card.Body style={leftAlign}>
        <Card.Text className="post-body">
          {body}
        </Card.Text>
      </Card.Body>
      {comments.length === 1 && <Card.Footer className="post-body" style={leftAlign} >
        <p><b><i>u/{comments[0][1]}</i></b></p>
        <p>{comments[0][0]}</p>
      </Card.Footer> }
    </Card>
  )
}