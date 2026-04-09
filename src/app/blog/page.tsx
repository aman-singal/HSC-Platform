'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, BlogPost } from '@/lib/blogService';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(false); // fetch non-admin posts
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Latest Insights
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stay updated with the latest news, environmental impacts, and technical deep-dives on vehicle scrapping and recycling policy.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">No posts yet</h3>
            <p className="text-slate-500 dark:text-slate-400">Check back soon for new articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                <article className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden transform group-hover:-translate-y-1">
                  
                  {post.imageUrl ? (
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-6 text-center border-b border-slate-100 dark:border-slate-800">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                      {post.publishDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.publishDate.toISOString()}>
                            {post.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </time>
                        </div>
                      )}
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap text-blue-600 dark:text-blue-400">
                          <Tag className="w-3 h-3" />
                          <span>{post.tags[0]}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                      Read Article <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
