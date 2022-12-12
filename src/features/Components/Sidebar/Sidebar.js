import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

export function Sidebar ({ shortcuts }) {
  //props will be either homeLinks or postLinks => arrays of objects
  //homelinks example: [{
  //   title: example, 
  //   src: src, 
  //   alt: altText, 
  //   post: null
  // }, {
  //   ...
  // }]
  //postLinks example: [{
    // title: title, 
    // src: src, 
    // alt: altText, 
    // post: {comments: {}, postNum: 1}
  // }, {
  //   ...
  // }]

return (
  <SidebarMenu 
    className="flex-container component"
    expand='lg' 
    hide='md'
    exclusiveExpand={false}
    collapseOnSelect={false} >
    <SidebarMenu.Collapse>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <img className="icon" src="https://cdn-icons-png.flaticon.com/512/427/427533.png"/>
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle/>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <img 
                className="icon" 
                src={shortcuts[0].src} 
                alt={shortcuts[0].alt}/>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              <p>Help</p>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Sub>
          <SidebarMenu.Sub.Toggle>
            <SidebarMenu.Nav.Icon>
              <img 
                className="icon" 
                src={shortcuts[1].src} 
                alt={shortcuts[1].alt}/>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              <p>Search</p>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Sub.Toggle>
          <SidebarMenu.Sub.Collapse>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Icon>
                  <img 
                    className="icon" 
                    src={shortcuts[1].src} 
                    alt={shortcuts[1].alt}/>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>
                  <p>Surprise</p>
                </SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
          </SidebarMenu.Sub.Collapse>
        </SidebarMenu.Sub>
      </SidebarMenu.Body>
    </SidebarMenu.Collapse>
  </SidebarMenu>
)}


// <Tab.Container id="home-page">
//   <Row className="flex-xs-grow-0 flex-xs-shrink-0">
//     <Col className="border">
//       <ToggleButtonGroup 
//         name="home" 
//         vertical="true">
//         {shortcuts.map((shortcut, id) => {
//           if (shortcut.post === null) {
//             return (
//               <ToggleButton 
//                 className="my-3 px-0" 
//                 variant="" 
//                 key={id}>
//                 <img 
//                   height={40} 
//                   width={40} 
//                   src={shortcut.src} 
//                   alt={shortcut.alt} />
//               </ToggleButton> 
//             )
//           } else {
//           return (
//             <ToggleButton className="my-3" key={id}>
//               <p>{shortcut.title}</p>
//             </ToggleButton>
//           )
//           }
//         })}
//       </ToggleButtonGroup>
//     </Col>
//   </Row>
// </Tab.Container>