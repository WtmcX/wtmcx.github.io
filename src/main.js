const availableClients = [
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

let selectedClient = availableClients[0];
let isLoading = false;

// DOM Elements
const clientSelector = document.getElementById('clientSelector');
const clientDropdown = document.getElementById('clientDropdown');
const dropdownArrow = document.getElementById('dropdownArrow');
const usernameInput = document.getElementById('username');
const playButton = document.getElementById('playButton');
const playButtonText = document.getElementById('playButtonText');
const selectedClientName = document.getElementById('selectedClientName');
const selectedClientVersion = document.getElementById('selectedClientVersion');

// Populate dropdown content
function createClientButton(client) {
  const button = document.createElement('button');
  button.className = `w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${
    selectedClient.id === client.id ? 'bg-white/10' : ''
  }`;
  
  button.innerHTML = `
    <div class="flex flex-col">
      <span class="font-semibold text-white">${client.name}</span>
      <span class="text-sm text-gray-400">Version ${client.version}</span>
      <span class="text-xs text-gray-500 mt-1">${client.description}</span>
    </div>
  `;
  
  button.addEventListener('click', () => {
    selectedClient = client;
    selectedClientName.textContent = client.name;
    selectedClientVersion.textContent = `Version ${client.version}`;
    toggleDropdown();
    updateDropdownButtons();
  });
  
  return button;
}

function updateDropdownButtons() {
  clientDropdown.innerHTML = '';
  availableClients.forEach(client => {
    clientDropdown.appendChild(createClientButton(client));
  });
}

// Toggle dropdown
function toggleDropdown() {
  const isHidden = clientDropdown.classList.contains('hidden');
  clientDropdown.classList.toggle('hidden', !isHidden);
  dropdownArrow.classList.toggle('rotate-180', !isHidden);
}

// Event Listeners
clientSelector.addEventListener('click', toggleDropdown);

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!clientSelector.contains(event.target)) {
    clientDropdown.classList.add('hidden');
    dropdownArrow.classList.remove('rotate-180');
  }
});

// Handle username input
usernameInput.addEventListener('input', (e) => {
  playButton.disabled = !e.target.value.trim();
  playButton.classList.toggle('opacity-50', !e.target.value.trim());
});

// Handle game launch
playButton.addEventListener('click', () => {
  if (isLoading || !usernameInput.value.trim()) return;
  
  isLoading = true;
  playButtonText.textContent = 'Launching...';
  playButton.disabled = true;
  
  // Store username in localStorage
  localStorage.setItem('minecraft_username', usernameInput.value.trim());
  
  // Redirect to game client
  setTimeout(() => {
    window.location.href = selectedClient.gameUrl;
  }, 500);
});

// Initialize dropdown
updateDropdownButtons();