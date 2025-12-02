'use client';
import { useState, useEffect } from 'react';
import TVGrid from '@/components/TVGrid';
import { motion } from 'framer-motion';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function TVPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setShows(data.results || []);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading TV shows...</p>
      </div>
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

        .tv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        @media (max-width: 768px) {
          .tv-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 400px) {
          .tv-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 30px;
          }
        }

        @media (min-width: 1200px) {
          .tv-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 35px;
          }
        }
      `}</style>

      <motion.div
        style={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={styles.title}>Popular TV Shows</h1>
        <TVGrid shows={shows} />
      </motion.div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    background: 'linear-gradient(to right, #e50914, #f40612)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
};
