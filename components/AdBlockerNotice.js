'use client';

import { Shield, AlertTriangle, CheckCircle, X, Zap } from 'lucide-react';
import { useState } from 'react';

export default function AdBlockerNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        .notice-container {
          margin-bottom: 30px;
          animation: slideDown 0.4s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notice {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.1) 0%,
            rgba(26, 26, 26, 0.8) 100%
          );
          border: 2px solid rgba(229, 9, 20, 0.3);
          border-radius: 16px;
          padding: 25px;
          position: relative;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .notice-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .notice-title-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .notice-icon {
          width: 40px;
          height: 40px;
          background: rgba(229, 9, 20, 0.15);
          border: 2px solid rgba(229, 9, 20, 0.4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notice-title {
          font-size: 18px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .close-button {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .close-button:hover {
          background: rgba(229, 9, 20, 0.2);
          border-color: var(--accent);
          color: white;
          transform: rotate(90deg);
        }

        .notice-text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .tip-item:hover {
          background: rgba(26, 26, 26, 0.8);
          border-color: rgba(229, 9, 20, 0.3);
          transform: translateX(4px);
        }

        .tip-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tip-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .warning-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255, 152, 0, 0.1);
          border: 1px solid rgba(255, 152, 0, 0.3);
          border-radius: 10px;
          padding: 15px;
          margin-top: 15px;
        }

        .warning-icon {
          flex-shrink: 0;
          color: #ff9800;
        }

        .warning-text {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        .warning-text strong {
          color: #ff9800;
          font-weight: 700;
        }

        .recommendation-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(76, 175, 80, 0.15);
          border: 1px solid rgba(76, 175, 80, 0.3);
          color: #4caf50;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-top: 15px;
        }

        @media (max-width: 768px) {
          .notice {
            padding: 20px;
          }

          .notice-title {
            font-size: 16px;
          }

          .notice-text {
            font-size: 14px;
          }

          .tips-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .tip-item {
            padding: 10px;
          }

          .tip-text {
            font-size: 13px;
          }

          .warning-box {
            padding: 12px;
          }

          .warning-text {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="notice-container">
        <div className="notice">
          {/* Header */}
          <div className="notice-header">
            <div className="notice-title-wrapper">
              <div className="notice-icon">
                <Shield size={24} color="#e50914" />
              </div>
              <h3 className="notice-title">Safe Viewing Tips</h3>
            </div>
            <button
              className="close-button"
              onClick={() => setIsVisible(false)}
              aria-label="Close notice"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Text */}
          <p className="notice-text">
            We use free streaming services which may show ads. Follow these tips
            for a better and safer viewing experience:
          </p>

          {/* Tips Grid */}
          <div className="tips-grid">
            <div className="tip-item">
              <CheckCircle size={20} className="tip-icon" color="#4caf50" />
              <p className="tip-text">
                Use an ad-blocker browser extension (uBlock Origin recommended)
              </p>
            </div>

            <div className="tip-item">
              <CheckCircle size={20} className="tip-icon" color="#4caf50" />
              <p className="tip-text">
                Try different servers if one has too many ads
              </p>
            </div>

            <div className="tip-item">
              <CheckCircle size={20} className="tip-icon" color="#4caf50" />
              <p className="tip-text">
                Close any pop-ups that may appear immediately
              </p>
            </div>

            <div className="tip-item">
              <CheckCircle size={20} className="tip-icon" color="#4caf50" />
              <p className="tip-text">
                Never enter personal information on pop-ups
              </p>
            </div>
          </div>

          {/* Warning Box */}
          <div className="warning-box">
            <AlertTriangle size={22} className="warning-icon" />
            <p className="warning-text">
              <strong>Important:</strong> Never download anything from pop-ups
              or provide credit card information. Our service is completely
              free.
            </p>
          </div>

          {/* Recommendation Badge */}
          <div className="recommendation-badge">
            <Zap size={16} />
            Recommended: Use Brave Browser or uBlock Origin
          </div>
        </div>
      </div>
    </>
  );
}
