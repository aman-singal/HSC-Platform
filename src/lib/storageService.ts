export interface UploadedImage {
  name: string;
  url: string;
  path: string;
}

export const uploadImageToStorage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch('/api/media', {
    method: 'POST',
    body: formData,
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.details 
      ? `${errorData.error || "Error"}: ${errorData.details}` 
      : (errorData.error || "Upload failed");
    throw new Error(errorMessage);
  }
  
  const data = await res.json();
  return data.url;
};

export const listImagesInStorage = async (): Promise<UploadedImage[]> => {
  const res = await fetch('/api/media');
  if (!res.ok) throw new Error("Failed to load media");
  
  const data = await res.json();
  
  const images = data.blobs.map((blob: any) => ({
    name: blob.pathname,
    url: blob.url,
    path: blob.pathname,
  }));
  
  // Sort reverse chronological by assuming newer uploads appear at the end, 
  // or we can just reverse the array provided by Vercel Blob
  return images.reverse();
};

export const deleteImageFromStorage = async (path: string): Promise<void> => {
  // Not implemented in Vercel Blob API route yet
  console.log("Delete not implemented for", path);
};
