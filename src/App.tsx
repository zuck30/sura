import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EditorForm from './components/editor/EditorForm';
import PreviewCanvas from './components/preview/PreviewCanvas';
import { useCardStore } from './stores/cardStore';

function App() {
  const { rtlEnabled, language } = useCardStore();
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  return (
    <div className="min-h-screen" dir={rtlEnabled ? 'rtl' : 'ltr'}>
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary opacity-90" />
      
      {/* Glassmorphic floating orbs decoration */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Editor */}
            <div className="glass-card p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl animate-slide-up">
              <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('single')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
                    activeTab === 'single'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Single Card
                </button>
                <button
                  onClick={() => setActiveTab('batch')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
                    activeTab === 'batch'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Batch Generate
                </button>
              </div>
              
              {activeTab === 'single' ? <EditorForm /> : <BatchGenerator />}
            </div>
            
            {/* Right Column - Preview */}
            <div className="glass-card p-6 lg:p-8 transition-all duration-300 animate-slide-up delay-100">
              <PreviewCanvas />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;