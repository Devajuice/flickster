'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Eye,
  Cookie,
  Lock,
  Users,
  FileText,
  Mail,
  AlertCircle,
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <>
      <style jsx>{`
        .privacy-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 100px;
        }

        .privacy-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .privacy-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #e50914 0%, #f40612 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .last-updated {
          font-size: 14px;
          color: var(--text-secondary);
          background: rgba(229, 9, 20, 0.1);
          padding: 8px 20px;
          border-radius: 20px;
          display: inline-block;
          border: 1px solid rgba(229, 9, 20, 0.2);
        }

        .privacy-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 15px auto 0;
          line-height: 1.6;
        }

        .section {
          margin-bottom: 35px;
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 30px;
          backdrop-filter: blur(10px);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .section-number {
          width: 35px;
          height: 35px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          flex-shrink: 0;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .section-text {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 15px;
        }

        .list {
          list-style: none;
          padding-left: 0;
          margin: 15px 0;
        }

        .list li {
          padding: 12px 0 12px 35px;
          position: relative;
          color: var(--text-secondary);
          line-height: 1.7;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .list li:last-child {
          border-bottom: none;
        }

        .list li:before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
          font-size: 18px;
        }

        .highlight-box {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.1) 0%,
            rgba(26, 26, 26, 0.6) 100%
          );
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .contact-card {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.15) 0%,
            rgba(26, 26, 26, 0.8) 100%
          );
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 12px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 15px;
        }

        .contact-icon {
          flex-shrink: 0;
        }

        .contact-email {
          color: var(--accent);
          font-weight: 700;
          font-size: 18px;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin: 15px 0;
        }

        .service-item {
          background: rgba(229, 9, 20, 0.05);
          border: 1px solid rgba(229, 9, 20, 0.2);
          border-radius: 8px;
          padding: 15px;
        }

        .service-name {
          color: var(--accent);
          font-weight: 700;
          margin-bottom: 5px;
        }

        .service-desc {
          color: var(--text-secondary);
          font-size: 14px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .privacy-container {
            padding: 30px 15px 80px;
          }

          .privacy-title {
            font-size: 32px;
            flex-direction: column;
            gap: 10px;
          }

          .privacy-subtitle {
            font-size: 16px;
          }

          .section {
            padding: 20px;
            margin-bottom: 25px;
          }

          .section-title {
            font-size: 18px;
          }

          .service-grid {
            grid-template-columns: 1fr;
          }

          .contact-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <motion.div
        className="privacy-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="privacy-header">
          <h1 className="privacy-title">
            <Shield size={48} />
            Privacy Policy
          </h1>
          <p className="last-updated">Last Updated: December 16, 2025</p>
          <p className="privacy-subtitle">
            Your privacy matters to us. Learn how we handle information and
            protect your data while using Flixet.
          </p>
        </div>

        {/* Section 1 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-header">
            <div className="section-number">1</div>
            <Eye size={24} color="#e50914" />
            <h2 className="section-title">Information We Collect</h2>
          </div>
          <p className="section-text">
            Flixet does not collect personal information from users. However, we
            may collect:
          </p>
          <ul className="list">
            <li>
              Anonymous usage data (page views, browser type, device type)
            </li>
            <li>Non-personal technical information (IP address, cookies)</li>
            <li>
              Information from third-party embed services you interact with
            </li>
          </ul>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="section-header">
            <div className="section-number">2</div>
            <FileText size={24} color="#e50914" />
            <h2 className="section-title">How We Use Information</h2>
          </div>
          <p className="section-text">
            Any non-personal information collected may be used to:
          </p>
          <ul className="list">
            <li>Improve website functionality and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Maintain and optimize website performance</li>
          </ul>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <div className="section-number">3</div>
            <Users size={24} color="#e50914" />
            <h2 className="section-title">Third-Party Services</h2>
          </div>
          <p className="section-text">
            Our website uses third-party services including:
          </p>
          <div className="service-grid">
            <div className="service-item">
              <div className="service-name">TMDb API</div>
              <p className="service-desc">For movie and TV show information</p>
            </div>
            <div className="service-item">
              <div className="service-name">Video Embed Services</div>
              <p className="service-desc">
                For streaming content (VidSrc, 2Embed, etc.)
              </p>
            </div>
          </div>
          <div className="highlight-box">
            <p className="section-text" style={{ marginBottom: 0 }}>
              <strong>⚠️ Important:</strong> These services may have their own
              privacy policies and cookies. We are not responsible for the
              privacy practices of these third-party services.
            </p>
          </div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="section-header">
            <div className="section-number">4</div>
            <Cookie size={24} color="#e50914" />
            <h2 className="section-title">Cookies</h2>
          </div>
          <p className="section-text">
            We may use cookies to enhance user experience. Third-party embed
            services may also set their own cookies. You can disable cookies in
            your browser settings, but this may affect website functionality.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <div className="section-number">5</div>
            <Lock size={24} color="#e50914" />
            <h2 className="section-title">Data Security</h2>
          </div>
          <p className="section-text">
            Since we do not collect personal information, there is no personal
            data stored on our servers. However, we cannot guarantee the
            security of data transmitted to third-party services.
          </p>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="section-header">
            <div className="section-number">6</div>
            <AlertCircle size={24} color="#e50914" />
            <h2 className="section-title">Children's Privacy</h2>
          </div>
          <div className="highlight-box">
            <p className="section-text" style={{ marginBottom: 0 }}>
              Our website is not intended for children under 18. We do not
              knowingly collect information from minors. If you are under 18,
              please do not use this website without parental supervision.
            </p>
          </div>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <div className="section-number">7</div>
            <FileText size={24} color="#e50914" />
            <h2 className="section-title">Changes to Privacy Policy</h2>
          </div>
          <p className="section-text">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. We encourage you
            to review this policy periodically.
          </p>
        </motion.div>

        {/* Section 8 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="section-header">
            <div className="section-number">8</div>
            <Shield size={24} color="#e50914" />
            <h2 className="section-title">Your Rights</h2>
          </div>
          <p className="section-text">
            Since we don't collect personal data, there is no personal
            information to access, modify, or delete. However, you can:
          </p>
          <ul className="list">
            <li>Clear your browser cookies at any time</li>
            <li>Use browser privacy modes (incognito/private browsing)</li>
            <li>Use ad-blockers and privacy extensions</li>
            <li>Opt-out of third-party tracking where available</li>
          </ul>
        </motion.div>

        {/* Section 9 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="section-header">
            <div className="section-number">9</div>
            <Mail size={24} color="#e50914" />
            <h2 className="section-title">Contact Us</h2>
          </div>
          <p className="section-text">
            If you have questions or concerns about this Privacy Policy, please
            don't hesitate to reach out:
          </p>
          <div className="contact-card">
            <div className="contact-icon">
              <Mail size={32} color="#e50914" />
            </div>
            <div>
              <p className="section-text" style={{ marginBottom: 5 }}>
                Email us at:
              </p>
              <div className="contact-email">devajuice@zohomail.in</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
