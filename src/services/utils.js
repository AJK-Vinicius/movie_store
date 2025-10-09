// Utilitários para manipulação de dados da API TMDB

// Configuração de URLs de imagem
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Função para construir URL da imagem
export const getImageUrl = (path, size = 'w500') => {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Função para construir URL do poster
export const getPosterUrl = (path, size = 'w500') => {
  return getImageUrl(path, size);
};

// Função para construir URL do backdrop
export const getBackdropUrl = (path, size = 'w1280') => {
  return getImageUrl(path, size);
};

// Função para construir URL do avatar
export const getAvatarUrl = (path, size = 'w185') => {
  return getImageUrl(path, size);
};

// Função para formatar dados do filme
export const formatMovieData = (movie) => {
  if (!movie) return null;

  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    popularity: movie.popularity,
    adult: movie.adult,
    genreIds: movie.genre_ids || [],
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    originalLanguage: movie.original_language,
    // URLs das imagens
    posterUrl: getPosterUrl(movie.poster_path),
    backdropUrl: getBackdropUrl(movie.backdrop_path),
    // Dados formatados
    formattedReleaseDate: movie.release_date 
      ? new Date(movie.release_date).toLocaleDateString('pt-BR')
      : 'Data não disponível',
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : '0.0',
    // Dados adicionais para loja
    price: 29.90, // Preço fixo para simulação
    formattedPrice: 'R$ 29,90',
  };
};

// Função para formatar dados do gênero
export const formatGenreData = (genre) => {
  if (!genre) return null;

  return {
    id: genre.id,
    name: genre.name,
    // Dados adicionais para loja
    movieCount: 0, // Será preenchido dinamicamente
    icon: getGenreIcon(genre.id),
  };
};

// Função para obter ícone do gênero
export const getGenreIcon = (genreId) => {
  const genreIcons = {
    28: '🎬', // Ação
    12: '🗺️', // Aventura
    16: '🎨', // Animação
    35: '😂', // Comédia
    80: '🔍', // Crime
    99: '📺', // Documentário
    18: '🎭', // Drama
    10751: '👨‍👩‍👧‍👦', // Família
    14: '🧙‍♂️', // Fantasia
    36: '📚', // História
    27: '👻', // Terror
    10402: '🎵', // Música
    9648: '🔍', // Mistério
    10749: '💕', // Romance
    878: '🚀', // Ficção Científica
    10770: '📺', // Filme para TV
    53: '🔍', // Thriller
    10752: '⚔️', // Guerra
    37: '🤠', // Western
  };

  return genreIcons[genreId] || '🎬';
};

// Função para formatar dados do ator
export const formatActorData = (actor) => {
  if (!actor) return null;

  return {
    id: actor.id,
    name: actor.name,
    character: actor.character,
    profilePath: actor.profile_path,
    profileUrl: getAvatarUrl(actor.profile_path),
    order: actor.order,
  };
};

// Função para formatar dados da equipe técnica
export const formatCrewData = (crew) => {
  if (!crew) return null;

  return {
    id: crew.id,
    name: crew.name,
    job: crew.job,
    department: crew.department,
    profilePath: crew.profile_path,
    profileUrl: getAvatarUrl(crew.profile_path),
  };
};

// Função para formatar dados do vídeo
export const formatVideoData = (video) => {
  if (!video) return null;

  return {
    id: video.id,
    key: video.key,
    name: video.name,
    site: video.site,
    type: video.type,
    official: video.official,
    publishedAt: video.published_at,
    // URLs dos vídeos
    youtubeUrl: video.site === 'YouTube' ? `https://www.youtube.com/watch?v=${video.key}` : null,
    thumbnailUrl: video.site === 'YouTube' ? `https://img.youtube.com/vi/${video.key}/hqdefault.jpg` : null,
  };
};

// Função para formatar dados da review
export const formatReviewData = (review) => {
  if (!review) return null;

  return {
    id: review.id,
    author: review.author,
    content: review.content,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
    url: review.url,
    rating: review.author_details?.rating || null,
    avatarPath: review.author_details?.avatar_path,
    avatarUrl: getAvatarUrl(review.author_details?.avatar_path),
  };
};

// Função para truncar texto
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Função para formatar duração
export const formatDuration = (minutes) => {
  if (!minutes) return 'Duração não disponível';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins}min`;
};

// Função para formatar orçamento
export const formatBudget = (budget) => {
  if (!budget || budget === 0) return 'Orçamento não disponível';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget);
};

// Função para formatar receita
export const formatRevenue = (revenue) => {
  if (!revenue || revenue === 0) return 'Receita não disponível';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(revenue);
};

// Função para validar se é um filme adulto
export const isAdultContent = (movie) => {
  return movie?.adult === true;
};

// Função para obter classificação indicativa
export const getAgeRating = (movie) => {
  // TMDB não fornece classificação indicativa, mas podemos inferir baseado no conteúdo adulto
  if (isAdultContent(movie)) {
    return '18+';
  }
  return 'Livre';
};

export default {
  getImageUrl,
  getPosterUrl,
  getBackdropUrl,
  getAvatarUrl,
  formatMovieData,
  formatGenreData,
  formatActorData,
  formatCrewData,
  formatVideoData,
  formatReviewData,
  getGenreIcon,
  truncateText,
  formatDuration,
  formatBudget,
  formatRevenue,
  isAdultContent,
  getAgeRating,
};
