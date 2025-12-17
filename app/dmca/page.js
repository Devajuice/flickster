'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function DMCAPage() {
  return (
    <>
      <style jsx>{`
        .dmca-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 100px;
        }

        .dmca-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .dmca-title {
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

        .dmca-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .section {
          margin-bottom: 40px;
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

        .section-title {
          font-size: 24px;
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

        .notice-box {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.15) 0%,
            rgba(229, 9, 20, 0.05) 100%
          );
          border: 2px solid rgba(229, 9, 20, 0.4);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 40px;
          display: flex;
          gap: 15px;
          align-items: start;
        }

        .notice-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .list {
          list-style: none;
          padding-left: 0;
          margin: 0;
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

        .contact-card {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.1) 0%,
            rgba(26, 26, 26, 0.8) 100%
          );
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 12px;
          padding: 25px;
          margin-top: 20px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 16px;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-label {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .contact-value {
          color: var(--accent);
          font-weight: 700;
        }

        .highlight {
          color: var(--accent);
          font-weight: 600;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .step-card {
          background: rgba(229, 9, 20, 0.05);
          border: 1px solid rgba(229, 9, 20, 0.2);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          margin: 0 auto 15px;
        }

        @media (max-width: 768px) {
          .dmca-container {
            padding: 30px 15px 80px;
          }

          .dmca-title {
            font-size: 32px;
            flex-direction: column;
            gap: 10px;
          }

          .dmca-subtitle {
            font-size: 16px;
          }

          .section {
            padding: 20px;
            margin-bottom: 30px;
          }

          .section-title {
            font-size: 20px;
          }

          .notice-box {
            flex-direction: column;
            padding: 20px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <motion.div
        className="dmca-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="dmca-header">
          <h1 className="dmca-title">
            <Shield size={48} />
            DMCA Policy
          </h1>
          <p className="dmca-subtitle">
            Flixet respects intellectual property rights and complies with the
            Digital Millennium Copyright Act (DMCA). Learn how we handle
            copyright concerns.
          </p>
        </div>

        {/* Important Notice */}
        <div className="notice-box">
          <div className="notice-icon">
            <AlertTriangle size={28} color="#e50914" />
          </div>
          <div>
            <p className="section-text" style={{ marginBottom: 0 }}>
              <strong className="highlight">Important Notice:</strong> Flixet
              does not host, upload, or store any video files on our servers. We
              only provide links to content hosted on third-party platforms. All
              content is embedded from external sources.
            </p>
          </div>
        </div>

        {/* Copyright Infringement */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-header">
            <FileText size={28} color="#e50914" />
            <h2 className="section-title">Copyright Infringement Notice</h2>
          </div>
          <p className="section-text">
            Flixet respects the intellectual property rights of others and
            expects our users to do the same. We comply with the Digital
            Millennium Copyright Act (DMCA) and will respond to valid copyright
            infringement notices promptly and appropriately.
          </p>
        </motion.div>

        {/* How to File */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <Mail size={28} color="#e50914" />
            <h2 className="section-title">How to File a DMCA Notice</h2>
          </div>
          <p className="section-text">
            If you believe that your copyrighted work has been infringed, please
            provide us with a written notice containing the following
            information:
          </p>
          <ul className="list">
            <li>
              A physical or electronic signature of the copyright owner or
              authorized representative
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed
            </li>
            <li>
              The specific URL or location on our website where the allegedly
              infringing material is located
            </li>
            <li>
              Your contact information (name, address, telephone number, and
              email address)
            </li>
            <li>
              A statement that you have a good faith belief that the disputed
              use is not authorized
            </li>
            <li>
              A statement that the information in the notice is accurate and,
              under penalty of perjury, that you are authorized to act on behalf
              of the copyright owner
            </li>
          </ul>
        </motion.div>

        {/* What We Will Do */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <CheckCircle size={28} color="#e50914" />
            <h2 className="section-title">Our Response Process</h2>
          </div>
          <p className="section-text">
            Upon receiving a valid DMCA notice, we will:
          </p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <p className="section-text" style={{ marginBottom: 0 }}>
                Review the notice for validity
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <p className="section-text" style={{ marginBottom: 0 }}>
                Remove or disable access to the link
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <p className="section-text" style={{ marginBottom: 0 }}>
                Notify the user if applicable
              </p>
            </div>
          </div>
        </motion.div>

        {/* Counter-Notice */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="section-header">
            <XCircle size={28} color="#e50914" />
            <h2 className="section-title">Counter-Notice</h2>
          </div>
          <p className="section-text">
            If you believe your content was removed in error, you may file a
            counter-notice containing:
          </p>
          <ul className="list">
            <li>Your physical or electronic signature</li>
            <li>Identification of the material that was removed</li>
            <li>
              A statement under penalty of perjury that you have a good faith
              belief the material was removed by mistake
            </li>
            <li>Your contact information and consent to jurisdiction</li>
          </ul>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="section-header">
            <AlertTriangle size={28} color="#e50914" />
            <h2 className="section-title">Important Notes</h2>
          </div>
          <ul className="list">
            <li>
              We are not responsible for content hosted on third-party platforms
            </li>
            <li>
              Takedown requests should also be sent to the actual content
              hosting service
            </li>
            <li>
              False claims may result in legal liability under Section 512(f) of
              the DMCA
            </li>
            <li>
              We reserve the right to remove any content at our discretion
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header">
            <Mail size={28} color="#e50914" />
            <h2 className="section-title">Contact for DMCA Notices</h2>
          </div>
          <p className="section-text">
            Please send all DMCA notices and counter-notices to our designated
            copyright agent:
          </p>
          <div className="contact-card">
            <div className="contact-item">
              <Mail size={20} color="#e50914" />
              <span className="contact-label">Email:</span>
              <span className="contact-value">devajuice@zohomail.in</span>
            </div>
            <div className="contact-item">
              <FileText size={20} color="#e50914" />
              <span className="contact-label">Subject Line:</span>
              <span className="contact-value">"DMCA Takedown Request"</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
