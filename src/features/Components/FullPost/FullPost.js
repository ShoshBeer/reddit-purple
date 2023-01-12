import { Container, Row, Col, Card, Button} from "react-bootstrap";

export function FullPost ({ title, author, body, comments, score, date, sub, link }) {
  return (
    <Card className="text-left">
      <Card.Header>
        <p>{sub}</p>
        <p>u/{author}</p>
        <p>{new Date(date*1000).toString()}</p>
        <p>{score}</p>
        <p>{link}</p>
        <a href={link} target='_blank'>View in Reddit</a>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text className="post-body">
          {body}
        </Card.Text>
      </Card.Body>
      {comments.length === 1 && <Card.Footer className="post-body">
        {console.log(comments)}
        <p><b><i>u/{comments[0][1]}</i></b></p>
        <p>{comments[0][0]}</p>
      </Card.Footer> }
    </Card>
  )
}