import styles from './MovieCard.module.css';
import Button from '../Button/Button';

const MovieCard = ({ 
  movie, 
  onAddToCart, 
  onViewDetails,
  className = '' 
}) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart && movie) {
      onAddToCart(movie);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails && movie) {
      onViewDetails(movie);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article 
      className={`${styles.movieCard} ${className}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do filme ${movie?.title || 'Filme'}`}
    >
      {/* Movie Poster */}
      <div className={styles.posterContainer}>
        {movie?.posterUrl ? (
          <img 
            src={movie.posterUrl} 
            alt={`Poster do filme ${movie.title}`}
            className={styles.posterImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterPlaceholder} role="img" aria-label="Poster do filme">
            <span className={styles.posterIcon} aria-hidden="true">🎬</span>
          </div>
        )}
        <div className={styles.posterOverlay}>
          <Button 
            variant="primary" 
            size="small"
            onClick={handleAddToCart}
            className={styles.addToCartButton}
            aria-label={`Adicionar ${movie?.title || 'filme'} ao carrinho`}
            type="button"
          >
            <span aria-hidden="true">+</span> Carrinho
          </Button>
        </div>
      </div>

      {/* Movie Info */}
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>
          {movie?.title || 'Título do Filme'}
        </h3>
        
        <div className={styles.movieMeta} role="group" aria-label="Informações do filme">
          <span className={styles.movieYear} aria-label={`Ano de lançamento: ${movie?.year || 'N/A'}`}>
            {movie?.year || 'N/A'}
          </span>
          <span className={styles.movieRating} aria-label={`Avaliação: ${movie?.rating || '0.0'} estrelas`}>
            <span aria-hidden="true">⭐</span> {movie?.rating || '0.0'}
          </span>
        </div>

        <p className={styles.movieOverview}>
          {movie?.overview || 'Descrição não disponível.'}
        </p>

        <div className={styles.moviePrice}>
          <span className={styles.price} aria-label={`Preço: ${movie?.formattedPrice || 'R$ 29,90'}`}>
            {movie?.formattedPrice || 'R$ 29,90'}
          </span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
