import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

export function Sidebar ({ shortcuts }) {
  //props will be either homeLinks or postLinks => arrays of objects
  //homelinks example: [{title: example, src: src, alt: altText, post: null}, {...}]
  //postLinks example: [{title: title, src: src, alt: altText, post: {comments: {}, postNum: 1}}, {...}]

return (
  <Tab.Container id="home-page">
    <Row className="flex-xs-grow-0 flex-xs-shrink-0">
      <Col className="border">
        <ToggleButtonGroup 
          
          name="home" 
          vertical="true">
          {shortcuts.map((shortcut, id) => {
            if (shortcut.post === null) {
              return (
                <ToggleButton 
                  className="my-3 px-0" 
                  variant="" 
                  key={id}>
                  <img 
                    height={40} 
                    width={40} 
                    src={shortcut.src} 
                    alt={shortcut.alt} />
                </ToggleButton> 
              )
            } else {
            return (
              <ToggleButton className="my-3" key={id}>
                <p>{shortcut.title}</p>
              </ToggleButton>
            )
            }
          })}
        </ToggleButtonGroup>
      </Col>
    </Row>
  </Tab.Container>
  )
}