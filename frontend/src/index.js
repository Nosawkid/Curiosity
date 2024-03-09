import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { SetSocket } from './Context/Context'
import { socket } from './Socket/Socket'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SetSocket.Provider value={socket}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SetSocket.Provider>
);

