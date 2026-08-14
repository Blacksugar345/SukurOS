<template>
  <div class="os-container uplink-mode">
    
    <!-- Deep Background: Matrix/Hex Streams (CSS-only animation) -->
    <div class="data-stream-bg"></div>
    
    <!-- Middle Background: Circuit Wires & Grid -->
    <div class="bg-decoration-grid"></div>
    <div class="circuit-overlay left-circuit"></div>
    <div class="circuit-overlay right-circuit"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // SOCIALS</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="uplink-container">
        
        <!-- Hero Title Section -->
        <div class="doc-header os-anim anim-scan">
          <div class="target-bracket top-left"></div>
          <div class="target-bracket top-right"></div>
          <div class="target-bracket bottom-left"></div>
          <div class="target-bracket bottom-right"></div>
          
          <div class="header-content">
            <div class="status-indicator">
              <span class="pulse-dot"></span> LINK ACTIVE // NO SIGNAL INTERFERENCE
            </div>
            <h1 class="doc-title glow-text">My Social Channels</h1>
            <p class="doc-meta">Feel free to add me through these social media platforms.</p>
          </div>
        </div>

        <!-- Dynamic Grid for Categories -->
        <div class="socials-grid">
          
          <!-- Category Block -->
          <div 
            class="category-block hud-frame os-anim anim-scan" 
            v-for="(category, index) in linkCategories" 
            :key="index"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <!-- Block Header -->
            <div class="category-header">
              <span class="category-icon">{{ category.icon }}</span>
              <h2 class="category-title">{{ category.title }}</h2>
              <div class="header-line"></div>
            </div>

            <!-- Links Container -->
            <div class="links-list">
              <a 
                v-for="(link, lIdx) in category.links" 
                :key="lIdx"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
              >
                <!-- Decorative scan line on hover -->
                <div class="btn-scan-line"></div>
                
                <div class="btn-content">
                  <div class="platform-info">
                    <!-- The CSS Mask Icon -->
                    <span class="platform-logo" :style="{ '--icon-url': `url(${link.logo})` }"></span>
                    <span class="platform-name">{{ link.name }}</span>
                  </div>
                  <span class="platform-arrow">↗</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        <!-- Footer Signature -->
        <div class="terminal-footer os-anim anim-scan" style="animation-delay: 0.8s;">
          <p class="sys-msg">> END OF TRANSMISSION. ALL CHANNELS OPEN.</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Social Media Data Structure
// Includes Iconify URLs for SVG masks
const linkCategories = ref([
  {
    title: 'GLOBAL_BROADCAST (MAIN)',
    icon: '01',
    links: [
      { name: 'Facebook', url: 'https://web.facebook.com/krittin.kamjornkittikhun', logo: 'https://api.iconify.design/mdi/facebook.svg' },
      { name: 'Instagram', url: 'https://www.instagram.com/krittin.ipynb/', logo: 'https://api.iconify.design/mdi/instagram.svg' },
      { name: 'X (Twitter)', url: 'https://x.com/KuroSatou_345', logo: 'https://api.iconify.design/ri/twitter-x-fill.svg' },
      { name: 'Bluesky', url: 'https://bsky.app/profile/kurosatou.bsky.social', logo: 'https://api.iconify.design/ri/bluesky-fill.svg' }
    ]
  },
  {
    title: 'CORPORATE_UPLINK (WORK)',
    icon: '02',
    links: [
      { name: 'GitHub', url: 'https://github.com/Blacksugar345', logo: 'https://api.iconify.design/mdi/github.svg' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/krittin-kamjornkittikhun?utm_source=share_via&utm_content=profile&utm_medium=member_android', logo: 'https://api.iconify.design/mdi/linkedin.svg' }
    ]
  },
  {
    title: 'SIMULATION_NODES (GAMING)',
    icon: '03',
    links: [
      { name: 'Discord', url: 'https://discord.com/users/539381333235990528', logo: 'https://api.iconify.design/mdi/discord.svg' },
      { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198275915391/', logo: 'https://api.iconify.design/mdi/steam.svg' },
      { name: 'Ubisoft Connect', url: 'https://ubisoft.com/profile/blacksugar345', logo: 'https://api.iconify.design/simple-icons/ubisoft.svg' }
    ]
  },
  {
    title: 'CLASSIFIED_DATA (FURRY)',
    icon: '04',
    links: [
      { name: 'FurAffinity', url: 'https://www.furaffinity.net/user/blacksugar345', logo: 'https://api.iconify.design/simple-icons/furaffinity.svg' },
      { name: 'Barq', url: 'https://barq.app/p/eytVACN', logo: 'https://api.iconify.design/mdi/paw.svg' } 
    ]
  }
])

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('.os-anim').forEach(el => {
      el.classList.add('is-revealed')
    })
  }, 100)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Base System Styles */
.os-container {
  --bg-void: #030508; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.4);
  --cyan-dim: rgba(110, 234, 245, 0.1);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --accent: #ffb800;
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;

  background: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 10px var(--cyan-glow); }

/* =========================================
   BACKGROUND DECORATIONS (Z-INDEX 0)
   ========================================= */
.bg-decoration-grid {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(var(--cyan-dim) 1px, transparent 1px),
                    linear-gradient(90deg, var(--cyan-dim) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
}

.data-stream-bg {
  position: fixed;
  inset: 0;
  background: 
    linear-gradient(rgba(3, 5, 8, 0.95), rgba(3, 5, 8, 0.8)),
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(110, 234, 245, 0.05) 3px, rgba(110, 234, 245, 0.05) 3px);
  z-index: 0;
  pointer-events: none;
}

.circuit-overlay {
  position: fixed; top: 20%; bottom: 20%; width: 50px;
  border: 1px solid var(--cyan-dim); z-index: 0; pointer-events: none;
}
.left-circuit {
  left: 2rem; border-left: 2px solid var(--cyan); border-right: none;
  border-radius: 10px 0 0 10px; opacity: 0.5;
}
.right-circuit {
  right: 2rem; border-right: 2px solid var(--accent); border-left: none;
  border-radius: 0 10px 10px 0; opacity: 0.3;
}

@media (max-width: 1024px) { .circuit-overlay { display: none; } }

/* =========================================
   HEADER
   ========================================= */
.sub-header {
  position: fixed; top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 3rem; background: rgba(3, 5, 8, 0.8);
  border-bottom: 1px solid var(--cyan-dim); z-index: 50; backdrop-filter: blur(12px);
}
.logo-text { font-family: var(--font-display); font-weight: 800; letter-spacing: 0.1em; }
.return-btn {
  color: var(--text-secondary); text-decoration: none; font-family: var(--font-display);
  font-size: 0.85rem; transition: color 0.3s ease; display: flex; align-items: center; gap: 0.5rem;
}
.return-btn:hover { color: var(--cyan); text-shadow: 0 0 5px var(--cyan-glow); }

/* =========================================
   MAIN LAYOUT & HERO
   ========================================= */
.document-wrapper {
  position: relative; z-index: 10; padding: 8rem 5vw 6rem 5vw;
  display: flex; justify-content: center;
}
.uplink-container { max-width: 1000px; width: 100%; }

.doc-header {
  position: relative; padding: 3rem 2rem; margin-bottom: 4rem;
  background: rgba(6, 11, 16, 0.4); backdrop-filter: blur(5px); text-align: center;
}

.target-bracket {
  position: absolute; width: 30px; height: 30px; border: 2px solid var(--cyan); opacity: 0.7;
}
.top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
.top-right { top: 0; right: 0; border-left: none; border-bottom: none; }
.bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; }
.bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }

.status-indicator {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-display); font-size: 0.75rem; color: #00ff9d;
  letter-spacing: 0.1em; margin-bottom: 1rem; background: rgba(0, 255, 157, 0.1);
  padding: 0.25rem 0.75rem; border-radius: 20px;
}
.pulse-dot {
  width: 8px; height: 8px; background: #00ff9d; border-radius: 50%;
  box-shadow: 0 0 8px #00ff9d; animation: pulse 1.5s infinite;
}
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

.doc-title { font-family: var(--font-display); font-size: 2.5rem; letter-spacing: 0.1em; margin: 0 0 0.5rem 0; }
.doc-meta { font-size: 1rem; color: var(--text-secondary); letter-spacing: 0.1em; margin: 0; }

/* =========================================
   SOCIAL GRID & CARDS
   ========================================= */
.socials-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem;
}

.hud-frame {
  background: linear-gradient(135deg, rgba(12, 22, 30, 0.8) 0%, rgba(6, 11, 16, 0.9) 100%);
  border: 1px solid var(--cyan-dim); border-top: 2px solid var(--cyan);
  padding: 2rem; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
}
.hud-frame::after {
  content: ''; position: absolute; bottom: 0; right: 0; width: 20px; height: 20px;
  background: var(--cyan-dim); clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.category-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.category-icon { font-family: var(--font-display); font-size: 1.2rem; color: var(--bg-void); background: var(--cyan); padding: 0.2rem 0.5rem; font-weight: 800; }
.category-title { font-family: var(--font-display); font-size: 1.1rem; color: var(--text-primary); margin: 0; letter-spacing: 0.05em; }
.header-line { flex-grow: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--cyan-dim), var(--cyan-dim) 5px, transparent 5px, transparent 10px); }

/* Link Buttons */
.links-list { display: flex; flex-direction: column; gap: 0.75rem; }

.social-btn {
  position: relative; display: block; background: rgba(3, 5, 8, 0.6);
  border: 1px solid var(--cyan-dim); padding: 1rem 1.25rem; text-decoration: none;
  overflow: hidden; transition: all 0.3s ease;
}

.btn-content {
  position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 
  CSS Masking Magic! 
  This takes the SVG URL and uses it as a shape stamp over a solid background color.
*/
.platform-logo {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-color: var(--text-primary);
  -webkit-mask-image: var(--icon-url);
  mask-image: var(--icon-url);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: background-color 0.3s ease, filter 0.3s ease;
}

.platform-name {
  font-family: var(--font-body); font-weight: 600; font-size: 1.1rem;
  color: var(--text-primary); letter-spacing: 0.05em; transition: color 0.3s ease;
}

.platform-arrow {
  font-family: var(--font-display); color: var(--cyan); font-size: 1.2rem;
  opacity: 0.5; transition: all 0.3s ease;
}

.btn-scan-line {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(110, 234, 245, 0.2), transparent);
  z-index: 1; transition: left 0.4s ease;
}

/* Button Hover Effects */
.social-btn:hover {
  background: rgba(110, 234, 245, 0.1); border-color: var(--cyan);
  box-shadow: inset 4px 0 0 var(--cyan); transform: translateX(5px);
}
.social-btn:hover .platform-name { color: var(--cyan); text-shadow: 0 0 5px var(--cyan-glow); }
.social-btn:hover .platform-logo { 
  background-color: var(--cyan); 
  filter: drop-shadow(0 0 5px var(--cyan)); 
}
.social-btn:hover .platform-arrow { opacity: 1; transform: translate(3px, -3px); }
.social-btn:hover .btn-scan-line { left: 200%; transition: left 0.6s ease; }

/* =========================================
   FOOTER TERMINAL TEXT
   ========================================= */
.terminal-footer { margin-top: 4rem; text-align: center; border-top: 1px dashed var(--cyan-dim); padding-top: 2rem; }
.sys-msg { font-family: monospace; font-size: 0.85rem; color: var(--text-secondary); }

/* =========================================
   RESPONSIVE DESIGN (IPAD & MOBILE)
   ========================================= */
@media (max-width: 900px) {
  .doc-title { font-size: 2rem; }
  .socials-grid { gap: 1.5rem; }
  .document-wrapper { padding-left: 2rem; padding-right: 2rem; }
}

@media (max-width: 650px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 4rem 1rem; }
  
  .doc-header { padding: 2rem 1rem; margin-bottom: 2.5rem; }
  .doc-title { font-size: 1.5rem; }
  .doc-meta { font-size: 0.85rem; }
  
  .socials-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  
  .hud-frame { padding: 1.5rem; }
  .social-btn { padding: 0.85rem 1rem; }
  .platform-name { font-size: 1rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>