'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Star, Play } from 'lucide-react';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function ComingSoon({ type = 'movie' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComingSoon();
  }, [type]);

  const fetchComingSoon = async () => {
    setLoading(true);
    try {
      let url;
      if (type === 'movie') {
        // Upcoming movies
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
      } else {
        // On The Air TV shows (airing soon)
        url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setItems(data.results?.slice(0, 10) || []);
    } catch (error) {
      console.error('Error fetching coming soon:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .coming-soon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        /* ========== ADD THESE HOVER STYLES ========== */
        .coming-soon-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .coming-soon-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(229, 9, 20, 0.4);
        }

        .coming-soon-card:hover .poster-image {
          transform: scale(1.05);
        }

        .coming-soon-card:hover .hover-overlay {
          opacity: 1;
        }
        /* =========================================== */

        @media (max-width: 768px) {
          .coming-soon-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .coming-soon-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
      `}</style>

      <div style={styles.header}>
        <h2 style={styles.title}>
          Coming Soon • {type === 'movie' ? 'Movies' : 'TV Shows'}
        </h2>
        <Link
          href={type === 'movie' ? '/coming-soon/movies' : '/coming-soon/tv'}
        >
          <span style={styles.viewAll}>View All →</span>
        </Link>
      </div>

      <div className="coming-soon-grid">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`}
              style={styles.cardLink}
            >
              <div style={styles.card} className="coming-soon-card">
                {/* Poster */}
                <div style={styles.posterContainer}>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/placeholder.png'
                    }
                    alt={item.title || item.name}
                    style={styles.poster}
                    className="poster-image"
                  />

                  {/* Coming Soon Badge */}
                  <div style={styles.badge}>Coming Soon</div>

                  {/* Hover Overlay */}
                  <div style={styles.overlay} className="hover-overlay">
                    <Play size={40} fill="white" />
                  </div>
                </div>

                {/* Info */}
                <div style={styles.info}>
                  <h3 style={styles.itemTitle}>{item.title || item.name}</h3>

                  <div style={styles.meta}>
                    <div style={styles.metaItem}>
                      <Calendar size={14} />
                      <span>
                        {formatDate(item.release_date || item.first_air_date)}
                      </span>
                    </div>
                    {item.vote_average > 0 && (
                      <div style={styles.metaItem}>
                        <Star size={14} fill="#ffd700" color="#ffd700" />
                        <span>{item.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '60px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #e50914, #f40612)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  viewAll: {
    color: 'var(--accent)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(229, 9, 20, 0.1)',
    borderTop: '4px solid var(--accent)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  posterContainer: {
    position: 'relative',
    aspectRatio: '2/3',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  info: {
    padding: '12px',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3',
    minHeight: '36px',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
};
