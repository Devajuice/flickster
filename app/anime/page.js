'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TVCard from '@/components/TVCard';
import GridSizeToggle from '@/components/GridSizeToggle'; // ← ADD THIS
import Link from 'next/link';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function AnimePage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [gridSize, setGridSize] = useState('small'); // ← ADD THIS

  const observerTarget = useRef(null);

  // ========== ADD THIS: Load grid size from localStorage ==========
  useEffect(() => {
    const savedSize = localStorage.getItem('animeGridSize');
    if (savedSize) {
      setGridSize(savedSize);
    }
  }, []);

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    localStorage.setItem('animeGridSize', size);
  };
  // ================================================================

  // Initial load
  useEffect(() => {
    fetchAnime(1, true);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchAnime(currentPage + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadingMore, currentPage]);

  const fetchAnime = async (page, reset = false) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      // Fetch anime using TMDB Animation genre (ID: 16) for TV shows from Japan
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=${page}`
      );
      const data = await response.json();

      if (reset) {
        setAnimeList(data.results || []);
      } else {
        // ========== FIX: Remove duplicates ==========
        setAnimeList((prev) => {
          const existingIds = new Set(prev.map((a) => a.id));
          const newAnime = (data.results || []).filter(
            (anime) => !existingIds.has(anime.id)
          );
          return [...prev, ...newAnime];
        });
        // ============================================
      }

      setCurrentPage(page);
      setHasMore(page < data.total_pages && page < 500); // TMDb limit
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading anime...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .anime-page {
          padding: 20px;
          padding-bottom: 100px;
        }

        .page-header {
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 42px;
          font-weight: bold;
          margin-bottom: 20px;
          background: linear-gradient(to right, #e50914, #f40612);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ========== UPDATE GRID STYLES ========== */
        .anime-grid {
          display: grid;
          margin-bottom: 60px;
        }

        /* Small Grid */
        .anime-grid.small {
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 15px;
        }

        /* Medium Grid (Default) */
        .anime-grid.medium {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        /* Large Grid */
        .anime-grid.large {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
        }

        @media (max-width: 768px) {
          .anime-page {
            padding: 15px;
            padding-bottom: 80px;
          }

          .page-title {
            font-size: 32px;
          }

          .anime-grid.small,
          .anime-grid.medium,
          .anime-grid.large {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }
        }

        @media (max-width: 400px) {
          .anime-grid.small,
          .anime-grid.medium,
          .anime-grid.large {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }

        @media (min-width: 1200px) {
          .anime-grid.small {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 18px;
          }

          .anime-grid.medium {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 25px;
          }

          .anime-grid.large {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 35px;
          }
        }
        /* ======================================== */
      `}</style>

      <motion.div
        className="anime-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-header">
          <h1 className="page-title">Anime</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Popular anime series from Japan
          </p>
        </div>

        {/* ========== ADD THIS: Grid Size Toggle ========== */}
        <GridSizeToggle
          currentSize={gridSize}
          onChange={handleGridSizeChange}
        />
        {/* ================================================= */}

        {!animeList.length ? (
          <div style={styles.noResults}>
            <p>No anime found.</p>
          </div>
        ) : (
          <>
            {/* ========== UPDATE THIS: Add gridSize class ========== */}
            <div className={`anime-grid ${gridSize}`}>
              {animeList.map((show) => (
                <TVCard key={show.id} show={show} />
              ))}
            </div>
            {/* ===================================================== */}

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} style={styles.observer}>
              {loadingMore && (
                <div style={styles.loadingMore}>
                  <div style={styles.spinnerSmall}></div>
                  <p>Loading more anime...</p>
                </div>
              )}
              {!hasMore && animeList.length > 0 && (
                <p style={styles.endMessage}>You've reached the end!</p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

const styles = {
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(229, 9, 20, 0.1)',
    borderTop: '4px solid var(--accent)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '18px',
    color: 'var(--text-secondary)',
  },
  observer: {
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
  },
  loadingMore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  spinnerSmall: {
    width: '35px',
    height: '35px',
    border: '3px solid rgba(229, 9, 20, 0.1)',
    borderTop: '3px solid var(--accent)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  endMessage: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '16px',
  },
};
