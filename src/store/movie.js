import axios from "axios";
import _unionBy from "lodash/unionBy";
import { writable, get } from "svelte/store";

export const movies = writable([]);
export const loading = writable(false);
export const theMovie = writable({});
export const message = writable("Search for the movie title!");

export function initMovies(){
  movies.set([])
  message.set("Search for the movie title!")
  loading.set(false)
}

export async function searchMovies(payload) {
  if (get(loading)) return;
  loading.set(true);
  message.set('')

  const { title, type, year, number } = payload;

  let total = 0

  try {
    const res = await _fetchMovie({
      ...payload,
      page:1,
    });

    const { Search, totalResults } = res.data;
    movies.set(Search);
    total = totalResults
  } catch (msg) {
    movies.set([])
    message.set(msg)

    loading.set(false);
    return
  }

  // 14 /10 => 1.4 => 2
  // 7 / 10 => 0.7 => 1
  const pageLength = Math.ceil(total / 10);
  if (pageLength > 1) {
    for (let page = 2; page <= pageLength; page += 1) {
      if (page > payload.number / 10) break;
      const res = await _fetchMovie({
        ...payload,
        page
      })
      const { Search } = res.data;
      movies.update(($movies) => _unionBy($movies, Search, "imdbID"));
    }
  }

  loading.set(false);

}

/**
 * 영화 상세 정보를 가져오는 함수
 * @param {} id
 */
export async function searchMovieWidthId(id) {
  if (get(loading)) return;
  loading.set(true);
  const res = await _fetchMovie({
    id
  })
  theMovie.set(res.data);

  loading.set(false);
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = "1f5dee5a";

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url);
      console.log(res.data);
      if (res.data.Error) {
        reject(res.data.Error);
      }
      resolve(res);
    } catch (error) {
      console.log(error.response.status);
      reject(error.message);
    }
  });
}
