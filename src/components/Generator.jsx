import React, { useState } from 'react';
import { Compass, MapPin, Heart, Wand2 } from 'lucide-react';

const GENRES = ['Sci-Fi', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Horror'];
const SETTINGS_MAP = {
  'Sci-Fi': ['Neon-lit Cyber City', 'Derelict Space Station', 'Mars Colony Alpha', 'Dystopian Mega-corp HQ', 'Alien Jungle'],
  'Fantasy': ['Elven Floating City', 'Dragon-scorched Ruins', 'Enchanted Whispering Woods', 'Underground Dwarf Kingdom', 'Mage Academy'],
  'Mystery': ['Foggy Victorian Streets', 'Abandoned Asylum', 'Locked Room in a Mansion', 'Sleepy Seaside Town', 'Night Train'],
  'Romance': ['Parisian Cafe in the Rain', 'Royal Masquerade Ball', 'Cozy Mountain Cabin', 'Rooftop Garden at Sunset', 'Small Town Bakery'],
  'Thriller': ['Isolated Research Facility', 'Crowded Subway during Rush Hour', 'Safehouse in the Woods', 'High-security Prison', 'Abandoned Warehouse'],
  'Horror': ['Haunted Orphanage', 'Deep Deep Woods', 'Cursed Carnival', 'Suburban House with a Secret', 'Morgue at Midnight']
};
const TONES = ['Tense', 'Melancholic', 'Joyful', 'Eerie', 'Whimsical', 'Gritty', 'Hopeful'];

const Generator = ({ onGenerate }) => {
  const [genre, setGenre] = useState(GENRES[0]);
  const [setting, setSetting] = useState(SETTINGS_MAP[GENRES[0]][0]);
  const [customSetting, setCustomSetting] = useState('');
  const [tone, setTone] = useState(TONES[0]);

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
    setSetting(SETTINGS_MAP[newGenre][0]);
    setCustomSetting('');
  };

  const handleGenerate = () => {
    const finalSetting = setting === 'Other' ? customSetting : setting;
    onGenerate({ genre, setting: finalSetting, tone });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold neon-text">Seed Parameters</h2>
        <p className="text-light/60">Configure the variables for your next story.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Genre Selection */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <Compass className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Genre</h3>
          </div>
          <div className="space-y-2">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => handleGenreChange(g)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${genre === g ? 'bg-primary text-white border border-primary' : 'bg-dark/50 text-light/70 hover:bg-white/10'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Setting Selection */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <MapPin className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Setting</h3>
          </div>
          <div className="space-y-2">
            {SETTINGS_MAP[genre].map(s => (
              <button
                key={s}
                onClick={() => { setSetting(s); setCustomSetting(''); }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${setting === s ? 'bg-primary text-white border border-primary' : 'bg-dark/50 text-light/70 hover:bg-white/10'}`}
              >
                {s}
              </button>
            ))}
            <button
                onClick={() => setSetting('Other')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${setting === 'Other' ? 'bg-primary text-white border border-primary' : 'bg-dark/50 text-light/70 hover:bg-white/10'}`}
              >
                Other (Custom)
            </button>
            {setting === 'Other' && (
              <input
                type="text"
                placeholder="Type your own setting..."
                value={customSetting}
                onChange={(e) => setCustomSetting(e.target.value)}
                className="w-full bg-dark/80 border border-white/20 rounded-lg py-2 px-4 mt-2 text-light focus:outline-none focus:border-accent"
              />
            )}
          </div>
        </div>

        {/* Tone Selection */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-white">Emotional Tone</h3>
          </div>
          <div className="space-y-2">
            {TONES.map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${tone === t ? 'bg-primary text-white border border-primary' : 'bg-dark/50 text-light/70 hover:bg-white/10'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleGenerate}
          disabled={setting === 'Other' && !customSetting.trim()}
          className="group relative px-12 py-4 bg-gradient-to-r from-accent to-primary rounded-full text-xl font-bold text-white transition-all hover:scale-105 active:scale-95 animate-glow flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:animate-none"
        >
          <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          Generate Seed
        </button>
      </div>
    </div>
  );
};

export default Generator;
