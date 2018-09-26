import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:1337';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
