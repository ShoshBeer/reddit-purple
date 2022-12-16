import { Container, Row, Col, Card, Button} from "react-bootstrap";

export function FullPost (post) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {post.title}
        </Card.Title>
        <Card.Text>
          {post.body}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}