<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Namecards</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <span class="hud-subtag">Sukuros // namecards</span>
          <h1 class="doc-title glow-text">NAMECARDS</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ namecards?.length || 0 }} RECORDS FOUND.</p>
        </div>

        <div class="cards-grid" v-if="namecards?.length">
          
          <!-- Namecard Display Case -->
          <article 
            class="namecard-display hud-corners os-anim anim-scan" 
            :class="{ 'is-revealed': isRevealed }"
            v-for="card in namecards" 
            :key="card.id"
          >
            <!-- Visual Display Container (Dual Image Support) -->
            <div class="card-visual-wrapper" :class="{ 'single-img': !card.back_image_url }">
              
              <!-- Front Image -->
              <button
                type="button"
                class="card-img-box"
                :aria-label="`Expand Namecard ${card.year} ${card.version || 'BASE'} Front`"
                @click="openLightbox(card.front_image_url || '/Explorehome.png', `NAMECARD ${card.year} // ${card.version || 'BASE'} [FRONT]`)"
              >
                <span class="img-label">[ FRONT ]</span>
                <img 
                  :src="card.front_image_url || '/Explorehome.png'" 
                  :alt="`Namecard ${card.year} ${card.version} Front`" 
                  class="namecard-img" 
                  loading="lazy"
                  decoding="async"
                />
                <span class="zoom-badge">[ EXPAND ⤢ ]</span>
              </button>
              
              <!-- Back Image (Only shows if URL exists) -->
              <button
                v-if="card.back_image_url"
                type="button"
                class="card-img-box"
                :aria-label="`Expand Namecard ${card.year} ${card.version || 'BASE'} Back`"
                @click="openLightbox(card.back_image_url, `NAMECARD ${card.year} // ${card.version || 'BASE'} [BACK]`)"
              >
                <span class="img-label">[ BACK ]</span>
                <img 
                  :src="card.back_image_url" 
                  :alt="`Namecard ${card.year} ${card.version} Back`" 
                  class="namecard-img" 
                  loading="lazy"
                  decoding="async"
                />
                <span class="zoom-badge">[ EXPAND ⤢ ]</span>
              </button>

            </div>

            <!-- Metadata Panel -->
            <div class="card-metadata">
              <div class="meta-header">
                <h2 class="card-year glow-text">{{ card.year }}</h2>
                <span class="card-version">ITERATION: {{ card.version || 'BASE' }}</span>
              </div>
              
              <div class="meta-grid">
                <div class="meta-item">
                  <span class="label">DEBUT EVENT:</span>
                  <span class="value">{{ card.event_debut || 'UNKNOWN' }}</span>
                </div>
              </div>

              <div class="meta-desc-box">
                <span class="label">&gt; DESIGN_LOG:</span>
                <p class="desc-text">{{ card.design_concept || 'No design notes available.' }}</p>
              </div>
            </div>

          </article>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_CREDENTIAL_DATA...</p>
        </div>

      </div>
    </main>

    <!-- LIGHTBOX MODAL -->
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

// Fetch namecards, ordering by year descending, then by version descending (newest first)
const { data: namecards } = await useAsyncData('namecards', async () => {
  try {
    const { data, error } = await supabase
      .from('namecards')
      .select('*')
      .order('year', { ascending: false })
      .order('version', { ascending: false })
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

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
/* Base Styles */
.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
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

/* Header */
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

/* Layout */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 7.5rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}
.archive-container {
  max-width: 1000px;
  width: 100%;
}

.doc-header { margin-bottom: 2.75rem; text-align: center; }
.hud-subtag {
  display: block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #5d7e86;
  letter-spacing: 0.15em;
  margin-bottom: 0.35rem;
}
.doc-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.25rem); letter-spacing: 0.05em; margin: 0 0 0.5rem 0; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }

/* Grid Layout for Cards */
.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
}

/* Individual Display Case */
.namecard-display {
  position: relative;
  background: rgba(12, 22, 30, 0.55);
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px; 
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  backdrop-filter: blur(8px);
}

.hud-corners::before,
.hud-corners::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  pointer-events: none;
  z-index: 6;
}
.hud-corners::before {
  top: 0; left: 0;
  border-top: 2px solid var(--cyan);
  border-left: 2px solid var(--cyan);
}
.hud-corners::after {
  bottom: 0; right: 0;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
}

.namecard-display:hover {
  transform: translateY(-4px);
  border-color: rgba(110, 234, 245, 0.45);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
}

/* Visual Container (Dual Image Layout) */
.card-visual-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding: 1.5rem;
  background: #030508;
  border-bottom: 1px solid rgba(110, 234, 245, 0.2);
}

.card-visual-wrapper.single-img {
  grid-template-columns: 1fr;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.card-img-box {
  position: relative;
  width: 100%;
  padding: 0;
  border: 1px solid rgba(110, 234, 245, 0.22);
  background: #000;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  cursor: pointer;
}

.img-label {
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  background: rgba(6, 11, 16, 0.85);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.62rem;
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  z-index: 5;
}

.zoom-badge {
  position: absolute;
  bottom: 0.55rem;
  right: 0.55rem;
  background: rgba(6, 11, 16, 0.85);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.62rem;
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 5;
}

.namecard-img {
  width: 100%;
  height: 100%;
  max-height: 360px;
  object-fit: contain; 
  opacity: 0.92;
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0.5rem;
  display: block;
}

.card-img-box:hover .namecard-img {
  opacity: 1;
  transform: scale(1.03);
}

.card-img-box:hover .zoom-badge {
  opacity: 1;
}

/* Metadata Panel */
.card-metadata {
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
}

.meta-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.15);
}

.card-year {
  font-family: var(--font-display);
  font-size: 1.6rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.card-version {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: #ffb800;
  letter-spacing: 0.1em;
}

.meta-grid {
  margin-bottom: 1.25rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: #5d7e86;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 1rem;
  color: var(--text-primary);
}

.meta-desc-box {
  background: rgba(6, 11, 16, 0.55);
  border: 1px solid rgba(110, 234, 245, 0.12);
  padding: 1rem;
  border-radius: 2px;
}

.desc-text {
  margin: 0.5rem 0 0 0;
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* Loading */
.loading-state {
  text-align: center;
  padding: 4rem 0;
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
  background: rgba(12, 22, 30, 0.9);
  border: 1px solid var(--cyan);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  
  .doc-title { font-size: 1.6rem; }
  .doc-meta { font-size: 0.75rem; }

  .card-visual-wrapper {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .card-metadata { padding: 1rem; }
  .card-year { font-size: 1.4rem; }
  .card-visual-wrapper { padding: 0.75rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
