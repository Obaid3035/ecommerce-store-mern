import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-quill/dist/quill.snow.css';
import "react-image-gallery/styles/scss/image-gallery.scss";
import App from './App';

const app = <App />;

axios.defaults.baseURL = 'http://localhost:4000/';
// axios.defaults.baseURL = 'https://scrub-server.herokuapp.com/';

ReactDOM.render(
    app ,
  document.getElementById('root')
);


