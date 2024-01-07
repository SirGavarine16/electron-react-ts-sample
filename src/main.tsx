import React from 'react';
import { createRoot } from 'react-dom/client';

import './scss/globals.scss';
import './scss/styles.scss';
import App from './frontend/App';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
