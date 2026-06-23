import React, { useState, useEffect } from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import Hero from './components/Hero';
import AuthModal from './components/AuthModal';
import Generator from './components/Generator';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [appState, setAppState] = useState('hero'); // 'hero', 'generator', 'result'
  const [seedParams, setSeedParams] = useState(null);

  // Check for existing user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('storySeedsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('storySeedsUser', JSON.stringify(userData));
    setShowAuth(false);
    if (appState === 'hero') {
      setAppState('generator');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('storySeedsUser');
    setAppState('hero');
  };

  const handleStartStory = () => {
    if (user) {
      setAppState('generator');
    } else {
      setShowAuth(true);
    }
  };

  const handleGenerateSeed = (params) => {
    setSeedParams(params);
    setAppState('result');
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-accent/30 selection:text-white">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center z-40 bg-dark/50 backdrop-blur-md border-b border-white/5 sticky top-0">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setAppState('hero')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(244,114,182,0.5)]">
            <span className="font-bold text-white text-xl leading-none">S</span>
          </div>
          <span className="text-2xl font-bold tracking-wide text-white">Story Seeds</span>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-light">{user.writerName}</span>
                <span className="text-xs text-accent font-mono">{user.writerId}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary border-2 border-primary flex items-center justify-center relative group">
                <UserCircle className="w-6 h-6 text-light/80" />
                
                {/* Dropdown */}
                <div className="absolute top-12 right-0 bg-secondary border border-white/10 rounded-lg p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded-md w-full whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <UserCircle className="w-5 h-5" />
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col justify-center">
        {appState === 'hero' && <Hero onStart={handleStartStory} />}
        {appState === 'generator' && <Generator onGenerate={handleGenerateSeed} />}
        {appState === 'result' && <ResultDisplay seedParams={seedParams} onReset={() => setAppState('generator')} />}
      </main>

      {/* Auth Modal overlay */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}

    </div>
  );
}

export default App;
