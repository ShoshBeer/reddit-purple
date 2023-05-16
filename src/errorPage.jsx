import { useNavigate, useRouteError } from "react-router-dom";
import './App.css';
import home from '../src/resources/home.png';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Well, this is embarassing...</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img className="home-icon" onClick={() => navigate('/')} alt='Home icon' height='50px' src={home}/>
    </div>
  );
}