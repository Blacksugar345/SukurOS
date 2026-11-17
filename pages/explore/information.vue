<template>
  <div class="os-container terminal-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Minimal Subpage Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Information</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Content Layout -->
    <main class="document-wrapper">
      <div class="content-stack">
        
        <!-- ==========================================
             PART 1: IDENTITY CARD
             ========================================== -->
        <section class="id-card hud-frame hud-corners os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          
          <!-- Left Side: Visual Identity -->
          <div class="id-visual">
            <div class="avatar-frame">
              <img 
                :src="identityData?.image_url || '/irl_profile.jpg'" 
                alt="Operative Biometric Avatar" 
                class="avatar-img" 
                fetchpriority="high"
                decoding="async"
                width="320"
                height="320"
              />
              <div class="scanner-line" aria-hidden="true"></div>
            </div>
            <div class="status-box">
              <span class="status-dot"></span>
              SYSTEM: ONLINE
            </div>
          </div>

          <!-- Right Side: Database Info -->
          <div class="id-data" v-if="identityData">
            <div class="doc-header">
              <h1 class="doc-title glow-text">PERSONAL_DATA</h1>
            </div>

            <hr class="cyan-divider" />

            <!-- Structured Data Grid -->
            <div class="info-grid">
              
              <div class="info-row">
                <span class="info-label">&gt; FULL NAME</span>
                <span class="info-value">{{ identityData.first_name }} {{ identityData.last_name }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">&gt; NICKNAME</span>
                <span class="info-value glow-text">{{ identityData.known_alias }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">&gt; OCCUPATION</span>
                <span class="info-value">{{ identityData.occupation }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">&gt; COUNTRY</span>
                <span class="info-value">{{ identityData.base_of_operations }}</span>
              </div>

              <!-- Fixed DOB Row to prevent awkward line breaks -->
              <div class="info-row-flex">
                <div class="info-cell">
                  <span class="info-label">&gt; DATE_OF_BIRTH</span>
                  <span class="info-value">{{ identityData.date_of_birth }} <span class="dim-text">(AGE: {{ calculatedAge }})</span></span>
                </div>
                <div class="info-cell">
                  <span class="info-label">&gt; SEX</span>
                  <span class="info-value">{{ identityData.biometric_sex }}</span>
                </div>
              </div>

              <div class="info-row-flex">
                <div class="info-cell">
                  <span class="info-label">&gt; HEIGHT</span>
                  <span class="info-value">{{ identityData.height_cm }} cm</span>
                </div>
                <div class="info-cell">
                  <span class="info-label">&gt; WEIGHT</span>
                  <span class="info-value">{{ identityData.weight_kg }} kg</span>
                </div>
              </div>

              <div class="info-row" v-if="identityData.blood_type">
                <span class="info-label">&gt; BLOOD_TYPE</span>
                <span class="info-value" style="color: #ff3366;">[ {{ identityData.blood_type }} ]</span>
              </div>

              <div class="info-row" v-if="identityData.languages?.length">
                <span class="info-label">&gt; LANGUAGES</span>
                <div class="language-tags">
                  <span class="lang-tag" v-for="(lang, index) in identityData.languages" :key="index">
                    {{ lang }}
                  </span>
                </div>
              </div>

            </div>
          </div>
          
          <!-- Loading State -->
          <div class="id-data loading-state" v-else>
            <p class="glow-text">DECRYPTING PERSONAL FILE...</p>
          </div>

        </section>

        <!-- ==========================================
             PART 2: FACTS 
             ========================================== -->
        <section class="facts-section hud-frame hud-corners os-anim anim-scan" :class="{ 'is-revealed': isRevealed }" style="transition-delay: 0.15s;">
          <div class="doc-header">
            <span class="hud-subtag" style="color: #ffb800;">SUPPLEMENTAL_INTEL // LOGS</span>
            <h2 class="doc-title glow-text">FACTS_ABOUT_ME</h2>
          </div>
          <hr class="cyan-divider" />

          <div class="facts-grid" v-if="factsData?.length">
            
            <article class="fact-block" v-for="fact in factsData" :key="fact.id">
              <h3 class="fact-title">&gt; {{ fact.title }}</h3>
              
              <!-- Rich Text Content -->
              <div class="fact-content rich-text" v-html="fact.content"></div>
              
              <!-- Dynamic Image Array Grid -->
              <div class="fact-images-grid" v-if="getValidImages(fact.image_urls).length > 0">
                <button
                  type="button"
                  class="img-wrapper"
                  v-for="(imgUrl, idx) in getValidImages(fact.image_urls)"
                  :key="idx"
                  :aria-label="`Expand ${fact.title} image ${idx + 1}`"
                  @click="openLightbox(imgUrl, `${fact.title} // Image ${idx + 1}`)"
                >
                  <img 
                    :src="imgUrl" 
                    :alt="`${fact.title} image ${idx + 1}`" 
                    class="fact-img" 
                    loading="lazy" 
                    decoding="async"
                  />
                  <span class="zoom-badge">[ EXPAND ⤢ ]</span>
                </button>
              </div>
            </article>

          </div>
          
          <div class="loading-state" v-else>
            <p class="glow-text">NO ADDITIONAL LOGS FOUND.</p>
          </div>
        </section>

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
import { ref, onMounted, onUnmounted, computed } from 'vue'

const supabase = useSupabaseClient()
const isRevealed = ref(false)
const lightboxUrl = ref(null)
const lightboxCaption = ref('')

// Fetch identity core data
const { data: identityData } = await useAsyncData('identity_core', async () => {
  try {
    const { data, error } = await supabase.from('identity_core').select('*').limit(1).single()
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return null
  }
})

// Fetch facts data
const { data: factsData } = await useAsyncData('facts', async () => {
  try {
    const { data, error } = await supabase.from('facts').select('*').order('id', { ascending: true })
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

// Calculate exact age based on the birthdate
const calculatedAge = computed(() => {
  if (!identityData.value?.date_of_birth) return 'UNKNOWN'
  const dob = new Date(identityData.value.date_of_birth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDifference = today.getMonth() - dob.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
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
/* =========================================
   BASE STYLES
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

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow), 0 0 2px var(--cyan-glow); }
.dim-text { color: var(--text-secondary); font-size: 0.9em; }

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
   HEADER
   ========================================= */
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

.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; letter-spacing: 0.14em; }

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
   LAYOUT
   ========================================= */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 7.5rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}

.content-stack {
  max-width: 950px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
}

/* =========================================
   PART 1: ID CARD
   ========================================= */
.id-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3.5rem;
  border-top: 3px solid var(--cyan);
}

.id-visual { display: flex; flex-direction: column; gap: 1.25rem; }

.avatar-frame {
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid rgba(110, 234, 245, 0.35);
  background: rgba(6, 11, 16, 0.6);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.avatar-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.85;
  filter: grayscale(100%) contrast(120%) sepia(100%) hue-rotate(130deg);
  transition: all 0.35s ease;
  display: block;
}
.avatar-frame:hover .avatar-img { filter: grayscale(0%) contrast(100%) sepia(0%); opacity: 1; }

.scanner-line {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 2px;
  background: var(--cyan);
  box-shadow: 0 0 10px var(--cyan-glow);
  animation: scan-vertical 3s linear infinite;
}

@keyframes scan-vertical {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.status-box {
  background: rgba(110, 234, 245, 0.06);
  border: 1px solid rgba(110, 234, 245, 0.25);
  padding: 0.75rem;
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--cyan);
  border-radius: 2px;
}
.status-dot {
  width: 8px; height: 8px;
  background: #00ff9d;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff9d;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Data Side */
.doc-header { margin-bottom: 1.25rem; }
.hud-subtag {
  display: block;
  font-family: var(--font-display);
  font-size: 0.68rem;
  color: #6b919b;
  letter-spacing: 0.14em;
  margin-bottom: 0.35rem;
}
.doc-title { font-family: var(--font-display); font-size: 1.75rem; letter-spacing: 0.05em; margin: 0; }

.cyan-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, var(--cyan) 0%, transparent 100%);
  margin-bottom: 2rem;
  opacity: 0.5;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-row-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.info-cell {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 150px;
}

.info-label {
  font-family: var(--font-display);
  color: #6b919b;
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.info-value {
  color: var(--text-primary);
  font-size: 1.08rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(110, 234, 245, 0.25);
  line-height: 1.4;
  word-break: break-word;
}

.language-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(110, 234, 245, 0.25);
}

.lang-tag {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(110, 234, 245, 0.06);
  border: 1px solid rgba(110, 234, 245, 0.22);
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
}

/* =========================================
   PART 2: FACTS SECTION
   ========================================= */
.facts-section {
  border-top: 3px solid #ffb800;
}

.facts-grid {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.fact-block {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem;
  background: rgba(6, 11, 16, 0.4);
  border: 1px solid rgba(110, 234, 245, 0.1);
  border-radius: 3px;
}

.fact-title {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.08rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.fact-content {
  color: var(--text-secondary);
  font-size: 1.02rem;
  line-height: 1.75;
  padding-left: 1rem;
  border-left: 1px dashed rgba(110, 234, 245, 0.25);
}

.rich-text :deep(strong) { color: #dff6f8; font-weight: 600; }
.rich-text :deep(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.5); transition: all 0.25s ease; }
.rich-text :deep(a:hover) { text-shadow: 0 0 8px var(--cyan-glow); border-bottom-style: solid; }

.fact-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
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

.fact-img {
  width: 100%; height: 100%;
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

.img-wrapper:hover .fact-img { opacity: 1; transform: scale(1.04); }
.img-wrapper:hover .zoom-badge { opacity: 1; }

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  padding: 2.5rem 1rem;
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
@media (max-width: 900px) {
  .id-card { grid-template-columns: 1fr; gap: 2.5rem; }
  .avatar-frame { max-width: 340px; margin: 0 auto; }
}

@media (max-width: 600px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  
  .hud-frame { padding: 1.35rem; }
  .id-card { gap: 1.75rem; }
  
  .doc-title { font-size: 1.45rem; }
  .info-value { font-size: 1rem; }
  
  .info-row-flex { flex-direction: column; gap: 1.25rem; }
  
  .fact-block { padding: 1rem; }
  .fact-content { font-size: 0.95rem; }
  .fact-images-grid { grid-template-columns: 1fr; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
