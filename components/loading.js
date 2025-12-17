'use client';

import { Film, Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 30px;
          position: relative;
          overflow: hidden;
        }

        .loading-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at center,
            rgba(229, 9, 20, 0.1) 0%,
            transparent 70%
          );
          animation: pulse 3s ease-in-out infinite;
          pointer-events: none;
        }

        .spinner-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }

        .spinner-outer {
          width: 100px;
          height: 100px;
          border: 4px solid rgba(229, 9, 20, 0.1);
          border-top: 4px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner-inner {
          width: 70px;
          height: 70px;
          border: 3px solid rgba(229, 9, 20, 0.1);
          border-bottom: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite reverse;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .film-icon {
          color: var(--accent);
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: slideUp 0.6s ease-out;
        }

        .loading-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .loading-subtext {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          margin-top: 5px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dotPulse {
          0%,
          80%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .progress-bar {
          width: 200px;
          height: 4px;
          background: rgba(229, 9, 20, 0.1);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent) 0%, #f40612 100%);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite,
            progressMove 1.5s ease-in-out infinite;
        }

        @keyframes progressMove {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .spinner-outer {
            width: 80px;
            height: 80px;
          }

          .spinner-inner {
            width: 56px;
            height: 56px;
          }

          .loading-text {
            font-size: 20px;
          }

          .loading-subtext {
            font-size: 13px;
          }

          .progress-bar {
            width: 160px;
          }
        }
      `}</style>

      <div className="loading-container">
        {/* Spinner */}
        <div className="spinner-wrapper">
          <div className="spinner-outer">
            <div className="spinner-inner">
              <Film size={32} className="film-icon" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="loading-text-container">
          <h2 className="loading-text">Loading Flixet</h2>
          <p className="loading-subtext">Please wait a moment...</p>

          {/* Animated Dots */}
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </>
  );
}
