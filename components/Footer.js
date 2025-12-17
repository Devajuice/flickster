'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  Film,
  Tv,
  FileText,
  Shield,
  Mail,
  Heart,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style jsx>{`
        .footer {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(18, 18, 18, 1) 100%
          );
          border-top: 1px solid rgba(229, 9, 20, 0.2);
          padding: 60px 0 0;
          margin-top: 80px;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .disclaimer {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.15) 0%,
            rgba(26, 26, 26, 0.8) 100%
          );
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 50px;
          backdrop-filter: blur(10px);
        }

        .disclaimer-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .disclaimer-title {
          font-weight: 700;
          color: var(--accent);
          font-size: 18px;
          margin: 0;
        }

        .disclaimer-text {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin: 0;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .footer-section h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .footer-section p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .footer-links li:before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .footer-links a:hover {
          color: var(--accent);
          transform: translateX(3px);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(229, 9, 20, 0.3) 50%,
            transparent 100%
          );
          margin: 40px 0;
        }

        .footer-bottom {
          text-align: center;
          padding: 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 15px;
        }

        .made-with {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .heart-icon {
          color: var(--accent);
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .tmdb-section {
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
          backdrop-filter: blur(10px);
        }

        .tmdb-title {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 10px;
          text-align: center;
        }

        .tmdb-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .tmdb-link:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
        }

        .tmdb-disclaimer {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 10px;
          text-align: center;
          opacity: 0.7;
        }

        .contact-info {
          background: rgba(229, 9, 20, 0.05);
          border: 1px solid rgba(229, 9, 20, 0.2);
          border-radius: 8px;
          padding: 15px;
          margin-top: 15px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .contact-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 0;
            margin-top: 60px;
          }

          .footer-container {
            padding: 0 15px;
          }

          .disclaimer {
            padding: 20px;
            margin-bottom: 40px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-section h3 {
            font-size: 18px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          {/* Disclaimer */}
          <div className="disclaimer">
            <div className="disclaimer-header">
              <AlertTriangle size={24} color="#e50914" />
              <h4 className="disclaimer-title">Important Disclaimer</h4>
            </div>
            <p className="disclaimer-text">
              Flixet does not host, store, or distribute any video content. All
              videos are embedded from third-party sources. We do not claim
              ownership of any content displayed on this website. All
              trademarks, logos, and brand names are the property of their
              respective owners. If you believe any content infringes on your
              copyright, please contact us for removal.
            </p>
          </div>

          {/* Footer Content Grid */}
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <div className="section-header">
                <Film size={24} color="#e50914" />
                <h3>About Flixet</h3>
              </div>
              <p>
                Flixet is a free streaming aggregator that provides links to
                movies and TV shows from various third-party sources. We do not
                upload or host any files on our servers.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} color="#e50914" />
                  <a
                    href="mailto:devajuice@zohomail.in"
                    className="contact-link"
                  >
                    devajuice@zohomail.in
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <div className="section-header">
                <Tv size={24} color="#e50914" />
                <h3>Quick Links</h3>
              </div>
              <ul className="footer-links">
                <li>
                  <Link href="/">
                    <Film size={14} />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/movies">
                    <Film size={14} />
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/tv">
                    <Tv size={14} />
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon/movies">
                    <Film size={14} />
                    Upcoming Movies
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon/tv">
                    <Tv size={14} />
                    On The Air
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="footer-section">
              <div className="section-header">
                <Shield size={24} color="#e50914" />
                <h3>Legal</h3>
              </div>
              <ul className="footer-links">
                <li>
                  <Link href="/terms">
                    <FileText size={14} />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <Shield size={14} />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/dmca">
                    <AlertTriangle size={14} />
                    DMCA
                  </Link>
                </li>
              </ul>
              <p style={{ marginTop: '20px', fontSize: '13px' }}>
                By using this website, you agree to our Terms of Service. Users
                are responsible for complying with their local laws regarding
                online streaming.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="copyright">
              © {currentYear} Flixet. All rights reserved.
            </p>

            <div className="made-with">
              Made with <Heart size={16} className="heart-icon" /> by Flixet
              Team
            </div>

            {/* TMDb Credit */}
            <div className="tmdb-section">
              <p className="tmdb-title">Powered by</p>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="tmdb-link"
              >
                The Movie Database (TMDb)
                <ExternalLink size={14} />
              </a>
              <p className="tmdb-disclaimer">
                This product uses the TMDb API but is not endorsed or certified
                by TMDb.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
