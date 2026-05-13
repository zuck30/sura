import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EditorForm from './components/editor/EditorForm';
import BatchGenerator from './components/editor/BatchGenerator';
import PreviewCanvas from './components/preview/PreviewCanvas';
import { useCardStore } from './stores/cardStore';

function App() {
  const { rtlEnabled } = useCardStore();
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  return (
    <div className="min-h-screen bg-white" dir={rtlEnabled ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Editor */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
            <div className="flex gap-4 mb-6 border-b border-gray-200 pb-4">
              <button
                onClick={() => setActiveTab('single')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  activeTab === 'single'
                    ? 'bg-[#002966] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#002966] hover:bg-gray-50'
                }`}
              >
                Single Card
              </button>
              <button
                onClick={() => setActiveTab('batch')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  activeTab === 'batch'
                    ? 'bg-[#002966] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#002966] hover:bg-gray-50'
                }`}
              >
                Batch Generate
              </button>
            </div>
            
            {activeTab === 'single' ? <EditorForm /> : <BatchGenerator />}
          </div>
          
          {/* Right Column - Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
            <PreviewCanvas />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;