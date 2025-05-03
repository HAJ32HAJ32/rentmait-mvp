'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export function FileUpload({ onFileUpload, isLoading = false }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      await onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      await onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-4">
      <Card 
        className={`p-6 border-2 border-dashed transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div
          className="flex flex-col items-center justify-center space-y-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            disabled={isLoading}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer flex flex-col items-center space-y-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="text-gray-600 text-center">
              {selectedFile 
                ? 'File selected. Click to choose a different file.'
                : 'Click or drag your tenancy agreement here (PDF or DOC)'}
            </p>
            <p className="text-sm text-gray-500">
              Maximum file size: 5MB
            </p>
          </label>
        </div>
      </Card>

      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{selectedFile.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
} 