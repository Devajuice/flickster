'use client';

import { useContinueWatching } from '@/context/ContinueWatchingContext';
import ContinueWatchingCard from './ContinueWatchingCard';

export default function ContinueWatchingSection() {
  const { continueWatching } = useContinueWatching();

  if (continueWatching.length === 0) {
    return null; // Don't show section if empty
  }

  return (
    <section className="continue-watching-section">
      <div className="section-header">
        <h2>Continue Watching</h2>
        <p className="subtitle">Pick up where you left off</p>
      </div>

      <div className="cards-grid">
        {continueWatching.map((item) => (
          <ContinueWatchingCard 
            key={`${item.type}-${item.id}-${item.season}-${item.episode}`} 
            item={item} 
          />
        ))}
      </div>

      <style jsx>{`
        .continue-watching-section {
          margin: 40px 0;
        }

        .section-header {
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .subtitle {
          font-size: 14px;
          color: #888;
          margin: 0;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
