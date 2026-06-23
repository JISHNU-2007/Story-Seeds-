import React from 'react';
import { Sparkles, PenTool, UserCircle } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-3xl space-y-8 glass-panel p-12 mt-12">
        <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium tracking-wider text-light/80 uppercase">AI-Powered Inspiration</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-light via-white to-light/70 neon-text">
          Overcome the <br/> Blank Page
        </h1>

        <p className="text-lg md:text-xl text-light/70 max-w-2xl mx-auto leading-relaxed">
          Story Seeds generates short, tension-rich story prompts from communities, places, or situations, helping writers spark their imagination and start writing instantly.
        </p>

        <div className="pt-8 flex flex-col items-center space-y-6">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full text-xl font-bold text-white transition-all hover:scale-105 active:scale-95 animate-glow flex items-center gap-3 shadow-lg shadow-primary/50"
          >
            <PenTool className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Create a Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
