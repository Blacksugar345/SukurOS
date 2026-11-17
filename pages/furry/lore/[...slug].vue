<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Lore</span>
      </div>
      <NuxtLink to="/furry/lore/zwasonia" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Wikipedia Article Layout -->
    <main class="wiki-article-container os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
      
      <!-- Dynamic Article Title -->
      <div class="article-header">
        <h1 class="article-title glow-text">{{ formattedTitle }}</h1>
        <hr class="wiki-divider" />
        <div class="article-meta">
          From Sukur.OS Free Encyclopedia
        </div>
      </div>

      <div class="article-body">
        <div class="article-content">
          
          <!-- Wikipedia-style Stub Box -->
          <div class="wiki-stub-box">
            <div class="stub-icon" aria-hidden="true">⚠️</div>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isRevealed = ref(false)

const formattedTitle = computed(() => {
  const pathArray = route.params.slug
  if (!pathArray || pathArray.length === 0) return 'Unknown Node'
  
  const lastItem = Array.isArray(pathArray) ? pathArray[pathArray.length - 1] : String(pathArray)
  
  // Replace dashes with spaces and capitalize the first letter of each word
  return lastItem
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
})

onMounted(() => {
  setTimeout(() => {
    isRevealed.value = true
  }, 60)
})
</script>

<style scoped>
/* Base Container & Variables */
.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --wiki-bg: #0c151c;
  --wiki-border: rgba(110, 234, 245, 0.22);
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
  background-image: linear-gradient(rgba(110, 234, 245, 0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.025) 1px, transparent 1px);
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
  padding: 1.25rem 3rem;
  background: rgba(5, 8, 12, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14);
  z-index: 50;
  backdrop-filter: blur(12px);
}

.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; }

.return-btn {
  color: var(--text-secondary); text-decoration: none; font-family: var(--font-display);
  font-size: 0.82rem; letter-spacing: 0.1em; transition: all 0.25s ease; display: flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.85rem; border: 1px solid rgba(110, 234, 245, 0.2); border-radius: 2px; background: rgba(6, 11, 16, 0.6);
}
.return-btn:hover { color: var(--cyan); border-color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Main Article Container */
.wiki-article-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 7.5rem 2rem 4rem 2rem;
  position: relative;
  z-index: 10;
}

.article-header {
  margin-bottom: 1.5rem;
}

.article-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.article-meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.wiki-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, var(--wiki-border) 0%, transparent 100%);
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
  line-height: 1.65;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

/* Wikipedia Stub Box Design */
.wiki-stub-box {
  display: flex;
  gap: 1.5rem;
  background: rgba(12, 22, 30, 0.65);
  border: 1px solid rgba(255, 184, 0, 0.45);
  border-left: 5px solid #ffb800;
  padding: 1.75rem;
  margin-top: 1rem;
  border-radius: 3px;
  backdrop-filter: blur(8px);
}

.stub-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.stub-heading {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: #ffb800;
  margin: 0 0 1rem 0;
  letter-spacing: 0.04em;
}

.stub-options {
  margin: 1rem 0 0 0;
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
  transition: all 0.25s ease;
}
.wiki-link:hover {
  border-bottom-style: solid;
  text-shadow: 0 0 5px var(--cyan-glow);
}

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .wiki-article-container { padding: 5.5rem 1rem 3rem 1rem; }
  .wiki-stub-box { flex-direction: column; gap: 1rem; padding: 1.25rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
