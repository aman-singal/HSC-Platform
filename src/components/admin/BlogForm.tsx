'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, createPost, updatePost } from '@/lib/blogService';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    publishDate: null,
    imageUrl: '',
    tags: [],
    author: '',
    metaDescription: '',
    ...initialData,
  });

  const [dateString, setDateString] = useState('');

  useEffect(() => {
    if (initialData?.publishDate) {
      // Format to YYYY-MM-DD for input[type="date"]
      setDateString(initialData.publishDate.toISOString().split('T')[0]);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title if it's not editing and user is typing title
    if (name === 'title' && !isEditing && !formData.slug) {
      setFormData((prev) => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
      }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
    if (e.target.value) {
      setFormData((prev) => ({ ...prev, publishDate: new Date(e.target.value) }));
    } else {
      setFormData((prev) => ({ ...prev, publishDate: null }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && initialData?.id) {
        await updatePost(initialData.id, formData);
      } else {
        await createPost(formData as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>);
      }
      router.push('/admin/blog');
      router.refresh();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(`Failed to save post: ${error.message || "Unknown error"}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" size="icon" type="button" className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        <Button type="submit" disabled={loading} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content (Markdown/HTML supported)</label>
                <textarea
                  name="content"
                  required
                  rows={15}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                  placeholder="Write your post content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Short summary of the post..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Publish Date</label>
                <input
                  type="date"
                  value={dateString}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Custom URL (Slug)</label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="my-custom-post-url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="scrap, environment, policy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Description</label>
                <textarea
                  name="metaDescription"
                  rows={2}
                  value={formData.metaDescription || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="SEO description..."
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
