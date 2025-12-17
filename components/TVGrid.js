'use client';
import TVCard from './TVCard';

export default function TVGrid({ shows = [] }) {
  if (!shows || !Array.isArray(shows)) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No TV shows available
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No TV shows found
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
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
      `}</style>

      <div className="grid">
        {shows.map((show) => (
          <TVCard key={show.id} show={show} />
        ))}
      </div>
    </>
  );
}
