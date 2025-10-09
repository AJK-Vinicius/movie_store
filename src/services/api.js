import axios from 'axios';
import movieService from './movieService';
import genreService from './genreService';
import { formatMovieData, formatGenreData } from './utils';

// Configuração base da API TMDB
const API_KEY = '8c46d01dd3fd694b6f488a7a22c144b2';
const BASE_URL = 'https://api.themoviedb.org/3';

// Instância do Axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar a API key automaticamente
api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: API_KEY,
      language: 'pt-BR', // Idioma português brasileiro
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Erro na API:', error);
    
    if (error.response) {
      // Erro de resposta do servidor
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          throw new Error('Chave da API inválida ou expirada');
        case 404:
          throw new Error('Recurso não encontrado');
        case 429:
          throw new Error('Muitas requisições. Tente novamente em alguns minutos');
        case 500:
          throw new Error('Erro interno do servidor');
        default:
          throw new Error(data?.status_message || 'Erro desconhecido na API');
      }
    } else if (error.request) {
      // Erro de rede
      throw new Error('Erro de conexão. Verifique sua internet');
    } else {
      // Outros erros
      throw new Error('Erro inesperado');
    }
  }
);

// Funções principais de alto nível - apenas chamadas e tratamento
export const getPopularMovies = async (page = 1) => {
  return await movieService.getPopular(page);
};

export const getNowPlayingMovies = async (page = 1) => {
  return await movieService.getNowPlaying(page);
};

export const searchMovies = async (query, page = 1) => {
  return await movieService.search(query, page);
};

export const getMovieDetails = async (movieId) => {
  return await movieService.getDetails(movieId);
};

export const getMovieGenres = async () => {
  return await genreService.getList();
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  return await movieService.getByGenre(genreId, page);
};

export const getMovieRecommendations = async (movieId, page = 1) => {
  return await movieService.getRecommendations(movieId, page);
};

export const getSimilarMovies = async (movieId, page = 1) => {
  return await movieService.getSimilar(movieId, page);
};

// Função para buscar filmes com dados formatados
export const getFormattedMovies = async (type = 'popular', options = {}) => {
  const { query, page = 1, genreId } = options;
  
  let result;
  
  switch (type) {
    case 'popular':
      result = await getPopularMovies(page);
      break;
    case 'now_playing':
      result = await getNowPlayingMovies(page);
      break;
    case 'search':
      result = await searchMovies(query, page);
      break;
    case 'genre':
      result = await getMoviesByGenre(genreId, page);
      break;
    default:
      result = await getPopularMovies(page);
  }
  
  if (result.success && result.movies) {
    return {
      ...result,
      movies: result.movies.map(formatMovieData).filter(Boolean),
    };
  }
  
  return result;
};

// Função para buscar gêneros com dados formatados
export const getFormattedGenres = async () => {
  const result = await getMovieGenres();
  
  if (result.success && result.genres) {
    return {
      ...result,
      genres: result.genres.map(formatGenreData).filter(Boolean),
    };
  }
  
  return result;
};

// Exportar serviços para uso direto se necessário
export { movieService, genreService };

export default api;
