<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Lore</span>
      </div>
      <a href="/lore/zwasonia" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Wikipedia Article Layout -->
    <main class="wiki-article-container os-anim anim-scan">
      
      <!-- Dynamic Article Title -->
      <div class="article-header">
        <h1 class="article-title">{{ formattedTitle }}</h1>
        <hr class="wiki-divider" />
        <div class="article-meta">
          From Sukur.OS Free Encyclopedia
        </div>
      </div>

      <div class="article-body">
        <div class="article-content">
          
          <!-- Wikipedia-style Stub Box -->
          <div class="wiki-stub-box">
            <div class="stub-icon">⚠️</div>
            <div class="stub-text">
              <h2 class="stub-heading">Sukur.OS Wikipedia does not have an article with this exact name.</h2>
              <p class="wiki-paragraph">
                The system archives are currently missing the requested data file. The physical or digital entity known as <b>{{ formattedTitle }}</b> has been referenced in existing lore, but its dedicated database entry has not yet been established by the administrator.
              </p>
              
              <ul class="stub-options">
                <li>Search the <NuxtLink to="/furry/lore/zwasonia" class="wiki-link">Zwasonia Archive</NuxtLink> for related references.</li>
                <li>Wait for an upcoming system patch to establish this lore node.</li>
                <li>Check your spelling or URL routing path.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const formattedTitle = computed(() => {
  const pathArray = route.params.slug
  if (!pathArray || pathArray.length === 0) return 'Unknown Node'
  
  const lastItem = pathArray[pathArray.length - 1]
  
  // Replace dashes with spaces and capitalize the first letter of each word
  return lastItem
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
})

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('.os-anim').forEach(el => {
      el.classList.add('is-revealed')
    })
  }, 100)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Space+Grotesk:wght@400;500;600&display=swap');

/* Base Container & Variables */
.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --wiki-bg: #0c151c;
  --wiki-border: rgba(110, 234, 245, 0.2);
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

/* Sub Header */
.sub-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 3rem;
  background: rgba(5, 8, 12, 0.95);
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

/* Main Article Container */
.wiki-article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem 2rem;
  position: relative;
  z-index: 10;
}

.article-header {
  margin-bottom: 1.5rem;
}

.article-title {
  font-family: var(--font-body);
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.article-meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.wiki-divider {
  border: none;
  height: 1px;
  background: var(--wiki-border);
  margin: 0.5rem 0 1.5rem 0;
}

.article-body {
  display: flex;
  flex-direction: column;
}

.article-content {
  flex-grow: 1;
}

.wiki-paragraph {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

/* Wikipedia Stub Box Design */
.wiki-stub-box {
  display: flex;
  gap: 1.5rem;
  background: rgba(12, 22, 30, 0.5);
  border: 1px solid #ffb800; /* Warning Yellow Border */
  border-left: 5px solid #ffb800;
  padding: 1.5rem;
  margin-top: 1rem;
}

.stub-icon {
  font-size: 2rem;
}

.stub-heading {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: #ffb800;
  margin: 0 0 1rem 0;
}

.stub-options {
  margin-top: 1rem;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.stub-options li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.wiki-link {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.5);
  transition: all 0.3s ease;
}
.wiki-link:hover {
  border-bottom-style: solid;
  text-shadow: 0 0 5px var(--cyan-glow);
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>