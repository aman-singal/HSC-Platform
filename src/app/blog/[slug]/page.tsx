import { Metadata } from 'next';
import { getPostBySlug, BlogPost } from '@/lib/blogService';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import BlogStyles from '@/components/blog/BlogStyles';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `${post.title} | Hindustan Scrap Corporation` : 'Post Not Found',
    description: post?.metaDescription || post?.excerpt || 'Hindustan Scrap Corporation Blog',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error("Error fetching post data", error);
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
      <BlogStyles />
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
          </div>

          {post.imageUrl && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-800">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}

          <div className="relative">
            <div className="blog-content leading-relaxed text-slate-800 dark:text-slate-200">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {post.extraImages && post.extraImages.length > 0 && (
              <div className="mt-16 space-y-16">
                {post.extraImages.map((img, index) => {
                  const alignmentClasses = {
                    left: 'md:float-left md:mr-8 md:mb-6 md:w-1/2',
                    right: 'md:float-right md:ml-8 md:mb-6 md:w-1/2',
                    center: 'mx-auto mb-10 block',
                    full: 'w-full mb-12 block'
                  } as const;

                  const alignment = img.alignment || 'center';
                  const alignmentClass = alignmentClasses[alignment as keyof typeof alignmentClasses] || alignmentClasses.center;

                  return (
                    <figure 
                      key={index} 
                      className={`relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 clear-both ${alignmentClass}`}
                      style={{ width: alignment === 'center' || alignment === 'full' ? (img.width || '100%') : undefined }}
                    >
                      <img 
                        src={img.url} 
                        alt={img.caption || `Image ${index + 1}`} 
                        className="w-full h-auto object-cover"
                      />
                      {img.caption && (
                        <figcaption className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-sm text-slate-500 dark:text-slate-400 font-medium italic border-t border-slate-100 dark:border-slate-800">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}

            {/* SEO Meta Tags Bottom Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors">
                      <Tag className="w-3.5 h-3.5 text-blue-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.showBackLink !== false && (
              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Insights
                </Link>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
