import styles from './MovieGrid.module.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieGrid = ({ 
  movies = [], 
  onAddToCart, 
  onViewDetails,
  loading = false,
  className = '' 
}) => {

  if (loading) {
    return (
      <section className={`${styles.movieGrid} ${className}`} aria-label="Carregando filmes">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} aria-hidden="true"></div>
          <p className={styles.loadingText}>Carregando filmes...</p>
        </div>
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className={`${styles.movieGrid} ${className}`} aria-label="Nenhum filme encontrado">
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">🎬</div>
          <h2 className={styles.emptyTitle}>Nenhum filme encontrado</h2>
          <p className={styles.emptyMessage}>
            Tente ajustar os filtros de busca ou explore nossa coleção.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.movieGrid} ${className}`} aria-label="Lista de filmes">
      <div className={styles.gridContainer} role="grid" aria-label="Grid de filmes">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            className={styles.movieCard}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
