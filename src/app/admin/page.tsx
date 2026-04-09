import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome to the Hindustan Scrap Corporation admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Blog Management</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage all your articles</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Link href="/admin/blog" className="flex-1">
              <Button variant="outline" className="w-full">View Posts</Button>
            </Link>
            <Link href="/admin/blog/new" className="flex-1">
              <Button className="w-full flex items-center justify-center gap-2">
                <PlusCircle className="w-4 h-4" />
                New
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
