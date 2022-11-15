import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InfoProvider from './components/InfoProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

ReactDOM.render(
	<React.StrictMode>
		<InfoProvider>
			<App />
		</InfoProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
