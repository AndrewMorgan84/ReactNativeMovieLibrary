/* eslint-disable prettier/prettier */
import axios from 'axios';

const apiURL = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=baf2ccd2cbbc71e4773f7363e86d8126';

export const getPopularMovies = async () => {
  const response = await axios.get(`${apiURL}/movie/popular?${apiKey}`);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiURL}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

export const getPopularTvShows = async () => {
  const response = await axios.get(`${apiURL}/tv/popular?${apiKey}`);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiURL}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiURL}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

export const getMovie = async id => {
  const resp = await axios.get(`${apiURL}/movie/${id}?${apiKey}`);
  return resp.data;
};
