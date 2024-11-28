import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmMxYTVhZjgyZjRkMjQ0NDc4NTYyZTc0NWEyMzk4MyIsIm5iZiI6MTcyOTg2NDI4Ny43ODA4NDEsInN1YiI6IjY3MWI4ODU2OWZmNjgxZDllMGE0MDA0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9DH2kToiSf5RTjmaCAHz1jxjB_ebhTp9cH6W1QWORU'
      }
  


})

export default instance;