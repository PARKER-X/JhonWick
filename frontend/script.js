// Main JavaScript for ChatBookLLm Chat Interface
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  // Main UI Elements
  const body = document.body;
  const appContainer = document.querySelector('.app-container');
  const overlay = document.getElementById('overlay');
  const mainContent = document.querySelector('.main-content');
  
  // Header Elements
  const themeToggle = document.getElementById('theme-toggle');
  const settingsToggle = document.getElementById('settings-toggle');
  const tokenCount = document.getElementById('token-count');
  
  // Sidebar Elements
  const sidebar = document.querySelector('.sidebar');
  const navItems = document.querySelectorAll('.nav-item');
  const modelSelector = document.getElementById('model-selector');
  const newChatButton = document.getElementById('new-chat');
  
  // Chat Elements
  const messagesList = document.getElementById('messages-list');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const typingIndicator = document.getElementById('typing-indicator');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  const uploadButton = document.getElementById('upload-button');
  const fileUpload = document.getElementById('file-upload');
  const characterCount = document.getElementById('character-count');
  
  // Settings Panel Elements
  const settingsPanel = document.getElementById('settings-panel');
  const settingsClose = document.getElementById('settings-close');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const themeOptions = document.querySelectorAll('.theme-option');
  const animationLevel = document.getElementById('animation-level');
  const perspectiveToggle = document.getElementById('perspective-toggle');
  const cursorToggle = document.getElementById('cursor-toggle');
  const bgEffectsToggle = document.getElementById('bg-effects-toggle');
  const sizeButtons = document.querySelectorAll('.size-button');
  const fontFamily = document.getElementById('font-family');
  const responseLength = document.getElementById('response-length');
  const creativitySlider = document.getElementById('creativity-slider');
  const modelCards = document.querySelectorAll('.model-card');
  
  // Theme Panel Elements
  const themePanel = document.getElementById('theme-panel');
  const themePanelClose = document.getElementById('theme-panel-close');
  const themeItems = document.querySelectorAll('.theme-item');
  const primaryColorPicker = document.getElementById('primary-color');
  const secondaryColorPicker = document.getElementById('secondary-color');
  const accentColorPicker = document.getElementById('accent-color');
  const applyCustomThemeBtn = document.getElementById('apply-custom-theme');
  
  // Chat Control Elements
  const extendedThinkingToggle = document.getElementById('extended-thinking-toggle');
  const memoryToggle = document.getElementById('memory-toggle');
  const citationsToggle = document.getElementById('citations-toggle');
  
  // Custom Cursor
  const neoCursor = document.querySelector('.neo-cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorDot = document.querySelector('.cursor-dot');
  
  // Background Elements
  const bgElements = document.querySelector('.bg-elements');
  
  // State Variables
  let currentTheme = 'pulse';
  let isAiTyping = false;
  let aiResponseTimeout = null;
  let userTokens = 87420;
  let selectedModel = 'pulse-ultra';
  let extendedThinking = false;
  let memoryEnabled = true;
  let citationsEnabled = false;
  let currentTab = 'interface';
  let customCursor = true;
  let perspective3d = true;
  let backgroundEffects = true;
  let animationSetting = 'high';
  let textSize = 'medium';
  let currentFont = 'Inter';
  let responseLengthSetting = 'balanced';
  let creativityLevel = 70;
  
  // Response Data - More comprehensive for the enhanced interface
  // const aiResponses = {
  //   'pulse-standard': {
  //     greeting: [
  //       "Hello! I'm ChatBookLLm. How can I assist you today?",
  //       "Welcome to ChatBookLLm AI. What would you like to know?",
  //       "Hi there! I'm your AI assistant. What can I help you with?"
  //     ],
  //     general: [
  //       "I understand your question. Let me analyze that for you.",
  //       "That's an interesting topic. Let me gather some relevant information.",
  //       "I'd be happy to help with that. Here's what I know.",
  //       "I've processed your request and have the following insights."
  //     ],
  //     technical: [
  //       "Let me analyze this technical question for you.",
  //       "I'll work through this step by step for clarity.",
  //       "This is a complex topic. Here's my technical analysis."
  //     ],
  //     creative: [
  //       "I've generated some creative ideas based on your request.",
  //       "Here's a creative approach to your question.",
  //       "I've explored some imaginative possibilities for you."
  //     ],
  //     extended: [
  //       "I'm engaging extended thinking to give you the most accurate answer...",
  //       "This requires deeper analysis. Let me think through this carefully...",
  //       "I'm thoroughly examining multiple perspectives on this complex question..."
  //     ]
  //   },
  //   'pulse-ultra': {
  //     greeting: [
  //       "Welcome! I'm running on ChatBookLLm Ultra, optimized for complex reasoning. How can I assist you today?",
  //       "Hello! You're connected to ChatBookLLm Ultra. I'm designed for advanced problem-solving and nuanced understanding. What would you like to explore?",
  //       "Greetings! I'm your Ultra-powered AI assistant with enhanced reasoning capabilities. What complex question can I help you with?"
  //     ],
  //     general: [
  //       "I'm analyzing your question using my enhanced reasoning capabilities.",
  //       "Let me leverage my advanced processing to provide you with a comprehensive answer.",
  //       "I'm utilizing my optimized neural pathways to deeply understand your question.",
  //       "I'm accessing my expanded knowledge base to give you the most accurate response."
  //     ],
  //     technical: [
  //       "I'm applying specialized technical analysis to your question.",
  //       "Let me break down this technical challenge systematically using my advanced reasoning.",
  //       "I'll leverage my enhanced problem-solving framework to address this technical question."
  //     ],
  //     creative: [
  //       "I'm engaging my creative synthesis capabilities to generate novel perspectives.",
  //       "Let me explore multiple creative dimensions of your request.",
  //       "I'm combining disparate concepts to provide you with unique creative insights."
  //     ],
  //     extended: [
  //       "Activating extended cognition mode to deeply analyze all aspects of this question...",
  //       "I'm performing multi-layered reasoning to ensure the most accurate and nuanced response...",
  //       "Engaging in comprehensive contextual analysis to provide you with the optimal answer..."
  //     ]
  //   },
  //   'pulse-architect': {
  //     greeting: [
  //       "Hello! I'm running Pulse Architect, specialized for technical and code-related tasks. How can I assist with your development needs?",
  //       "Welcome to Pulse Architect! I'm optimized for coding, technical documentation, and system design. What are you working on today?",
  //       "Greetings! You're connected to the Architect model, designed for programming and technical tasks. How can I help you build today?"
  //     ],
  //     technical: [
  //       "Analyzing your technical requirements with specialized algorithms.",
  //       "Let me architect a solution tailored to your technical specifications.",
  //       "I'll develop a structured approach to address this technical challenge."
  //     ],
  //     code: [
  //       "I'll generate efficient and well-documented code for your requirements.",
  //       "Let me develop a clean, optimized implementation for you.",
  //       "I'll design a maintainable code solution with best practices in mind."
  //     ]
  //   }
  // };
  
  // // Default response for any model
  // const defaultResponses = [
  //   "I understand your question. Let me provide a thoughtful response.",
  //   "That's an interesting query. Let me analyze it carefully.",
  //   "I'm processing your request to give you the most helpful information.",
  //   "Let me consider the best approach to answer your question effectively."
  // ];
  
  // Sending promopt


  // === Keep old variable names for CSS compatibility ===
  const aiResponses = {
    'pulse-standard': {
      greeting: [
        "Hello! I'm ChatBookLLm. How can I assist you today?",
        "Welcome to ChatBookLLm AI. What would you like to know?",
        "Hi there! I'm your AI assistant. What can I help you with?"
      ],
      general: [
        "I understand your question. Let me analyze that for you.",
        "That's an interesting topic. Let me gather some relevant information.",
        "I'd be happy to help with that. Here's what I know.",
        "I've processed your request and have the following insights."
      ],
      technical: [
        "Let me analyze this technical question for you.",
        "I'll work through this step by step for clarity.",
        "This is a complex topic. Here's my technical analysis."
      ],
      creative: [
        "I've generated some creative ideas based on your request.",
        "Here's a creative approach to your question.",
        "I've explored some imaginative possibilities for you."
      ],
      extended: [
        "I'm engaging extended thinking to give you the most accurate answer...",
        "This requires deeper analysis. Let me think through this carefully...",
        "I'm thoroughly examining multiple perspectives on this complex question..."
      ]
    },
    'pulse-ultra': {
      greeting: [
        "Welcome! I'm running on ChatBookLLm Ultra, optimized for complex reasoning. How can I assist you today?",
        "Hello! You're connected to ChatBookLLm Ultra. I'm designed for advanced problem-solving and nuanced understanding. What would you like to explore?",
        "Greetings! I'm your Ultra-powered AI assistant with enhanced reasoning capabilities. What complex question can I help you with?"
      ],
      general: [
        "I'm analyzing your question using my enhanced reasoning capabilities.",
        "Let me leverage my advanced processing to provide you with a comprehensive answer.",
        "I'm utilizing my optimized neural pathways to deeply understand your question.",
        "I'm accessing my expanded knowledge base to give you the most accurate response."
      ],
      technical: [
        "I'm applying specialized technical analysis to your question.",
        "Let me break down this technical challenge systematically using my advanced reasoning.",
        "I'll leverage my enhanced problem-solving framework to address this technical question."
      ],
      creative: [
        "I'm engaging my creative synthesis capabilities to generate novel perspectives.",
        "Let me explore multiple creative dimensions of your request.",
        "I'm combining disparate concepts to provide you with unique creative insights."
      ],
      extended: [
        "Activating extended cognition mode to deeply analyze all aspects of this question...",
        "I'm performing multi-layered reasoning to ensure the most accurate and nuanced response...",
        "Engaging in comprehensive contextual analysis to provide you with the optimal answer..."
      ]
    },
    'pulse-architect': {
      greeting: [
        "Hello! I'm running Pulse Architect, specialized for technical and code-related tasks. How can I assist with your development needs?",
        "Welcome to Pulse Architect! I'm optimized for coding, technical documentation, and system design. What are you working on today?",
        "Greetings! You're connected to the Architect model, designed for programming and technical tasks. How can I help you build today?"
      ],
      technical: [
        "Analyzing your technical requirements with specialized algorithms.",
        "Let me architect a solution tailored to your technical specifications.",
        "I'll develop a structured approach to address this technical challenge."
      ],
      code: [
        "I'll generate efficient and well-documented code for your requirements.",
        "Let me develop a clean, optimized implementation for you.",
        "I'll design a maintainable code solution with best practices in mind."
      ]
    }
  };

  const defaultResponses = [
    "I understand your question. Let me provide a thoughtful response.",
    "That's an interesting query. Let me analyze it carefully.",
    "I'm processing your request to give you the most helpful information.",
    "Let me consider the best approach to answer your question effectively."
  ];

  // Default model (can be changed dynamically later)
  

  // Detect response type by keywords (basic heuristic)
  function getResponseType(message) {
    const lower = message.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) return 'greeting';
    if (lower.includes('code') || lower.includes('function')) return 'code';
    if (lower.includes('design') || lower.includes('architecture')) return 'technical';
    if (lower.includes('idea') || lower.includes('creative')) return 'creative';
    if (message.length > 200) return 'extended';
    return 'general';
  }

  function getRandomAIResponse(type) {
    const modelData = aiResponses[selectedModel];
    if (modelData && modelData[type]) {
      const messages = modelData[type];
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // === Update character count and enable/disable Send button ===
  messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    characterCount.textContent = `${length}/4000`;
    sendButton.disabled = length === 0;
  });

  // === Helper function: Append a new message to the chat ===
  function addMessage(sender, text) {
    const messageElem = document.createElement('div');
    messageElem.className = `message ${sender}`;
    messageElem.textContent = text;
    messagesList.appendChild(messageElem);
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  // === Helper function: Show or hide the typing indicator ===
  function showTypingIndicator(show) {
    typingIndicator.style.display = show ? 'flex' : 'none';
  }

  // === Send message and handle response ===
  sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage('user', message);

    // Reset input
    messageInput.value = '';
    characterCount.textContent = `0/4000`;
    sendButton.disabled = true;

    // Show typing indicator
    showTypingIndicator(true);

    try {
      // Try real backend call
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      console.log(data);
      const botReply = data.result || getRandomAIResponse(getResponseType(message));
      addMessage('bot', botReply);

    } catch (err) {
      console.error('Server error:', err);

      // Fallback to local AI response
      const fallback = getRandomAIResponse(getResponseType(message));
      addMessage('bot', fallback);
    } finally {
      showTypingIndicator(false);
    }
  });



  
  // --- Core Initialization Functions ---
  
  function initializeUI() {
    // Set initial token display
    updateTokenDisplay();
    
    // Initialize custom cursor if enabled
    updateCursorSettings();
    
    // Set perspective mode
    updatePerspectiveMode();
    
    // Display initial AI message
    displayAIWelcomeMessage();
    
    // Initialize textarea autosize
    initTextareaAutosize();
    
    // Update button states
    updateSendButtonState();
    
    // Set initial switch states
    updateSwitchStates();
  }
  
  function updateSwitchStates() {
    if (extendedThinkingToggle) extendedThinkingToggle.setAttribute('aria-pressed', extendedThinking.toString());
    if (memoryToggle) memoryToggle.setAttribute('aria-pressed', memoryEnabled.toString());
    if (citationsToggle) citationsToggle.setAttribute('aria-pressed', citationsEnabled.toString());
    if (perspectiveToggle) perspectiveToggle.setAttribute('aria-pressed', perspective3d.toString());
    if (cursorToggle) cursorToggle.setAttribute('aria-pressed', customCursor.toString());
    if (bgEffectsToggle) bgEffectsToggle.setAttribute('aria-pressed', backgroundEffects.toString());
  }
  
  function displayAIWelcomeMessage() {
    if (!messagesList) return;
    
    // Clear any existing messages
    messagesList.innerHTML = '';
    
    // Get random greeting from current model
    const model = modelSelector ? modelSelector.value : 'pulse-ultra';
    const greetings = aiResponses[model]?.greeting || aiResponses['pulse-standard'].greeting;
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Display with typing effect
    displayMessage('ai', greeting, true);
  }
  
  function initTextareaAutosize() {
    if (!messageInput) return;
    
    messageInput.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = messageInput.scrollHeight + 'px';
    });
  }
  
  // --- Theme & Visual Effects Functions ---
  
  function setTheme(theme) {
    currentTheme = theme;
    
    // Remove all theme classes
    document.querySelectorAll('.theme-option').forEach(option => {
      option.classList.remove('active');
    });
    
    document.querySelectorAll('.theme-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to selected theme
    document.querySelector(`.theme-option[data-theme="${theme}"]`)?.classList.add('active');
    document.querySelector(`.theme-item[data-theme="${theme}"]`)?.classList.add('active');
    
    // Set theme on body
    body.className = `theme-${theme}`;
    
    // Preserve other body attributes
    if (perspective3d) body.setAttribute('data-perspective', 'on');
    if (!customCursor) body.setAttribute('data-cursor', 'off');
    
    // Apply text size
    body.classList.add(`text-size-${textSize}`);
    
    // Show visual feedback
    showToast('Theme Updated', `The ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme has been applied`, 'success');
  }
  
  function applyCustomTheme() {
    const primary = hexToRgb(primaryColorPicker.value);
    const secondary = hexToRgb(secondaryColorPicker.value);
    const accent = hexToRgb(accentColorPicker.value);
    
    // Create custom CSS variables
    const style = document.createElement('style');
    style.textContent = `
      .theme-pulse {
        --primary: ${primary.r}, ${primary.g}, ${primary.b};
        --primary-light: ${lightenColor(primary, 30).r}, ${lightenColor(primary, 30).g}, ${lightenColor(primary, 30).b};
        --primary-dark: ${darkenColor(primary, 20).r}, ${darkenColor(primary, 20).g}, ${darkenColor(primary, 20).b};
        
        --secondary: ${secondary.r}, ${secondary.g}, ${secondary.b};
        --secondary-light: ${lightenColor(secondary, 30).r}, ${lightenColor(secondary, 30).g}, ${lightenColor(secondary, 30).b};
        --secondary-dark: ${darkenColor(secondary, 20).r}, ${darkenColor(secondary, 20).g}, ${darkenColor(secondary, 20).b};
        
        --accent: ${accent.r}, ${accent.g}, ${accent.b};
      }
    `;
    
    // Remove any existing custom theme
    const existingStyle = document.getElementById('custom-theme-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'custom-theme-style';
    document.head.appendChild(style);
    
    // Apply pulse theme with custom colors
    setTheme('pulse');
    
    showToast('Custom Theme', 'Your personalized theme has been applied', 'success');
  }
  
  function updatePerspectiveMode() {
    body.setAttribute('data-perspective', perspective3d ? 'on' : 'off');
  }
  
  function updateCursorSettings() {
    body.setAttribute('data-cursor', customCursor ? 'on' : 'off');
  }
  
  function updateTextSize(size) {
    textSize = size;
    
    // Remove existing size classes
    body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    
    // Add new size class
    body.classList.add(`text-size-${size}`);
    
    // Update active button
    sizeButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.size === size);
    });
  }
  
  function updateFontFamily(font) {
    currentFont = font;
    body.style.setProperty('--font-main', `'${font}', sans-serif`);
  }
  
  // --- Messaging Functions ---
  
  function updateSendButtonState() {
    if (!sendButton || !messageInput) return;
    
    const isEmpty = !messageInput.value.trim();
    sendButton.disabled = isEmpty || isAiTyping;
    
    // Update character count
    if (characterCount) {
      const count = messageInput.value.length;
      const maxLength = parseInt(messageInput.getAttribute('maxlength')) || 4000;
      characterCount.textContent = `${count}/${maxLength}`;
      
      characterCount.classList.toggle('near-limit', count > maxLength * 0.8 && count < maxLength);
      characterCount.classList.toggle('at-limit', count >= maxLength);
    }
  }
  
  function formatTimestamp() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  function createMessageElement(sender, text, timestamp = formatTimestamp()) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    // Add reveal animation class
    messageDiv.classList.add('reveal-message');
    
    const messageContentDiv = document.createElement('div');
    messageContentDiv.classList.add('message-content');
    
    // Header with avatar and sender info
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    
    const avatar = document.createElement('div');
    avatar.classList.add('avatar', `${sender}-avatar`);
    
    if (sender === 'ai') {
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-brain');
      avatar.appendChild(icon);
    } else {
      // User avatar - use first letter of "User"
      avatar.textContent = 'U';
    }
    
    const senderInfo = document.createElement('div');
    senderInfo.classList.add('sender-info');
    
    const senderName = document.createElement('span');
    senderName.classList.add('sender-name');
    senderName.textContent = sender === 'ai' ? 'ChatBookLLm' : 'You';
    
    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.textContent = timestamp;
    
    senderInfo.appendChild(senderName);
    senderInfo.appendChild(messageTime);
    
    messageHeader.appendChild(avatar);
    messageHeader.appendChild(senderInfo);
    
    // Message bubble with text
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    
    bubbleDiv.appendChild(paragraph);
    
    // Assemble message
    messageContentDiv.appendChild(messageHeader);
    messageContentDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(messageContentDiv);
    
    // Add message actions
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('message-actions');
    
    const copyButton = document.createElement('button');
    copyButton.classList.add('message-action');
    copyButton.setAttribute('aria-label', 'Copy message');
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(text)
        .then(() => showToast('Success', 'Message copied to clipboard', 'success'))
        .catch(() => showToast('Error', 'Failed to copy message', 'error'));
    });
    
    const readButton = document.createElement('button');
    readButton.classList.add('message-action');
    readButton.setAttribute('aria-label', 'Read aloud');
    readButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    readButton.addEventListener('click', () => {
      readAloud(text);
    });
    
    // Add thumbs up/down for AI messages (feedback)
    if (sender === 'ai') {
      const thumbsUpButton = document.createElement('button');
      thumbsUpButton.classList.add('message-action');
      thumbsUpButton.setAttribute('aria-label', 'This was helpful');
      thumbsUpButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
      thumbsUpButton.addEventListener('click', () => {
        thumbsUpButton.classList.toggle('active');
        thumbsDownButton.classList.remove('active');
        showToast('Feedback Recorded', 'Thank you for your positive feedback', 'success');
      });
      
      const thumbsDownButton = document.createElement('button');
      thumbsDownButton.classList.add('message-action');
      thumbsDownButton.setAttribute('aria-label', 'This needs improvement');
      thumbsDownButton.innerHTML = '<i class="fas fa-thumbs-down"></i>';
      thumbsDownButton.addEventListener('click', () => {
        thumbsDownButton.classList.toggle('active');
        thumbsUpButton.classList.remove('active');
        showToast('Feedback Recorded', 'Thank you for helping us improve', 'info');
      });
      
      actionsDiv.appendChild(thumbsUpButton);
      actionsDiv.appendChild(thumbsDownButton);
    }
    
    actionsDiv.appendChild(copyButton);
    actionsDiv.appendChild(readButton);
    messageDiv.appendChild(actionsDiv);
    
    return messageDiv;
  }
  
  function displayMessage(sender, text, useTypingEffect = false) {
    if (!text || !messagesList) return;
    
    const messageElement = createMessageElement(sender, text);
    
    messagesList.appendChild(messageElement);
    
    // Add typing effect for AI messages if enabled
    if (sender === 'ai' && useTypingEffect && animationSetting !== 'off') {
      const paragraph = messageElement.querySelector('p');
      const originalText = text;
      paragraph.textContent = '';
      
      let charIndex = 0;
      let typingSpeed = 20; // Base speed
      
      // Adjust typing speed based on animation setting
      if (animationSetting === 'low') typingSpeed = 5;
      if (animationSetting === 'medium') typingSpeed = 10;
      
      function typeCharacter() {
        if (charIndex < originalText.length) {
          paragraph.textContent += originalText.charAt(charIndex);
          charIndex++;
          scrollToBottom();
          setTimeout(typeCharacter, typingSpeed + (Math.random() * 10));
        } else {
          scrollToBottom();
        }
      }
      
      setTimeout(typeCharacter, 100);
    }
    
    scrollToBottom();
    
    return messageElement;
  }
  
  function scrollToBottom() {
    if (!messagesList) return;
    messagesList.scrollTop = messagesList.scrollHeight;
  }
  
  function setAiTypingStatus(isTyping) {
    isAiTyping = isTyping;
    
    if (typingIndicator) {
      typingIndicator.classList.toggle('visible', isTyping);
    }
    
    if (sendButton) {
      sendButton.disabled = isTyping || (messageInput && !messageInput.value.trim());
    }
    
    if (messageInput) {
      messageInput.disabled = isTyping;
      
      if (isTyping) {
        messageInput.placeholder = "AI is thinking...";
      } else {
        messageInput.placeholder = "Ask me anything...";
        messageInput.focus();
      }
    }
  }
  
  function getAIResponse(userMessage) {
    if (aiResponseTimeout) clearTimeout(aiResponseTimeout);
    
    setAiTypingStatus(true);
    
    // Token usage simulation
    const tokenUsage = Math.floor(userMessage.length / 3) + Math.floor(Math.random() * 100) + 20;
    animateTokenUsage(tokenUsage);
    
    // Determine response category
    const lowerCaseMessage = userMessage.toLowerCase().trim();
    const currentModel = modelSelector ? modelSelector.value : 'pulse-ultra';
    
    // Determine which response pool to use
    let responseCategory = 'general';
    
    if (lowerCaseMessage.includes('code') || lowerCaseMessage.includes('program') || 
        lowerCaseMessage.includes('function') || lowerCaseMessage.includes('class') ||
        lowerCaseMessage.includes('develop')) {
      responseCategory = 'technical';
    } else if (lowerCaseMessage.includes('creative') || lowerCaseMessage.includes('imagine') || 
              lowerCaseMessage.includes('write') || lowerCaseMessage.includes('story')) {
      responseCategory = 'creative';
    }
    
    // Check if extended thinking is enabled
    if (extendedThinking && responseCategory !== 'greeting') {
      // Show extended thinking message first
      const extendedResponses = aiResponses[currentModel]?.extended || aiResponses['pulse-standard'].extended;
      const extendedMessage = extendedResponses[Math.floor(Math.random() * extendedResponses.length)];
      
      // Display thinking message
      setTimeout(() => {
        displayMessage('ai', extendedMessage, true);
      }, 500);
      
      // Longer delay for the actual response with extended thinking
      aiResponseTimeout = setTimeout(() => {
        produceResponse(userMessage, currentModel, responseCategory);
      }, 4000 + Math.random() * 2000);
    } else {
      // Standard response time
      const baseDelay = currentModel === 'pulse-ultra' ? 1500 : 1000;
      const lengthFactor = Math.min(userMessage.length / 5, 150);
      const randomVariation = Math.random() * 500;
      
      aiResponseTimeout = setTimeout(() => {
        produceResponse(userMessage, currentModel, responseCategory);
      }, baseDelay + lengthFactor + randomVariation);
    }
  }
  
  function produceResponse(userMessage, model, category) {
    // Get appropriate response array
    let responseArray = aiResponses[model]?.[category] || aiResponses['pulse-standard'][category];
    
    // If no matching category, use general responses
    if (!responseArray) {
      responseArray = aiResponses[model]?.general || aiResponses['pulse-standard'].general;
    }
    
    // If still no responses, use default
    if (!responseArray || responseArray.length === 0) {
      responseArray = defaultResponses;
    }
    
    // Select random response
    const selectedResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
    
    // Generate more detailed response based on input
    let aiResponse = selectedResponse;
    
    // For more realistic responses, add some content based on user message
    if (userMessage.toLowerCase().includes('what is') || userMessage.toLowerCase().includes('how does')) {
      aiResponse += "\n\nBased on my knowledge, ";
      
      if (userMessage.length > 20) {
        aiResponse += userMessage.charAt(0).toLowerCase() + userMessage.slice(1).replace('?', '') + ' involves several key concepts. ';
      }
      
      // Add length based on response length setting
      if (responseLengthSetting === 'detailed' || responseLengthSetting === 'comprehensive') {
        aiResponse += "Let me break this down in detail:\n\n";
        aiResponse += "1. The primary aspect is understanding the fundamental principles.\n";
        aiResponse += "2. There are several important factors to consider.\n";
        
        if (responseLengthSetting === 'comprehensive') {
          aiResponse += "3. Historical context provides additional insights.\n";
          aiResponse += "4. Practical applications demonstrate real-world relevance.\n";
          aiResponse += "5. Recent developments have expanded our understanding.\n\n";
          aiResponse += "Would you like me to elaborate on any specific aspect?";
        }
      }
    } else if (userMessage.toLowerCase().includes('can you') || userMessage.toLowerCase().includes('how to')) {
      aiResponse += "\n\nI'd be happy to help with that. ";
      
      if (responseLengthSetting === 'detailed' || responseLengthSetting === 'comprehensive') {
        aiResponse += "Here's a step-by-step approach:\n\n";
        aiResponse += "1. First, you'll need to identify your specific requirements.\n";
        aiResponse += "2. Next, consider the available resources and constraints.\n";
        
        if (responseLengthSetting === 'comprehensive') {
          aiResponse += "3. Develop a structured plan with clear milestones.\n";
          aiResponse += "4. Implement your solution with attention to detail.\n";
          aiResponse += "5. Review and iterate to improve results.\n\n";
          aiResponse += "Would you like more specific guidance on any of these steps?";
        }
      }
    }
    
    // Add citations if enabled
    if (citationsEnabled && (responseLengthSetting === 'detailed' || responseLengthSetting === 'comprehensive')) {
      aiResponse += "\n\nSources:\n";
      aiResponse += "[1] Johnson et al. (2023). Advanced Concepts in AI Communication.\n";
      aiResponse += "[2] ChatBookLLm Technical Documentation (2024).\n";
    }
    
    // Display the final response
    setAiTypingStatus(false);
    displayMessage('ai', aiResponse, true);
    
    aiResponseTimeout = null;
  }
  
  function handleSendMessage() {
    if (!messageInput) return;
    
    const messageText = messageInput.value.trim();
    
    if (messageText && !isAiTyping) {
      displayMessage('user', messageText);
      messageInput.value = '';
      messageInput.style.height = 'auto';
      updateSendButtonState();
      getAIResponse(messageText);
    } else if (!messageText) {
      // Visual feedback for empty message
      messageInput.classList.add('shake');
      setTimeout(() => messageInput.classList.remove('shake'), 500);
    }
  }
  
  function clearChat() {
    if (!messagesList) return;
    
    // Animate message fadeout
    const messages = messagesList.querySelectorAll('.message');
    messages.forEach((message, index) => {
      setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
      }, index * 50);
    });
    
    // Clear after animation
    setTimeout(() => {
      messagesList.innerHTML = '';
      displayAIWelcomeMessage();
      // Return some tokens as a bonus
      animateTokenSaving(200);
    }, messages.length * 50 + 300);
  }
  
  // --- Utility Functions ---
  
  function showToast(title, message, type = 'info', duration = 4000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.classList.add('toast-container');
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-${icon}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Add close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
      closeToast(toast);
    });
    
    // Auto-remove after duration
    setTimeout(() => {
      closeToast(toast);
    }, duration);
  }
  
  function closeToast(toast) {
    toast.classList.add('closing');
    
    // Remove after animation completes
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }
  
  function animateTokenUsage(amount) {
    if (!tokenCount) return;
    
    // Cap at remaining tokens
    const usageAmount = Math.min(amount, userTokens);
    
    if (usageAmount <= 0) {
      showToast('Out of Tokens', 'You have used all your tokens. Consider upgrading your plan.', 'warning');
      return;
    }
    
    // Update tokens with animation
    const startValue = userTokens;
    const endValue = userTokens - usageAmount;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateTokenAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startValue - (usageAmount * easedProgress));
      userTokens = currentValue;
      
      // Update display
      tokenCount.textContent = userTokens.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateTokenAnimation);
      }
    }
    
    requestAnimationFrame(updateTokenAnimation);
    
    // Show warning if tokens are low
    if (endValue < 1000) {
      showToast('Low Tokens', 'You are running low on tokens. Consider upgrading your plan.', 'warning');
    }
  }
  
  function animateTokenSaving(amount) {
    if (!tokenCount) return;
    
    const startValue = userTokens;
    const endValue = userTokens + amount;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateTokenAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(startValue + (amount * easedProgress));
      userTokens = currentValue;
      
      // Update display
      tokenCount.textContent = userTokens.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateTokenAnimation);
      }
    }
    
    requestAnimationFrame(updateTokenAnimation);
    
    showToast('Tokens Added', `${amount} tokens have been added to your account`, 'success');
  }
  
  function updateTokenDisplay() {
    if (!tokenCount) return;
    tokenCount.textContent = userTokens.toLocaleString();
  }
  
  function readAloud(text) {
    if (!text || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
    
    showToast('Text-to-Speech', 'Reading message aloud', 'info');
  }
  
  function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
  }
  
  function lightenColor(color, amount) {
    return {
      r: Math.min(255, color.r + amount),
      g: Math.min(255, color.g + amount),
      b: Math.min(255, color.b + amount)
    };
  }
  
  function darkenColor(color, amount) {
    return {
      r: Math.max(0, color.r - amount),
      g: Math.max(0, color.g - amount),
      b: Math.max(0, color.b - amount)
    };
  }
  
  // --- Event Listeners ---
  
  function setupEventListeners() {
    // Custom cursor movement
    if (neoCursor) {
      document.addEventListener('mousemove', (e) => {
        if (!customCursor) return;
        
        // Smooth cursor following
        neoCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      
      // Cursor interactions
      document.addEventListener('mousedown', () => {
        if (!customCursor) return;
        cursorRing.style.transform = 'scale(0.9)';
      });
      
      document.addEventListener('mouseup', () => {
        if (!customCursor) return;
        cursorRing.style.transform = 'scale(1)';
      });
      
      // Detect interactive elements
      document.querySelectorAll('button, a, input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (!customCursor) return;
          cursorRing.style.width = '50px';
          cursorRing.style.height = '50px';
          cursorRing.style.borderColor = `rgba(var(--accent), 0.8)`;
        });
        
        el.addEventListener('mouseleave', () => {
          if (!customCursor) return;
          cursorRing.style.width = '40px';
          cursorRing.style.height = '40px';
          cursorRing.style.borderColor = `rgba(var(--primary), 0.8)`;
        });
      });
    }
    
    // Chat functionality
    if (sendButton) {
      sendButton.addEventListener('click', handleSendMessage);
    }
    
    if (messageInput) {
      messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      });
      
      messageInput.addEventListener('input', updateSendButtonState);
    }
    
    // Suggestion chips
    if (suggestionChips) {
      suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
          if (!messageInput) return;
          messageInput.value = chip.textContent || chip.querySelector('span:last-child').textContent;
          messageInput.style.height = 'auto';
          messageInput.style.height = messageInput.scrollHeight + 'px';
          updateSendButtonState();
          messageInput.focus();
        });
      });
    }
    
    // File upload
    if (uploadButton && fileUpload) {
      uploadButton.addEventListener('click', () => {
        fileUpload.click();
      });
      
      fileUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          const fileNames = Array.from(e.target.files).map(file => file.name).join(', ');
          showToast('Files Uploaded', `${e.target.files.length} file(s) ready to analyze`, 'success');
          
          if (messageInput) {
            messageInput.value += (messageInput.value ? '\n' : '') + `[Attached files: ${fileNames}]`;
            messageInput.style.height = 'auto';
            messageInput.style.height = messageInput.scrollHeight + 'px';
            updateSendButtonState();
          }
        }
      });
    }
    
    // New chat button
    if (newChatButton) {
      newChatButton.addEventListener('click', clearChat);
    }
    
    // Model selector
    if (modelSelector) {
      modelSelector.addEventListener('change', (e) => {
        selectedModel = e.target.value;
        showToast('Model Changed', `Now using ${e.target.options[e.target.selectedIndex].text}`, 'info');
      });
    }
    
    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        themePanel.classList.toggle('visible');
        overlay.classList.toggle('visible');
      });
    }
    
    if (themePanelClose) {
      themePanelClose.addEventListener('click', () => {
        themePanel.classList.remove('visible');
        overlay.classList.remove('visible');
      });
    }
    
    // Theme selection
    if (themeItems) {
      themeItems.forEach(item => {
        item.addEventListener('click', () => {
          setTheme(item.dataset.theme);
        });
      });
    }
    
    // Settings panel
    if (settingsToggle) {
      settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.add('visible');
        overlay.classList.add('visible');
      });
    }
    
    if (settingsClose) {
      settingsClose.addEventListener('click', () => {
        settingsPanel.classList.remove('visible');
        overlay.classList.remove('visible');
      });
    }
    
    // Overlay click to close panels
    if (overlay) {
      overlay.addEventListener('click', () => {
        settingsPanel.classList.remove('visible');
        themePanel.classList.remove('visible');
        overlay.classList.remove('visible');
      });
    }
    
    // Tab navigation in settings
    if (tabButtons) {
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabName = button.dataset.tab;
          
          // Update active tab button
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Show selected tab content
          tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tab === tabName);
          });
          
          currentTab = tabName;
        });
      });
    }
    
    // Theme options in settings
    if (themeOptions) {
      themeOptions.forEach(option => {
        option.addEventListener('click', () => {
          setTheme(option.dataset.theme);
        });
      });
    }
    
    // Custom theme application
    if (applyCustomThemeBtn) {
      applyCustomThemeBtn.addEventListener('click', applyCustomTheme);
    }
    
    // Toggle switches
    if (extendedThinkingToggle) {
      extendedThinkingToggle.addEventListener('click', () => {
        extendedThinking = !extendedThinking;
        extendedThinkingToggle.setAttribute('aria-pressed', extendedThinking.toString());
        showToast('Extended Thinking', extendedThinking ? 'Extended thinking mode enabled' : 'Extended thinking mode disabled', 'info');
      });
    }
    
    if (memoryToggle) {
      memoryToggle.addEventListener('click', () => {
        memoryEnabled = !memoryEnabled;
        memoryToggle.setAttribute('aria-pressed', memoryEnabled.toString());
        showToast('Memory', memoryEnabled ? 'Conversation memory enabled' : 'Conversation memory disabled', 'info');
      });
    }
    
    if (citationsToggle) {
      citationsToggle.addEventListener('click', () => {
        citationsEnabled = !citationsEnabled;
        citationsToggle.setAttribute('aria-pressed', citationsEnabled.toString());
        showToast('Citations', citationsEnabled ? 'Citations enabled' : 'Citations disabled', 'info');
      });
    }
    
    if (perspectiveToggle) {
      perspectiveToggle.addEventListener('click', () => {
        perspective3d = !perspective3d;
        perspectiveToggle.setAttribute('aria-pressed', perspective3d.toString());
        updatePerspectiveMode();
        showToast('3D Effects', perspective3d ? '3D perspective effects enabled' : '3D perspective effects disabled', 'info');
      });
    }
    
    if (cursorToggle) {
      cursorToggle.addEventListener('click', () => {
        customCursor = !customCursor;
        cursorToggle.setAttribute('aria-pressed', customCursor.toString());
        updateCursorSettings();
        showToast('Custom Cursor', customCursor ? 'Custom cursor enabled' : 'Custom cursor disabled', 'info');
      });
    }
    
    if (bgEffectsToggle) {
      bgEffectsToggle.addEventListener('click', () => {
        backgroundEffects = !backgroundEffects;
        bgEffectsToggle.setAttribute('aria-pressed', backgroundEffects.toString());
        bgElements.style.opacity = backgroundEffects ? '1' : '0';
        showToast('Background Effects', backgroundEffects ? 'Background effects enabled' : 'Background effects disabled', 'info');
      });
    }
    
    // Animation level selector
    if (animationLevel) {
      animationLevel.addEventListener('change', (e) => {
        animationSetting = e.target.value;
        showToast('Animation', `Animation level set to ${animationSetting}`, 'info');
      });
    }
    
    // Text size buttons
    if (sizeButtons) {
      sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
          updateTextSize(button.dataset.size);
          showToast('Text Size', `Text size set to ${button.dataset.size}`, 'info');
        });
      });
    }
    
    // Font family selector
    if (fontFamily) {
      fontFamily.addEventListener('change', (e) => {
        updateFontFamily(e.target.value);
        showToast('Font', `Font changed to ${e.target.value}`, 'info');
      });
    }
    
    // Response length selector
    if (responseLength) {
      responseLength.addEventListener('change', (e) => {
        responseLengthSetting = e.target.value;
        showToast('Response Length', `AI responses will now be ${e.target.value}`, 'info');
      });
    }
    
    // Creativity slider
    if (creativitySlider) {
      creativitySlider.addEventListener('input', (e) => {
        creativityLevel = parseInt(e.target.value);
      });
      
      creativitySlider.addEventListener('change', (e) => {
        showToast('Creativity', `AI creativity level set to ${creativityLevel}%`, 'info');
      });
    }
    
    // Model cards
    if (modelCards) {
      modelCards.forEach(card => {
        card.addEventListener('click', () => {
          // Remove active from all cards
          modelCards.forEach(c => c.classList.remove('active'));
          
          // Add active to selected card
          card.classList.add('active');
          
          // Get model name
          const modelName = card.querySelector('h4').textContent.toLowerCase().replace(' ', '-');
          
          // Update model selector if it exists
          if (modelSelector) {
            for (let i = 0; i < modelSelector.options.length; i++) {
              if (modelSelector.options[i].value === modelName) {
                modelSelector.selectedIndex = i;
                selectedModel = modelName;
                break;
              }
            }
          } else {
            selectedModel = modelName;
          }
          
          showToast('Model Changed', `Now using ${card.querySelector('h4').textContent}`, 'info');
        });
      });
    }
  }
  
  // Initialize the application
  initializeUI();
  setupEventListeners();
});