'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import ComingSoon from '@/components/ComingSoon';
import AdvancedFilters from '@/components/AdvancedFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Sparkles, TrendingUp, X } from 'lucide-react';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

function MoviesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genreParam = searchParams.get('genre');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [totalResults, setTotalResults] = useState(0);

  const observerTarget = useRef(null);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMovies(1, true, filters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMovies(1, true, {});
  };

  // Reset when genre changes
  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    setActiveFilters({});
    fetchMovies(1, true);
  }, [genreParam]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchMovies(currentPage + 1, false, activeFilters);
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
  }, [hasMore, loading, loadingMore, currentPage, activeFilters]);

  const fetchMovies = async (page, reset = false, filters = {}) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${value}`;
        }
      });

      if (genreParam && !filters.with_genres) {
        const GENRE_MAP = {
          action: 28,
          comedy: 35,
          drama: 18,
          horror: 27,
          'sci-fi': 878,
          thriller: 53,
          romance: 10749,
          animation: 16,
        };
        if (GENRE_MAP[genreParam]) {
          url += `&with_genres=${GENRE_MAP[genreParam]}`;
        }
      }

      if (!filters.sort_by) {
        url += '&sort_by=popularity.desc';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (reset) {
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
      } else {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newMovies = (data.results || []).filter(
            (movie) => !existingIds.has(movie.id)
          );
          return [...prev, ...newMovies];
        });
      }

      setCurrentPage(page);
      setHasMore(page < data.total_pages && page < 500);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const getGenreTitle = () => {
    if (!genreParam) return 'Popular Movies';
    const genreName = genreParam
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return `${genreName} Movies`;
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

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
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Discovering amazing movies...</p>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .movie-grid {
          display: grid !important;
          grid-template-columns: repeat(
            auto-fill,
            minmax(180px, 1fr)
          ) !important;
          gap: 24px !important;
          margin-bottom: 40px !important;
          animation: fadeIn 0.5s ease-out;
        }

        .filters-section {
          margin-bottom: 35px;
        }

        .filters-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 20px 24px;
          background: linear-gradient(
            135deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(42, 42, 42, 0.6) 100%
          );
          backdrop-filter: blur(15px);
          border-radius: 16px;
          border: 1px solid rgba(229, 9, 20, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .filter-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }

        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 20px;
          font-size: 13px;
          color: #ff4458;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-tag:hover {
          background: rgba(229, 9, 20, 0.25);
          border-color: rgba(229, 9, 20, 0.5);
          transform: translateY(-1px);
        }

        .clear-filters-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid rgba(229, 9, 20, 0.5);
          border-radius: 8px;
          color: #e50914;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .clear-filters-btn:hover {
          background: rgba(229, 9, 20, 0.1);
          border-color: #e50914;
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .results-count {
          color: #e50914;
          font-weight: 700;
        }

        @media (min-width: 769px) {
          .movie-grid {
            gap: 28px !important;
          }

          .filters-toolbar {
            padding: 22px 28px;
          }
        }

        @media (max-width: 768px) {
          .filters-toolbar {
            flex-direction: column;
            align-items: stretch;
            padding: 18px;
            gap: 12px;
          }

          .movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }

          .filter-tags {
            gap: 8px;
          }

          .filter-tag {
            font-size: 12px;
            padding: 6px 12px;
          }

          .results-info {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .filters-toolbar {
            padding: 15px;
          }

          .movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }

          .filter-tag {
            font-size: 11px;
            padding: 5px 10px;
          }
        }

        .stats-bar {
          display: flex;
          gap: 20px;
          padding: 16px 20px;
          background: rgba(15, 15, 15, 0.5);
          border-radius: 12px;
          margin-bottom: 25px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .stat-value {
          color: #e50914;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .stats-bar {
            flex-direction: column;
            gap: 12px;
            padding: 14px 16px;
          }

          .stat-item {
            font-size: 13px;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.container}
      >
        {/* Enhanced Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.titleWrapper}>
            <Film size={32} color="#e50914" style={{ marginBottom: '10px' }} />
            <h1 style={styles.title}>{getGenreTitle()}</h1>
          </div>
          {genreParam && (
            <p style={styles.subtitle}>
              Explore our curated collection of {genreParam.replace('-', ' ')}{' '}
              movies
            </p>
          )}
        </motion.div>

        {/* Coming Soon Section */}
        {!genreParam && (
          <motion.div
            style={{ marginBottom: '45px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComingSoon type="movie" />
          </motion.div>
        )}

        {/* Stats Bar */}
        {totalResults > 0 && (
          <motion.div
            className="stats-bar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-item">
              <TrendingUp size={16} color="#e50914" />
              <span>
                <span className="stat-value">
                  {totalResults.toLocaleString()}
                </span>{' '}
                movies found
              </span>
            </div>
            <div className="stat-item">
              <Sparkles size={16} color="#e50914" />
              <span>
                Showing <span className="stat-value">{movies.length}</span>{' '}
                results
              </span>
            </div>
          </motion.div>
        )}

        {/* Filters Section */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="filters-toolbar">
            <AdvancedFilters
              type="movie"
              onFilterChange={handleFilterChange}
              initialFilters={activeFilters}
            />
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>

          {/* Active Filter Tags */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                className="filter-tags"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <motion.div
                      key={key}
                      className="filter-tag"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => {
                        const newFilters = { ...activeFilters };
                        delete newFilters[key];
                        handleFilterChange(newFilters);
                      }}
                    >
                      <span>
                        {key.replace(/_/g, ' ')}: {value}
                      </span>
                      <X size={14} />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Movies Grid */}
        {!Array.isArray(movies) || movies.length === 0 ? (
          <motion.div
            style={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Film size={48} color="rgba(255,255,255,0.2)" />
            <p style={styles.noResultsText}>
              No movies found with these filters.
            </p>
            <p style={styles.noResultsSubtext}>
              Try adjusting your filters or browse all movies
            </p>
            {hasActiveFilters && (
              <button style={styles.resetButton} onClick={clearAllFilters}>
                Reset Filters
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>

            {/* Loading Indicator */}
            <div ref={observerTarget} style={styles.observer}>
              {loadingMore && (
                <motion.div
                  style={styles.loadingMore}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div style={styles.spinnerSmall}></div>
                  <p>Loading more amazing movies...</p>
                </motion.div>
              )}
              {!hasMore && movies.length > 0 && (
                <motion.div
                  style={styles.endMessageWrapper}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Sparkles size={20} color="#e50914" />
                  <p style={styles.endMessage}>
                    You've explored all {movies.length} movies!
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading movies...</p>
        </div>
      }
    >
      <MoviesContent />
    </Suspense>
  );
}

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '100px',
    maxWidth: '1600px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '35px',
    textAlign: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontSize: '42px',
    fontWeight: '900',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e50914 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '17px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
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
  loadingText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '16px',
  },
  noResults: {
    textAlign: 'center',
    padding: '80px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    background: 'rgba(15, 15, 15, 0.5)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  noResultsText: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
  },
  noResultsSubtext: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },
  resetButton: {
    marginTop: '10px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #e50914 0%, #ff4458 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
  endMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  endMessage: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '16px',
    fontWeight: '500',
    margin: 0,
  },
};
