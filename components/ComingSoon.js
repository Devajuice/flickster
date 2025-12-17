'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Star, Play, Sparkles } from 'lucide-react';

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
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
      } else {
        url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch coming soon items');
      }

      const data = await response.json();
      setItems(data.results?.slice(0, 12) || []);
    } catch (error) {
      console.error('Error fetching coming soon:', error);
      setItems([]);
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
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return null;
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

        @keyframes shimmer {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        .coming-soon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
        }

        .coming-soon-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .coming-soon-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(229, 9, 20, 0.5);
        }

        .coming-soon-card:hover .poster-image {
          transform: scale(1.08);
        }

        .coming-soon-card:hover .hover-overlay {
          opacity: 1;
        }

        .coming-soon-card:hover .badge {
          background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
          animation: shimmer 1.5s ease-in-out infinite;
        }

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
          <Sparkles
            size={24}
            style={{
              display: 'inline',
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          Coming Soon • {type === 'movie' ? 'Movies' : 'TV Shows'}
        </h2>
        <Link
          href={type === 'movie' ? '/coming-soon/movies' : '/coming-soon/tv'}
        >
          <motion.span
            style={styles.viewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All →
          </motion.span>
        </Link>
      </div>

      <div className="coming-soon-grid">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
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
                    loading="lazy"
                  />

                  {/* Coming Soon Badge */}
                  <div style={styles.badge} className="badge">
                    <Sparkles size={10} style={{ marginRight: '4px' }} />
                    Coming Soon
                  </div>

                  {/* Hover Overlay */}
                  <div style={styles.overlay} className="hover-overlay">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play size={48} fill="white" strokeWidth={0} />
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div style={styles.info}>
                  <h3 style={styles.itemTitle}>{item.title || item.name}</h3>

                  <div style={styles.meta}>
                    <div style={styles.metaItem}>
                      <Calendar size={13} style={{ flexShrink: 0 }} />
                      <span>
                        {formatDate(item.release_date || item.first_air_date)}
                      </span>
                    </div>
                    {item.vote_average > 0 && (
                      <div style={styles.metaItem}>
                        <Star
                          size={13}
                          fill="#ffd700"
                          color="#ffd700"
                          style={{ flexShrink: 0 }}
                        />
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
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #e50914 0%, #f40612 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
  },
  viewAll: {
    color: 'var(--accent)',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
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
    borderRadius: '12px',
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
    transition: 'transform 0.4s ease',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(229, 9, 20, 0.6)',
    transition: 'all 0.3s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(135deg, rgba(229, 9, 20, 0.85) 0%, rgba(0, 0, 0, 0.85) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  info: {
    padding: '14px',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.4',
    minHeight: '40px',
    color: 'var(--text-primary)',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--text-secondary)',
  },
};
