'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

export default function AdvancedFilters({
  type = 'movie',
  onFilterChange,
  initialFilters = {},
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sort_by: 'popularity.desc',
    with_genres: '',
    ...initialFilters,
  });

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'primary_release_date.desc', label: 'Newest First' },
    { value: 'primary_release_date.asc', label: 'Oldest First' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' },
  ];

  const genres =
    type === 'movie'
      ? [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
          { id: 35, name: 'Comedy' },
          { id: 80, name: 'Crime' },
          { id: 99, name: 'Documentary' },
          { id: 18, name: 'Drama' },
          { id: 10751, name: 'Family' },
          { id: 14, name: 'Fantasy' },
          { id: 36, name: 'History' },
          { id: 27, name: 'Horror' },
          { id: 10402, name: 'Music' },
          { id: 9648, name: 'Mystery' },
          { id: 10749, name: 'Romance' },
          { id: 878, name: 'Science Fiction' },
          { id: 10770, name: 'TV Movie' },
          { id: 53, name: 'Thriller' },
          { id: 10752, name: 'War' },
          { id: 37, name: 'Western' },
        ]
      : [
          { id: 10759, name: 'Action & Adventure' },
          { id: 16, name: 'Animation' },
          { id: 35, name: 'Comedy' },
          { id: 80, name: 'Crime' },
          { id: 99, name: 'Documentary' },
          { id: 18, name: 'Drama' },
          { id: 10751, name: 'Family' },
          { id: 10762, name: 'Kids' },
          { id: 9648, name: 'Mystery' },
          { id: 10763, name: 'News' },
          { id: 10764, name: 'Reality' },
          { id: 10765, name: 'Sci-Fi & Fantasy' },
          { id: 10766, name: 'Soap' },
          { id: 10767, name: 'Talk' },
          { id: 10768, name: 'War & Politics' },
          { id: 37, name: 'Western' },
        ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    // Remove empty filters
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    onFilterChange(cleanFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      sort_by: 'popularity.desc',
      with_genres: '',
    };
    setFilters(defaultFilters);
    onFilterChange({ sort_by: 'popularity.desc' });
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v && v !== 'popularity.desc'
  ).length;

  return (
    <>
      <style jsx>{`
        .filter-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--card-bg);
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 600;
        }

        .filter-button:hover {
          background: rgba(229, 9, 20, 0.1);
          border-color: var(--accent);
        }

        .filter-badge {
          background: var(--accent);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
        }

        .filter-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99998;
          padding: 20px;
          backdrop-filter: blur(4px);
        }

        .filter-content {
          background: var(--secondary-bg);
          border-radius: 12px;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 30px;
          border: 1px solid rgba(229, 9, 20, 0.3);
          position: relative;
          z-index: 99999;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .filter-title {
          font-size: 24px;
          font-weight: bold;
          color: var(--accent);
        }

        .close-button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 5px;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          color: var(--accent);
          transform: rotate(90deg);
        }

        .filter-section {
          margin-bottom: 25px;
        }

        .filter-label {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
          display: block;
        }

        .filter-select {
          width: 100%;
          padding: 12px 16px;
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 15px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .genre-chip {
          padding: 8px 12px;
          background: var(--card-bg);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .genre-chip:hover {
          border-color: var(--accent);
          background: rgba(229, 9, 20, 0.1);
        }

        .genre-chip.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          font-weight: 600;
        }

        .filter-actions {
          display: flex;
          gap: 12px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-apply {
          flex: 1;
          padding: 12px 24px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-apply:hover {
          background: #c20812;
          transform: translateY(-2px);
        }

        .btn-reset {
          flex: 1;
          padding: 12px 24px;
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-reset:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .filter-modal {
            padding: 10px;
          }

          .filter-content {
            padding: 20px 15px;
            max-width: 95%;
            max-height: 90vh;
          }

          .filter-header {
            margin-bottom: 20px;
          }

          .filter-title {
            font-size: 20px;
          }

          .filter-section {
            margin-bottom: 20px;
          }

          .filter-label {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .filter-select {
            padding: 10px 14px;
            font-size: 14px;
          }

          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .genre-chip {
            font-size: 12px;
            padding: 7px 10px;
          }

          .filter-actions {
            margin-top: 20px;
            padding-top: 15px;
            gap: 10px;
          }

          .btn-apply,
          .btn-reset {
            padding: 11px 20px;
            font-size: 14px;
          }
        }

        /* Extra small screens */
        @media (max-width: 400px) {
          .filter-content {
            padding: 15px 12px;
          }

          .filter-title {
            font-size: 18px;
          }

          .filter-section {
            margin-bottom: 18px;
          }

          .filter-label {
            font-size: 15px;
          }

          .filter-grid {
            gap: 6px;
          }

          .genre-chip {
            font-size: 11px;
            padding: 6px 8px;
            border-width: 1.5px;
          }
        }
      `}</style>

      {/* Filter Button */}
      <button className="filter-button" onClick={() => setShowFilters(true)}>
        <SlidersHorizontal size={18} />
        Filters
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="filter-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              className="filter-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="filter-header">
                <h2 className="filter-title">Advanced Filters</h2>
                <button
                  className="close-button"
                  onClick={() => setShowFilters(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sort By */}
              <div className="filter-section">
                <label className="filter-label">Sort By</label>
                <select
                  className="filter-select"
                  value={filters.sort_by}
                  onChange={(e) =>
                    handleFilterChange('sort_by', e.target.value)
                  }
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Genres */}
              <div className="filter-section">
                <label className="filter-label">Genres</label>
                <div className="filter-grid">
                  {genres.map((genre) => {
                    const isActive = filters.with_genres.includes(
                      genre.id.toString()
                    );
                    return (
                      <div
                        key={genre.id}
                        className={`genre-chip ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          const currentGenres = filters.with_genres
                            .split(',')
                            .filter(Boolean);
                          const genreId = genre.id.toString();

                          const newGenres = isActive
                            ? currentGenres.filter((g) => g !== genreId)
                            : [...currentGenres, genreId];

                          handleFilterChange(
                            'with_genres',
                            newGenres.join(',')
                          );
                        }}
                      >
                        {genre.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="filter-actions">
                <button className="btn-reset" onClick={resetFilters}>
                  Reset All
                </button>
                <button className="btn-apply" onClick={applyFilters}>
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
