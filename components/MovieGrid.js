'use client';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies = [] }) {
  // Safety check
  if (!movies || !Array.isArray(movies)) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No movies available
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
        }}
      >
        No movies found
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
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
