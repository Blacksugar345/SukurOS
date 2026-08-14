<template>
  <div class="os-container terminal-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Minimal Subpage Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Information</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Content Layout -->
    <main class="document-wrapper">
      <div class="content-stack">
        
        <!-- ==========================================
             PART 1: IDENTITY CARD
             ========================================== -->
        <div class="id-card hud-frame os-anim anim-scan">
          
          <!-- Left Side: Visual Identity -->
          <div class="id-visual">
            <div class="avatar-frame">
                <img 
                    :src="identityData?.image_url || '/irl_profile.jpg'" 
                    alt="User Avatar" 
                    class="avatar-img" 
                />
                <div class="scanner-line"></div>
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
                <span class="info-label">> FULL NAME</span>
                <span class="info-value">{{ identityData.first_name }} {{ identityData.last_name }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">> NICKNAME</span>
                <span class="info-value glow-text">{{ identityData.known_alias }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">> OCCUPATION</span>
                <span class="info-value">{{ identityData.occupation }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">> COUNTRY</span>
                <span class="info-value">{{ identityData.base_of_operations }}</span>
              </div>

              <!-- Fixed DOB Row to prevent awkward line breaks -->
              <div class="info-row-flex">
                <div class="info-cell">
                  <span class="info-label">> DATE_OF_BIRTH</span>
                  <span class="info-value">{{ identityData.date_of_birth }} <span class="dim-text">(AGE: {{ calculatedAge }})</span></span>
                </div>
                <div class="info-cell">
                  <span class="info-label">> SEX</span>
                  <span class="info-value">{{ identityData.biometric_sex }}</span>
                </div>
              </div>

              <div class="info-row-flex">
                <div class="info-cell">
                  <span class="info-label">> HEIGHT</span>
                  <span class="info-value">{{ identityData.height_cm }} cm</span>
                </div>
                <div class="info-cell">
                  <span class="info-label">> WEIGHT</span>
                  <span class="info-value">{{ identityData.weight_kg }} kg</span>
                </div>
              </div>

              <div class="info-row" v-if="identityData.blood_type">
                <span class="info-label">> BLOOD_TYPE</span>
                <span class="info-value" style="color: #ff3366;">[ {{ identityData.blood_type }} ]</span>
              </div>

              <div class="info-row" v-if="identityData.languages?.length">
                <span class="info-label">> LANGUAGES</span>
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

        </div>

        <!-- ==========================================
             PART 2: FACTS 
             ========================================== -->
        <div class="facts-section hud-frame os-anim anim-scan" style="transition-delay: 0.2s;">
          <div class="doc-header">
            <h1 class="doc-title glow-text">FACTS_ABOUT_ME</h1>
          </div>
          <hr class="cyan-divider" />

          <div class="facts-grid" v-if="factsData?.length">
            
            <div class="fact-block" v-for="fact in factsData" :key="fact.id">
              <h3 class="fact-title">> {{ fact.title }}</h3>
              
              <!-- Rich Text Content -->
              <div class="fact-content rich-text" v-html="fact.content"></div>
              
              <!-- Dynamic Image Array Grid -->
              <div class="fact-images-grid" v-if="fact.image_urls && fact.image_urls.length > 0 && fact.image_urls[0] !== ''">
                <div class="img-wrapper" v-for="(imgUrl, idx) in fact.image_urls" :key="idx">
                  <img :src="imgUrl" :alt="`${fact.title} image ${idx + 1}`" class="fact-img" loading="lazy" />
                </div>
              </div>
            </div>

          </div>
          
          <div class="loading-state" v-else>
            <p class="glow-text">NO ADDITIONAL LOGS FOUND.</p>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const supabase = useSupabaseClient()

// Fetch identity core data
const { data: identityData } = await useAsyncData('identity_core', async () => {
  const { data, error } = await supabase.from('identity_core').select('*').limit(1).single()
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data
})

// Fetch facts data
const { data: factsData } = await useAsyncData('facts', async () => {
  const { data, error } = await supabase.from('facts').select('*').order('id', { ascending: true })
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
})

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
   BASE STYLES
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
  padding: 3rem;
  backdrop-filter: blur(8px);
}

/* =========================================
   HEADER
   ========================================= */
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

.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.2rem; letter-spacing: 0.15em; }

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
.return-btn:hover { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* =========================================
   LAYOUT
   ========================================= */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}

.content-stack {
  max-width: 950px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* =========================================
   PART 1: ID CARD
   ========================================= */
.id-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 4rem;
  border-top: 3px solid var(--cyan);
}

/* Visual Side */
.id-visual { display: flex; flex-direction: column; gap: 1.5rem; }

.avatar-frame {
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid rgba(110, 234, 245, 0.3);
  background: rgba(6, 11, 16, 0.5);
  position: relative;
  overflow: hidden;
}

.avatar-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.8;
  filter: grayscale(100%) contrast(120%) sepia(100%) hue-rotate(130deg); /* Cyan tint */
  transition: all 0.3s ease;
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
  background: rgba(110, 234, 245, 0.05);
  border: 1px solid rgba(110, 234, 245, 0.2);
  padding: 0.75rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--cyan);
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
.doc-header { margin-bottom: 1.5rem; }
.doc-title { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }

.cyan-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, var(--cyan) 0%, transparent 100%);
  margin-bottom: 2.5rem;
  opacity: 0.5;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Replaced dual-col with Flexbox for better wrapping */
.info-row-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.info-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.info-label {
  font-family: var(--font-display);
  color: #5d7e86;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.info-value {
  color: var(--text-primary);
  font-size: 1.1rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(110, 234, 245, 0.2);
  line-height: 1.4;
  word-break: break-word;
}

.language-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(110, 234, 245, 0.2);
}

.lang-tag {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(110, 234, 245, 0.05);
  border: 1px solid rgba(110, 234, 245, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
}

/* =========================================
   PART 2: FACTS SECTION
   ========================================= */
.facts-section {
  border-top: 3px solid #ffb800; /* Yellow accent line to differentiate from ID card */
}

.facts-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.fact-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fact-title {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.1rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.fact-content {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
  padding-left: 1rem;
  border-left: 1px dashed rgba(110, 234, 245, 0.2);
}

/* Rich Text Overrides for HTML links/bolding */
.rich-text :deep(strong) { color: #dff6f8; font-weight: 600; }
.rich-text :deep(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.5); transition: all 0.3s ease; }
.rich-text :deep(a:hover) { text-shadow: 0 0 8px var(--cyan-glow); border-bottom-style: solid; }

.fact-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.img-wrapper {
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #000;
}

.fact-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: opacity 0.3s ease, transform 0.5s ease;
}
.img-wrapper:hover .fact-img { opacity: 1; transform: scale(1.05); }

/* Loading */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  padding: 2rem;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 900px) {
  .id-card { grid-template-columns: 1fr; gap: 3rem; }
  .avatar-frame { max-width: 400px; margin: 0 auto; } /* Prevents image from getting too huge on tablets */
}

@media (max-width: 600px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 3rem 1rem; }
  
  .hud-frame { padding: 1.5rem; }
  .id-card { gap: 2rem; }
  
  .doc-title { font-size: 1.5rem; }
  .info-value { font-size: 1rem; }
  
  .info-row-flex { flex-direction: column; gap: 1.5rem; } /* Stacks DOB and Sex vertically on small phones */
  
  .fact-content { font-size: 0.95rem; }
  .fact-images-grid { grid-template-columns: 1fr; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>