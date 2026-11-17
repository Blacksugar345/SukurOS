<template>
  <div class="os-container terminal-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Minimal Subpage Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // ARCHIVE // {{ category.toUpperCase() }}</span>
      </div>
      <!-- Uses Vue Router to dynamically go back or fall back to archive list -->
      <button type="button" @click="handleReturn" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </button>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      
      <!-- Loading State -->
      <div v-if="pending" class="loading-state">
        <p class="glow-text">FETCHING ARCHIVE RECORD...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!recordData" class="error-state hud-frame hud-corners os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
        <h2 class="glow-text" style="color: #ff3366;">ERROR: 404</h2>
        <p>Record [{{ slug }}] not found in table [{{ category }}].</p>
        <NuxtLink :to="`/other/archive/${isValidCategory ? category : 'game'}/list`" class="return-btn" style="margin: 1.5rem auto 0 auto; width: max-content;">
          ◂ VIEW ARCHIVE INDEX
        </NuxtLink>
      </div>

      <!-- Success State: Record Display -->
      <article v-else class="archive-record hud-frame hud-corners os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
        
        <!-- TOP SECTION: Cover Image & Metadata -->
        <div class="record-header-grid">
          
          <!-- Left: Cover Image -->
          <button
            v-if="recordData.cover_image"
            type="button"
            class="cover-image-container"
            :aria-label="`Expand ${recordData.title} cover image`"
            @click="openLightbox(recordData.cover_image, `${recordData.title} // Cover`)"
          >
            <img 
              :src="recordData.cover_image" 
              :alt="recordData.title" 
              class="cover-img" 
              fetchpriority="high"
              decoding="async"
            />
            <div class="scanner-line" aria-hidden="true"></div>
            <span class="zoom-badge">[ EXPAND ⤢ ]</span>
          </button>
          <div class="cover-image-container fallback-img" v-else>
            <span>NO IMAGE DATA</span>
          </div>

          <!-- Right: Meta Data (Changes based on category) -->
          <div class="record-meta-panel">
            <h1 class="record-title glow-text">{{ recordData.title }}</h1>
            <hr class="cyan-divider" />

            <!-- META: GAME -->
            <div class="meta-grid" v-if="category === 'game'">
              <div class="meta-row"><span class="m-label">&gt; PLATFORM:</span> <span class="m-value">{{ recordData.platform }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; GENRE:</span> <span class="m-value">{{ recordData.genre }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; STATUS:</span> <span class="m-value">{{ recordData.completion_status }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; PLAYTIME:</span> <span class="m-value">{{ recordData.playtime_hours }} HRS</span></div>
              <div class="meta-row"><span class="m-label">&gt; RATING:</span> <span class="m-value highlight">{{ recordData.rating }} / 10</span></div>
            </div>

            <!-- META: MUSIC -->
            <div class="meta-grid" v-if="category === 'music'">
              <div class="meta-row"><span class="m-label">&gt; ROLE:</span> <span class="m-value">{{ recordData.artist_role }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; GENRE:</span> <span class="m-value">{{ recordData.genre }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; INSTRUMENT:</span> <span class="m-value">{{ recordData.instrument }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; BPM:</span> <span class="m-value">{{ recordData.bpm }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; DURATION:</span> <span class="m-value">{{ recordData.duration }}</span></div>
              <div class="meta-row" v-if="recordData.audio_url">
                <span class="m-label">&gt; AUDIO LINK:</span> 
                <a :href="recordData.audio_url" target="_blank" rel="noopener noreferrer" class="m-link">[ ACCESS AUDIO ↗ ]</a>
              </div>
            </div>

            <!-- META: DRAWING -->
            <div class="meta-grid" v-if="category === 'drawing'">
              <div class="meta-row"><span class="m-label">&gt; MEDIUM:</span> <span class="m-value">{{ recordData.medium }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; SOFTWARE:</span> <span class="m-value">{{ recordData.software_tools }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; CANVAS:</span> <span class="m-value">{{ recordData.canvas_resolution }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; TIME LOG:</span> <span class="m-value">{{ recordData.time_spent_hours }} HRS</span></div>
              <div class="meta-row" v-if="recordData.character_tags?.length">
                <span class="m-label">&gt; TAGS:</span>
                <div class="tag-box">
                  <span class="cyber-tag" v-for="tag in recordData.character_tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- META: COOKING -->
            <div class="meta-grid" v-if="category === 'cooking'">
              <div class="meta-row"><span class="m-label">&gt; CUISINE:</span> <span class="m-value">{{ recordData.cuisine_type }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; DIFFICULTY:</span> <span class="m-value">{{ recordData.difficulty }}</span></div>
              <div class="meta-row"><span class="m-label">&gt; PREP TIME:</span> <span class="m-value">{{ recordData.prep_time_mins }} MINS</span></div>
              <div class="meta-row"><span class="m-label">&gt; COOK TIME:</span> <span class="m-value">{{ recordData.cook_time_mins }} MINS</span></div>
              <div class="meta-row"><span class="m-label">&gt; RATING:</span> <span class="m-value highlight">{{ recordData.rating_taste }} / 10</span></div>
            </div>
            
          </div>
        </div>

        <!-- MIDDLE SECTION: Rich Text Content -->
        <div class="record-content-section">
          
          <!-- Cooking has two specific text fields -->
          <div v-if="category === 'cooking'">
            <h2 class="section-title">&gt; INGREDIENTS</h2>
            <div class="rich-text log-content" v-html="recordData.ingredients_list"></div>
            
            <h2 class="section-title" style="margin-top: 2rem;">&gt; INSTRUCTIONS</h2>
            <div class="rich-text log-content" v-html="recordData.cooking_instructions"></div>
          </div>
          
          <!-- The other 3 tables have one main notes field -->
          <div v-else>
            <h2 class="section-title">&gt; ARCHIVE_LOG // NOTES</h2>
            <div class="rich-text log-content" v-html="getMainNotesContent()"></div>
          </div>

        </div>

        <!-- BOTTOM SECTION: Dynamic Image Gallery -->
        <div class="record-gallery-section" v-if="hasGalleryImages()">
          <h2 class="section-title">&gt; ATTACHED_MEDIA</h2>
          <div class="image-array-grid">
            <button
              type="button"
              class="img-wrapper"
              v-for="(imgUrl, idx) in getGalleryArray()"
              :key="idx"
              :aria-label="`Expand attached media image ${idx + 1}`"
              @click="openLightbox(imgUrl, `${recordData.title} // Media ${idx + 1}`)"
            >
              <img 
                :src="imgUrl" 
                :alt="`Gallery image ${idx + 1}`" 
                class="array-img" 
                loading="lazy" 
                decoding="async"
              />
              <span class="zoom-badge">[ EXPAND ⤢ ]</span>
            </button>
          </div>
        </div>

      </article>
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
import { useRoute, useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const isRevealed = ref(false)
const lightboxUrl = ref(null)
const lightboxCaption = ref('')

// Get URL parameters
const category = String(route.params.category || '').toLowerCase()
const slug = route.params.slug

// Ensure user is on a valid category
const validCategories = ['game', 'music', 'drawing', 'cooking']
const isValidCategory = validCategories.includes(category)

const handleReturn = () => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
  } else {
    router.push(`/other/archive/${isValidCategory ? category : 'game'}/list`)
  }
}

// Fetch Data dynamically based on category
const { data: recordData, pending } = await useAsyncData(`archive-${category}-${slug}`, async () => {
  if (!isValidCategory) return null
  
  try {
    const { data, error } = await supabase
      .from(category)
      .select('*')
      .eq('slug', slug)
      .single()
      
    if (error) {
      console.error("SUPABASE ERROR:", error.message)
      return null
    }
    return data
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return null
  }
})

// Helper functions for dynamic column names
const getMainNotesContent = () => {
  if (!recordData.value) return ''
  if (category === 'game') return recordData.value.review_notes
  if (category === 'music') return recordData.value.production_notes
  if (category === 'drawing') return recordData.value.concept_notes
  return ''
}

const getGalleryArray = () => {
  if (!recordData.value) return []
  let arr = []
  if (category === 'game') arr = recordData.value.gallery_images
  if (category === 'drawing' || category === 'cooking') arr = recordData.value.process_images
  if (!Array.isArray(arr)) return []
  return arr.filter(u => typeof u === 'string' && u.trim() !== '')
}

const hasGalleryImages = () => {
  return getGalleryArray().length > 0
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
/* Base Styles */
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

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }
.cyan-divider { border: none; height: 1px; background: linear-gradient(90deg, var(--cyan) 0%, transparent 100%); margin: 1.5rem 0; opacity: 0.5; }

/* HUD Frame */
.hud-frame {
  position: relative;
  border: 1px solid var(--border-hud);
  background: var(--bg-panel);
  padding: 2.75rem;
  backdrop-filter: blur(10px);
  border-radius: 3px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}

.hud-corners::after {
  content: '';
  position: absolute;
  bottom: -1px; right: -1px;
  width: 14px; height: 14px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
  pointer-events: none;
}

/* Header */
.sub-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 3rem;
  background: rgba(6, 11, 16, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14);
  z-index: 50;
  backdrop-filter: blur(12px);
}

.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; letter-spacing: 0.12em; text-transform: uppercase; }

.return-btn {
  background: rgba(6, 11, 16, 0.6);
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 2px;
  padding: 0.4rem 0.85rem;
  cursor: pointer;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.25s ease;
  display: flex; align-items: center; gap: 0.5rem;
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

.archive-record {
  max-width: 1000px;
  width: 100%;
  border-top: 3px solid var(--cyan);
}

/* Header Grid (Cover + Meta) */
.record-header-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.cover-image-container {
  width: 100%;
  padding: 0;
  aspect-ratio: 3/4;
  border: 1px solid rgba(110, 234, 245, 0.35);
  background: #030609;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  cursor: pointer;
}

.fallback-img {
  display: flex; justify-content: center; align-items: center;
  font-family: var(--font-display); color: var(--text-secondary); font-size: 0.8rem;
  cursor: default;
}

.cover-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.92;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}

.cover-image-container:hover .cover-img {
  transform: scale(1.03);
}

.zoom-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(6, 11, 16, 0.88);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.62rem;
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.cover-image-container:hover .zoom-badge,
.img-wrapper:hover .zoom-badge {
  opacity: 1;
}

.scanner-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--cyan); box-shadow: 0 0 10px var(--cyan-glow);
  animation: scan-vertical 4s linear infinite;
  pointer-events: none;
}

@keyframes scan-vertical {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* Metadata Panel */
.record-title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2rem);
  margin: 0;
  word-break: break-word;
}

.meta-grid {
  display: flex; flex-direction: column; gap: 1rem;
}

.meta-row {
  display: flex; gap: 1rem; align-items: baseline;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.12);
  padding-bottom: 0.5rem;
}

.m-label {
  font-family: var(--font-display); font-size: 0.78rem; color: #5d7e86; min-width: 120px;
}
.m-value { font-size: 1.05rem; color: var(--text-primary); }
.m-value.highlight { color: #ffb800; font-weight: bold; }
.m-link { color: var(--cyan); text-decoration: none; font-size: 0.88rem; font-family: var(--font-display); }
.m-link:hover { text-shadow: 0 0 5px var(--cyan-glow); }

.tag-box { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cyber-tag { background: rgba(110, 234, 245, 0.06); border: 1px solid rgba(110, 234, 245, 0.22); font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 2px; }

/* Rich Text Content */
.section-title {
  font-family: var(--font-display); color: var(--cyan); font-size: 1.15rem; margin: 0 0 1rem 0; letter-spacing: 0.05em;
}

.log-content {
  color: var(--text-secondary);
  font-size: 1.04rem;
  line-height: 1.8;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(110, 234, 245, 0.25);
  margin-bottom: 3rem;
}

.rich-text :deep(strong) { color: #dff6f8; font-weight: 600; }
.rich-text :deep(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.5); }
.rich-text :deep(a:hover) { text-shadow: 0 0 8px var(--cyan-glow); border-bottom-style: solid; }
.rich-text :deep(ul) { padding-left: 1rem; }

/* Image Gallery Section */
.image-array-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
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

.array-img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.88; transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); display: block;
}
.img-wrapper:hover .array-img { opacity: 1; transform: scale(1.04); }

/* States */
.loading-state, .error-state { text-align: center; padding: 4rem 1.5rem; font-family: var(--font-display); letter-spacing: 0.08em; }

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
@media (max-width: 900px) {
  .record-header-grid { grid-template-columns: 250px 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.9rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  .hud-frame { padding: 1.5rem; }
  
  .record-header-grid { grid-template-columns: 1fr; gap: 2rem; }
  .cover-image-container { max-width: 280px; margin: 0 auto; }
  
  .record-title { font-size: 1.55rem; text-align: center; }
  .meta-row { flex-direction: column; gap: 0.25rem; }
  .m-label { min-width: auto; }
  
  .log-content { padding-left: 1rem; font-size: 0.95rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
