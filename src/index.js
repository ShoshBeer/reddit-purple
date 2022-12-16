import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { InputField } from './features/Components/InputField/InputField';
import { DisplayPosts } from './features/Components/DisplayPosts/DisplayPosts';
import { useDispatch, useSelector } from 'react-redux';
import { selectLinks } from './features/Components/InputField/InputFieldSlice';

const dispatch = useDispatch();
const linkList = useSelector(selectLinks);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "input",
        element: <InputField mt="10"/>
      },
      {
        path: "display",
        element: <DisplayPosts />,
        loader: async () => {
            dispatch(loadJSON(linkList));
            dispatch(fetchURLData());
        },
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
