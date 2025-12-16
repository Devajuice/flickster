'use client';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';

export default function WatchlistButton({ item, variant = 'default' }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(item.id, item.type);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWatchlist) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  // Variant styles
  const styles = {
    default: {
      padding: '8px',
      backgroundColor: inWatchlist ? 'var(--accent)' : 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    large: {
      padding: '12px 24px',
      backgroundColor: inWatchlist ? 'var(--accent)' : 'transparent',
      color: 'white',
      border: '2px solid var(--accent)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <motion.button
      style={styles[variant]}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      {inWatchlist ? (
        <>
          <BookmarkCheck size={variant === 'large' ? 20 : 24} />
          {variant === 'large' && <span>In Watchlist</span>}
        </>
      ) : (
        <>
          <Bookmark size={variant === 'large' ? 20 : 24} />
          {variant === 'large' && <span>Add to Watchlist</span>}
        </>
      )}
    </motion.button>
  );
}
