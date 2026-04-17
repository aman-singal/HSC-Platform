'use client';

export default function BlogStyles() {
  return (
    <style jsx global>{`
      .blog-content p {
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
        line-height: 1.8;
      }
      .blog-content h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
      }
      .blog-content h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }
      .blog-content tr:hover td {
        background: #fdfdfd;
      }
      .dark .blog-content tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }
      .blog-content img {
        max-width: 100%;
        height: auto;
        border-radius: 1rem;
        margin: 2.5rem 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      }
      .blog-content ul, .blog-content ol {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
      }
      .blog-content li {
        margin-bottom: 0.75rem;
        padding-left: 0.5rem;
      }
      .blog-content blockquote {
        border-left: 4px solid #2563eb;
        padding: 1rem 1.5rem;
        margin: 2rem 0;
        background: rgba(37, 99, 235, 0.05);
        font-style: italic;
        font-size: 1.25rem;
        border-radius: 0 1rem 1rem 0;
      }
      .blog-content a {
        color: #2563eb;
        text-decoration: underline;
      }
      .blog-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 2.5rem 0;
        font-size: 0.95rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
        overflow: hidden;
        display: table; /* Reset to table for better layout on desktop */
      }
      /* Wrap table in a div if possible, otherwise use this for responsiveness */
      @media (max-width: 768px) {
        .blog-content table {
          display: block;
          overflow-x: auto;
        }
      }
      .dark .blog-content table {
        border-color: #1e293b;
      }
      .blog-content th {
        background: #f8fafc;
        color: #334155;
        font-weight: 700;
        text-align: left;
        padding: 1.25rem 1rem;
        border-bottom: 2px solid #e2e8f0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.75rem;
      }
      .dark .blog-content th {
        background: #0f172a;
        color: #94a3b8;
        border-bottom-color: #1e293b;
      }
      .blog-content td {
        padding: 1rem;
        border-bottom: 1px solid #f1f5f9;
        color: #475569;
        vertical-align: middle;
      }
      .dark .blog-content td {
        border-bottom-color: #1e293b;
        color: #cbd5e1;
      }
      .blog-content tr:last-child td {
        border-bottom: none;
      }
      .blog-content tr:hover td {
        background: rgba(37, 99, 235, 0.02);
      }
      .dark .blog-content tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }
      .dark .blog-content blockquote {
        background: rgba(37, 99, 235, 0.1);
        color: #e2e8f0;
      }
      .premium-intro {
        position: relative;
      }
      .premium-intro::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background: #2563eb;
      }
    `}</style>
  );
}
