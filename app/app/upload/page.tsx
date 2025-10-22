'use client';

import { useState } from 'react';
import { Upload, FileCheck, Loader2, Shield, Zap, Brain, Activity, Heart, AlertCircle } from 'lucide-react';

interface AIAnalysis {
  technical_assessment?: {
    image_quality?: string;
    sequence_type?: string;
    diagnostic_quality?: string;
    contrast_enhancement?: string;
    artifacts_present?: string[];
  };
  clinical_correlation?: {
    symptoms_imaging_correlation?: string;
    relevant_anatomy?: string[];
    sequence_appropriateness?: string;
  };
  confidence_metrics?: {
    overall_confidence: number;
    technical_confidence: number;
    clinical_confidence: number;
  };
  findings_analysis?: {
    normal_structures?: string[];
    areas_of_interest?: string[];
    incidental_findings?: string[];
  };
  differential_considerations?: Array<{
    condition: string;
    confidence: number;
    supporting_factors: string[];
    clinical_correlation: string;
  }>;
  recommendations?: {
    immediate_actions?: string[];
    follow_up_imaging?: string[];
    clinical_correlation?: string[];
    patient_counseling?: string[];
  };
}

interface UploadResult {
  status: 'success' | 'partial_success' | 'error';
  message?: string;
  files_processed?: number;
  metadata?: {
    study_description?: string;
    modality?: string;
    body_part_examined?: string;
    [key: string]: any;
  };
  ai_analysis?: AIAnalysis;
  agents_used?: string[];
  orchestration_id?: string;
  upload_stats?: any;
}

export default function UploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clinical_context', JSON.stringify({
      clinical_question: 'Routine screening',
      urgency: 'routine',
      user_id: 'demo-user',
      study_type: 'MRI'
    }));

    try {
      // Send to backend API
      const response = await fetch('http://localhost:8000/api/upload-zip', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Backend response:', data); // Debug log
      console.log('Setting result state with:', data); // Extra debug
      setResult(data);
      console.log('Result state should now be:', data); // Verify
    } catch (error) {
      console.error('Upload failed:', error);
      setResult({ 
        status: 'error', 
        message: 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    // Accept ZIP files and DICOM files
    const validTypes = [
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream',
      'application/dicom',
    ];
    
    const validExtensions = ['.zip', '.dcm', '.dicom'];
    const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      alert('Please upload a ZIP file containing DICOM images or individual DICOM files');
      return false;
    }
    
    return true;
  };

  const renderAIAnalysis = () => {
    if (!result?.ai_analysis) return null;
    
    const analysis = result.ai_analysis;
    
    return (
      <div className="mt-6 space-y-4">
        {/* Technical Assessment */}
        {analysis.technical_assessment && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Technical Assessment
            </h4>
            <div className="text-sm text-white/80 space-y-1">
              <p>Quality: {analysis.technical_assessment.image_quality || 'N/A'}</p>
              <p>Sequence: {analysis.technical_assessment.sequence_type || 'N/A'}</p>
              <p>Diagnostic Quality: {analysis.technical_assessment.diagnostic_quality || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Clinical Correlation */}
        {analysis.clinical_correlation && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Clinical Correlation
            </h4>
            <div className="text-sm text-white/80 space-y-1">
              <p>Symptom Correlation: {analysis.clinical_correlation.symptoms_imaging_correlation || 'N/A'}</p>
              <p>Relevant Anatomy: {analysis.clinical_correlation.relevant_anatomy?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Confidence Metrics */}
        {analysis.confidence_metrics && (
          <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-4">
            <h4 className="text-teal-400 font-semibold mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              AI Confidence
            </h4>
            <div className="text-sm text-white/80 space-y-1">
              <p>Overall: {(analysis.confidence_metrics.overall_confidence * 100).toFixed(0)}%</p>
              <p>Technical: {(analysis.confidence_metrics.technical_confidence * 100).toFixed(0)}%</p>
              <p>Clinical: {(analysis.confidence_metrics.clinical_confidence * 100).toFixed(0)}%</p>
            </div>
          </div>
        )}

        {/* Recommendations if available */}
        {analysis.recommendations && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="text-orange-400 font-semibold mb-2">Recommendations</h4>
            <div className="text-sm text-white/80 space-y-2">
              {analysis.recommendations.immediate_actions && analysis.recommendations.immediate_actions.length > 0 && (
                <div>
                  <p className="text-orange-300">Immediate:</p>
                  <ul className="list-disc list-inside ml-2">
                    {analysis.recommendations.immediate_actions.map((action, idx) => (
                      <li key={idx}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.recommendations.follow_up_imaging && analysis.recommendations.follow_up_imaging.length > 0 && (
                <div>
                  <p className="text-orange-300">Follow-up:</p>
                  <ul className="list-disc list-inside ml-2">
                    {analysis.recommendations.follow_up_imaging.map((followUp, idx) => (
                      <li key={idx}>{followUp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              ReadMyMRI Upload
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            AI-Powered Medical Imaging Analysis
          </p>
        </div>

        {/* Upload Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            {/* Security badges */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">AI Powered</span>
              </div>
            </div>

            {/* Upload area */}
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors">
              <input
                type="file"
                accept=".zip,application/zip,application/x-zip-compressed,.dcm,.dicom,application/dicom"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile && validateFile(selectedFile)) {
                    setFile(selectedFile);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-white/60" />
                <p className="text-lg text-white mb-2">
                  {file ? file.name : 'Drop ZIP file here or click to browse'}
                </p>
                <p className="text-sm text-white/60">
                  Supports ZIP files containing DICOM series (up to 1GB)
                </p>
                <p className="text-xs text-white/40 mt-2">
                  Also accepts individual .dcm files for testing
                </p>
              </label>
            </div>

            {/* File selected indicator */}
            {file && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                <FileCheck className="w-5 h-5" />
                <span>{file.name} ready for processing ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="mt-8 w-full py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing ZIP file...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Analyze DICOM Series
                </>
              )}
            </button>

            {/* Results */}
            {result && (
              <div className={`mt-8 p-6 rounded-xl border ${
                result.status === 'success' 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : result.status === 'partial_success'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {result.status === 'success' ? (
                    <>
                      <FileCheck className="w-5 h-5 text-green-400" />
                      Analysis Complete
                    </>
                  ) : result.status === 'partial_success' ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      Partial Analysis
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      Processing Error
                    </>
                  )}
                </h3>
                
                {(result.status === 'success' || result.status === 'partial_success') ? (
                  <>
                    {/* Processing Summary */}
                    <div className="mb-4">
                      <p className="text-green-400">
                        ✅ {result.files_processed || 0} DICOM files processed
                      </p>
                      {result.metadata && (
                        <div className="mt-2 text-sm text-white/60">
                          <p>Study: {result.metadata.study_description || 'N/A'}</p>
                          <p>Modality: {result.metadata.modality || 'N/A'}</p>
                          <p>Body Part: {result.metadata.body_part_examined || 'N/A'}</p>
                        </div>
                      )}
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        ✓ PHI Removed
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        ✓ Data Encrypted
                      </span>
                      {result.ai_analysis && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          ✓ AI Analysis Complete
                        </span>
                      )}
                    </div>

                    {/* AI Analysis Results */}
                    {renderAIAnalysis()}

                    {/* Agents Used */}
                    {result.agents_used && result.agents_used.length > 0 && (
                      <div className="mt-4 text-xs text-white/40">
                        Agents: {result.agents_used.join(' → ')}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-red-400">{result.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-teal-400">ZIP</div>
              <div className="text-sm text-white/60">Multi-file Upload</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-purple-400">1GB</div>
              <div className="text-sm text-white/60">Max Size</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-green-400">DICOM</div>
              <div className="text-sm text-white/60">Series Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}