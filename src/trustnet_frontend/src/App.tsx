// App.tsx
import React from 'react';
import AppRouter from './routes/AppRouter';
import Actors from "./components/ic/Actors";


const App: React.FC = () => {
  return <Actors><AppRouter /></Actors>;
};

export default App;