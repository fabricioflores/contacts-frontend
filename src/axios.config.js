import axios from 'axios';

axios.defaults.baseURL = 'https://ff-contacts-backend.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
