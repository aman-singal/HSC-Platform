import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

const COLLECTION_NAME = 'blogs';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  tags?: string[];
  author?: string;
  metaDescription?: string;
}

const TIMEOUT_MS = 15000;

const withTimeout = <T>(promise: Promise<T>, operationName: string): Promise<T> => {
  const timeoutPromise = new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${TIMEOUT_MS / 1000}s. Ensure Firestore Database is created and enabled in your Firebase Console.`));
    }, TIMEOUT_MS);
  });
  return Promise.race([promise, timeoutPromise]);
};

// Convert Firestore Timestamp to JS Date
const mapDocToPost = (docId: string, data: any): BlogPost => {
  return {
    ...data,
    id: docId,
    publishDate: data.publishDate ? data.publishDate.toDate() : null,
    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
    updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(),
  } as BlogPost;
};

export const getPosts = async (admin: boolean = false): Promise<BlogPost[]> => {
  const postsRef = collection(db, COLLECTION_NAME);
  let q;
  
  if (admin) {
    q = query(postsRef, orderBy('createdAt', 'desc'));
  } else {
    q = query(
      postsRef, 
      where('status', '==', 'published'),
    );
  }
  
  try {
    const querySnapshot = await withTimeout(getDocs(q), 'getPosts');
    const posts: BlogPost[] = [];
    const now = new Date();

    querySnapshot.forEach((doc) => {
      const post = mapDocToPost(doc.id, doc.data());
      
      if (!admin && post.status === 'scheduled') {
          if(post.publishDate && post.publishDate <= now) {
              posts.push(post);
          }
      } else {
          posts.push(post);
      }
    });

    return posts.sort((a, b) => {
      const dateA = a.publishDate || a.createdAt;
      const dateB = b.publishDate || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const postsRef = collection(db, COLLECTION_NAME);
  const q = query(postsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  const docSnap = querySnapshot.docs[0];
  return mapDocToPost(docSnap.id, docSnap.data());
};

export const getPostById = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return mapDocToPost(docSnap.id, docSnap.data());
  } else {
    return null;
  }
};

export const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  const postsRef = collection(db, COLLECTION_NAME);
  
  const docData = {
    ...post,
    publishDate: post.publishDate ? Timestamp.fromDate(post.publishDate) : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await withTimeout(addDoc(postsRef, docData), 'createPost');
  return docRef.id;
};

export const updatePost = async (id: string, post: Partial<BlogPost>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  
  const docData: any = {
    ...post,
    updatedAt: serverTimestamp(),
  };

  if (post.publishDate !== undefined) {
    docData.publishDate = post.publishDate ? Timestamp.fromDate(post.publishDate) : null;
  }

  await withTimeout(updateDoc(docRef, docData), 'updatePost');
};

export const deletePost = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await withTimeout(deleteDoc(docRef), 'deletePost');
};
