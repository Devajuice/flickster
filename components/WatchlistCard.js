'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Film, Tv } from 'lucide-react';

export default function WatchlistCard({ item, onRemove }) {
  // Calculate path HERE in this component
  const href = `/${item.type === 'movie' ? 'movie' : 'tv'}/${item.id}`;

  console.log('Card rendered:', item.title || item.name, '→', href);

  return (
    <Link href={href} prefetch={false}>
      <motion.div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(229, 9, 20, 0.4)' }}
      >
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : '/placeholder.png'
          }
          alt={item.title || item.name}
          style={{
            width: '100%',
            aspectRatio: '2/3',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '5px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            zIndex: 2,
          }}
        >
          {item.type === 'movie' ? <Film size={14} /> : <Tv size={14} />}
          {item.type === 'movie' ? 'Movie' : 'TV Show'}
        </div>

        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '8px',
            backgroundColor: 'rgba(229, 9, 20, 0.9)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.id, item.type);
          }}
        >
          <Trash2 size={16} />
        </button>

        <div style={{ padding: '12px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.title || item.name}
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: 'var(--text-secondary)',
            }}
          >
            <span>⭐ {item.vote_average?.toFixed(1) || 'N/A'}</span>
            <span>
              {item.release_date?.split('-')[0] ||
                item.first_air_date?.split('-')[0] ||
                'N/A'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
