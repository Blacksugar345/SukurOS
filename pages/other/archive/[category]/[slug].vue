<template>
  <div class="os-container terminal-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Minimal Subpage Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // ARCHIVE // {{ category.toUpperCase() }}</span>
      </div>
      <!-- Uses Vue Router to dynamically go back to the previous page (Gallery or Hobbies) -->
      <button @click="router.back()" class="return-btn">
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
      <div v-else-if="!recordData" class="error-state hud-frame os-anim anim-scan">
        <h2 class="glow-text" style="color: #ff3366;">ERROR: 404</h2>
        <p>Record [{{ slug }}] not found in table [{{ category }}].</p>
      </div>

      <!-- Success State: Record Display -->
      <div v-else class="archive-record hud-frame os-anim anim-scan">
        
        <!-- TOP SECTION: Cover Image & Metadata -->
        <div class="record-header-grid">
          
          <!-- Left: Cover Image -->
          <div class="cover-image-container" v-if="recordData.cover_image">
            <img :src="recordData.cover_image" :alt="recordData.title" class="cover-img" />
            <div class="scanner-line"></div>
          </div>
          <div class="cover-image-container fallback-img" v-else>
            <span>NO IMAGE DATA</span>
          </div>

          <!-- Right: Meta Data (Changes based on category) -->
          <div class="record-meta-panel">
            <h1 class="record-title glow-text">{{ recordData.title }}</h1>
            <hr class="cyan-divider" />

            <!-- META: GAME -->
            <div class="meta-grid" v-if="category === 'game'">
              <div class="meta-row"><span class="m-label">> PLATFORM:</span> <span class="m-value">{{ recordData.platform }}</span></div>
              <div class="meta-row"><span class="m-label">> GENRE:</span> <span class="m-value">{{ recordData.genre }}</span></div>
              <div class="meta-row"><span class="m-label">> STATUS:</span> <span class="m-value">{{ recordData.completion_status }}</span></div>
              <div class="meta-row"><span class="m-label">> PLAYTIME:</span> <span class="m-value">{{ recordData.playtime_hours }} HRS</span></div>
              <div class="meta-row"><span class="m-label">> RATING:</span> <span class="m-value highlight">{{ recordData.rating }} / 10</span></div>
            </div>

            <!-- META: MUSIC -->
            <div class="meta-grid" v-if="category === 'music'">
              <div class="meta-row"><span class="m-label">> ROLE:</span> <span class="m-value">{{ recordData.artist_role }}</span></div>
              <div class="meta-row"><span class="m-label">> GENRE:</span> <span class="m-value">{{ recordData.genre }}</span></div>
              <div class="meta-row"><span class="m-label">> INSTRUMENT:</span> <span class="m-value">{{ recordData.instrument }}</span></div>
              <div class="meta-row"><span class="m-label">> BPM:</span> <span class="m-value">{{ recordData.bpm }}</span></div>
              <div class="meta-row"><span class="m-label">> DURATION:</span> <span class="m-value">{{ recordData.duration }}</span></div>
              <div class="meta-row" v-if="recordData.audio_url">
                <span class="m-label">> AUDIO LINK:</span> 
                <a :href="recordData.audio_url" target="_blank" class="m-link">[ ACCESS AUDIO ↗ ]</a>
              </div>
            </div>

            <!-- META: DRAWING -->
            <div class="meta-grid" v-if="category === 'drawing'">
              <div class="meta-row"><span class="m-label">> MEDIUM:</span> <span class="m-value">{{ recordData.medium }}</span></div>
              <div class="meta-row"><span class="m-label">> SOFTWARE:</span> <span class="m-value">{{ recordData.software_tools }}</span></div>
              <div class="meta-row"><span class="m-label">> CANVAS:</span> <span class="m-value">{{ recordData.canvas_resolution }}</span></div>
              <div class="meta-row"><span class="m-label">> TIME LOG:</span> <span class="m-value">{{ recordData.time_spent_hours }} HRS</span></div>
              <div class="meta-row" v-if="recordData.character_tags?.length">
                <span class="m-label">> TAGS:</span>
                <div class="tag-box">
                  <span class="cyber-tag" v-for="tag in recordData.character_tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>

            <!-- META: COOKING -->
            <div class="meta-grid" v-if="category === 'cooking'">
              <div class="meta-row"><span class="m-label">> CUISINE:</span> <span class="m-value">{{ recordData.cuisine_type }}</span></div>
              <div class="meta-row"><span class="m-label">> DIFFICULTY:</span> <span class="m-value">{{ recordData.difficulty }}</span></div>
              <div class="meta-row"><span class="m-label">> PREP TIME:</span> <span class="m-value">{{ recordData.prep_time_mins }} MINS</span></div>
              <div class="meta-row"><span class="m-label">> COOK TIME:</span> <span class="m-value">{{ recordData.cook_time_mins }} MINS</span></div>
              <div class="meta-row"><span class="m-label">> RATING:</span> <span class="m-value highlight">{{ recordData.rating_taste }} / 10</span></div>
            </div>
            
          </div>
        </div>

        <!-- MIDDLE SECTION: Rich Text Content -->
        <div class="record-content-section">
          
          <!-- Cooking has two specific text fields -->
          <div v-if="category === 'cooking'">
            <h3 class="section-title">> INGREDIENTS</h3>
            <div class="rich-text log-content" v-html="recordData.ingredients_list"></div>
            
            <h3 class="section-title" style="margin-top: 2rem;">> INSTRUCTIONS</h3>
            <div class="rich-text log-content" v-html="recordData.cooking_instructions"></div>
          </div>
          
          <!-- The other 3 tables have one main notes field -->
          <div v-else>
            <h3 class="section-title">> ARCHIVE_LOG // NOTES</h3>
            <div class="rich-text log-content" v-html="getMainNotesContent()"></div>
          </div>

        </div>

        <!-- BOTTOM SECTION: Dynamic Image Gallery -->
        <div class="record-gallery-section" v-if="hasGalleryImages()">
          <h3 class="section-title">> ATTACHED_MEDIA</h3>
          <div class="image-array-grid">
            <div class="img-wrapper" v-for="(imgUrl, idx) in getGalleryArray()" :key="idx">
              <img :src="imgUrl" :alt="`Gallery image ${idx + 1}`" class="array-img" loading="lazy" />
            </div>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()

// Get URL parameters
const category = route.params.category?.toLowerCase() // 'game', 'music', 'drawing', or 'cooking'
const slug = route.params.slug

// Ensure user is on a valid category
const validCategories = ['game', 'music', 'drawing', 'cooking']
const isValidCategory = validCategories.includes(category)

// Fetch Data dynamically based on category
const { data: recordData, pending } = await useAsyncData(`archive-${category}-${slug}`, async () => {
  if (!isValidCategory) return null
  
  const { data, error } = await supabase
    .from(category)       // Dynamically select the table based on URL!
    .select('*')
    .eq('slug', slug)     // Find by slug
    .single()
    
  if (error) {
    console.error("SUPABASE ERROR:", error.message)
    return null
  }
  return data
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
  if (category === 'game') return recordData.value.gallery_images
  if (category === 'drawing' || category === 'cooking') return recordData.value.process_images
  return []
}

const hasGalleryImages = () => {
  const arr = getGalleryArray()
  return arr && arr.length > 0 && arr[0] !== ''
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

/* Base Styles */
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
  border: 1px solid var(--border-hud);
  background: var(--bg-panel);
  padding: 3rem;
  backdrop-filter: blur(8px);
}

/* Header */
.sub-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem 3rem;
  background: rgba(6, 11, 16, 0.9);
  border-bottom: 1px solid rgba(110, 234, 245, 0.1);
  z-index: 50;
  backdrop-filter: blur(10px);
}

.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; letter-spacing: 0.1em; text-transform: uppercase; }

.return-btn {
  background: none; border: none; cursor: pointer;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  display: flex; align-items: center; gap: 0.5rem;
}
.return-btn:hover { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Layout */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
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
  aspect-ratio: 3/4; /* Standard box art/poster ratio */
  border: 1px solid rgba(110, 234, 245, 0.3);
  background: #000;
  position: relative;
  overflow: hidden;
}

.fallback-img {
  display: flex; justify-content: center; align-items: center;
  font-family: var(--font-display); color: var(--text-secondary); font-size: 0.8rem;
}

.cover-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.scanner-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--cyan); box-shadow: 0 0 10px var(--cyan-glow);
  animation: scan-vertical 4s linear infinite;
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
  font-size: 2rem;
  margin: 0;
  word-break: break-word;
}

.meta-grid {
  display: flex; flex-direction: column; gap: 1rem;
}

.meta-row {
  display: flex; gap: 1rem; align-items: baseline;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.1);
  padding-bottom: 0.5rem;
}

.m-label {
  font-family: var(--font-display); font-size: 0.8rem; color: #5d7e86; min-width: 120px;
}
.m-value { font-size: 1.05rem; color: var(--text-primary); }
.m-value.highlight { color: #ffb800; font-weight: bold; }
.m-link { color: var(--cyan); text-decoration: none; font-size: 0.9rem; font-family: var(--font-display); }
.m-link:hover { text-shadow: 0 0 5px var(--cyan-glow); }

.tag-box { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cyber-tag { background: rgba(110, 234, 245, 0.05); border: 1px solid rgba(110, 234, 245, 0.2); font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 2px; }

/* Rich Text Content */
.section-title {
  font-family: var(--font-display); color: var(--cyan); font-size: 1.2rem; margin: 0 0 1rem 0; letter-spacing: 0.05em;
}

.log-content {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
  padding-left: 1.5rem;
  border-left: 2px solid rgba(110, 234, 245, 0.2);
  margin-bottom: 3rem;
}

.rich-text :deep(strong) { color: #dff6f8; font-weight: 600; }
.rich-text :deep(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.5); }
.rich-text :deep(a:hover) { text-shadow: 0 0 8px var(--cyan-glow); border-bottom-style: solid; }
.rich-text :deep(ul) { padding-left: 1rem; }

/* Image Gallery Section */
.image-array-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.img-wrapper {
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #000;
}

.array-img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: opacity 0.3s ease, transform 0.5s ease;
}
.img-wrapper:hover .array-img { opacity: 1; transform: scale(1.05); }

/* States */
.loading-state, .error-state { text-align: center; padding: 4rem; }

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 900px) {
  .record-header-grid { grid-template-columns: 250px 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 3rem 1rem; }
  .hud-frame { padding: 1.5rem; }
  
  .record-header-grid { grid-template-columns: 1fr; gap: 2rem; }
  .cover-image-container { max-width: 300px; margin: 0 auto; }
  
  .record-title { font-size: 1.6rem; text-align: center; }
  .meta-row { flex-direction: column; gap: 0.25rem; }
  .m-label { min-width: auto; }
  
  .log-content { padding-left: 1rem; font-size: 0.95rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>