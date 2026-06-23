import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

const ResultDisplay = ({ seedParams, onReset }) => {
  const [seed, setSeed] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock AI Generator logic based on parameters
  const generateMockSeed = ({ genre, setting, tone }) => {
    const templates = [
      `The air in ${setting} hung heavy with a ${tone.toLowerCase()} atmosphere. A lone figure stepped into the light, holding an object that didn't belong in this ${genre.toLowerCase()} world. Their presence immediately shifted the balance of power, forcing an unlikely alliance to form before the encroaching darkness could consume everything they held dear.`,
      `Life in ${setting} was never simple, but today was different. A sudden betrayal fractured the community, leaving a trail of ${tone.toLowerCase()} whispers. In this classic ${genre.toLowerCase()} tale of revenge, the protagonist must navigate a labyrinth of lies and confront their own past to stop a chain reaction that could destroy them all.`,
      `It started as a normal cycle in ${setting}, until the anomaly appeared. The ${tone.toLowerCase()} energy radiating from it caused memories to warp and reality to bend. As a definitive ${genre.toLowerCase()} crisis unfolds, one reluctant hero holds the key to stabilizing the core, provided they can survive the secrets hidden within.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  useEffect(() => {
    const generatedText = generateMockSeed(seedParams);
    let i = 0;
    setSeed('');
    setIsTyping(true);

    // Typing effect simulation
    const typingInterval = setInterval(() => {
      if (i < generatedText.length) {
        setSeed(prev => prev + generatedText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20); // ms per character

    return () => clearInterval(typingInterval);
  }, [seedParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(seed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center gap-4 text-light/50 text-sm font-medium mb-6">
        <span className="bg-white/10 px-3 py-1 rounded-full">{seedParams.genre}</span>
        <span>•</span>
        <span className="bg-white/10 px-3 py-1 rounded-full">{seedParams.setting}</span>
        <span>•</span>
        <span className="bg-white/10 px-3 py-1 rounded-full">{seedParams.tone}</span>
      </div>

      <div className="glass-panel p-8 relative min-h-[200px]">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-xl m-4 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl m-4 opacity-50"></div>

        <p className="text-xl md:text-2xl leading-relaxed text-light/90 font-medium">
          {seed}
          {isTyping && <span className="inline-block w-2 h-6 bg-accent ml-1 animate-pulse"></span>}
        </p>
      </div>

      {!isTyping && (
        <div className="flex justify-center gap-4 pt-4 animate-fade-in">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-light"
          >
            {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg transition-all hover:scale-105 active:scale-95 text-white font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
