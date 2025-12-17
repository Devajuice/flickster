'use client';

import { motion } from 'framer-motion';
import MovieCard from '@/components/MovieCard';

export default function SearchResults({ movies }) {
  return (
    <>
      <style jsx>{`
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
      `}</style>

      <motion.div
        className="results-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </>
  );
}
