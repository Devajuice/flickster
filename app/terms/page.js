'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Globe,
  Users,
  Copyright,
  Shield,
  AlertTriangle,
  UserX,
  Edit,
  Ban,
  Mail,
} from 'lucide-react';

export default function TermsOfService() {
  return (
    <>
      <style jsx>{`
        .terms-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 100px;
        }

        .terms-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .terms-title {
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

        .terms-subtitle {
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

        .warning-box {
          background: linear-gradient(
            135deg,
            rgba(229, 9, 20, 0.15) 0%,
            rgba(229, 9, 20, 0.05) 100%
          );
          border: 2px solid rgba(229, 9, 20, 0.4);
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          gap: 15px;
          align-items: start;
        }

        .warning-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .disclaimer-box {
          background: rgba(229, 9, 20, 0.08);
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .disclaimer-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
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

        .contact-text {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .terms-container {
            padding: 30px 15px 80px;
          }

          .terms-title {
            font-size: 32px;
            flex-direction: column;
            gap: 10px;
          }

          .terms-subtitle {
            font-size: 16px;
          }

          .section {
            padding: 20px;
            margin-bottom: 25px;
          }

          .section-title {
            font-size: 18px;
          }

          .warning-box {
            flex-direction: column;
          }

          .contact-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <motion.div
        className="terms-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="terms-header">
          <h1 className="terms-title">
            <FileText size={48} />
            Terms of Service
          </h1>
          <p className="last-updated">Last Updated: December 16, 2025</p>
          <p className="terms-subtitle">
            Please read these terms carefully before using Flixet. By accessing
            our website, you agree to be bound by these terms.
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
            <ShieldCheck size={24} color="#e50914" />
            <h2 className="section-title">Acceptance of Terms</h2>
          </div>
          <p className="section-text">
            By accessing and using Flixet ("the Website"), you accept and agree
            to be bound by the terms and provisions of this agreement. If you do
            not agree to these Terms of Service, please do not use the Website.
          </p>
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
            <Globe size={24} color="#e50914" />
            <h2 className="section-title">Description of Service</h2>
          </div>
          <p className="section-text">
            Flixet is a free online streaming aggregator that provides links to
            movies and TV shows hosted on third-party platforms. We do not host,
            upload, or store any video content on our servers.
          </p>
          <div className="warning-box">
            <div className="warning-icon">
              <AlertTriangle size={24} color="#e50914" />
            </div>
            <p className="section-text" style={{ marginBottom: 0 }}>
              <strong>Important:</strong> All content is provided by third-party
              sources. We act solely as an aggregator and directory service.
            </p>
          </div>
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
            <h2 className="section-title">Third-Party Content</h2>
          </div>
          <p className="section-text">
            All video content is embedded from third-party sources. We are not
            responsible for:
          </p>
          <ul className="list">
            <li>The availability, quality, or legality of embedded content</li>
            <li>Any advertisements displayed by third-party embed services</li>
            <li>
              Any malware, viruses, or security issues from external sources
            </li>
            <li>
              The accuracy of information provided by third-party services
            </li>
          </ul>
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
            <Shield size={24} color="#e50914" />
            <h2 className="section-title">User Responsibilities</h2>
          </div>
          <p className="section-text">
            As a user of this Website, you agree to:
          </p>
          <ul className="list">
            <li>
              Use the Website in compliance with all applicable local, state,
              national, and international laws
            </li>
            <li>Not use the Website for any illegal or unauthorized purpose</li>
            <li>
              Not attempt to gain unauthorized access to any portion of the
              Website
            </li>
            <li>Not transmit any viruses, malware, or other harmful code</li>
            <li>
              Take responsibility for your own actions and the legality of
              content you access
            </li>
            <li>
              Use ad-blockers and antivirus software when accessing third-party
              content
            </li>
          </ul>
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
            <Copyright size={24} color="#e50914" />
            <h2 className="section-title">Intellectual Property</h2>
          </div>
          <p className="section-text">
            All content, trademarks, and data on this Website are the property
            of their respective copyright holders. We respect intellectual
            property rights and expect our users to do the same. Flixet does not
            claim ownership of any content available through the Website.
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
            <ShieldCheck size={24} color="#e50914" />
            <h2 className="section-title">DMCA Compliance</h2>
          </div>
          <p className="section-text">
            We comply with the Digital Millennium Copyright Act (DMCA). If you
            believe your copyrighted work has been infringed, please contact us
            with:
          </p>
          <ul className="list">
            <li>A description of the copyrighted work</li>
            <li>The URL where the allegedly infringing material is located</li>
            <li>Your contact information</li>
            <li>
              A statement of good faith belief that the use is not authorized
            </li>
            <li>
              A statement that the information is accurate and you are
              authorized to act
            </li>
          </ul>
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
            <AlertTriangle size={24} color="#e50914" />
            <h2 className="section-title">Disclaimer of Warranties</h2>
          </div>
          <div className="disclaimer-box">
            <p className="disclaimer-text">
              The website is provided "as is" and "as available" without
              warranties of any kind, either express or implied. We do not
              warrant that the website will be uninterrupted, error-free, or
              free of viruses or other harmful components.
            </p>
          </div>
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
            <h2 className="section-title">Limitation of Liability</h2>
          </div>
          <div className="disclaimer-box">
            <p className="disclaimer-text">
              In no event shall Flixet be liable for any direct, indirect,
              incidental, special, consequential, or exemplary damages arising
              from your use of the website or third-party content.
            </p>
          </div>
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
            <UserX size={24} color="#e50914" />
            <h2 className="section-title">Age Restriction</h2>
          </div>
          <div className="warning-box">
            <div className="warning-icon">
              <AlertTriangle size={24} color="#e50914" />
            </div>
            <p className="section-text" style={{ marginBottom: 0 }}>
              <strong>18+ Only:</strong> You must be at least 18 years old to
              use this Website. By using the Website, you represent and warrant
              that you are at least 18 years of age.
            </p>
          </div>
        </motion.div>

        {/* Section 10 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="section-header">
            <div className="section-number">10</div>
            <Edit size={24} color="#e50914" />
            <h2 className="section-title">Modifications to Terms</h2>
          </div>
          <p className="section-text">
            We reserve the right to modify these Terms of Service at any time.
            Your continued use of the Website following any changes constitutes
            your acceptance of the new Terms of Service. We encourage you to
            review these terms periodically.
          </p>
        </motion.div>

        {/* Section 11 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="section-header">
            <div className="section-number">11</div>
            <Ban size={24} color="#e50914" />
            <h2 className="section-title">Termination</h2>
          </div>
          <p className="section-text">
            We reserve the right to terminate or suspend access to the Website
            immediately, without prior notice or liability, for any reason,
            including breach of these Terms of Service.
          </p>
        </motion.div>

        {/* Section 12 */}
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="section-header">
            <div className="section-number">12</div>
            <Mail size={24} color="#e50914" />
            <h2 className="section-title">Contact Information</h2>
          </div>
          <p className="section-text">
            For any questions or concerns regarding these Terms of Service,
            please contact us:
          </p>
          <div className="contact-card">
            <div className="contact-icon">
              <Mail size={32} color="#e50914" />
            </div>
            <p className="contact-text">
              Reach out through the contact information provided on our website
              or email us at{' '}
              <strong style={{ color: 'var(--accent)' }}>
                devajuice@zohomail.in
              </strong>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
