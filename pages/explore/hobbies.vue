<template>
  <div class="os-container terminal-mode">
    
    <!-- BACKGROUND DECORATION -->
    <div class="bg-decoration-grid"></div>

    <!-- MINIMAL SUBPAGE HEADER -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Hobbies&Interests</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- TEXT DOCUMENT VIEWER -->
    <main class="document-wrapper">
      <article class="hud-frame text-document os-anim anim-scan">
        
        <!-- Document Header -->
        <div class="doc-header">
          <h1 class="doc-title glow-text">LOG // HOBBIES_AND_INTERESTS.TXT</h1>
          <div class="doc-meta">
            <span>AUTHOR: ME</span>
            <span v-if="interests?.length">ENTRIES: {{ interests.length }}</span>
          </div>
        </div>

        <hr class="cyan-divider" />

        <!-- Text Content Grid -->
        <div class="doc-body" v-if="interests?.length">
          
          <!-- Dynamic Log Entries from Supabase -->
          <section class="log-entry" v-for="interest in interests" :key="interest.id">
            
            <div class="entry-header">
              <h2 class="log-cmd">> EXEC: {{ interest.command_alias || './execute_hobby.sh' }}</h2>
              <span class="update-date" v-if="interest.date_update">
                [ UPDATED: {{ formatDate(interest.date_update) }} ]
              </span>
            </div>

            <!-- v-html handles your <strong> and <a> tags from the database! -->
            <div class="log-text rich-text" v-html="interest.content"></div>

            <!-- Image Grid (Only shows if you put URLs in the database array) -->
            <div class="hobby-images-grid" v-if="interest.image_urls && interest.image_urls.length > 0 && interest.image_urls[0] !== ''">
              <div class="img-wrapper" v-for="(imgUrl, idx) in interest.image_urls" :key="idx">
                <img :src="imgUrl" :alt="`${interest.title} image ${idx + 1}`" class="hobby-img" loading="lazy" />
              </div>
            </div>

          </section>

          <!-- Blinking Terminal Cursor -->
          <div class="terminal-cursor">_</div>
          
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING ARCHIVE LOGS...</p>
        </div>

      </article>
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const supabase = useSupabaseClient()

// Fetch interests ordered by ID
const { data: interests } = await useAsyncData('interests', async () => {
  const { data, error } = await supabase
    .from('interests')
    .select('*')
    .order('id', { ascending: true })
    
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

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

/* =========================================
   BASE VARIABLES 
   ========================================= */
.os-container {
  --bg-void: #060b10;
  --bg-panel: rgba(12, 22, 30, 0.7);
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #dff6f8;
  --text-secondary: #7fa3ab;
  --border-hud: rgba(110, 234, 245, 0.25);
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

/* Background Grid */
.bg-decoration-grid {
  position: fixed;
  inset: 0;
  background-image: 
    linear-gradient(rgba(110, 234, 245, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(110, 234, 245, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
}

.glow-text {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow), 0 0 2px var(--cyan-glow);
}

.hud-frame {
  border: 1px solid var(--border-hud);
  background: var(--bg-panel);
  padding: 3rem;
  backdrop-filter: blur(8px);
}

/* =========================================
   SUBPAGE HEADER
   ========================================= */
.sub-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: rgba(6, 11, 16, 0.9);
  border-bottom: 1px solid rgba(110, 234, 245, 0.1);
  z-index: 50;
  backdrop-filter: blur(10px);
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: 0.15em;
}

.return-btn {
  color: var(--text-secondary);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.return-btn:hover {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

/* =========================================
   DOCUMENT VIEWER LAYOUT
   ========================================= */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}

.text-document {
  max-width: 900px;
  width: 100%;
  border-top: 3px solid var(--cyan);
}

.doc-header {
  margin-bottom: 1.5rem;
}

.doc-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.doc-meta {
  display: flex;
  gap: 2rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: #5d7e86;
  letter-spacing: 0.1em;
}

.cyan-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, var(--cyan) 0%, transparent 100%);
  margin-bottom: 3rem;
  opacity: 0.5;
}

/* =========================================
   TEXT LOG FORMATTING
   ========================================= */
.doc-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.log-entry {
  position: relative;
  padding-left: 1.5rem;
  border-left: 1px dashed rgba(110, 234, 245, 0.2);
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.log-cmd {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.1rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.update-date {
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #5d7e86;
  letter-spacing: 0.1em;
}

.log-text {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

/* Rich Text Overrides for HTML links/bolding */
.rich-text :deep(strong) {
  color: #dff6f8;
  font-weight: 600;
}

.rich-text :deep(a) {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.5);
  transition: all 0.3s ease;
}

.rich-text :deep(a:hover) {
  text-shadow: 0 0 8px var(--cyan-glow);
  border-bottom-style: solid;
}

/* Dynamic Image Grid */
.hobby-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.img-wrapper {
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #000;
}

.hobby-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: opacity 0.3s ease, transform 0.5s ease;
}

.img-wrapper:hover .hobby-img {
  opacity: 1;
  transform: scale(1.05);
}

/* Cursor */
.terminal-cursor {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.5rem;
  margin-top: 1rem;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.loading-state {
  text-align: center;
  padding: 2rem;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 3rem 1rem; }
  
  .hud-frame { padding: 1.5rem; }
  
  .doc-title { font-size: 1.3rem; }
  .doc-meta { flex-direction: column; gap: 0.5rem; }
  
  .log-entry { padding-left: 1rem; }
  .log-cmd { font-size: 0.95rem; }
  .log-text { font-size: 0.95rem; line-height: 1.6; }
  
  .hobby-images-grid { grid-template-columns: 1fr; }
}

/* ANIMATIONS */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>