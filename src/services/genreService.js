import api from './api';

// Serviço específico para operações relacionadas a gêneros
export const genreService = {
  // Buscar lista de gêneros
  async getList() {
    try {
      const response = await api.get('/genre/movie/list');
      
      return {
        success: true,
        data: response.data,
        genres: response.data.genres,
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
  async getMovies(genreId, page = 1) {
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
};

export default genreService;
