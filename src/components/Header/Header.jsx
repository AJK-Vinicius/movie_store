import { useState } from 'react';
import styles from './Header.module.css';
import Button from '../Button/Button';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implementar busca de filmes
      console.log('Buscar:', searchQuery);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCart();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <h1 className={styles.logoText}>
            <a href="/" aria-label="MovieStore - Página inicial">
              MovieStore
            </a>
          </h1>
        </div>

        {/* Search Bar */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Buscar filmes"
            />
            <Button 
              type="submit" 
              variant="primary" 
              size="small"
              className={styles.searchButton}
              aria-label="Pesquisar"
            >
              🔍
            </Button>
          </div>
        </form>

        {/* Cart Button */}
        <Button 
          variant="outline" 
          onClick={toggleCart}
          onKeyDown={handleKeyDown}
          className={styles.cartButton}
          aria-label="Abrir carrinho de compras"
          aria-expanded={isCartOpen}
          role="button"
          tabIndex={0}
        >
          <span aria-hidden="true">🛒</span>
          <span>Carrinho (0)</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
