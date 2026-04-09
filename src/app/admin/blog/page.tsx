'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, deletePost, BlogPost } from '@/lib/blogService';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Calendar } from 'lucide-react';

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(true); // Fetch all posts (admin)
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      fetchPosts();
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading posts...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Blog Management</h1>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Create Post
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Title</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Publish Date</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No blog posts found. Create one!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-slate-900 dark:text-white">{post.title}</div>
                      <div className="text-sm text-slate-500 mt-1">/{post.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase
                        ${post.status === 'published' ? 'bg-green-100 text-green-700' : 
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                      {post.publishDate ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {post.publishDate.toLocaleDateString()}
                        </div>
                      ) : (
                        'Not set'
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blog/edit/${post.id}`}>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => post.id && handleDelete(post.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
