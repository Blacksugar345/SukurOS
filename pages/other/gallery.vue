<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // GALLERY</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="gallery-container">
        
        <!-- Bound isRevealed natively to Vue to prevent disappearing bug -->
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h1 class="doc-title glow-text">MEDIA ARCHIVES</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ filteredImages.length }} RECORDS FOUND.</p>
        </div>

        <!-- ==========================================
             COMPACT FILTER BAR
             ========================================== -->
        <div class="filter-console os-anim anim-scan" :class="{ 'is-revealed': isRevealed }" v-if="images?.length">
          <div class="filter-section">
            <span class="filter-label">> CATEGORY:</span>
            <div class="category-chips">
              <button 
                class="cyber-chip" 
                :class="{ active: activeCategory === 'ALL' }"
                @click="activeCategory = 'ALL'"
              >
                [ ALL_DATA ]
              </button>
              <button 
                v-for="cat in uniqueCategories" 
                :key="cat"
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
             IMAGE GRID
             ========================================== -->
        <div class="media-grid" v-if="filteredImages.length">
          
          <div 
            class="media-card os-anim anim-scan" 
            v-for="img in filteredImages" 
            :key="img.id"
            :class="{ 
              'is-active': activeCard === img.id,
              'is-revealed': isRevealed 
            }"
            @click="toggleCard(img.id)"
          >
            <!-- The Image itself -->
            <img :src="img.image_url" :alt="img.title" class="gallery-img" loading="lazy" />
            
            <!-- Hover Overlay Panel -->
            <div class="overlay-panel">
              <!-- @click.stop prevents scrolling/tapping the text from closing the card -->
              <div class="overlay-content" @click.stop>
                <div class="tag-row">
                  <div class="tag-group">
                    <span class="category-tag">[{{ img.category || 'UNSORTED' }}]</span>
                    <span class="date-tag">{{ formatDate(img.date_taken) }}</span>
                  </div>
                  <!-- Mobile Close Button -->
                  <button 
                    class="close-card-btn mobile-only" 
                    v-if="activeCard === img.id" 
                    @click.stop="toggleCard(img.id)"
                  >✕</button>
                </div>
                
                <h3 class="image-title glow-text">{{ img.title }}</h3>
                <p class="image-desc">{{ img.description }}</p>
                
              </div>
              <div class="scanner-line"></div>
            </div>
            
          </div>

        </div>

        <!-- Empty State -->
        <div class="empty-state hud-frame" v-else-if="images?.length && !filteredImages.length">
          <p class="glow-text" style="color: #ffb800;">WARNING: NO MEDIA MATCHES CURRENT FILTER.</p>
          <button class="reset-btn" @click="activeCategory = 'ALL'">RESET_FILTERS</button>
        </div>

        <!-- Initial Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_MEDIA_FILES...</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const supabase = useSupabaseClient()

// Controls the fade-in animation natively so Vue doesn't accidentally erase it
const isRevealed = ref(false)

// Fetch all gallery images
const { data: images } = await useAsyncData('gallery', async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('date_taken', { ascending: false })
    
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
})

// --- FILTER & INTERACTION LOGIC ---
const activeCategory = ref('ALL')
const activeCard = ref(null) // Tracks which card is clicked/tapped

const toggleCard = (id) => {
  // If clicking the same card, close it. Otherwise, open the new one.
  activeCard.value = activeCard.value === id ? null : id
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
  // Triggers the animation state natively in Vue
  setTimeout(() => {
    isRevealed.value = true
  }, 100)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Space+Grotesk:wght@400;500;600&display=swap');

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
  background-image: linear-gradient(rgba(110, 234, 245, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* HUD Framework */
.hud-frame {
  background: rgba(12, 22, 30, 0.5);
  border: 1px solid rgba(110, 234, 245, 0.25);
  padding: 2rem;
  backdrop-filter: blur(8px);
}

/* Header */
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

/* Layout */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}
.gallery-container {
  max-width: 1400px;
  width: 100%;
}

.doc-header { margin-bottom: 1.5rem; text-align: center; }
.doc-title { font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; }

/* Filter Console */
.filter-console {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-top: 2px solid var(--cyan);
  background: rgba(12, 22, 30, 0.4);
  padding: 0.75rem 1.25rem;
  border-radius: 0 0 4px 4px;
  backdrop-filter: blur(8px);
  border-left: 1px solid rgba(110, 234, 245, 0.15);
  border-right: 1px solid rgba(110, 234, 245, 0.15);
  border-bottom: 1px solid rgba(110, 234, 245, 0.15);
}

.filter-section { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; width: 100%; }
.filter-label { font-family: var(--font-display); font-size: 0.75rem; color: #5d7e86; letter-spacing: 0.1em; white-space: nowrap; }

.category-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cyber-chip {
  background: rgba(6, 11, 16, 0.6); border: 1px solid rgba(110, 234, 245, 0.2);
  color: var(--text-secondary); font-family: var(--font-display); font-size: 0.7rem;
  padding: 0.35rem 0.75rem; border-radius: 2px; cursor: pointer; transition: all 0.2s ease; text-transform: uppercase;
}
.cyber-chip:hover { border-color: var(--cyan); color: var(--text-primary); }
.cyber-chip.active {
  background: rgba(110, 234, 245, 0.1); border-color: var(--cyan);
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
  gap: 2rem;
  grid-auto-rows: min-content;
}

.media-card {
  position: relative;
  background: #000;
  border: 1px solid rgba(110, 234, 245, 0.15);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4 / 3; 
  cursor: pointer; 
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
  filter: grayscale(10%) contrast(110%);
}

.media-card:hover .gallery-img,
.media-card.is-active .gallery-img {
  transform: scale(1.05);
  filter: grayscale(0%) contrast(120%);
}

/* OVERLAY PANEL */
.overlay-panel {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(6, 11, 16, 0.95) 0%, rgba(6, 11, 16, 0.4) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* Activating the card */
.media-card:hover .overlay-panel,
.media-card.is-active .overlay-panel {
  opacity: 1;
  pointer-events: auto; /* Allows scrolling inside the overlay when active */
}

/* Solid background when active to ensure text is perfectly readable over bright images */
.media-card.is-active .overlay-panel {
  background: rgba(6, 11, 16, 0.90);
  backdrop-filter: blur(4px);
}

.overlay-content { 
  position: relative; 
  z-index: 2; 
  max-height: 100%; 
  display: flex;
  flex-direction: column;
}

.tag-row {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;
  font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 0.1em;
}

.tag-group {
  display: flex; gap: 0.5rem; flex-wrap: wrap;
}

/* Distinct tag backgrounds so they never blend into white images */
.category-tag { 
  color: #ffb800; 
  background: rgba(6, 11, 16, 0.85);
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  border: 1px solid rgba(255, 184, 0, 0.3);
}

.date-tag { 
  color: var(--text-primary); 
  background: rgba(6, 11, 16, 0.85);
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  border: 1px solid rgba(110, 234, 245, 0.2);
}

.close-card-btn {
  background: rgba(6, 11, 16, 0.85);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  border-radius: 2px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 8px var(--cyan-glow);
}

.image-title { font-family: var(--font-display); font-size: 1.4rem; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; flex-shrink: 0;}

/* The Description */
.image-desc {
  font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin: 0;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Scrollable expansion fix! */
.media-card.is-active .image-desc {
  display: block;
  overflow-y: auto;
  max-height: 200px; /* Allows scrolling if it's massive without breaking the box */
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
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 3rem 1rem; }
  
  .doc-header { text-align: center; margin-bottom: 1.5rem; }
  .doc-title { font-size: 1.6rem; }
  
  .filter-console { padding: 1rem; }
  .filter-section { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  
  .media-grid { 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 1.5rem;
  }
  
  /* Always show a tiny bit of the overlay on mobile so they know to tap */
  .overlay-panel {
    opacity: 1;
    background: linear-gradient(to top, rgba(6, 11, 16, 0.95) 0%, transparent 60%);
    padding: 1rem;
  }
  .image-title { font-size: 1.1rem; }
  .image-desc { font-size: 0.85rem; }
  .scanner-line { display: none; }
  
  /* Reveal the X button on mobile */
  .mobile-only { display: flex; }
}

@media (max-width: 480px) {
  .media-grid { grid-template-columns: 1fr; }
  .cyber-chip { font-size: 0.65rem; padding: 0.35rem 0.6rem; }
  
  /* On tiny screens, give the expanded text a bit more room to scroll */
  .media-card.is-active .image-desc {
    max-height: 150px;
  }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>