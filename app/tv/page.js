'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TVGrid from '@/components/TVGrid';
import ComingSoon from '@/components/ComingSoon';
import AdvancedFilters from '@/components/AdvancedFilters';
import { motion } from 'framer-motion';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Map TV genre slugs (from Header links) to TMDB genre IDs
const TV_GENRE_MAP = {
  'action-adventure': 10759,
  comedy: 35,
  drama: 18,
  crime: 80,
  documentary: 99,
  'sci-fi-fantasy': 10765,
  reality: 10764,
  kids: 10762,
};

function TVContent() {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get('genre');

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  const observerTarget = useRef(null);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setShows([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchShows(1, true, filters);
  };

  // Reset when genre changes
  useEffect(() => {
    setShows([]);
    setCurrentPage(1);
    setHasMore(true);
    setActiveFilters({});
    fetchShows(1, true);
  }, [genreParam]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          fetchShows(currentPage + 1, false, activeFilters);
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

  const fetchShows = async (page, reset = false, filters = {}) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      // Build URL with filters
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}`;

      // Add filters to URL (convert movie date fields to TV date fields)
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          // Convert movie date fields to TV date fields
          if (key === 'primary_release_date.gte') {
            url += `&first_air_date.gte=${value}`;
          } else if (key === 'primary_release_date.lte') {
            url += `&first_air_date.lte=${value}`;
          } else if (key === 'with_runtime_gte') {
            url += `&with_runtime.gte=${value}`;
          } else if (key === 'with_runtime_lte') {
            url += `&with_runtime.lte=${value}`;
          } else {
            url += `&${key}=${value}`;
          }
        }
      });

      // Add genre from URL params if present and no genre filter
      if (genreParam && TV_GENRE_MAP[genreParam] && !filters.with_genres) {
        url += `&with_genres=${TV_GENRE_MAP[genreParam]}`;
      }

      // Default sort if not specified
      if (!filters.sort_by) {
        url += '&sort_by=popularity.desc';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (reset) {
        setShows(data.results || []);
      } else {
        // Remove duplicates
        setShows((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const newShows = (data.results || []).filter(
            (show) => !existingIds.has(show.id)
          );
          return [...prev, ...newShows];
        });
      }

      setCurrentPage(page);
      setHasMore(page < data.total_pages && page < 500);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const getGenreTitle = () => {
    if (!genreParam) return 'Popular TV Shows';
    const name = genreParam
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return `${name} TV Shows`;
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
          <p>Loading TV shows...</p>
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

        /* ========== FIXED TV GRID ========== */
        .tv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
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

          .tv-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .filters-toolbar {
            padding: 12px;
          }

          .tv-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        /* ============================================== */
      `}</style>

      <motion.div
        style={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>{getGenreTitle()}</h1>
          {genreParam && (
            <p style={styles.subtitle}>
              Discover {genreParam.replace('-', ' ')} TV shows
            </p>
          )}
        </div>

        {!genreParam && (
          <div style={{ marginBottom: '50px' }}>
            <ComingSoon type="tv" />
          </div>
        )}

        {/* ========== SIMPLIFIED: Just Filters ========== */}
        <div className="filters-toolbar">
          <AdvancedFilters
            type="tv"
            onFilterChange={handleFilterChange}
            initialFilters={activeFilters}
          />
        </div>
        {/* ============================================== */}

        {!Array.isArray(shows) || shows.length === 0 ? (
          <div style={styles.noResults}>
            <p>No TV shows found with these filters.</p>
          </div>
        ) : (
          <>
            <TVGrid shows={shows} />

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} style={styles.observer}>
              {loadingMore && (
                <div style={styles.loadingMore}>
                  <div style={styles.spinnerSmall}></div>
                  <p>Loading more shows...</p>
                </div>
              )}
              {!hasMore && shows.length > 0 && (
                <p style={styles.endMessage}>You've reached the end!</p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default function TVPage() {
  return (
    <Suspense
      fallback={
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading TV shows...</p>
        </div>
      }
    >
      <TVContent />
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
