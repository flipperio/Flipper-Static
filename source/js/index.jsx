import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

(function() {
	window.addEventListener('DOMContentLoaded', function() {
		const entryPoint = document.getElementById('app');
		ReactDOM.render(<App />, entryPoint);
	});
}());
