'use client';
import TVCard from './TVCard';

export default function TVGrid({ shows }) {
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
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 15px 0;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            padding: 12px 0;
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
        {Array.isArray(shows) && shows.length > 0 ? (
          shows.map((show) => <TVCard key={show.id} show={show} />)
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            No TV shows available
          </div>
        )}
      </div>
    </>
  );
}
