import api from './api';

// Serviço específico para operações relacionadas a filmes
export const movieService = {
  // Buscar filmes populares
  async getPopular(page = 1) {
    try {
      const response = await api.get('/movie/popular', {
        params: {
          page,
          region: 'BR',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar filmes em cartaz
  async getNowPlaying(page = 1) {
    try {
      const response = await api.get('/movie/now_playing', {
        params: {
          page,
          region: 'BR',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar filmes por query
  async search(query, page = 1) {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('Digite pelo menos 2 caracteres para buscar');
      }

      const response = await api.get('/search/movie', {
        params: {
          query: query.trim(),
          page,
          region: 'BR',
          include_adult: false,
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
        totalResults: response.data.total_results,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar detalhes de um filme
  async getDetails(movieId) {
    try {
      if (!movieId) {
        throw new Error('ID do filme é obrigatório');
      }

      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,reviews',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movie: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar filmes por gênero
  async getByGenre(genreId, page = 1) {
    try {
      if (!genreId) {
        throw new Error('ID do gênero é obrigatório');
      }

      const response = await api.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page,
          region: 'BR',
          sort_by: 'popularity.desc',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar filmes recomendados
  async getRecommendations(movieId, page = 1) {
    try {
      if (!movieId) {
        throw new Error('ID do filme é obrigatório');
      }

      const response = await api.get(`/movie/${movieId}/recommendations`, {
        params: {
          page,
          region: 'BR',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Buscar filmes similares
  async getSimilar(movieId, page = 1) {
    try {
      if (!movieId) {
        throw new Error('ID do filme é obrigatório');
      }

      const response = await api.get(`/movie/${movieId}/similar`, {
        params: {
          page,
          region: 'BR',
        },
      });
      
      return {
        success: true,
        data: response.data,
        movies: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },
};

export default movieService;
