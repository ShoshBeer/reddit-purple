import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import Popup from './Popup.js';
import Foreground from './Foreground.js';

function Options() {
    return (
      <div>
        <h1>Options</h1>
      </div>
        // <Router>
        //     <div style={styles.container}>
        //         <div style={styles.nav_bar}>
        //             <h1>Chrome Ext - Options</h1>
        //             <nav>
        //                 <ul>
        //                     <li>
        //                         <Link to="/">Options</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/popup">Popup</Link>
        //                     </li>
        //                     <li>
        //                         <Link to="/foreground">Foreground</Link>
        //                     </li>
        //                 </ul>
        //             </nav>
        //         </div>
        //         <Routes>
        //             <Route exact path="/popup">
        //                 <Popup />
        //             </Route>
        //             <Route exact path="/foreground">
        //                 <Foreground />
        //             </Route>
        //             <Route exact path="/">
        //                 <Navigate to="/options.html" />
        //             </Route>
        //         </Routes>
        //     </div>
        // </Router>
    )
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default Options;