<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Original_characters</span>
      </div>
      <NuxtLink to="/furry/original_characters" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <main class="document-wrapper" v-if="character">
      <div class="wiki-container os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
        
        <!-- Top Section: Identity & Image -->
        <section class="wiki-hero hud-frame hud-corners">
          <button
            type="button"
            class="hero-image-box"
            :aria-label="`Expand ${character.fullname} portrait`"
            @click="openLightbox(character.image_url || '/Explorehome.png', `${character.fullname} // Portrait`)"
          >
            <img 
              :src="character.image_url || '/Explorehome.png'" 
              :alt="character.nickname || character.fullname" 
              class="wiki-img" 
              fetchpriority="high"
              decoding="async"
              width="280"
              height="280"
            />
            <div class="scanner-line" aria-hidden="true"></div>
            <span class="zoom-badge">[ EXPAND ⤢ ]</span>
          </button>
          
          <div class="hero-data">
            <div class="hero-header-row">
              <div>
                <h1 class="char-title glow-text">{{ character.fullname }}</h1>
                <h2 class="char-subtitle" v-if="character.aliases">AKA: {{ character.aliases }}</h2>
              </div>
              <div class="status-badge" :class="isAlive(character.status) ? 'alive' : 'dead'">
                {{ character.status ? character.status.toUpperCase() : 'UNKNOWN' }}
              </div>
            </div>

            <!-- Quick Stats Grid -->
            <div class="quick-stats">
              <div class="stat-box"><span class="label">NICKNAME</span><span class="value">"{{ character.nickname }}"</span></div>
              <div class="stat-box"><span class="label">SPECIES</span><span class="value">{{ character.species }}</span></div>
              <div class="stat-box"><span class="label">BREED</span><span class="value">{{ character.breed || 'N/A' }}</span></div>
              <div class="stat-box"><span class="label">OCCUPATION</span><span class="value">{{ character.occupation || 'N/A' }}</span></div>
            </div>
          </div>
        </section>

        <!-- Middle Section: Physical Attributes & Origin -->
        <section class="wiki-section hud-frame hud-corners">
          <h3 class="section-title">&gt; PHYSICAL_ATTRIBUTES &amp; ORIGIN</h3>
          <div class="details-grid">
            <div class="detail-item"><span class="label">AGE</span><span class="value">{{ character.age || '?' }}</span></div>
            <div class="detail-item"><span class="label">DOB</span><span class="value">{{ character.year_birth || '?' }}</span></div>
            <div class="detail-item"><span class="label">BIRTHPLACE</span><span class="value">{{ character.place_birth || '?' }}</span></div>
            <div class="detail-item"><span class="label">SEX</span><span class="value">{{ character.sex || '?' }}</span></div>
            <div class="detail-item"><span class="label">HEIGHT</span><span class="value">{{ character.height ? character.height + ' cm' : '?' }}</span></div>
            <div class="detail-item"><span class="label">WEIGHT</span><span class="value">{{ character.weight ? character.weight + ' kg' : '?' }}</span></div>
            <div class="detail-item"><span class="label">EYES</span><span class="value">{{ character.eyes_color || '?' }}</span></div>
            <div class="detail-item"><span class="label">INNER EAR</span><span class="value">{{ character.inner_ear_color || '?' }}</span></div>
            <div class="detail-item"><span class="label">NOSE</span><span class="value">{{ character.nose_color || '?' }}</span></div>
            <div class="detail-item"><span class="label">FUR PATTERN</span><span class="value">{{ character.fur_pattern || '?' }}</span></div>
            <div class="detail-item full-width"><span class="label">DISTINCTIVE TRAITS</span><span class="value">{{ character.distinctive || 'NONE' }}</span></div>
            <!-- Education uses v-html so you can put <a> links straight into the database -->
            <div class="detail-item full-width">
              <span class="label">EDUCATION</span>
              <span class="value rich-text" v-html="character.education || 'N/A'"></span>
            </div>
          </div>
        </section>

        <!-- Bottom Section: Lore & Abilities -->
        <section class="wiki-section hud-frame hud-corners">
          <h3 class="section-title">&gt; CLASSIFIED_INTEL</h3>
          
          <!-- Backstory uses v-html for dynamic linking -->
          <div class="text-block" v-if="character.backstory">
            <h4 class="block-title">BACKGROUND / LORE</h4>
            <div class="block-text rich-text" v-html="character.backstory"></div>
          </div>

          <div class="text-block" v-if="character.abilities">
            <h4 class="block-title">KNOWN ABILITIES / SKILLS</h4>
            <p class="block-text">{{ character.abilities }}</p>
          </div>
        </section>

      </div>
    </main>
    
    <!-- Loading State -->
    <main class="document-wrapper loading-state" v-else-if="pending">
      <div class="spinner-box">
        <p class="glow-text">DECRYPTING CHARACTER WIKI...</p>
      </div>
    </main>

    <!-- Not Found / Error Fallback -->
    <main class="document-wrapper loading-state" v-else>
      <div class="hud-frame" style="text-align: center; max-width: 500px;">
        <h2 class="glow-text" style="color: #ff3366; font-family: var(--font-display);">DOSSIER NOT FOUND</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Operative file [{{ characterNickname }}] could not be retrieved from the database.</p>
        <NuxtLink to="/furry/original_characters" class="return-btn" style="justify-content: center;">
          ◂ RETURN TO ARCHIVE
        </NuxtLink>
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
import { useRoute } from 'vue-router'

const route = useRoute()
const supabase = useSupabaseClient()
const isRevealed = ref(false)
const lightboxUrl = ref(null)
const lightboxCaption = ref('')

const characterNickname = route.params.name

const { data: character, pending } = await useAsyncData(`oc-${characterNickname}`, async () => {
  try {
    const { data, error } = await supabase
      .from('original_characters')
      .select('*')
      .eq('nickname', characterNickname)
      .single()
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return null
  }
})

const isAlive = (status) => {
  if (!status) return true
  const s = status.toLowerCase()
  if (s.includes('deceased') || s.includes('dead') || s.includes('mia')) return false
  return true
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
.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --bg-panel: rgba(12, 22, 30, 0.65);
  --border-hud: rgba(110, 234, 245, 0.22);
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

.hud-frame {
  position: relative;
  background: var(--bg-panel);
  border: 1px solid var(--border-hud);
  border-radius: 4px;
  padding: 2.25rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
}

.hud-corners::before,
.hud-corners::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  pointer-events: none;
}
.hud-corners::before {
  top: -1px; left: -1px;
  border-top: 2px solid var(--cyan);
  border-left: 2px solid var(--cyan);
}
.hud-corners::after {
  bottom: -1px; right: -1px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
}

/* Header */
.sub-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3rem;
  background: rgba(5, 8, 12, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14);
  z-index: 50;
  backdrop-filter: blur(12px);
}
.logo { min-width: 0; flex: 1; overflow: hidden; }
.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.12em;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.return-btn {
  flex-shrink: 0;
  white-space: nowrap;
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
.wiki-container {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Hero Section */
.wiki-hero {
  display: flex;
  gap: 2.5rem;
}

.hero-image-box {
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  padding: 0;
  border: 1px solid var(--cyan);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: #030609;
  cursor: pointer;
}

.wiki-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.92;
  filter: grayscale(15%) contrast(108%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  display: block;
}

.hero-image-box:hover .wiki-img {
  transform: scale(1.04);
  filter: grayscale(0%) contrast(105%);
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

.hero-image-box:hover .zoom-badge {
  opacity: 1;
}

.scanner-line {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: var(--cyan);
  box-shadow: 0 0 15px var(--cyan-glow);
  animation: scan-vertical 4s linear infinite;
  opacity: 0.55;
  pointer-events: none;
}

@keyframes scan-vertical {
  0% { top: 0; }
  100% { top: 100%; }
}

.hero-data {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

.hero-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.15);
  padding-bottom: 1rem;
  gap: 1rem;
}

.char-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  margin: 0 0 0.25rem 0;
  letter-spacing: 0.05em;
  word-wrap: break-word;
}

.char-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 400;
}

.status-badge {
  font-family: var(--font-display);
  font-size: 0.78rem;
  padding: 0.4rem 0.8rem;
  border-radius: 2px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}
.status-badge.alive { border: 1px solid var(--cyan); color: var(--cyan); background: rgba(110, 234, 245, 0.08); }
.status-badge.dead { border: 1px solid #ff3366; color: #ff3366; background: rgba(255, 51, 102, 0.08); }

.quick-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-box {
  background: rgba(6, 11, 16, 0.5);
  border: 1px solid rgba(110, 234, 245, 0.12);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 3px;
}
.stat-box .label { font-size: 0.72rem; color: #5d7e86; font-weight: 600; letter-spacing: 0.06em; }
.stat-box .value { font-size: 1.08rem; color: var(--text-primary); }

/* Sections */
.section-title {
  font-family: var(--font-display);
  color: #a4c8d1;
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.05em;
}

/* Attributes Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.full-width {
  grid-column: 1 / -1;
}

.detail-item .label { font-size: 0.72rem; color: #5d7e86; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.detail-item .value { font-size: 0.96rem; color: var(--text-primary); word-wrap: break-word; line-height: 1.45; }

/* Lore Text Blocks */
.text-block {
  margin-bottom: 2rem;
  padding-left: 1.25rem;
  border-left: 2px solid rgba(110, 234, 245, 0.25);
}
.text-block:last-child { margin-bottom: 0; }

.block-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--cyan);
  margin: 0 0 0.75rem 0;
  letter-spacing: 0.1em;
}

.block-text {
  color: var(--text-secondary);
  font-size: 1.04rem;
  line-height: 1.75;
  white-space: pre-wrap;
  margin: 0;
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

/* Responsive */
@media (max-width: 768px) {
  .sub-header { padding: 0.9rem 1rem; gap: 0.5rem; }
  .logo-text { font-size: 0.85rem; letter-spacing: 0.06em; }
  .return-btn { font-size: 0.72rem; padding: 0.35rem 0.65rem; gap: 0.35rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  .hud-frame { padding: 1.5rem; }
  .wiki-hero { flex-direction: column; align-items: center; }
  .hero-image-box { width: 100%; max-width: 280px; height: auto; aspect-ratio: 1; }
  .hero-header-row { flex-direction: column; align-items: center; text-align: center; gap: 0.85rem; }
  .quick-stats { grid-template-columns: 1fr; }
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
