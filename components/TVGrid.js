'use client';
import TVCard from './TVCard';

export default function TVGrid({ shows, gridSize = 'medium' }) {
  // ← ADD gridSize prop
  return (
    <>
      <style jsx>{`
        .grid {
          display: grid;
          padding: 20px 0;
        }

        /* ========== ADD GRID SIZE VARIANTS ========== */
        /* Small Grid */
        .grid.small {
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 15px;
        }

        /* Medium Grid (Default) */
        .grid.medium {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        /* Large Grid */
        .grid.large {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
        }
        /* =========================================== */

        @media (max-width: 768px) {
          .grid.small,
          .grid.medium,
          .grid.large {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
            padding: 15px 0;
          }
        }

        @media (max-width: 480px) {
          .grid.small,
          .grid.medium,
          .grid.large {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
            padding: 12px 0;
          }
        }

        @media (min-width: 1200px) {
          .grid.small {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 18px;
          }

          .grid.medium {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 25px;
          }

          .grid.large {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 35px;
          }
        }
      `}</style>

      {/* ========== UPDATE: Add gridSize className ========== */}
      <div className={`grid ${gridSize}`}>
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
