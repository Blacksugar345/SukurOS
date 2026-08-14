<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Original_characters</span>
      </div>
      <a href="/furry/original_characters" class="return-btn">
        <span class="caret-left">◂</span> RETURN_TO_ARCHIVE
      </a>
    </header>

    <main class="document-wrapper" v-if="character">
      <div class="wiki-container os-anim anim-scan">
        
        <!-- Top Section: Identity & Image -->
        <div class="wiki-hero hud-frame">
          <div class="hero-image-box">
            <img :src="character.image_url || '/Explorehome.png'" :alt="character.nickname" class="wiki-img" />
            <div class="scanner-line"></div>
          </div>
          
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
        </div>

        <!-- Middle Section: Physical Attributes & Origin -->
        <div class="wiki-section hud-frame">
          <h3 class="section-title">> PHYSICAL_ATTRIBUTES & ORIGIN</h3>
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
        </div>

        <!-- Bottom Section: Lore & Abilities -->
        <div class="wiki-section hud-frame">
          <h3 class="section-title">> CLASSIFIED_INTEL</h3>
          
          <!-- Backstory uses v-html for dynamic linking -->
          <div class="text-block" v-if="character.backstory">
            <h4 class="block-title">BACKGROUND / LORE</h4>
            <div class="block-text rich-text" v-html="character.backstory"></div>
          </div>

          <div class="text-block" v-if="character.abilities">
            <h4 class="block-title">KNOWN ABILITIES / SKILLS</h4>
            <p class="block-text">{{ character.abilities }}</p>
          </div>
        </div>

      </div>
    </main>
    
    <!-- Loading State -->
    <main class="document-wrapper loading-state" v-else>
      <div class="spinner-box">
        <p class="glow-text">DECRYPTING CHARACTER WIKI...</p>
      </div>
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const supabase = useSupabaseClient()

const characterNickname = route.params.name

const { data: character } = await useAsyncData(`oc-${characterNickname}`, async () => {
  const { data, error } = await supabase
    .from('original_characters')
    .select('*')
    .eq('nickname', characterNickname)
    .single()
    
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data
})

const isAlive = (status) => {
  if (!status) return true
  const s = status.toLowerCase()
  if (s.includes('deceased') || s.includes('dead') || s.includes('mia')) return false
  return true
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

.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --bg-panel: rgba(12, 22, 30, 0.5);
  --border-hud: rgba(110, 234, 245, 0.2);
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

.hud-frame {
  background: var(--bg-panel);
  border: 1px solid var(--border-hud);
  border-radius: 4px;
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
  border: 1px solid var(--cyan);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: #000;
}

.wiki-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  filter: grayscale(20%) contrast(110%);
}

.scanner-line {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: var(--cyan);
  box-shadow: 0 0 15px var(--cyan-glow);
  animation: scan-vertical 4s linear infinite;
  opacity: 0.5;
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
}

.char-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
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
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 2px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}
.status-badge.alive { border: 1px solid var(--cyan); color: var(--cyan); background: rgba(110, 234, 245, 0.05); }
.status-badge.dead { border: 1px solid #ff3366; color: #ff3366; background: rgba(255, 51, 102, 0.05); }

.quick-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-box {
  background: rgba(6, 11, 16, 0.4);
  border: 1px solid rgba(110, 234, 245, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.stat-box .label { font-size: 0.75rem; color: #5d7e86; font-weight: 600; }
.stat-box .value { font-size: 1.1rem; color: var(--text-primary); }

/* Sections */
.section-title {
  font-family: var(--font-display);
  color: #a4c8d1;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
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

.detail-item .label { font-size: 0.75rem; color: #5d7e86; font-weight: 600; text-transform: uppercase; }
.detail-item .value { font-size: 0.95rem; color: var(--text-primary); word-wrap: break-word; }

/* Lore Text Blocks */
.text-block {
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(110, 234, 245, 0.2);
}
.text-block:last-child { margin-bottom: 0; }

.block-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--cyan);
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
}

.block-text {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
  white-space: pre-wrap;
}

/* Rich Text Formatting for dynamically loaded HTML links */
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

/* Responsive */
@media (max-width: 768px) {
  .wiki-hero { flex-direction: column; align-items: center; }
  .hero-header-row { flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
  .quick-stats { grid-template-columns: 1fr; }
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>