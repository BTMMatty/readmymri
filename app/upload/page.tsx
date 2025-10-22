'use client';

import { useState } from 'react';
import { Upload, FileCheck, Loader2, Shield, Zap, Brain, RefreshCw, Activity, FileText, AlertCircle, BarChart3, Stethoscope } from 'lucide-react';

export default function UploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clinical_context', JSON.stringify({
      clinical_question: 'Comprehensive MRI analysis with full AI diagnostic assessment',
      urgency: 'routine',
      user_id: 'demo-user',
      study_type: 'MRI',
      patient_age: 45,
      patient_sex: 'M'
    }));

    try {
      const response = await fetch('http://localhost:8000/api/upload-zip', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Response data:', data); // Debug log
      setResult(data);
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

  const handleNewAnalysis = () => {
    setFile(null);
    setResult(null);
  };

  const validateFile = (selectedFile: File) => {
    const validExtensions = ['.zip', '.dcm', '.dicom'];
    const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      alert('Please upload a ZIP file containing DICOM images');
      return false;
    }
    
    return true;
  };

  // Render AI Analysis Results
  const renderAIAnalysis = () => {
    // FIXED: Access ai_analysis directly from result, not result.data
    const analysis = result?.ai_analysis;
    
    // If no AI analysis, show why
    if (!analysis || Object.keys(analysis).length === 0) {
      return (
        <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">AI Analysis Pending</h3>
          <p className="text-yellow-300 text-sm">
            Files processed successfully. AI analysis may require API configuration.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Ensure ANTHROPIC_API_KEY is set in backend environment.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-8 space-y-6">
        {/* AI Analysis Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              AI Medical Analysis Report
            </span>
          </h2>
          <p className="text-gray-400 text-sm">Powered by Claude 3.5 Sonnet</p>
        </div>

        {/* Technical Assessment */}
        {analysis.technical_assessment && (
          <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-6 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Technical Assessment
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Image Quality:</span>
                <span className="ml-2 text-white font-medium capitalize">
                  {analysis.technical_assessment.image_quality || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Sequence Type:</span>
                <span className="ml-2 text-white font-medium">
                  {analysis.technical_assessment.sequence_type || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Diagnostic Quality:</span>
                <span className="ml-2 text-white font-medium capitalize">
                  {analysis.technical_assessment.diagnostic_quality || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Contrast Enhancement:</span>
                <span className="ml-2 text-white font-medium capitalize">
                  {analysis.technical_assessment.contrast_enhancement || 'None'}
                </span>
              </div>
              {analysis.technical_assessment.artifacts_present && (
                <div className="col-span-2">
                  <span className="text-gray-400">Artifacts:</span>
                  <span className="ml-2 text-white font-medium">
                    {analysis.technical_assessment.artifacts_present.length > 0 
                      ? analysis.technical_assessment.artifacts_present.join(', ')
                      : 'None detected'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clinical Findings */}
        {analysis.findings_analysis && (
          <div className="bg-gradient-to-br from-purple-900/20 to-transparent p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Clinical Analysis
            </h3>
            
            {/* Normal Structures */}
            {analysis.findings_analysis.normal_structures && analysis.findings_analysis.normal_structures.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Normal Structures Identified:</h4>
                <div className="bg-black/20 p-3 rounded-lg">
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {analysis.findings_analysis.normal_structures.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Areas of Interest */}
            {analysis.findings_analysis.areas_of_interest && analysis.findings_analysis.areas_of_interest.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-yellow-300 mb-2">⚠️ Areas Requiring Attention:</h4>
                <div className="bg-yellow-900/10 border border-yellow-500/20 p-3 rounded-lg">
                  <ul className="list-disc list-inside text-sm text-yellow-400 space-y-1">
                    {analysis.findings_analysis.areas_of_interest.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Incidental Findings */}
            {analysis.findings_analysis.incidental_findings && analysis.findings_analysis.incidental_findings.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Incidental Findings:</h4>
                <div className="bg-gray-800/30 p-3 rounded-lg">
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {analysis.findings_analysis.incidental_findings.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Differential Considerations */}
        {analysis.differential_considerations && analysis.differential_considerations.length > 0 && (
          <div className="bg-gradient-to-br from-green-900/20 to-transparent p-6 rounded-xl border border-green-500/20">
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Differential Considerations
            </h3>
            <div className="space-y-3">
              {analysis.differential_considerations.map((diff: any, idx: number) => (
                <div key={idx} className="bg-black/20 p-4 rounded-lg border border-green-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{diff.condition}</h4>
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      diff.confidence >= 0.8 ? 'bg-green-500/20 text-green-400' :
                      diff.confidence >= 0.6 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {(diff.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{diff.clinical_correlation}</p>
                  {diff.supporting_factors && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Supporting factors:</span> {diff.supporting_factors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations && (
          <div className="bg-gradient-to-br from-orange-900/20 to-transparent p-6 rounded-xl border border-orange-500/20">
            <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Clinical Recommendations
            </h3>
            
            <div className="space-y-4">
              {analysis.recommendations.immediate_actions && analysis.recommendations.immediate_actions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-2">🚨 Immediate Actions:</h4>
                  <div className="bg-red-900/10 border border-red-500/20 p-3 rounded-lg">
                    <ul className="list-disc list-inside text-sm text-red-300 space-y-1">
                      {analysis.recommendations.immediate_actions.map((action: string, idx: number) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {analysis.recommendations.follow_up_imaging && analysis.recommendations.follow_up_imaging.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">📅 Follow-up Imaging:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {analysis.recommendations.follow_up_imaging.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.recommendations.clinical_correlation && analysis.recommendations.clinical_correlation.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">🔬 Clinical Correlation:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {analysis.recommendations.clinical_correlation.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.recommendations.patient_counseling && analysis.recommendations.patient_counseling.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">💬 Patient Counseling:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    {analysis.recommendations.patient_counseling.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confidence Metrics */}
        {analysis.confidence_metrics && (
          <div className="bg-gradient-to-br from-gray-800/50 to-transparent p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Confidence Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <div className="text-3xl font-bold text-teal-400">
                  {(analysis.confidence_metrics.overall_confidence * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">Overall Confidence</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">
                  {(analysis.confidence_metrics.technical_confidence * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">Technical Confidence</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <div className="text-3xl font-bold text-green-400">
                  {(analysis.confidence_metrics.clinical_confidence * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">Clinical Confidence</div>
              </div>
            </div>
          </div>
        )}

        {/* Limitations */}
        {analysis.limitations && analysis.limitations.length > 0 && (
          <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Analysis Limitations:</h4>
            <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
              {analysis.limitations.map((limitation: string, idx: number) => (
                <li key={idx}>{limitation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Processing Stats */}
        {result.upload_stats && (
          <div className="bg-black/30 p-4 rounded-xl border border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>Upload Time: {result.upload_stats.upload_time_seconds}s</div>
              <div>File Size: {result.upload_stats.size_mb} MB</div>
              <div>Technology: {result.upload_stats.technology}</div>
              <div>Orchestration: {result.upload_stats.orchestration}</div>
            </div>
          </div>
        )}

        {/* New Analysis Button */}
        <button
          onClick={handleNewAnalysis}
          className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl font-semibold text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Start New Analysis
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header - always visible */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
              ReadMyMRI Upload
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            {result?.status === 'success' 
              ? 'AI-Powered Medical Imaging Analysis'
              : 'Upload ZIP files containing DICOM series for AI analysis'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            {/* Upload UI - only show when no results */}
            {!result && (
              <>
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

                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors">
                  <input
                    type="file"
                    accept=".zip,application/zip,application/x-zip-compressed,.dcm,.dicom"
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

                {file && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                    <FileCheck className="w-5 h-5" />
                    <span>{file.name} ready ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="mt-8 w-full py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing DICOM Series...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Analyze DICOM Series
                    </>
                  )}
                </button>
              </>
            )}

            {/* Processing Summary - show when we have results */}
            {result && (
              <div className={`p-6 rounded-xl border ${
                result.status === 'success' 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {result.status === 'success' ? '✅ Processing Complete' : '❌ Processing Error'}
                </h3>
                {result.status === 'success' ? (
                  <div className="space-y-2">
                    {/* FIXED: Access metadata directly from result */}
                    <p className="text-green-400">
                      Study ID: <span className="font-mono text-sm">{result.metadata?.study_instance_uid || 'N/A'}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-white/60 text-sm">Files Processed</p>
                        {/* FIXED: Access files_processed directly from result */}
                        <p className="text-2xl font-bold text-white">
                          {result.files_processed || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Processing Status</p>
                        <p className="text-sm text-green-400 mt-1">
                          ✅ PHI Removed<br/>
                          ✅ Data Encrypted<br/>
                          ✅ AI Analysis {result.ai_analysis && Object.keys(result.ai_analysis).length > 0 ? 'Complete' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    {/* FIXED: Access metadata directly from result */}
                    {result.metadata && (
                      <div className="mt-3 pt-3 border-t border-green-500/20">
                        <p className="text-xs text-gray-400">
                          Modality: {result.metadata.modality} • 
                          Body Part: {result.metadata.body_part_examined} • 
                          Series: {result.metadata.series_number}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-red-400">{result.message}</p>
                )}
              </div>
            )}

            {/* AI Analysis Results */}
            {result?.status === 'success' && renderAIAnalysis()}
          </div>

          {/* Info cards - only show when no results */}
          {!result && (
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
          )}
        </div>
      </div>
    </div>
  );
}