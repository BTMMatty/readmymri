// app/api/dicom/process/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userContext = JSON.parse(formData.get('context') as string || '{}');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const tempDir = path.join(process.cwd(), 'tmp');
    await fs.mkdir(tempDir, { recursive: true });
    
    const tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);
    await fs.writeFile(tempFilePath, buffer);

    // Call Python preprocessor
    const preprocessorPath = path.join(process.cwd(), 'backend', 'preprocessor', 'readmymri_preprocessor.py');
    
    const command = `python3 ${preprocessorPath} --input "${tempFilePath}" --context '${JSON.stringify(userContext)}'`;
    
    const { stdout, stderr } = await execAsync(command, {
      env: { ...process.env, PYTHONPATH: path.join(process.cwd(), 'backend') }
    });

    if (stderr) {
      console.error('Preprocessor stderr:', stderr);
    }

    // Parse result
    const result = JSON.parse(stdout);

    // Clean up temp file
    await fs.unlink(tempFilePath).catch(console.error);

    return NextResponse.json({
      success: true,
      studyId: result.study_id,
      metadata: result.metadata,
      message: 'DICOM processed successfully'
    });

  } catch (error) {
    console.error('DICOM processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process DICOM file' },
      { status: 500 }
    );
  }
}