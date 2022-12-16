import { Container, Row, Col, Card, Button} from "react-bootstrap";

export function FullPost ({ title, body, comments, score, date, sub }) {
  return (
    <Card className="text-left">
      <Card.Header>
        <p>{sub}</p>
        <p>{new Date(date*1000).toString()}</p>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text className="post-body">
          {body}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}