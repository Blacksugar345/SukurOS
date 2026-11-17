<template>
  <div class="os-container terminal-mode">
    
    <!-- BACKGROUND DECORATION -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- MINIMAL SUBPAGE HEADER -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Hobbies&amp;Interests</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- TEXT DOCUMENT VIEWER -->
    <main class="document-wrapper">
      <article class="hud-frame hud-corners text-document os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
        
        <!-- Document Header -->
        <div class="doc-header">
          <div class="doc-status-row">
            <span class="status-pill"><span class="pulse-dot"></span> READ_ONLY_LOG</span>
          </div>
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
              <h2 class="log-cmd">&gt; EXEC: {{ interest.command_alias || './execute_hobby.sh' }}</h2>
              <span class="update-date" v-if="interest.date_update">
                [ UPDATED: {{ formatDate(interest.date_update) }} ]
              </span>
            </div>

            <!-- v-html handles your <strong> and <a> tags from the database -->
            <div class="log-text rich-text" v-html="interest.content"></div>

            <!-- Image Grid (Only shows if URLs exist in the database array) -->
            <div class="hobby-images-grid" v-if="getValidImages(interest.image_urls).length > 0">
              <button
                type="button"
                class="img-wrapper"
                v-for="(imgUrl, idx) in getValidImages(interest.image_urls)"
                :key="idx"
                :aria-label="`Expand ${interest.title || 'hobby'} image ${idx + 1}`"
                @click="openLightbox(imgUrl, `${interest.command_alias || 'Hobby'} // Image ${idx + 1}`)"
              >
                <img 
                  :src="imgUrl" 
                  :alt="`${interest.title || 'Hobby'} image ${idx + 1}`" 
                  class="hobby-img" 
                  loading="lazy" 
                  decoding="async"
                />
                <span class="zoom-badge">[ EXPAND ⤢ ]</span>
              </button>
            </div>

          </section>

          <!-- Blinking Terminal Cursor -->
          <div class="terminal-cursor" aria-hidden="true">_</div>
          
        </div>

        <!-- Loading / Empty State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING ARCHIVE LOGS...</p>
        </div>

      </article>
    </main>

    <!-- LIGHTBOX MODAL FOR MEDIA INSPECTION -->
    <Teleport to="body">
      <div v-if="lightboxUrl" class="cyber-lightbox" role="dialog" aria-modal="true" @click="closeLightbox">
        <div class="lightbox-frame hud-frame" @click.stop>
          <div class="lightbox-bar">
            <span class="lightbox-caption glow-text">{{ lightboxCaption }}</span>
            <button type="button" class="lightbox-close" aria-label="Close image preview" @click="closeLightbox">✕ ESC</button>
          </div>
          <img :src="lightboxUrl" :alt="lightboxCaption" class="lightbox-img" decoding="async" />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const supabase = useSupabaseClient()
const isRevealed = ref(false)
const lightboxUrl = ref(null)
const lightboxCaption = ref('')

// Fetch interests ordered by ID
const { data: interests } = await useAsyncData('interests', async () => {
  try {
    const { data, error } = await supabase
      .from('interests')
      .select('*')
      .order('id', { ascending: true })
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const getValidImages = (urls) => {
  if (!Array.isArray(urls)) return []
  return urls.filter(u => typeof u === 'string' && u.trim() !== '')
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const openLightbox = (url, caption) => {
  lightboxUrl.value = url
  lightboxCaption.value = caption
}

const closeLightbox = () => {
  lightboxUrl.value = null
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && lightboxUrl.value) closeLightbox()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  setTimeout(() => {
    isRevealed.value = true
  }, 60)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* =========================================
   BASE VARIABLES 
   ========================================= */
.os-container {
  --bg-void: #060b10;
  --bg-panel: rgba(12, 22, 30, 0.76);
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #dff6f8;
  --text-secondary: #8baab2;
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
  padding: 2.75rem;
  backdrop-filter: blur(10px);
  position: relative;
  border-radius: 3px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}

.hud-corners::after {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 14px;
  height: 14px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
  pointer-events: none;
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
  padding: 1.25rem 3rem;
  background: rgba(6, 11, 16, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14);
  z-index: 50;
  backdrop-filter: blur(12px);
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.14em;
}

.return-btn {
  color: var(--text-secondary);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 2px;
  background: rgba(6, 11, 16, 0.6);
}

.return-btn:hover {
  color: var(--cyan);
  border-color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
  box-shadow: 0 0 12px rgba(110, 234, 245, 0.15);
}

/* =========================================
   DOCUMENT VIEWER LAYOUT
   ========================================= */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 7.5rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}

.text-document {
  max-width: 920px;
  width: 100%;
  border-top: 3px solid var(--cyan);
}

.doc-header {
  margin-bottom: 1.5rem;
}

.doc-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  color: #00ff9d;
  background: rgba(0, 255, 157, 0.08);
  border: 1px solid rgba(0, 255, 157, 0.25);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  letter-spacing: 0.1em;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 6px #00ff9d;
}

.sys-path {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #5d7e86;
}

.doc-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
  word-break: break-word;
}

.doc-meta {
  display: flex;
  gap: 2rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: #6b919b;
  letter-spacing: 0.1em;
}

.cyan-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, var(--cyan) 0%, transparent 100%);
  margin-bottom: 2.5rem;
  opacity: 0.5;
}

/* =========================================
   TEXT LOG FORMATTING
   ========================================= */
.doc-body {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.log-entry {
  position: relative;
  padding: 1.25rem 1.25rem 1.25rem 1.5rem;
  border-left: 2px solid rgba(110, 234, 245, 0.25);
  background: rgba(6, 11, 16, 0.4);
  border-radius: 0 4px 4px 0;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.log-entry:hover {
  border-left-color: var(--cyan);
  background: rgba(6, 11, 16, 0.6);
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
  font-size: 1.08rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.update-date {
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #6b919b;
  letter-spacing: 0.1em;
}

.log-text {
  color: var(--text-secondary);
  font-size: 1.04rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.log-text:last-child {
  margin-bottom: 0;
}

.rich-text :deep(strong) {
  color: #dff6f8;
  font-weight: 600;
}

.rich-text :deep(a) {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.5);
  transition: all 0.25s ease;
}

.rich-text :deep(a:hover) {
  text-shadow: 0 0 8px var(--cyan-glow);
  border-bottom-style: solid;
}

/* Dynamic Image Grid */
.hobby-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.img-wrapper {
  position: relative;
  padding: 0;
  border: 1px solid rgba(110, 234, 245, 0.22);
  border-radius: 3px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #030609;
  cursor: pointer;
  display: block;
  width: 100%;
}

.hobby-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}

.zoom-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(6, 11, 16, 0.85);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.62rem;
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.img-wrapper:hover .hobby-img {
  opacity: 1;
  transform: scale(1.04);
}

.img-wrapper:hover .zoom-badge {
  opacity: 1;
}

/* Cursor */
.terminal-cursor {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.5rem;
  margin-top: 0.5rem;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

/* Lightbox Modal */
.cyber-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(3, 6, 10, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-frame {
  max-width: 92vw;
  max-height: 90vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-color: var(--cyan);
}

.lightbox-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.2);
  padding-bottom: 0.5rem;
}

.lightbox-caption {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.lightbox-close {
  background: rgba(110, 234, 245, 0.1);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  border-radius: 2px;
}

.lightbox-img {
  max-width: 88vw;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  
  .hud-frame { padding: 1.35rem; }
  
  .doc-meta { flex-direction: column; gap: 0.35rem; }
  
  .log-entry { padding: 1rem; }
  .log-cmd { font-size: 0.95rem; }
  .log-text { font-size: 0.95rem; line-height: 1.65; }
  
  .hobby-images-grid { grid-template-columns: 1fr; }
}

/* ANIMATIONS */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
