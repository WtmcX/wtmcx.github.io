import React, { useState } from 'react';
import { Play, Settings, Users, Github, ChevronDown } from 'lucide-react';

interface ClientVersion {
  id: string;
  name: string;
  version: string;
  description: string;
  gameUrl: string;
}

const availableClients: ClientVersion[] = [
  {
    id: 'vanilla-1.5.2',
    name: 'Vanilla',
    version: '1.5.2',
    description: 'Original Eaglercraft experience',
    gameUrl: '/clients/vanilla/1.5.2/index.html'
  },
  {
    id: 'beta-1.3',
    name: 'Beta',
    version: '1.3',
    description: 'Classic Beta experience',
    gameUrl: '/clients/beta/1.3/index.html'
  },
  {
    id: 'resent-1.5.2',
    name: 'Resent Client',
    version: '1.5.2',
    description: 'Enhanced features and optimizations',
    gameUrl: '/clients/resent/1.5.2/index.html'
  },
  {
    id: 'sigma-1.5.2',
    name: 'Sigma Client',
    version: '1.5.2',
    description: 'PvP focused client',
    gameUrl: '/clients/sigma/1.5.2/index.html'
  }
];

function App() {
  const [username, setUsername] = useState('Player');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientVersion>(availableClients[0]);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

  const handleLaunch = () => {
    setIsLoading(true);
    
    // Store the username in localStorage for the game client to use
    localStorage.setItem('minecraft_username', username);
    
    // Redirect to the selected client's HTML file
    setTimeout(() => {
      window.location.href = selectedClient.gameUrl;
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl border border-white/20">
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=128&h=128&fit=crop"
            alt="Minecraft Logo"
            className="w-16 h-16 rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold ml-4 text-white">Eaglercraft</h1>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
              placeholder="Enter username"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
              className="w-full bg-white/5 text-white py-2 px-4 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold">{selectedClient.name}</span>
                <span className="text-sm text-gray-400">Version {selectedClient.version}</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform ${isClientDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isClientDropdownOpen && (
              <div className="absolute w-full mt-2 bg-gray-800/95 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl z-10">
                {availableClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client);
                      setIsClientDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${
                      selectedClient.id === client.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{client.name}</span>
                      <span className="text-sm text-gray-400">Version {client.version}</span>
                      <span className="text-xs text-gray-500 mt-1">{client.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLaunch}
            disabled={isLoading || !username.trim()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <Play size={20} />
            <span>{isLoading ? 'Launching...' : 'Play Game'}</span>
          </button>

          <div className="flex space-x-2">
            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <a
              href="https://github.com/LAX1DUDE/eaglercraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-300">
          <p>Not affiliated with Mojang Studios</p>
        </div>
      </div>
    </div>
  );
}

export default App;