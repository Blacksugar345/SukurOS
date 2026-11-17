<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // GALLERY</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="gallery-container">
        
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <span class="hud-subtag">VISUAL_VAULT // ARTWORK_AND_MEDIA</span>
          <h1 class="doc-title glow-text">MEDIA ARCHIVES</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ filteredImages.length }} RECORDS FOUND.</p>
        </div>

        <!-- ==========================================
             COMPACT FILTER BAR
             ========================================== -->
        <div class="filter-console os-anim anim-scan" :class="{ 'is-revealed': isRevealed }" v-if="images?.length">
          <div class="filter-section" role="tablist" aria-label="Media Category Filter">
            <span class="filter-label">&gt; CATEGORY:</span>
            <div class="category-chips">
              <button 
                type="button"
                role="tab"
                :aria-selected="activeCategory === 'ALL'"
                class="cyber-chip" 
                :class="{ active: activeCategory === 'ALL' }"
                @click="activeCategory = 'ALL'"
              >
                [ ALL_DATA ]
              </button>
              <button 
                v-for="cat in uniqueCategories" 
                :key="cat"
                type="button"
                role="tab"
                :aria-selected="activeCategory === cat"
                class="cyber-chip"
                :class="{ active: activeCategory === cat }"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>

        <!-- ==========================================
             IMAGE & VIDEO GRID
             ========================================== -->
        <div class="media-grid" v-if="filteredImages.length">
          
          <article 
            class="media-card os-anim anim-scan" 
            v-for="img in filteredImages" 
            :key="img.id"
            :class="{ 
              'is-active': activeCard === img.id,
              'is-revealed': isRevealed 
            }"
            @click="toggleCard(img.id)"
          >
            <!-- Video or Image Media -->
            <video
              v-if="isVideoUrl(img.image_url)"
              :src="img.image_url"
              class="gallery-img"
              preload="metadata"
              muted
              loop
              playsinline
              @mouseenter="$event.target.play()"
              @mouseleave="$event.target.pause()"
            ></video>
            <img 
              v-else
              :src="img.image_url" 
              :alt="img.title || 'Gallery media'" 
              class="gallery-img" 
              loading="lazy" 
              decoding="async"
            />
            
            <!-- Hover / Active Overlay Panel -->
            <div class="overlay-panel">
              <div class="overlay-content" @click.stop>
                <div class="tag-row">
                  <div class="tag-group">
                    <span class="category-tag">[{{ img.category || 'UNSORTED' }}]</span>
                    <span class="date-tag">{{ formatDate(img.date_taken) }}</span>
                  </div>
                  <div class="card-actions">
                    <button
                      type="button"
                      class="expand-card-btn"
                      :aria-label="`View full resolution ${img.title}`"
                      @click.stop="openLightbox(img)"
                    >
                      [ EXPAND ⤢ ]
                    </button>
                    <!-- Mobile Close Button -->
                    <button 
                      type="button"
                      class="close-card-btn mobile-only" 
                      v-if="activeCard === img.id" 
                      aria-label="Close card details"
                      @click.stop="toggleCard(img.id)"
                    >✕</button>
                  </div>
                </div>
                
                <h2 class="image-title glow-text">{{ img.title }}</h2>
                <p class="image-desc">{{ img.description }}</p>
                
              </div>
              <div class="scanner-line" aria-hidden="true"></div>
            </div>
            
          </article>

        </div>

        <!-- Empty State -->
        <div class="empty-state hud-frame" v-else-if="images?.length && !filteredImages.length">
          <p class="glow-text" style="color: #ffb800;">WARNING: NO MEDIA MATCHES CURRENT FILTER.</p>
          <button type="button" class="reset-btn" @click="activeCategory = 'ALL'">RESET_FILTERS</button>
        </div>

        <!-- Initial Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_MEDIA_FILES...</p>
        </div>

      </div>
    </main>

    <!-- FULL-SCREEN CYBER LIGHTBOX MODAL -->
    <Teleport to="body">
      <div v-if="lightboxItem" class="cyber-lightbox" role="dialog" aria-modal="true" @click="closeLightbox">
        <div class="lightbox-frame hud-frame" @click.stop>
          <div class="lightbox-bar">
            <div class="lightbox-meta">
              <span class="category-tag">[{{ lightboxItem.category || 'UNSORTED' }}]</span>
              <span class="lightbox-title glow-text">{{ lightboxItem.title }}</span>
              <span class="date-tag">{{ formatDate(lightboxItem.date_taken) }}</span>
            </div>
            <button type="button" class="lightbox-close" aria-label="Close media viewer" @click="closeLightbox">✕ ESC</button>
          </div>

          <div class="lightbox-media-box">
            <video
              v-if="isVideoUrl(lightboxItem.image_url)"
              :src="lightboxItem.image_url"
              class="lightbox-media"
              controls
              autoplay
              playsinline
            ></video>
            <img
              v-else
              :src="lightboxItem.image_url"
              :alt="lightboxItem.title"
              class="lightbox-media"
              decoding="async"
            />
          </div>

          <p v-if="lightboxItem.description" class="lightbox-desc">{{ lightboxItem.description }}</p>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const supabase = useSupabaseClient()

const isRevealed = ref(false)
const lightboxItem = ref(null)

// Fetch all gallery images
const { data: images } = await useAsyncData('gallery', async () => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('date_taken', { ascending: false })
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

// --- FILTER & INTERACTION LOGIC ---
const activeCategory = ref('ALL')
const activeCard = ref(null)

const toggleCard = (id) => {
  activeCard.value = activeCard.value === id ? null : id
}

const isVideoUrl = (url) => {
  if (!url) return false
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)
}

const openLightbox = (item) => {
  lightboxItem.value = item
}

const closeLightbox = () => {
  lightboxItem.value = null
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && lightboxItem.value) closeLightbox()
}

// Dynamically grab all unique categories
const uniqueCategories = computed(() => {
  if (!images.value) return []
  const cats = images.value.map(img => img.category).filter(Boolean)
  return [...new Set(cats)].sort()
})

// Filters the images based on chosen category
const filteredImages = computed(() => {
  if (!images.value) return []
  
  return images.value.filter(img => {
    return activeCategory.value === 'ALL' || img.category === activeCategory.value
  })
})

// Simple date formatter
const formatDate = (dateString) => {
  if (!dateString) return 'UNKNOWN DATE'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()
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
  background-image: linear-gradient(rgba(110, 234, 245, 0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.025) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* HUD Framework */
.hud-frame {
  background: rgba(12, 22, 30, 0.55);
  border: 1px solid rgba(110, 234, 245, 0.25);
  padding: 2rem;
  backdrop-filter: blur(8px);
}

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
.gallery-container {
  max-width: 1400px;
  width: 100%;
}

.doc-header { margin-bottom: 1.75rem; text-align: center; }
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

/* Filter Console */
.filter-console {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-top: 2px solid var(--cyan);
  background: rgba(12, 22, 30, 0.55);
  padding: 0.85rem 1.35rem;
  border-radius: 0 0 4px 4px;
  backdrop-filter: blur(8px);
  border-left: 1px solid rgba(110, 234, 245, 0.18);
  border-right: 1px solid rgba(110, 234, 245, 0.18);
  border-bottom: 1px solid rgba(110, 234, 245, 0.18);
}

.filter-section { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; width: 100%; }
.filter-label { font-family: var(--font-display); font-size: 0.75rem; color: #5d7e86; letter-spacing: 0.1em; white-space: nowrap; }

.category-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cyber-chip {
  background: rgba(6, 11, 16, 0.65); border: 1px solid rgba(110, 234, 245, 0.22);
  color: var(--text-secondary); font-family: var(--font-display); font-size: 0.7rem;
  padding: 0.4rem 0.8rem; border-radius: 2px; cursor: pointer; transition: all 0.2s ease; text-transform: uppercase;
}
.cyber-chip:hover { border-color: var(--cyan); color: var(--text-primary); }
.cyber-chip.active {
  background: rgba(110, 234, 245, 0.14); border-color: var(--cyan);
  color: var(--cyan); text-shadow: 0 0 5px var(--cyan-glow);
}
.reset-btn {
  background: none; border: 1px solid #ffb800; color: #ffb800; font-family: var(--font-display);
  font-size: 0.75rem; cursor: pointer; padding: 0.5rem 1rem; transition: all 0.2s; border-radius: 2px;
}
.reset-btn:hover { background: rgba(255, 184, 0, 0.1); box-shadow: 0 0 10px rgba(255, 184, 0, 0.3); }

/* =========================================
   IMAGE GRID
   ========================================= */
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  grid-auto-rows: min-content;
}

.media-card {
  position: relative;
  background: #030609;
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4 / 3; 
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
  filter: grayscale(8%) contrast(106%);
  display: block;
}

.media-card:hover .gallery-img,
.media-card.is-active .gallery-img {
  transform: scale(1.05);
  filter: grayscale(0%) contrast(112%);
}

/* OVERLAY PANEL */
.overlay-panel {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(6, 11, 16, 0.96) 0%, rgba(6, 11, 16, 0.45) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.35rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.media-card:hover .overlay-panel,
.media-card.is-active .overlay-panel {
  opacity: 1;
  pointer-events: auto;
}

.media-card.is-active .overlay-panel {
  background: rgba(6, 11, 16, 0.92);
  backdrop-filter: blur(5px);
}

.overlay-content { 
  position: relative; 
  z-index: 2; 
  max-height: 100%; 
  display: flex;
  flex-direction: column;
}

.tag-row {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.65rem;
  font-family: var(--font-display); font-size: 0.68rem; letter-spacing: 0.08em; gap: 0.5rem;
}

.tag-group {
  display: flex; gap: 0.4rem; flex-wrap: wrap;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.category-tag { 
  color: #ffb800; 
  background: rgba(6, 11, 16, 0.88);
  padding: 0.22rem 0.5rem;
  border-radius: 2px;
  border: 1px solid rgba(255, 184, 0, 0.35);
}

.date-tag { 
  color: var(--text-primary); 
  background: rgba(6, 11, 16, 0.88);
  padding: 0.22rem 0.5rem;
  border-radius: 2px;
  border: 1px solid rgba(110, 234, 245, 0.22);
}

.expand-card-btn {
  background: rgba(6, 11, 16, 0.88);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.65rem;
  padding: 0.22rem 0.5rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.expand-card-btn:hover {
  background: var(--cyan);
  color: var(--bg-void);
  box-shadow: 0 0 10px var(--cyan-glow);
}

.close-card-btn {
  background: rgba(6, 11, 16, 0.88);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  border-radius: 2px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 8px var(--cyan-glow);
}

.image-title { font-family: var(--font-display); font-size: 1.3rem; margin: 0 0 0.4rem 0; letter-spacing: 0.05em; flex-shrink: 0;}

.image-desc {
  font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.media-card.is-active .image-desc {
  display: block;
  overflow-y: auto;
  max-height: 180px;
  padding-right: 0.5rem;
}

.mobile-only { display: none; }

/* Scanner Line */
.scanner-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--cyan); box-shadow: 0 0 10px var(--cyan-glow); opacity: 0; z-index: 1; pointer-events: none;
}
.media-card:hover .scanner-line { animation: scan-down 1.5s ease-in-out infinite; }
@keyframes scan-down { 0% { top: 0; opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { top: 100%; opacity: 0; } }

.loading-state, .empty-state {
  display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 40vh; text-align: center; gap: 1rem;
  font-family: var(--font-display); letter-spacing: 0.1em;
}

/* Lightbox Modal */
.cyber-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(3, 6, 10, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-frame {
  max-width: 94vw;
  max-height: 92vh;
  width: auto;
  padding: 1.25rem;
  background: rgba(10, 18, 26, 0.95);
  border: 1px solid var(--cyan);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.85);
}

.lightbox-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.2);
  padding-bottom: 0.65rem;
  flex-wrap: wrap;
}

.lightbox-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.lightbox-title {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.06em;
}

.lightbox-close {
  background: rgba(110, 234, 245, 0.1);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.72rem;
  padding: 0.3rem 0.65rem;
  cursor: pointer;
  border-radius: 2px;
}

.lightbox-media-box {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #020406;
  border: 1px solid rgba(110, 234, 245, 0.15);
}

.lightbox-media {
  max-width: 88vw;
  max-height: 72vh;
  object-fit: contain;
  display: block;
}

.lightbox-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.55;
  max-width: 80ch;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  
  .doc-header { text-align: center; margin-bottom: 1.5rem; }
  .doc-title { font-size: 1.6rem; }
  
  .filter-console { padding: 1rem; }
  .filter-section { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  
  .media-grid { 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 1.35rem;
  }
  
  .overlay-panel {
    opacity: 1;
    background: linear-gradient(to top, rgba(6, 11, 16, 0.95) 0%, transparent 65%);
    padding: 1rem;
    pointer-events: auto;
  }
  .image-title { font-size: 1.1rem; }
  .image-desc { font-size: 0.85rem; }
  .scanner-line { display: none; }
  
  .mobile-only { display: flex; }
}

@media (max-width: 480px) {
  .media-grid { grid-template-columns: 1fr; }
  .cyber-chip { font-size: 0.65rem; padding: 0.35rem 0.6rem; }
  
  .media-card.is-active .image-desc {
    max-height: 150px;
  }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
