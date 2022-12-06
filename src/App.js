import React from 'react';
import './App.css';
import { DisplayPosts } from './features/Components/DisplayPosts/DisplayPosts';
import { InputField } from './features/Components/InputField/InputField';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputField />
        <DisplayPosts />
      </header>
    </div>
  );
}

export default App;
