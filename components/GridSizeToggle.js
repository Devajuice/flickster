'use client';

import { LayoutGrid, Grid3x3, Grid2x2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GridSizeToggle({ currentSize, onChange }) {
  const sizes = [
    { id: 'small', icon: Grid3x3, label: 'Small' },
    { id: 'medium', icon: LayoutGrid, label: 'Medium' },
    { id: 'large', icon: Grid2x2, label: 'Large' },
  ];

  return (
    <>
      <style jsx>{`
        .grid-toggle-button {
          transition: all 0.2s ease;
        }

        .grid-toggle-button:hover {
          background-color: rgba(229, 9, 20, 0.2);
        }

        /* ========== UPDATED: Hide on mobile ========== */
        @media (max-width: 768px) {
          .grid-size-toggle-wrapper {
            display: none !important;
          }
        }
        /* ============================================== */
      `}</style>

      {/* ========== ADD className HERE ========== */}
      <div style={styles.container} className="grid-size-toggle-wrapper">
        <span style={styles.label}>Grid Size:</span>
        <div style={styles.buttonGroup}>
          {sizes.map((size) => {
            const Icon = size.icon;
            const isActive = currentSize === size.id;

            return (
              <motion.button
                key={size.id}
                onClick={() => onChange(size.id)}
                style={{
                  ...styles.button,
                  ...(isActive ? styles.buttonActive : {}),
                }}
                className="grid-toggle-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={size.label}
              >
                <Icon size={20} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'var(--card-bg)',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: 'var(--accent)',
    color: 'white',
  },
};
