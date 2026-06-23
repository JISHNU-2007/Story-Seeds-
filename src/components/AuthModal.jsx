import React, { useState } from 'react';
import { X, User, Mail, Calendar, Info, Hash } from 'lucide-react';

const AuthModal = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    writerName: '',
    writerNumber: '',
    dob: '',
    email: '',
    basicInfo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Auto-generate Writer ID
      const writerId = `WR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      onLogin({ ...formData, writerId });
    } else {
      // Mock login
      onLogin({ writerName: formData.writerName || 'Guest Writer', writerId: 'WR-DEMO' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md p-8 relative animate-slide-up border-accent/20">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-light/50 hover:text-light transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-2 neon-text">
          {isSignUp ? 'Join the Guild' : 'Welcome Back'}
        </h2>
        <p className="text-center text-light/60 mb-8">
          {isSignUp ? 'Create your writer profile.' : 'Sign in to access your seeds.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-light/40" />
              <input
                type="text"
                name="writerName"
                placeholder={isSignUp ? "Writer Name" : "Writer ID or Name"}
                required
                value={formData.writerName}
                onChange={handleChange}
                className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-light focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {isSignUp && (
              <>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-5 h-5 text-light/40" />
                  <input
                    type="text"
                    name="writerNumber"
                    placeholder="Preferred Writer Number"
                    value={formData.writerNumber}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-light focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-light/40" />
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-light/60 focus:text-light focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-light/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-light focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="relative">
                  <Info className="absolute left-3 top-3 w-5 h-5 text-light/40" />
                  <textarea
                    name="basicInfo"
                    placeholder="Tell us a bit about your writing style..."
                    rows="2"
                    value={formData.basicInfo}
                    onChange={handleChange}
                    className="w-full bg-dark/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-light focus:outline-none focus:border-accent transition-colors resize-none"
                  ></textarea>
                </div>
              </>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-primary to-accent rounded-lg font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            {isSignUp ? 'Generate Writer ID & Join' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-light/60 hover:text-accent transition-colors"
          >
            {isSignUp ? 'Already have an ID? Sign In' : "Don't have an ID? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
