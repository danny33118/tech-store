import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProductProvider } from './context/context'; 
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<ProductProvider>
    <App/>
</ProductProvider>
,document.getElementById('root'));

serviceWorker.unregister();