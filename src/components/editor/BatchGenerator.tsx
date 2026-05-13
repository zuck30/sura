import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download } from 'lucide-react';
import Papa from 'papaparse';
import JSZip from 'jszip';

const BatchGenerator: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          console.log('CSV parsed:', results.data);
          // Here would generate multiple cards
          // For now, show alert
          alert(`Found ${results.data.length} rows. Batch generation coming soon!`);
          setIsProcessing(false);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <FileSpreadsheet className="w-12 h-12 text-white/40 mx-auto mb-3" />
        <h3 className="text-white/80 font-medium">Batch Generate Cards</h3>
        <p className="text-white/40 text-sm mt-1">
          Upload CSV with columns: name, username, content
        </p>
      </div>

      <label className="block">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          disabled={isProcessing}
          className="hidden"
          id="csv-upload"
        />
        <button
          onClick={() => document.getElementById('csv-upload')?.click()}
          disabled={isProcessing}
          className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload CSV
            </>
          )}
        </button>
      </label>

      <div className="border-t border-white/10 pt-4">
        <p className="text-white/30 text-xs text-center">
          Download template CSV to get started
        </p>
      </div>
    </div>
  );
};

export default BatchGenerator;