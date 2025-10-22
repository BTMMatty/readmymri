import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return NextResponse.json({
    success: true,
    studyId: 'STUDY-' + Date.now(),
    message: 'DICOM processed successfully',
    processingTime: 12.3,
    imagesProcessed: 127
  });
}
