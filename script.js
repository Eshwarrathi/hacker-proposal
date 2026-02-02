// Initialize database in localStorage
const DB_KEY = 'proposal_responses';

// Get or create database
function getDatabase() {
  const db = localStorage.getItem(DB_KEY);
  return db ? JSON.parse(db) : [];
}

// Save response to database
function saveToDatabase(response) {
  const db = getDatabase();
  const entry = {
    id: Date.now(),
    answer: response,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  db.push(entry);
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  return entry;
}

// View database (for console)
function viewDatabase() {
  const db = getDatabase();
  console.table(db);
  return db;
}

// Particle System
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = Math.random() * 3 + 4 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Floating Hearts
function createFloatingHearts() {
  const heartsContainer = document.getElementById('hearts-container');
  const hearts = ['💚', '💕', '💖', '💗', '💓', '💝'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
  }, 800);
}

// Loading Screen
const loadingMessages = [
  'Initializing feelings.exe...',
  'Compiling emotions...',
  'Loading memories...',
  'Encrypting love messages...',
  'Preparing something special...',
  'Almost ready...'
];

let messageIndex = 0;
function typeLoadingMessage() {
  const typingElement = document.querySelector('.typing-text');
  const message = loadingMessages[messageIndex];
  let charIndex = 0;
  
  typingElement.textContent = '';
  
  const typeInterval = setInterval(() => {
    if (charIndex < message.length) {
      typingElement.textContent += message[charIndex];
      charIndex++;
    } else {
      clearInterval(typeInterval);
      messageIndex++;
      if (messageIndex < loadingMessages.length) {
        setTimeout(typeLoadingMessage, 500);
      }
    }
  }, 50);
}

// Terminal Animation
const terminalMessages = [
  '>> System Boot initiated...',
  '>> Loading core modules...',
  '>> Accessing emotion_database.db...',
  '>> SELECT * FROM feelings WHERE person = "My Detective";',
  '>> Query returned: LOVE = TRUE ❤️',
  '>> Executing heartbeat_check()...',
  '>> Status: Racing 💓',
  '>> Scanning memories...',
  '>> Found: 1,000,000+ beautiful moments',
  '>> Processing compatibility...',
  '>> Result: PERFECT MATCH ✓',
  '>> Initializing courage_protocol.exe...',
  '>> Generating confession.txt...',
  '>> Encryption: NONE (Being completely honest)',
  '>> Preparing to send message...',
  '>> Message ready for delivery...',
  '',
  '╔══════════════════════════════════════╗',
  '║  INITIATING PROPOSAL SEQUENCE...     ║',
  '╚══════════════════════════════════════╝',
  ''
];

let terminalIndex = 0;
let charIndex = 0;

function typeTerminalLine() {
  const terminalContent = document.getElementById('terminal-content');
  const currentMessage = terminalMessages[terminalIndex];
  
  if (charIndex < currentMessage.length) {
    terminalContent.textContent += currentMessage[charIndex];
    charIndex++;
    setTimeout(typeTerminalLine, 30);
  } else {
    terminalContent.textContent += '\n';
    terminalIndex++;
    charIndex = 0;
    
    if (terminalIndex < terminalMessages.length) {
      setTimeout(typeTerminalLine, 200);
    } else {
      setTimeout(showProposal, 1500);
    }
  }
  
  // Auto scroll
  terminalContent.parentElement.scrollTop = terminalContent.parentElement.scrollHeight;
}

// Show Sections
function hideAllSections() {
  document.getElementById('loading-screen').classList.remove('active');
  document.getElementById('terminal-section').classList.add('hidden');
  document.getElementById('proposal-section').classList.add('hidden');
  document.getElementById('response-section').classList.add('hidden');
}

function showTerminal() {
  hideAllSections();
  document.getElementById('terminal-section').classList.remove('hidden');
  typeTerminalLine();
}

function showProposal() {
  hideAllSections();
  document.getElementById('proposal-section').classList.remove('hidden');
  createConfetti(50);
}

function showResponse(responseType) {
  hideAllSections();
  document.getElementById('response-section').classList.remove('hidden');
  displayResponseMessage(responseType);
}

// Response Messages
const responseMessages = {
  yes: {
    icon: '🎉💚✨',
    title: 'YES!!! 💕',
    message: `
      <div class="response-icon">🎊💚🎊</div>
      <h2 class="response-title">You said YES!</h2>
      <p class="response-message">
        My heart is exploding with joy! 💓<br><br>
        You've just made me the happiest person alive!<br>
        I promise to always be there for you,<br>
        to debug life's problems together,<br>
        and to love you more each day. 💚<br><br>
        <strong style="font-size: 24px;">Thank you for choosing US! 💑</strong><br><br>
        <em>Our beautiful journey begins now... ✨</em>
      </p>
    `
  },
  maybe: {
    icon: '🤔💭',
    title: 'Take Your Time',
    message: `
      <div class="response-icon">💭💝</div>
      <h2 class="response-title">I'll Wait For You</h2>
      <p class="response-message">
        I understand, Detective. 💚<br><br>
        Love isn't rushed, it's felt.<br>
        Take all the time you need to think about it.<br><br>
        Just know that my feelings are real,<br>
        and they're not going anywhere.<br><br>
        Whenever you're ready,<br>
        <strong>I'll be here, waiting with my heart open. 💕</strong><br><br>
        <em>No pressure, just pure love...</em>
      </p>
    `
  },
  no: {
    icon: '😢💔',
    title: 'I Understand...',
    message: `
      <div class="response-icon">💔🥺</div>
      <h2 class="response-title">That Hurts, But...</h2>
      <p class="response-message">
        I respect your decision, Detective. 💚<br><br>
        Even though my heart is breaking,<br>
        I'm grateful for the honesty.<br><br>
        You'll always have a special place in my heart,<br>
        and I'll always cherish the moments we shared.<br><br>
        <strong>If you ever change your mind,</strong><br>
        you know where to find me. 💕<br><br>
        <em>Sometimes love means letting go...</em><br>
        <em>But I'll never stop caring about you. 🌟</em>
      </p>
    `
  }
};

function displayResponseMessage(responseType) {
  const responseContent = document.getElementById('response-content');
  responseContent.innerHTML = responseMessages[responseType].message;
  
  // Create massive confetti for "yes"
  if (responseType === 'yes') {
    createMassiveConfetti();
    playFireworks();
  }
}

// Handle Response
let noButtonClickCount = 0;
function handleResponse(answer) {
  // Special handling for "no" button - make it run away!
  if (answer === 'no') {
    noButtonClickCount++;
    const noBtn = document.getElementById('no-btn');
    
    if (noButtonClickCount < 3) {
      // Make button jump around
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      
      // Change button text
      const messages = [
        "😢 Please don't...",
        "💔 Think about it!",
        "🥺 One more chance?"
      ];
      noBtn.querySelector('.btn-text').textContent = messages[noButtonClickCount - 1];
      return;
    }
  }
  
  // Save to database
  const savedEntry = saveToDatabase(answer);
  console.log('Response saved to database:', savedEntry);
  console.log('View all responses with: viewDatabase()');
  
  // Show response
  showResponse(answer);
  
  // Log to console for admin
  console.log('%c💚 New Response Received! 💚', 'color: #00ff88; font-size: 20px; font-weight: bold;');
  console.log('%c Answer:', 'color: #ffd700; font-weight: bold;', answer);
  console.log('%c Timestamp:', 'color: #00d2ff; font-weight: bold;', savedEntry.date);
  console.log('%c Database ID:', 'color: #ff6b9d; font-weight: bold;', savedEntry.id);
  console.log('%cTo view all responses, type: viewDatabase()', 'color: #a8a8a8; font-style: italic;');
}

// Confetti Effect
function createConfetti(count) {
  const colors = ['#ff6b9d', '#c44569', '#00d2ff', '#00ff88', '#ffd700'];
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

function createMassiveConfetti() {
  const interval = setInterval(() => {
    createConfetti(20);
  }, 200);
  
  setTimeout(() => clearInterval(interval), 5000);
}

// Fireworks Effect (for YES response)
function playFireworks() {
  const fireworksCount = 5;
  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      createFirework();
    }, i * 600);
  }
}

function createFirework() {
  const colors = ['#ff6b9d', '#c44569', '#00d2ff', '#00ff88', '#ffd700'];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.5;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(particle);
    
    let posX = x;
    let posY = y;
    let opacity = 1;
    
    const animate = () => {
      posX += vx * 0.016;
      posY += vy * 0.016 + 150 * 0.016; // gravity
      opacity -= 0.016;
      
      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    
    animate();
  }
}

// Restart Experience
function restartExperience() {
  noButtonClickCount = 0;
  const noBtn = document.getElementById('no-btn');
  noBtn.style.transform = '';
  noBtn.querySelector('.btn-text').textContent = 'Not yet...';
  
  hideAllSections();
  document.getElementById('loading-screen').classList.add('active');
  
  // Reset terminal
  terminalIndex = 0;
  charIndex = 0;
  document.getElementById('terminal-content').textContent = '';
  
  // Restart sequence
  messageIndex = 0;
  setTimeout(() => {
    typeLoadingMessage();
    setTimeout(showTerminal, 4500);
  }, 500);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Create visual effects
  createParticles();
  createFloatingHearts();
  
  // Start loading sequence
  typeLoadingMessage();
  
  // Show terminal after loading
  setTimeout(showTerminal, 4500);
  
  // Make viewDatabase available globally for console access
  window.viewDatabase = viewDatabase;
  
  // Log database info
  console.log('%c💚 Proposal System Initialized 💚', 'color: #00ff88; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
  console.log('%c====================================', 'color: #00d2ff;');
  console.log('%cTo view all responses, type:', 'color: #ffd700; font-weight: bold;');
  console.log('%cviewDatabase()', 'color: #ff6b9d; font-size: 16px; font-family: monospace; background: #1e1e1e; padding: 5px 10px; border-radius: 5px;');
  console.log('%c====================================', 'color: #00d2ff;');
  
  // Show existing responses if any
  const existingResponses = getDatabase();
  if (existingResponses.length > 0) {
    console.log(`%c📊 ${existingResponses.length} response(s) already in database`, 'color: #a8a8a8; font-style: italic;');
  }
});

// Background music control (optional)
const bgMusic = document.getElementById('bgMusic');
document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      // Auto-play might be blocked
    });
  }
}, { once: true });