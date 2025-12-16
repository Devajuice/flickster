'use client';
import { motion } from 'framer-motion';
import { useWatchlist } from '@/context/WatchlistContext';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import WatchlistCard from '@/components/WatchlistCard';

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, clearWatchlist, loading } =
    useWatchlist();

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading watchlist...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .watchlist-page {
          padding: 20px;
          padding-bottom: 100px;
          min-height: 80vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .page-title {
          font-size: 42px;
          font-weight: bold;
          background: linear-gradient(to right, #e50914, #f40612);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .watchlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .watchlist-page {
            padding: 15px;
            padding-bottom: 80px;
          }

          .page-title {
            font-size: 32px;
          }

          .watchlist-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 15px;
          }
        }
      `}</style>

      <motion.div
        className="watchlist-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-header">
          <div>
            <h1 className="page-title">My Watchlist</h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                marginTop: '5px',
              }}
            >
              {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {watchlist.length > 0 && (
            <motion.button
              onClick={clearWatchlist}
              style={styles.clearButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={18} />
              Clear All
            </motion.button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
              Your watchlist is empty
            </h2>
            <p style={{ marginBottom: '20px' }}>
              Start adding Movies and TV Shows to watch later!
            </p>
            <Link href="/movies">
              <motion.button
                style={styles.browseButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Movies
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((item, index) => (
              <WatchlistCard
                key={`${item.type}-${item.id}-${index}`}
                item={item}
                onRemove={removeFromWatchlist}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'var(--accent)',
    border: '2px solid var(--accent)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  browseButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
