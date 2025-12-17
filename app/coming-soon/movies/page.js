'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Film, Sparkles } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function ComingSoonMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const observerTarget = useRef(null);

  useEffect(() => {
    fetchMovies(1, true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchMovies(currentPage + 1, false);
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

  const fetchMovies = async (page, reset = false) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}&region=US`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch upcoming movies');
      }

      const data = await response.json();

      if (reset && data.dates) {
        setDateRange({
          start: data.dates.minimum,
          end: data.dates.maximum,
        });
      }

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
      console.error('Error fetching upcoming movies:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
          <p>Loading upcoming movies...</p>
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

        .movie-grid,
        .tv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        /* Tablet breakpoint */
        @media (max-width: 1024px) {
          .movie-grid,
          .tv-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
          }
        }

        /* Mobile breakpoint */
        @media (max-width: 768px) {
          .movie-grid,
          .tv-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .movie-grid,
          .tv-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px;
          }
        }

        .stats-card {
          background: rgba(26, 26, 26, 0.95);
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          margin-top: 0;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .stats-card {
            padding: 15px;
            margin-bottom: 25px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>

      <motion.div
        style={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 style={styles.title}>
                <Sparkles
                  size={36}
                  style={{ display: 'inline', marginRight: '10px' }}
                />
                Upcoming Movies
              </h1>
              <p style={styles.subtitle}>
                New releases coming to theaters near you
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Card */}
        {(totalResults > 0 || dateRange.start) && (
          <motion.div
            className="stats-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stats-grid">
              {totalResults > 0 && (
                <div className="stat-item">
                  <Film size={24} style={{ color: 'var(--accent)' }} />
                  <div>
                    <p style={styles.statLabel}>Total Upcoming</p>
                    <p style={styles.statValue}>{totalResults} Movies</p>
                  </div>
                </div>
              )}

              {dateRange.start && dateRange.end && (
                <div className="stat-item">
                  <Calendar size={24} style={{ color: 'var(--accent)' }} />
                  <div>
                    <p style={styles.statLabel}>Release Period</p>
                    <p style={styles.statValue}>
                      {formatDate(dateRange.start)} -{' '}
                      {formatDate(dateRange.end)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Movies Grid */}
        {movies.length === 0 ? (
          <div style={styles.noResults}>
            <Film
              size={64}
              style={{ color: 'var(--text-secondary)', opacity: 0.3 }}
            />
            <p style={styles.noResultsText}>No upcoming movies found</p>
            <Link href="/movies">
              <button style={styles.backButton}>Browse All Movies</button>
            </Link>
          </div>
        ) : (
          <>
            {/* ✅ REMOVED INDIVIDUAL CARD ANIMATIONS */}
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} style={styles.observer}>
              {loadingMore && (
                <div style={styles.loadingMore}>
                  <div style={styles.spinnerSmall}></div>
                  <p style={styles.loadingText}>Loading more movies...</p>
                </div>
              )}
              {!hasMore && movies.length > 0 && (
                <div style={styles.endSection}>
                  <p style={styles.endMessage}>You've reached the end!</p>
                  <Link href="/movies">
                    <button style={styles.browseButton}>
                      <Film size={18} />
                      Browse All Movies
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    paddingBottom: '100px',
  },
  header: {
    marginBottom: '20px',
  },
  headerContent: {
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #e50914 0%, #f40612 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    marginBottom: '0',
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  statValue: {
    fontSize: '16px',
    color: 'var(--text-primary)',
    fontWeight: '700',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '20px',
  },
  noResultsText: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  backButton: {
    padding: '12px 30px',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  observer: {
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
    gap: '20px',
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
  loadingText: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    fontWeight: '500',
  },
  endSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  endMessage: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '16px',
    fontWeight: '500',
  },
  browseButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: 'var(--accent)',
    border: '2px solid var(--accent)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
