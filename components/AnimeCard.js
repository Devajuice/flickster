'use client';
import AnimeCard from './AnimeCard';

export default function AnimeGrid({ animes = [] }) {
  if (!animes || !Array.isArray(animes)) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No anime available
      </div>
    );
  }

  if (animes.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No anime found
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          padding: 20px 0;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (min-width: 1200px) {
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 25px;
          }
        }
      `}</style>

      <div className="grid">
        {animes.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </>
  );
}
