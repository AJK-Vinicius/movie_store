import { useState } from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import MovieGrid from '../../components/MovieGrid/MovieGrid';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (movie) => {
    console.log('Adicionar ao carrinho:', movie);
    // TODO: Implementar lógica do carrinho
  };

  const handleViewDetails = (movie) => {
    console.log('Ver detalhes:', movie);
    // TODO: Implementar navegação para detalhes
  };

  const handleSearch = (query) => {
    console.log('Buscar filmes:', query);
    // TODO: Implementar busca na API
    setLoading(true);
    // Simular loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.home}>
      <Header />
      
      <main className={styles.main}>
        <MovieGrid
          movies={movies}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default Home;
