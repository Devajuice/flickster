'use client';

import Link from 'next/link';
import { X, Play } from 'lucide-react';
import { useContinueWatching } from '@/context/ContinueWatchingContext';

export default function ContinueWatchingCard({ item }) {
  const { removeFromContinueWatching } = useContinueWatching();

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromContinueWatching(item.id, item.type);
  };

  // Format episode info for TV shows
  const getEpisodeInfo = () => {
    if (item.type === 'tv' && item.season && item.episode) {
      return `S${item.season} E${item.episode}`;
    }
    return null;
  };

  const imageUrl = item.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    : item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : '/placeholder.jpg';

  const linkUrl =
    item.type === 'tv'
      ? `/tv/${item.id}?season=${item.season}&episode=${item.episode}`
      : `/movie/${item.id}`;

  return (
    <Link href={linkUrl} className="continue-watching-card">
      <div className="card-container">
        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="remove-btn"
          aria-label="Remove from continue watching"
        >
          <X size={16} />
        </button>

        {/* Thumbnail */}
        <div className="thumbnail">
          <img src={imageUrl} alt={item.title || item.name} />

          {/* Play Overlay */}
          <div className="play-overlay">
            <Play size={40} fill="white" />
          </div>
        </div>

        {/* Content Info */}
        <div className="card-info">
          <h3 className="title">{item.title || item.name}</h3>
          {getEpisodeInfo() && (
            <p className="episode-info">{getEpisodeInfo()}</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .continue-watching-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .card-container {
          position: relative;
          background: #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .remove-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          opacity: 0;
          transition: opacity 0.2s, background 0.2s;
        }

        .card-container:hover .remove-btn {
          opacity: 1;
        }

        .remove-btn:hover {
          background: rgba(255, 0, 0, 0.8);
        }

        .thumbnail {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #2a2a2a;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .card-container:hover .play-overlay {
          opacity: 0.9;
        }

        .card-info {
          padding: 12px;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
        }

        .episode-info {
          font-size: 13px;
          color: #aaa;
          margin: 0;
          font-weight: 500;
        }
      `}</style>
    </Link>
  );
}
