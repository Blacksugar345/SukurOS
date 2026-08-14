<template>
  <div class="os-container terminal-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // TERMINAL</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> EXIT_TERMINAL
      </a>
    </header>

    <!-- Main Terminal Interface -->
    <main class="document-wrapper" @click="focusInput">
      <div class="terminal-window hud-frame os-anim anim-scan">
        
        <!-- Terminal Header -->
        <div class="term-header">
          <div class="term-buttons">
            <span class="t-btn close"></span>
            <span class="t-btn min"></span>
            <span class="t-btn max"></span>
          </div>
          <div class="term-title">guest@sukur-os: /var/sec/furry_code</div>
        </div>

        <!-- Terminal Output -->
        <div class="term-body" ref="terminalBody">
          
          <!-- Boot Sequence / History -->
          <div v-for="(line, index) in terminalHistory" :key="index" class="term-line" :class="line.type">
            <span v-if="line.type === 'input'" class="prompt">guest@sukur-os:~$</span>
            <span class="text" v-html="line.text"></span>
          </div>

          <!-- Active Input Line -->
          <div class="term-line active-input">
            <span class="prompt">guest@sukur-os:~$</span>
            <input 
              type="text" 
              v-model="currentCommand" 
              @keyup.enter="processCommand"
              ref="commandInput"
              class="command-input"
              autocomplete="off"
              spellcheck="false"
              autofocus
            />
          </div>

        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Terminal State
const currentCommand = ref('')
const terminalBody = ref(null)
const commandInput = ref(null)

// Puzzle States
let isConnectedToMainframe = false

// Initial Terminal Text
const terminalHistory = ref([
  { type: 'system', text: 'SUKUR.OS Secure Shell (v2.4.1)' },
  { type: 'system', text: 'Connection established. Encryption key verified.' },
  { type: 'system', text: 'Warning: You are accessing a restricted directory.' },
  { type: 'system', text: 'Type <span class="highlight">help</span> to view available commands.' },
  { type: 'system', text: '&nbsp;' }
])

// Focus input when clicking anywhere in the terminal
const focusInput = () => {
  if (commandInput.value) {
    commandInput.value.focus()
  }
}

// Auto-scroll to bottom
const scrollToBottom = async () => {
  await nextTick()
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

// Command Processor
const processCommand = () => {
  const input = currentCommand.value.trim()
  if (!input) return

  // 1. Log the user's input
  terminalHistory.value.push({ type: 'input', text: input })
  
  // 2. Parse the command
  const args = input.split(' ')
  const cmd = args[0].toLowerCase()

  // 3. Command Logic
  switch (cmd) {
    case 'help':
      terminalHistory.value.push({ type: 'output', text: 'Available commands:' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">help</span>    - Show this message' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">ls</span>      - List directory contents' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">cat</span>     - Read file contents (Usage: cat [filename])' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">connect</span> - Route connection to a target (Usage: connect [target])' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">echo</span>    - Print text to standard output / send authorization phrase' })
      terminalHistory.value.push({ type: 'output', text: '  <span class="highlight">clear</span>   - Clear terminal screen' })
      break;

    case 'clear':
      terminalHistory.value = []
      break;

    case 'ls':
      terminalHistory.value.push({ type: 'output', text: 'drwxr-xr-x  2 root  root  4096 Aug 08 09:21 .' })
      terminalHistory.value.push({ type: 'output', text: '-rw-r--r--  1 root  root   142 Aug 08 09:21 <span class="file">readme.txt</span>' })
      terminalHistory.value.push({ type: 'output', text: '-rwx------  1 root  root  2048 Aug 08 09:21 <span class="file locked">payload.enc</span>' })
      break;

    case 'cat':
      if (args[1] === 'readme.txt') {
        terminalHistory.value.push({ type: 'output', text: 'FILE: readme.txt' })
        terminalHistory.value.push({ type: 'output', text: 'The furry identity code is heavily encrypted inside payload.enc.' })
        terminalHistory.value.push({ type: 'output', text: 'To decrypt it, you must route your connection to the <span class="highlight">ZWASONIA</span> network.' })
      } else if (args[1] === 'payload.enc') {
        terminalHistory.value.push({ type: 'error', text: 'ACCESS DENIED: File is encrypted. Connection to external mainframe required.' })
      } else if (!args[1]) {
        terminalHistory.value.push({ type: 'error', text: 'cat: missing file operand' })
      } else {
        terminalHistory.value.push({ type: 'error', text: `cat: ${args[1]}: No such file or directory` })
      }
      break;

    case 'connect':
      if (args[1]?.toUpperCase() === 'ZWASONIA') {
        isConnectedToMainframe = true
        terminalHistory.value.push({ type: 'system', text: 'Routing connection through 3 proxies...' })
        setTimeout(() => {
          terminalHistory.value.push({ type: 'system', text: 'Connection established to ZWASONIA Central Server.' })
          terminalHistory.value.push({ type: 'system', text: 'AWAITING AUTHORIZATION: Echo the primary operative\'s alias to proceed.' })
          scrollToBottom()
        }, 800)
      } else if (!args[1]) {
        terminalHistory.value.push({ type: 'error', text: 'connect: missing target network' })
      } else {
        terminalHistory.value.push({ type: 'error', text: `connect: Host ${args[1]} not found.` })
      }
      break;

    case 'echo':
      if (!args[1]) {
        terminalHistory.value.push({ type: 'output', text: '' })
      } else {
        const phrase = args.slice(1).join(' ').toLowerCase()
        if (isConnectedToMainframe && (phrase === 'sukuros')) {
          terminalHistory.value.push({ type: 'output', text: `> ${phrase}` })
          terminalHistory.value.push({ type: 'system', text: 'IDENTITY CONFIRMED. Access granted.' })
          terminalHistory.value.push({ type: 'system', text: 'Decrypting payload.enc...' })
          
          setTimeout(() => {
            terminalHistory.value.push({ type: 'output', text: '&nbsp;' })
            terminalHistory.value.push({ type: 'success', text: '=== FURRY IDENTITY CODE DECRYPTED ===' })
            terminalHistory.value.push({ type: 'output code-block', text: 'FFD3aw A C+ D? H+ M- P R T+++ W- Z- Sm' })
            terminalHistory.value.push({ type: 'output code-block', text: 'RLCT a cl++ e++ f+ h iwf+ j p* sm+' })
            terminalHistory.value.push({ type: 'output', text: '=====================================' })
            terminalHistory.value.push({ type: 'output', text: '&nbsp;' })
            scrollToBottom()
          }, 1500)
        } else {
          terminalHistory.value.push({ type: 'output', text: args.slice(1).join(' ') })
        }
      }
      break;

    default:
      terminalHistory.value.push({ type: 'error', text: `Command not found: ${cmd}` })
  }

  // 4. Clear input and scroll down
  currentCommand.value = ''
  scrollToBottom()
}

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('.os-anim').forEach(el => {
      el.classList.add('is-revealed')
    })
    focusInput()
  }, 100)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Space+Grotesk:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap');

/* Base Styles */
.os-container {
  --bg-void: #020406; /* Even darker for the terminal */
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;

  background: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

.bg-decoration-grid {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(110, 234, 245, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Header */
.sub-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 3rem;
  background: rgba(2, 4, 6, 0.95);
  border-bottom: 1px solid rgba(110, 234, 245, 0.1);
  z-index: 50;
  backdrop-filter: blur(10px);
}
.logo-text { font-family: var(--font-display); font-weight: 800; letter-spacing: 0.1em; }
.return-btn {
  color: var(--text-secondary); text-decoration: none; font-family: var(--font-display);
  font-size: 0.85rem; transition: color 0.3s ease; display: flex; align-items: center; gap: 0.5rem;
}
.return-btn:hover { color: var(--cyan); text-shadow: 0 0 5px var(--cyan-glow); }

/* Terminal Layout */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 12rem);
}

.hud-frame {
  width: 100%;
  max-width: 900px;
  height: 60vh;
  min-height: 400px;
  background: rgba(6, 10, 14, 0.85);
  border: 1px solid rgba(110, 234, 245, 0.3);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(110, 234, 245, 0.05);
  backdrop-filter: blur(5px);
  overflow: hidden;
}

/* Terminal Mac-style Header */
.term-header {
  height: 40px;
  background: rgba(2, 4, 6, 0.9);
  border-bottom: 1px solid rgba(110, 234, 245, 0.2);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
}

.term-buttons {
  display: flex;
  gap: 8px;
}
.t-btn { width: 12px; height: 12px; border-radius: 50%; }
.close { background: #ff5f56; }
.min { background: #ffbd2e; }
.max { background: #27c93f; }

.term-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #5d7e86;
}

/* Terminal Body */
.term-body {
  flex-grow: 1;
  padding: 1.5rem;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

/* Custom Scrollbar */
.term-body::-webkit-scrollbar { width: 8px; }
.term-body::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
.term-body::-webkit-scrollbar-thumb { background: rgba(110, 234, 245, 0.2); border-radius: 4px; }
.term-body::-webkit-scrollbar-thumb:hover { background: rgba(110, 234, 245, 0.4); }

/* Terminal Lines & Formatting */
.term-line {
  display: flex;
  margin-bottom: 0.25rem;
  word-wrap: break-word;
}
.term-line.input { color: var(--cyan); }
.term-line.output { color: var(--text-primary); }
.term-line.system { color: #5d7e86; }
.term-line.error { color: #ff5f56; }
.term-line.success { color: #00ff9d; font-weight: bold; text-shadow: 0 0 5px rgba(0, 255, 157, 0.5); }

.prompt {
  color: #00ff9d;
  margin-right: 0.75rem;
  white-space: nowrap;
}

/* Rich Text injected via v-html */
:deep(.highlight) { color: var(--cyan); font-weight: 600; }
:deep(.file) { color: #ffbd2e; }
:deep(.locked) { color: #ff5f56; }

/* Decrypted Code Block */
.code-block {
  color: var(--cyan);
  background: rgba(110, 234, 245, 0.05);
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin: 0.1rem 0;
  border-left: 2px solid var(--cyan);
}

/* Input Line */
.active-input {
  margin-top: 0.5rem;
  align-items: center;
}

.command-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  flex-grow: 1;
  outline: none;
  caret-color: var(--cyan); /* Cyan blinking cursor */
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>