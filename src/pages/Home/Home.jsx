import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { getFormattedMovies } from '../../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Carregar filmes populares na inicialização
  useEffect(() => {
    loadMovies('popular');
  }, []);

  const loadMovies = async (type = 'popular', options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getFormattedMovies(type, {
        page: currentPage,
        ...options,
      });

      if (result.success) {
        setMovies(result.movies);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
      } else {
        setError(result.error);
        setMovies([]);
      }
    } catch (err) {
      setError('Erro ao carregar filmes');
      setMovies([]);
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (movie) => {
    console.log('Adicionar ao carrinho:', movie);
    // TODO: Implementar lógica do carrinho
  };

  const handleViewDetails = (movie) => {
    console.log('Ver detalhes:', movie);
    // TODO: Implementar navegação para detalhes
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      await loadMovies('search', { query: query.trim() });
    } else {
      // Se a busca estiver vazia, voltar aos filmes populares
      await loadMovies('popular');
    }
  };

  const handleLoadMore = async (e) => {
    e.preventDefault();
    
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      try {
        setLoading(true);
        const result = await getFormattedMovies(
          searchQuery ? 'search' : 'popular',
          {
            page: nextPage,
            query: searchQuery,
          }
        );

        if (result.success) {
          setMovies(prevMovies => [...prevMovies, ...result.movies]);
          setTotalPages(result.totalPages);
          
          // Scroll suave para manter o usuário na posição atual
          setTimeout(() => {
            const loadMoreButton = document.querySelector(`.${styles.loadMoreButton}`);
            if (loadMoreButton) {
              loadMoreButton.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }
          }, 100);
        }
      } catch (err) {
        console.error('Erro ao carregar mais filmes:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.home}>
      <Header onSearch={handleSearch} />
      
      <main className={styles.main}>
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              onClick={() => loadMovies('popular')}
              className={styles.retryButton}
            >
              Tentar novamente
            </button>
          </div>
        )}
        
        <MovieGrid
          movies={movies}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          loading={loading}
        />
        
        {movies.length > 0 && currentPage < totalPages && !loading && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={handleLoadMore}
              className={styles.loadMoreButton}
            >
              Carregar mais filmes
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
