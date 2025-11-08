// Simple Chatbot Implementation
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.createChatbot();
    this.setupResponses();
  }

  createChatbot() {
    const chatbot = document.createElement('div');
    chatbot.id = 'chatbot';
    chatbot.innerHTML = `
      <div class="chatbot-button" id="chatbotToggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div class="chatbot-window" id="chatbotWindow">
        <div class="chatbot-header">
          <h3>OMBALAJI Infra Support</h3>
          <button class="chatbot-close" id="chatbotClose">×</button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
          <div class="chatbot-message bot-message">
            <p>Hello! I'm here to help you with information about OMBALAJI Infra Solution. How can I assist you today?</p>
          </div>
        </div>
        <div class="chatbot-input-container">
          <input type="text" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
          <button id="chatbotSend">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(chatbot);

    // Event listeners
    document.getElementById('chatbotToggle').addEventListener('click', () => this.toggle());
    document.getElementById('chatbotClose').addEventListener('click', () => this.close());
    document.getElementById('chatbotSend').addEventListener('click', () => this.sendMessage());
    document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  setupResponses() {
    this.responses = {
      'hello': 'Hello! How can I help you with OMBALAJI Infra Solution today?',
      'hi': 'Hi! Welcome to OMBALAJI Infra. How can I assist you?',
      'services': 'We offer Road & Highway Construction, Highway Maintenance, Road Signage & Traffic Systems, and Civil Construction & Utilities. Would you like details on any specific service?',
      'contact': 'You can reach us at:\n📧 Email: ombalaji.ltd@gmail.com\n📱 Phone: +91 7302061615, +91 9997848591, +91 9412257798\n📍 Address: C-066, Sector-36, Greater Noida, UP 201301',
      'projects': 'We have executed numerous infrastructure projects across India including highway construction, road signage, maintenance projects in Uttar Pradesh, Rajasthan, West Bengal, and Delhi.',
      'address': 'Our registered address is: C-066, SECTOR-36, GREATER NOIDA, GAUTAM BUDH NAGAR, Noida, Gautam Buddha Nagar, Uttar Pradesh, India 201301',
      'email': 'You can email us at: ombalaji.ltd@gmail.com',
      'phone': 'Contact us at:\n+91 7302061615\n+91 9997848591\n+91 9412257798',
      'cin': 'Our CIN is: U42101UP2025PTC214899',
      'company': 'OMBALAJI INFRA SOLUTION PRIVATE LIMITED is a private company incorporated in 2025, registered under RoC-Kanpur. We specialize in infrastructure construction and maintenance projects across India.',
      'default': 'I understand you\'re asking about "${this.lastQuery}". For more specific information, please contact us at ombalaji.ltd@gmail.com or call +91 7302061615. You can also visit our website sections for detailed information.'
    };
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbotWindow');
    if (this.isOpen) {
      window.classList.add('active');
      document.getElementById('chatbotInput').focus();
    } else {
      window.classList.remove('active');
    }
  }

  close() {
    this.isOpen = false;
    document.getElementById('chatbotWindow').classList.remove('active');
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim().toLowerCase();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Get bot response
    setTimeout(() => {
      const response = this.getResponse(message);
      this.addMessage(response, 'bot');
    }, 500);
  }

  addMessage(text, type) {
    const messages = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}-message`;
    const p = document.createElement('p');
    p.textContent = text;
    messageDiv.appendChild(p);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  getResponse(query) {
    this.lastQuery = query;
    for (const [key, value] of Object.entries(this.responses)) {
      if (query.includes(key)) {
        return value;
      }
    }
    return this.responses.default.replace('"${this.lastQuery}"', query);
  }
}

// Initialize chatbot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Chatbot());
} else {
  new Chatbot();
}

