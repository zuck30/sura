import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { toPng } from 'html-to-image';
import SuraCard from '../preview/SuraCard';
import { useCardStore } from '../../stores/cardStore';

const BatchGenerator: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [batchData, setBatchData] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const store = useCardStore();

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStatus('processing');
      setIsProcessing(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          if (results.data.length === 0) {
            setStatus('error');
            setIsProcessing(false);
            return;
          }
          setBatchData(results.data);
          setProgress({ current: 0, total: results.data.length });
          setIsProcessing(false);
        },
        error: (error) => {
          console.error('CSV Parsing Error:', error);
          setStatus('error');
          setIsProcessing(false);
        }
      });
    }
  };

  const generateBatch = async () => {
    if (batchData.length === 0 || !cardContainerRef.current) return;

    setIsProcessing(true);
    const zip = new JSZip();
    const folder = zip.folder("sura_cards");

    try {
      for (let i = 0; i < batchData.length; i++) {
        setProgress({ current: i + 1, total: batchData.length });

        // Wait for next tick to allow DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));

        const cardElement = cardContainerRef.current.children[0] as HTMLDivElement;
        const dataUrl = await toPng(cardElement, {
          quality: 1,
          pixelRatio: 2,
        });

        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        folder?.file(`card_${i + 1}.png`, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `sura_batch_${new Date().getTime()}.zip`;
      link.click();
      setStatus('completed');
    } catch (error) {
      console.error('Batch generation failed:', error);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "name,username,content\nJohn Doe,johndoe,Hello from Sura!\nJane Smith,janesmith,Creating beautiful cards is easy.";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "sura_template.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <FileSpreadsheet className="w-12 h-12 text-[#002966]/40 mx-auto mb-3" />
        <h3 className="text-gray-800 font-medium text-lg">Batch Generate Cards</h3>
        <p className="text-gray-500 text-sm mt-1">
          Upload CSV with columns: name, username, content
        </p>
      </div>

      <div className="space-y-4">
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
            className="w-full py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {batchData.length > 0 ? 'Change CSV' : 'Upload CSV'}
          </button>
        </label>

        {batchData.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                {batchData.length} cards ready to generate
              </span>
              {status === 'completed' && (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </span>
              )}
            </div>

            {isProcessing && (
              <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            )}

            <button
              onClick={generateBatch}
              disabled={isProcessing}
              className="w-full py-3 rounded-lg bg-[#002966] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#001a4d] transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating ({progress.current}/{progress.total})
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download ZIP
                </>
              )}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm justify-center">
            <AlertCircle className="w-4 h-4" />
            Something went wrong. Please check your CSV.
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-6">
        <button
          onClick={downloadTemplate}
          className="w-full text-blue-600 text-xs font-medium hover:underline"
        >
          Download template CSV to get started
        </button>
      </div>

      {/* Hidden card for rendering */}
      <div className="fixed -left-[2000px] top-0 overflow-hidden" ref={cardContainerRef}>
        {isProcessing && batchData[progress.current - 1] && (
          <SuraCard
            data={{
              ...store,
              name: batchData[progress.current - 1].name,
              username: batchData[progress.current - 1].username,
              content: batchData[progress.current - 1].content,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BatchGenerator;