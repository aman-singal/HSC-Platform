'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { getPostById, BlogPost } from '@/lib/blogService';

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        if (data) {
          setPost(data);
        } else {
          router.push('/admin/blog');
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

  if (loading) {
    return <div className="p-8 text-center min-h-screen">Loading post data...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8">
      {post && <BlogForm initialData={post} isEditing={true} />}
    </div>
  );
}
