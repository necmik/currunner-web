import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
const { createMemoryHistory } = require("history");
const history = createMemoryHistory();

root.render(
    <React.StrictMode>
     <Router location={history.location}>
      <App />
     </Router>
    </React.StrictMode>
);

registerServiceWorker();
