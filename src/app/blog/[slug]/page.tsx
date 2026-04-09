'use client';

import { useEffect, useState, use } from 'react';
import { getPostBySlug, BlogPost } from '@/lib/blogService';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import Head from 'next/head';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post data", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center bg-slate-50 dark:bg-slate-950">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Post not found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">Sorry, the article you are looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Hindustan Scrap Corporation</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
      </Head>

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all articles
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
              {post.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishDate.toISOString()}>
                    {post.publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
              )}

              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.imageUrl && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg border border-slate-200 dark:border-slate-800">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-img:rounded-xl">
            {/* For markdown rendering we would use react-markdown here, but since it's not installed yet, we'll dangerouslySetInnerHTML. Note: If content is pure markdown, and not HTML, it will render as plain text. The user should input HTML if using this basic approach, or we can install 'react-markdown'. Given this is a rich admin panel requirement without specific Markdown requested, rendering HTML is standard.*/}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
          </div>

        </article>
      </main>
    </>
  );
}
