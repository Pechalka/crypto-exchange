import Axios from 'axios';

// Axios.interceptors.response.use(undefined, (error) => {
//   if (error.response && error.response.status == 401) {
//     window.location.replace('/admin');
//   }

//   return Promise.reject(error);
// });

// export const adminLogin = (data) =>
//   Axios({
//     method: 'POST',
//     data,
//     url: '/bot/login',
//   });

// export const adminLogout = () =>
//   Axios({
//     method: 'GET',
//     url: '/bot/logout',
//   });