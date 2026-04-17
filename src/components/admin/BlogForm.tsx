'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, createPost, updatePost } from '@/lib/blogService';
import { listImagesInStorage, uploadImageToStorage, UploadedImage } from '@/lib/storageService';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft, Plus, Trash2, Image as ImageIcon, Wand2, FileCode, AlignLeft, AlignCenter, AlignRight, Maximize, Camera, Copy, Loader2, UploadCloud, Link as LinkIcon } from 'lucide-react';
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
    extraImages: [],
    tags: [],
    author: '',
    metaDescription: '',
    showBackLink: true,
    ...initialData,
  });

  const [dateString, setDateString] = useState('');
  const [showHtmlImport, setShowHtmlImport] = useState(false);
  const [importHtml, setImportHtml] = useState('');
  
  // Media Library State
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaList, setMediaList] = useState<UploadedImage[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Internal Links State
  const [showInternalLinks, setShowInternalLinks] = useState(false);
  const [postsList, setPostsList] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

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

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (initialData?.tags) {
      setTagsInput(initialData.tags.join(', '));
    }
  }, [initialData]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const addExtraImage = () => {
    setFormData(prev => ({
      ...prev,
      extraImages: [
        ...(prev.extraImages || []),
        { url: '', alignment: 'center', caption: '', width: '100%' }
      ]
    }));
  };

  const updateExtraImage = (index: number, field: string, value: string) => {
    const newImages = [...(formData.extraImages || [])];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData(prev => ({ ...prev, extraImages: newImages }));
  };

  const removeExtraImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      extraImages: prev.extraImages?.filter((_, i) => i !== index)
    }));
  };

  const handleHtmlImport = () => {
    if (importHtml) {
      setFormData(prev => ({ ...prev, content: importHtml }));
      setShowHtmlImport(false);
      setImportHtml('');
    }
  };

  const openMediaLibrary = async () => {
    setShowMediaLibrary(true);
    if (mediaList.length === 0) {
      await loadMedia();
    }
  };

  const loadMedia = async () => {
    setLoadingMedia(true);
    try {
      const images = await listImagesInStorage();
      setMediaList(images);
    } catch (e) {
      console.error(e);
      alert("Failed to load media library. Ensure Firebase Storage is set up.");
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      await uploadImageToStorage(file);
      await loadMedia(); // refresh list
    } catch (e: any) {
      console.error(e);
      alert(`Upload failed: ${e.message || "Unknown error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const openInternalLinks = async () => {
    setShowInternalLinks(true);
    if (postsList.length === 0) {
      setLoadingPosts(true);
      try {
        const { getPosts } = await import('@/lib/blogService');
        const posts = await getPosts(true);
        // Filter out current post if editing
        setPostsList(posts.filter(p => p.id !== initialData?.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPosts(false);
      }
    }
  };

  const copyToClipboard = (text: string, title?: string) => {
    navigator.clipboard.writeText(text);
    alert(title ? `${title} copied to clipboard!` : "Copied to clipboard!");
  };

  const aiRedesign = () => {
    let content = formData.content || '';
    
    // Smart Plain Text -> HTML Conversion
    if (!content.includes('<p>') && !content.includes('<div') && !content.includes('<h')) {
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      content = paragraphs.map(p => {
        // Detect headers if a line is short and doesn't end with punctuation
        if (p.length < 100 && !p.match(/[.!?]$/)) {
          return `<h2>${p.replace(/\n/g, ' ')}</h2>`;
        }
        return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
      }).join('\n\n');
    }

    // Inject Excerpt as Premium Intro if not present
    if (formData.excerpt && !content.includes('premium-intro')) {
      content = `<div class="premium-intro">\n  ${formData.excerpt}\n</div>\n\n` + content;
    }

    // Ensure the entire content is wrapped if needed (optional, keeping it clean is better)
    // We will let the user see clean semantic HTML.

    // NEW Feature: Suggested Internal Backlink
    if (postsList.length > 0 && !content.includes('suggested-reading')) {
      const randomPost = postsList[Math.floor(Math.random() * postsList.length)];
      const suggestedBlock = `
        <div class="suggested-reading my-12 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10">
          <p class="text-[10px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-2">Suggested Reading</p>
          <a href="/blog/${randomPost.slug}" class="group block">
            <h4 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">${randomPost.title}</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${randomPost.excerpt?.substring(0, 100)}...</p>
          </a>
        </div>
      `;
      content += suggestedBlock;
    }

    setFormData(prev => ({ ...prev, content }));
    alert("✨ AI Redesign Complete! Your article has been upgraded with premium typography and a suggested internal backlink.");
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" size="icon" type="button" className="h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            {isEditing ? 'Edit Masterpiece' : 'Draft New Article'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={openMediaLibrary}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-700"
          >
            <Camera className="w-4 h-4 text-emerald-500" />
            Media Library
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={openInternalLinks}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-700"
          >
            <LinkIcon className="w-4 h-4 text-orange-500" />
            Internal Links
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowHtmlImport(true)}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-700"
          >
            <FileCode className="w-4 h-4 text-blue-500" />
            Import HTML
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={aiRedesign}
            className="flex items-center gap-2 border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/10"
          >
            <Wand2 className="w-4 h-4 text-purple-600" />
            AI Redesign
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </div>

      {showHtmlImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
              <FileCode className="text-blue-500" />
              Import HTML Content
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Paste your HTML here. It will replace the current content of the blog post.</p>
            <textarea
              className="w-full h-80 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              placeholder="<html><body>...</body></html>"
              value={importHtml}
              onChange={(e) => setImportHtml(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowHtmlImport(false)}>Cancel</Button>
              <Button onClick={handleHtmlImport} className="bg-blue-600 hover:bg-blue-700">Import This Content</Button>
            </div>
          </div>
        </div>
      )}

      {showMediaLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-4xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <ImageIcon className="text-blue-500" />
                Media Library
              </h3>
              <Button variant="ghost" onClick={() => setShowMediaLibrary(false)}>Close</Button>
            </div>
            
            <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
               <label className="flex items-center justify-center gap-3 cursor-pointer">
                  {uploadingImage ? <Loader2 className="animate-spin text-blue-500" /> : <UploadCloud className="text-blue-500" />}
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                     {uploadingImage ? "Uploading..." : "Click to Upload New Image"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} disabled={uploadingImage} />
               </label>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 pr-2 pb-4">
               {loadingMedia ? (
                 <div className="flex justify-center p-10"><Loader2 className="animate-spin text-slate-400" /></div>
               ) : mediaList.length === 0 ? (
                 <div className="text-center p-10 text-slate-500">No images found. Upload one!</div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaList.map((img, i) => (
                      <div key={i} className="group relative rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                         <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 p-1">
                           <img src={img.url} className="w-full h-full object-cover rounded-lg" alt="Media" />
                         </div>
                         <div className="p-3 flex flex-col gap-2">
                           <span className="truncate text-[10px] text-slate-500 dark:text-slate-400 block font-mono" title={img.name}>{img.name}</span>
                           <div className="flex gap-2 mt-auto">
                             <Button type="button" variant="secondary" size="sm" className="w-full text-[10px] h-7 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600" onClick={() => copyToClipboard(img.url, 'URL')}>
                               <LinkIcon className="w-3 h-3 mr-1" /> URL
                             </Button>
                             <Button type="button" variant="secondary" size="sm" className="w-full text-[10px] h-7 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600" onClick={() => copyToClipboard(`<img src="${img.url}" alt="" className="w-full rounded-xl shadow-md my-4" />`, 'Image Tag')}>
                               <FileCode className="w-3 h-3 mr-1" /> Tag
                             </Button>
                           </div>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {showInternalLinks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <LinkIcon className="text-orange-500" />
                Internal Post Links
              </h3>
              <Button variant="ghost" onClick={() => setShowInternalLinks(false)}>Close</Button>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Choose an article to generate a backlink. You can copy a simple link or a premium "Suggested Reading" card.</p>

            <div className="flex-1 overflow-y-auto min-h-0 pr-2 space-y-4">
               {loadingPosts ? (
                 <div className="flex justify-center p-10"><Loader2 className="animate-spin text-slate-400" /></div>
               ) : postsList.length === 0 ? (
                 <div className="text-center p-10 text-slate-500">No other posts found to link to.</div>
               ) : (
                 <div className="space-y-3">
                    {postsList.map((post, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-orange-500/50 transition-colors">
                         <h4 className="font-bold text-slate-900 dark:text-white mb-3 truncate">{post.title}</h4>
                         <div className="flex flex-wrap gap-2">
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm" 
                              className="text-[10px] h-8 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-400" 
                              onClick={() => copyToClipboard(`<a href="/blog/${post.slug}" class="text-blue-600 hover:underline font-bold">${post.title}</a>`, 'Text Link')}
                            >
                              <LinkIcon className="w-3 h-3 mr-1" /> Copy Text Link
                            </Button>
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm" 
                              className="text-[10px] h-8 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/30 dark:text-orange-400" 
                              onClick={() => copyToClipboard(`
<div class="suggested-reading my-10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10">
  <p class="text-[10px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-2">Suggested Reading</p>
  <a href="/blog/${post.slug}" class="group block">
    <h4 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">${post.title}</h4>
    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${post.excerpt?.substring(0, 120)}...</p>
  </a>
</div>`, 'Suggested Card')}
                            >
                              <Plus className="w-3 h-3 mr-1" /> Copy Suggested Card
                            </Button>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Content Card */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-lg font-medium"
                  placeholder="The Future of Vehicle Scrapping in India..."
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Content (HTML/Rich Text)</label>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Preview Ready</span>
                </div>
                <textarea
                  name="content"
                  required
                  rows={20}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm leading-relaxed"
                  placeholder="Write your masterpiece here using HTML tags or plain text..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Article Excerpt (Quick Summary)</label>
                <textarea
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="A compelling one-liner that draws readers in..."
                />
              </div>
            </div>
          </div>

          {/* Multiple Images Support Section */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <ImageIcon className="text-blue-500 w-5 h-5" />
                Additional Images & Gallery
              </h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addExtraImage}
                className="flex items-center gap-2 border-dashed border-2 hover:bg-blue-50 dark:hover:bg-blue-900/10"
              >
                <Plus className="w-4 h-4" /> Add Image
              </Button>
            </div>

            <div className="space-y-6">
              {formData.extraImages?.map((img, index) => (
                <div key={index} className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 relative group">
                  <button 
                    type="button" 
                    onClick={() => removeExtraImage(index)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200 transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Image Source URL</label>
                        <input
                          type="url"
                          value={img.url}
                          onChange={(e) => updateExtraImage(index, 'url', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Image Caption</label>
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => updateExtraImage(index, 'caption', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Description of this photo"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Alignment & Layout</label>
                        <div className="flex gap-2">
                          {[
                            { value: 'left', icon: AlignLeft },
                            { value: 'center', icon: AlignCenter },
                            { value: 'right', icon: AlignRight },
                            { value: 'full', icon: Maximize }
                          ].map((align) => (
                            <button
                              key={align.value}
                              type="button"
                              onClick={() => updateExtraImage(index, 'alignment', align.value)}
                              className={`flex-1 py-2 flex items-center justify-center rounded-lg border transition-all ${
                                img.alignment === align.value 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
                              }`}
                            >
                              <align.icon className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">Display Width (%)</label>
                        <input
                          type="text"
                          value={img.width || '100%'}
                          onChange={(e) => updateExtraImage(index, 'width', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="e.g. 50% or 100%"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {img.url && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video max-h-40">
                      <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>
              ))}
              {(!formData.extraImages || formData.extraImages.length === 0) && (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                  <p className="text-slate-400 text-sm">No extra images added yet. Use them as pull-outs or inline illustrations.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:sticky lg:top-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Publishing Console</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Visibility Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="draft">Draft - Private</option>
                  <option value="published">Published - Live</option>
                  <option value="scheduled">Scheduled - Future</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Publish Date</label>
                <input
                  type="date"
                  value={dateString}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Permalinks (Slug)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-mono"
                    placeholder="my-post-url"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Article Cover (Hero)</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="https://..."
                />
                {formData.imageUrl && (
                  <div className="mt-3 rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                     <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Topic Tags</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="Seperated by commas (e.g. Scrapping, Recycling, Steel)..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Author Credit</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                  placeholder="Author Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">SEO Meta Data</label>
                <textarea
                  name="metaDescription"
                  rows={2}
                  value={formData.metaDescription || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="Help Google find this article..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.showBackLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, showBackLink: e.target.checked }))}
                    />
                    <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Show "Back to Blog" Link</span>
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
