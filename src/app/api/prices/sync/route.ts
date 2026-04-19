import { NextResponse } from 'next/server';
import { syncPrices } from '@/lib/priceService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await syncPrices();
    
    if (!data) {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to sync prices today. Check logs or API limits." 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Synced successfully", 
      data 
    });

  } catch (error: any) {
    console.error("Sync route error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
