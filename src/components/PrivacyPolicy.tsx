import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onBlog: () => void;
  onContact: () => void;
}

export function PrivacyPolicy({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onBlog, onContact }: PrivacyPolicyProps) {
  useEffect(() => {
    document.title = "Privacy Policy | Wedding Planning Checklists";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for Wedding Planning Checklists. Learn how we collect, use, and protect your personal information.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onBlog={onBlog} onContact={onContact} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Effective Date: June 1, 2025 <br />
            Last Updated: June 1, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 space-y-12 text-slate-600">
          
          <div className="prose prose-slate prose-rose max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 prose-a:text-rose-500 hover:prose-a:text-rose-600">
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
            <p>
              Welcome to Wedding Planning Checklists ("we," "our," or "us"). We operate the website located at <strong>weddingplanningchecklists.org</strong> (the "Site"). We are committed to protecting your personal information and your right to privacy.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it. Please read it carefully. If you disagree with any terms in this policy, please discontinue use of our Site.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">1. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us and information that is automatically collected when you visit our Site.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Contact Form Submissions</strong> — Name, email address, and message content when you contact us through our support form</li>
              <li><strong>Newsletter Sign-Ups</strong> — Email address if you subscribe to our mailing list</li>
              <li><strong>Account Registration</strong> — Name, email address, and password if you create an account on our platform</li>
              <li><strong>Checklist & Tool Data</strong> — Wedding details, guest lists, budget entries, and vendor information you save while using our planning tools</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-3">Information Collected Automatically</h3>
            <p>When you visit our Site, we automatically collect certain technical information, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and version</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or search engine</li>
              <li>Date and time of your visit</li>
            </ul>
            <p>This information is collected using cookies, web beacons, and similar tracking technologies.</p>

            <h2 className="text-2xl font-bold mt-12 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>To provide and operate our services</strong> — delivering checklists, templates, and planning tools</li>
              <li><strong>To respond to your inquiries</strong> — replying to contact form submissions and support requests</li>
              <li><strong>To send marketing communications</strong> — newsletters and wedding planning tips (only with your consent)</li>
              <li><strong>To improve our website</strong> — analyzing usage patterns to enhance user experience</li>
              <li><strong>To ensure website security</strong> — monitoring for fraudulent or harmful activity</li>
              <li><strong>To comply with legal obligations</strong> — meeting applicable laws and regulations</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>

            <h2 className="text-2xl font-bold mt-12 mb-4">3. Cookies and Tracking Technologies</h2>
            <p>
              Our Site uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us recognize you on return visits and understand how you use our Site.
            </p>
            <p className="font-bold mt-4 mb-2">Types of cookies we use:</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
              <table className="w-full text-left text-sm m-0">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold">Cookie Type</th>
                    <th className="px-4 py-3 font-bold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Essential Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Required for the Site to function properly</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Analytics Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Help us understand how visitors interact with our Site (e.g., Google Analytics)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Preference Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Remember your settings and preferences</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Marketing Cookies</td>
                    <td className="px-4 py-3 text-slate-600">Used to deliver relevant content and track campaign performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our Site.</p>

            <h2 className="text-2xl font-bold mt-12 mb-4">4. Third-Party Services</h2>
            <p>We use trusted third-party services to operate our Site. These providers may have access to your data only to perform specific tasks on our behalf:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Google Analytics</strong> — Website traffic and behavior analysis</li>
              <li><strong>Google AdSense</strong> — Display advertising (if applicable)</li>
              <li><strong>Email Marketing Providers</strong> — Sending newsletters and automated emails</li>
              <li><strong>Hosting Providers</strong> — Secure storage of website data</li>
            </ul>
            <p>Each third party operates under their own privacy policy. We encourage you to review those policies independently.</p>

            <h2 className="text-2xl font-bold mt-12 mb-4">5. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is retained until you delete your account. Contact form submissions are retained for up to 12 months.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Access</strong> — Request a copy of the personal data we hold about you</li>
              <li><strong>Correction</strong> — Request that inaccurate data be corrected</li>
              <li><strong>Deletion</strong> — Request that your personal data be deleted</li>
              <li><strong>Opt-Out</strong> — Unsubscribe from marketing emails at any time using the unsubscribe link in any email</li>
              <li><strong>Data Portability</strong> — Request your data in a portable format</li>
            </ul>
            <p>To exercise any of these rights, contact us at: <strong>support@weddingplanningchecklists.org</strong></p>

            <h2 className="text-2xl font-bold mt-12 mb-4">7. Children's Privacy</h2>
            <p>
              Our Site is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will delete it.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">8. Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including SSL encryption, secure server infrastructure, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last Updated" date at the top of this page. Continued use of our Site after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">10. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4 space-y-2">
              <p className="m-0"><strong>Wedding Planning Checklists</strong></p>
              <p className="m-0">Website: weddingplanningchecklists.org</p>
              <p className="m-0">Email: support@weddingplanningchecklists.org</p>
              <p className="m-0">Contact Form: weddingplanningchecklists.org/contact</p>
            </div>
            
          </div>

        </div>
      </section>

      <Footer 
        onHome={onGoHome} 
        onAbout={onAbout} 
        onGuide={onOpenGuide} 
        onBlog={onBlog} 
        onContact={onContact} 
        onPrivacy={onPrivacy} 
        onTerms={onTerms} 
      />
    </div>
  );
}
