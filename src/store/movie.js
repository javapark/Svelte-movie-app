import axios from "axios";
import _unionBy from "lodash/unionBy";
import { writable, get } from "svelte/store";

export const movies = writable([]);

export async function searchMovies(payload) {
  const { title, type, year, number } = payload;
  const OMDB_API_KEY = "1f5dee5a";

  let _url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}`;
  const res = await axios.get(_url);

  const { Search, totalResults } = res.data;

  movies.set(Search);
  // 14 /10 => 1.4 => 2
  // 7 / 10 => 0.7 => 1
  const pageLength = Math.ceil(totalResults / 10);
  console.log(totalResults, pageLength);
  if (pageLength > 1) {
    for (let page = 2; page <= pageLength; page += 1) {
      if (page > number / 10) break;
      let _url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
      const res = await axios.get(_url);
      const { Search } = res.data;
      movies.update(($movies) => _unionBy($movies, Search, "imdbID"));
    }
  }
  console.log(get(movies));
}
