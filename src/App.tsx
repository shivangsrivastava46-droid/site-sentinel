import { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { LandingHero } from './components/landing/LandingHero';
import { SpellScannerView } from './components/scanner/SpellScannerView';
import { ThreatFindingsView } from './components/findings/ThreatFindingsView';
import { initialRequests } from './services/mockData';
import type { HttpRequestItem } from './types/security';

export function App() {
  const [requests, setRequests] = useState<HttpRequestItem[]>(initialRequests);
  const [currentView, setCurrentView] = useState<'landing' | 'hall' | 'findings'>('landing');

  const totalInspected = requests.length;
  const threatsDetected = requests.filter((r) => r.status === 'SUSPICIOUS').length;
  const requestsAllowed = requests.filter((r) => r.status === 'SAFE').length;

  const handleAddFinding = (newItem: HttpRequestItem) => {
    setRequests((prev) => [newItem, ...prev]);
  };

  const handleInspectInScanner = (_raw: string) => {
    setCurrentView('hall');
  };

  return (
    <div className="min-h-screen bg-[#060812] text-[#f7eed7] flex flex-col font-sans select-none">
      {/* Minimal 3-link Navigation */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main View Port */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingHero
            onEnter={() => setCurrentView('hall')}
            onScan={() => setCurrentView('hall')}
          />
        )}

        {currentView === 'hall' && (
          <SpellScannerView
            onAddFinding={handleAddFinding}
            totalInspected={totalInspected}
            threatsDetected={threatsDetected}
            requestsAllowed={requestsAllowed}
          />
        )}

        {currentView === 'findings' && (
          <ThreatFindingsView
            findings={requests}
            onInspectInScanner={handleInspectInScanner}
          />
        )}
      </main>
    </div>
  );
}

export default App;
