'use client';

import { useEffect } from 'react';

export default function BlogArticleClient() {
  useEffect(() => {
    // ─── Reading Progress Bar ───
    const progressBar = document.getElementById('reading-progress');
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        if (progressBar) {
          progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
      }
    };
    if (progressBar) {
      window.addEventListener('scroll', handleScrollProgress, { passive: true });
    }

    // ─── Back to Top Button ───
    const backToTop = document.getElementById('back-to-top');
    const handleScrollTopBtn = () => {
      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    };
    const handleTopClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (backToTop) {
      window.addEventListener('scroll', handleScrollTopBtn, { passive: true });
      backToTop.addEventListener('click', handleTopClick);
    }

    // ─── Copy Link Button ───
    const copyBtn = document.getElementById('copy-link-btn');
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (copyBtn) {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
          setTimeout(() => {
            if (copyBtn) copyBtn.innerHTML = originalHTML;
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    };
    if (copyBtn) {
      copyBtn.addEventListener('click', handleCopy);
    }

    // ─── Mobile Table of Contents Toggle ───
    const mobileTocToggle = document.getElementById('mobile-toc-toggle');
    const mobileTocPanel = document.getElementById('mobile-toc-panel');
    const mobileTocChevron = document.getElementById('mobile-toc-chevron');

    const handleMobileTocToggle = () => {
      if (!mobileTocPanel || !mobileTocToggle) return;
      const isOpen = mobileTocPanel.classList.contains('open');
      if (isOpen) {
        mobileTocPanel.classList.remove('open');
        mobileTocToggle.setAttribute('aria-expanded', 'false');
        mobileTocChevron?.classList.remove('rotated');
      } else {
        mobileTocPanel.classList.add('open');
        mobileTocToggle.setAttribute('aria-expanded', 'true');
        mobileTocChevron?.classList.add('rotated');
      }
    };

    const handleMobileLinkClick = () => {
      if (mobileTocPanel && mobileTocToggle) {
        mobileTocPanel.classList.remove('open');
        mobileTocToggle.setAttribute('aria-expanded', 'false');
        mobileTocChevron?.classList.remove('rotated');
      }
    };

    if (mobileTocToggle && mobileTocPanel) {
      mobileTocToggle.addEventListener('click', handleMobileTocToggle);
      mobileTocPanel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleMobileLinkClick);
      });
    }

    // ─── FAQ Accordion ───
    const faqItems = document.querySelectorAll('.faq-item');
    const cleanupFaqs: Array<() => void> = [];

    faqItems.forEach(item => {
      const toggle = item.querySelector('.faq-toggle');
      const answer = item.querySelector('.faq-answer');
      const chevron = item.querySelector('.faq-chevron');

      if (toggle && answer) {
        const handleFaqClick = () => {
          const isOpen = answer.classList.contains('open');

          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherChevron = otherItem.querySelector('.faq-chevron');
              const otherToggle = otherItem.querySelector('.faq-toggle');
              otherAnswer?.classList.remove('open');
              otherChevron?.classList.remove('rotated');
              otherToggle?.setAttribute('aria-expanded', 'false');
            }
          });

          if (isOpen) {
            answer.classList.remove('open');
            chevron?.classList.remove('rotated');
            toggle.setAttribute('aria-expanded', 'false');
          } else {
            answer.classList.add('open');
            chevron?.classList.add('rotated');
            toggle.setAttribute('aria-expanded', 'true');
          }
        };

        toggle.addEventListener('click', handleFaqClick);
        cleanupFaqs.push(() => toggle.removeEventListener('click', handleFaqClick));
      }
    });

    // ─── Sidebar TOC Scroll-Spy Active State ───
    const tocLinks = document.querySelectorAll('.toc-link');
    let observer: IntersectionObserver | null = null;
    if (tocLinks.length > 0) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach(link => {
              if (link.getAttribute('data-toc-id') === id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      });

      document.querySelectorAll('section[id], div[id="main-content"]').forEach(section => {
        observer?.observe(section);
      });
    }

    return () => {
      if (progressBar) window.removeEventListener('scroll', handleScrollProgress);
      if (backToTop) {
        window.removeEventListener('scroll', handleScrollTopBtn);
        backToTop.removeEventListener('click', handleTopClick);
      }
      if (copyBtn) copyBtn.removeEventListener('click', handleCopy);
      if (mobileTocToggle) mobileTocToggle.removeEventListener('click', handleMobileTocToggle);
      if (mobileTocPanel) {
        mobileTocPanel.querySelectorAll('a').forEach(link => {
          link.removeEventListener('click', handleMobileLinkClick);
        });
      }
      cleanupFaqs.forEach(fn => fn());
      if (observer) observer.disconnect();
    };
  }, []);

  return null;
}
