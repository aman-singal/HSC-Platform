import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    return NextResponse.json({ blobs });
  } catch (error) {
    console.error("Vercel Blob List Error:", error);
    return NextResponse.json({ error: "Failed to list blobs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("POST /api/media started");
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!(file instanceof File)) {
      console.error("No file provided or invalid file format");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size}`);

    // Check if token exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is missing in environment");
      return NextResponse.json({ error: "Server configuration error: Missing token" }, { status: 500 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log("Upload successful:", blob.url);
    return NextResponse.json({ url: blob.url, name: blob.pathname, path: blob.pathname });
  } catch (error: any) {
    console.error("Vercel Blob Upload Error Details:", error);
    return NextResponse.json({ 
      error: "Failed to upload to blob", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}
