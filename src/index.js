import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// TODO: Re-enable service worker after renaming the PWA and updating its icon (see manifest.json)
import registerServiceWorker from './registerServiceWorker'
// import { unregister as unregisterServiceWorker } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();

// unregisterServiceWorker()
