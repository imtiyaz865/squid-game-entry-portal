
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EntryInterfaceProps {
  onPlayerRegistered: (name: string, playerId: string) => void;
}

const EntryInterface: React.FC<EntryInterfaceProps> = ({ onPlayerRegistered }) => {
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showChair, setShowChair] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowChair(true), 500);
    setTimeout(() => setShowForm(true), 2000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const playerId = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
      onPlayerRegistered(name, playerId);
    }
  };

  return (
    <div className="min-h-screen bg-squid-dark flex items-center justify-center relative overflow-hidden">
      {/* Spotlight Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-spotlight"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-8xl font-squid text-squid-red rotate-12">○</div>
        <div className="absolute top-20 right-20 text-8xl font-squid text-squid-red -rotate-12">△</div>
        <div className="absolute bottom-20 left-20 text-8xl font-squid text-squid-red rotate-45">□</div>
        <div className="absolute bottom-10 right-10 text-8xl font-squid text-squid-red -rotate-45">○</div>
      </div>

      {/* Main Content */}
      <div className="z-10 text-center space-y-8">
        {/* Chair Animation */}
        <div className={`transition-all duration-2000 ${showChair ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative w-32 h-40 mx-auto mb-8">
            {/* Chair Back */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-sm border-2 border-gray-500"></div>
            {/* Chair Seat */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm border-2 border-gray-500"></div>
            {/* Chair Legs */}
            <div className="absolute bottom-0 left-2 w-1 h-8 bg-gray-600"></div>
            <div className="absolute bottom-0 right-2 w-1 h-8 bg-gray-600"></div>
            <div className="absolute bottom-0 left-6 w-1 h-8 bg-gray-600"></div>
            <div className="absolute bottom-0 right-6 w-1 h-8 bg-gray-600"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-squid-red/20 blur-xl rounded-full"></div>
          </div>
        </div>

        {/* Screen Interface */}
        <div className={`transition-all duration-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-black/80 border-2 border-squid-red rounded-lg p-8 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-squid text-squid-neon animate-pulse">
                  PLAYER REGISTRATION
                </h1>
                <p className="text-squid-red font-squid text-lg">
                  You've been selected...
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white font-squid text-sm uppercase tracking-wider">
                    ENTER YOUR NAME
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/50 border-squid-red text-white font-squid text-center text-xl py-6 squid-cursor"
                    placeholder="Player Name"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-squid-neon hover:bg-squid-red text-black font-squid text-xl py-6 transition-all duration-300 hover:shadow-[0_0_30px_#FF0040] squid-cursor"
                  disabled={!name.trim()}
                >
                  REGISTER AS PLAYER
                </Button>
              </form>

              {/* Warning */}
              <div className="text-center text-gray-400 text-sm font-squid animate-pulse">
                By registering, you agree to participate in the games...
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Sound Text */}
        <div className="absolute bottom-4 left-4 text-gray-600 text-xs font-squid">
          🔊 Ambient: Machinery sounds detected...
        </div>
      </div>
    </div>
  );
};

export default EntryInterface;
