'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function TVShowCard({ show }) {
  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : '/placeholder.png';

  return (
    <Link href={`/tv/${show.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
        style={styles.card}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div style={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={show.name}
            style={styles.image}
            loading="lazy"
          />
          <div style={styles.overlay}>
            <div style={styles.rating}>
              <Star size={16} fill="#ffd700" color="#ffd700" />
              <span>{show.vote_average?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div style={styles.info}>
          <h3 style={styles.title}>{show.name}</h3>
          <p style={styles.date}>
            {show.first_air_date
              ? new Date(show.first_air_date).getFullYear()
              : 'N/A'}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '150%', // 2:3 aspect ratio for posters
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.9) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '15px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  info: {
    padding: '15px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: 'var(--text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  date: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
};
