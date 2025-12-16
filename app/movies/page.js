'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import ComingSoon from '@/components/ComingSoon';
import AdvancedFilters from '@/components/AdvancedFilters';
import { motion } from 'framer-motion';

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

  const observerTarget = useRef(null);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMovies(1, true, filters);
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
      // Build URL with filters
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

      // Add filters to URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          url += `&${key}=${value}`;
        }
      });

      // Add genre from URL params if present
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

      // Default sort if not specified
      if (!filters.sort_by) {
        url += '&sort_by=popularity.desc';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (reset) {
        setMovies(data.results || []);
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
          <p>Loading movies...</p>
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

        /* ========== FIXED MOVIE GRID ========== */
        .movie-grid {
          display: grid !important;
          grid-template-columns: repeat(
            auto-fill,
            minmax(180px, 1fr)
          ) !important;
          gap: 20px !important;
          margin-bottom: 40px !important;
        }

        /* ========== SIMPLIFIED FILTER TOOLBAR ========== */
        .filters-toolbar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 40px;
          padding: 15px 20px;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 60px;
        }

        @media (min-width: 769px) {
          .filters-toolbar {
            padding: 18px 24px;
            min-height: 64px;
          }
        }

        @media (max-width: 768px) {
          .filters-toolbar {
            padding: 15px;
          }

          .movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .filters-toolbar {
            padding: 12px;
          }

          .movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        /* ============================================== */
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.container}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>{getGenreTitle()}</h1>
          {genreParam && (
            <p style={styles.subtitle}>
              Browse our collection of {genreParam.replace('-', ' ')} movies
            </p>
          )}
        </div>

        {!genreParam && (
          <div style={{ marginBottom: '50px' }}>
            <ComingSoon type="movie" />
          </div>
        )}

        {/* ========== SIMPLIFIED: Just Filters ========== */}
        <div className="filters-toolbar">
          <AdvancedFilters
            type="movie"
            onFilterChange={handleFilterChange}
            initialFilters={activeFilters}
          />
        </div>
        {/* ============================================== */}

        {!Array.isArray(movies) || movies.length === 0 ? (
          <div style={styles.noResults}>
            <p>No movies found with these filters.</p>
          </div>
        ) : (
          <>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div ref={observerTarget} style={styles.observer}>
              {loadingMore && (
                <div style={styles.loadingMore}>
                  <div style={styles.spinnerSmall}></div>
                  <p>Loading more movies...</p>
                </div>
              )}
              {!hasMore && movies.length > 0 && (
                <p style={styles.endMessage}>You've reached the end!</p>
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
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    background: 'linear-gradient(to right, #e50914, #f40612)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
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
