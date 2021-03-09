import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-app-48b8c-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;