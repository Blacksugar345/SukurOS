<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Original_characters</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h1 class="doc-title glow-text">ORIGINAL CHARACTERS</h1>
          <!-- Dynamic Entry Counter -->
          <p class="doc-meta">ACCESSING DATA... {{ characters?.length || 0 }} ENTRIES FOUND.</p>
        </div>

        <div class="character-list" v-if="characters?.length">
          
          <!-- Character Card -->
          <article 
            class="char-card hud-corners os-anim anim-scan" 
            :class="{ 'is-revealed': isRevealed }"
            v-for="char in characters" 
            :key="char.id"
          >
            <!-- Card Layout: Left Image -->
            <div class="char-image-container">
              <img 
                :src="char.image_url || '/Explorehome.png'" 
                :alt="char.nickname || char.fullname" 
                class="char-img" 
                loading="lazy"
                decoding="async"
                width="220"
                height="220"
              />
            </div>

            <!-- Card Layout: Right Info -->
            <div class="char-info">
              <div class="info-header">
                <h2 class="char-name">
                  {{ char.fullname }} 
                  <span class="char-nickname" v-if="char.nickname">"{{ char.nickname }}"</span>
                </h2>
                <span class="char-species">
                  {{ char.species }} <span v-if="char.breed"> // {{ char.breed }}</span>
                </span>
              </div>
              
              <!-- Expanded Data Grid -->
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">FUR PATTERN:</span>
                  <span class="value">{{ char.fur_pattern || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">AGE / SEX:</span>
                  <span class="value">
                    {{ char.age ? char.age + ' YRS' : 'UNKNOWN' }} 
                    <span v-if="char.sex">| {{ char.sex.toUpperCase() }}</span>
                  </span>
                </div>
                <div class="info-item">
                  <span class="label">CHASSIS (H/W):</span>
                  <span class="value">{{ char.height ? char.height + 'cm' : '?' }} / {{ char.weight ? char.weight + 'kg' : '?' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">DISTINCTIVE:</span>
                  <span class="value">{{ char.distinctive || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">ORIGIN:</span>
                  <span class="value">{{ char.place_birth || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">OCCUPATION:</span>
                  <span class="value">{{ char.occupation || 'N/A' }}</span>
                </div>
              </div>

              <p class="char-desc">{{ char.short_desc }}</p>

              <!-- Footer Row: EKG Monitor & Button -->
              <div class="action-row">
                
                <!-- Dynamic EKG Monitor -->
                <div class="ekg-monitor">
                  <span class="status-label" :class="isAlive(char.status) ? 'status-alive' : 'status-dead'">
                    [{{ char.status ? char.status.toUpperCase() : 'UNKNOWN' }}]
                  </span>
                  
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="ekg-svg" aria-hidden="true">
                    <!-- Heartbeat Pulse for Alive -->
                    <polyline 
                      v-if="isAlive(char.status)" 
                      points="0,10 60,10 65,2 70,18 75,10 100,10" 
                      class="ekg-line pulse-line" 
                    />
                    <!-- Flatline for Deceased -->
                    <polyline 
                      v-else 
                      points="0,10 100,10" 
                      class="ekg-line flat-line" 
                    />
                  </svg>
                </div>

                <!-- Wiki Button directly to the nickname path -->
                <NuxtLink :to="`/furry/full/${char.nickname}`" class="more-info-btn">
                  [ READ_FULL_FILE ] <span class="arrow">▸</span>
                </NuxtLink>
                
              </div>
            </div>

          </article>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_RECORDS...</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const isRevealed = ref(false)

// Fetch character list matching the schema
const { data: characters } = await useAsyncData('characters', async () => {
  try {
    const { data, error } = await supabase.from('original_characters').select('*').order('order', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

// Helper to determine EKG state based on status text
const isAlive = (status) => {
  if (!status) return true
  const s = status.toLowerCase()
  if (s.includes('deceased') || s.includes('dead') || s.includes('mia')) return false
  return true
}

onMounted(() => {
  setTimeout(() => {
    isRevealed.value = true
  }, 60)
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
  max-width: 960px;
  width: 100%;
}

.doc-header { margin-bottom: 2.75rem; }
.hud-subtag {
  display: block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #5d7e86;
  letter-spacing: 0.15em;
  margin-bottom: 0.35rem;
}
.doc-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.25rem); letter-spacing: 0.05em; margin: 0 0 0.5rem 0; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; margin: 0; }

/* Character Cards */
.character-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.char-card {
  position: relative;
  display: flex;
  background: rgba(12, 22, 30, 0.55);
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px; 
  padding: 2rem;
  gap: 2.25rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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

.char-card:hover {
  transform: translateY(-4px);
  border-color: rgba(110, 234, 245, 0.48);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.6), 0 0 20px rgba(110, 234, 245, 0.1);
}

/* Card Image */
.char-image-container {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(110, 234, 245, 0.25);
  background: #030609;
}
.char-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}
.char-card:hover .char-img { opacity: 1; transform: scale(1.03); }

/* Card Info */
.char-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-width: 0;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.14);
  padding-bottom: 0.6rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.char-name {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.55rem;
  letter-spacing: 0.05em;
  margin: 0;
  word-break: break-word;
}

.char-nickname {
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  opacity: 0.75;
  font-weight: 400;
  margin-left: 0.5rem;
  white-space: nowrap;
}

.char-species {
  font-family: var(--font-display);
  color: #ffb800; 
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 2-Column Data Grid (Deduplicated & Fixed Wrapping) */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem 1.5rem;
  margin-bottom: 1.35rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.label { 
  font-size: 0.72rem; 
  color: #5d7e86; 
  font-weight: 600; 
  text-transform: uppercase; 
  letter-spacing: 0.06em; 
}

.value { 
  font-size: 0.95rem; 
  color: var(--text-primary); 
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
}

.char-desc {
  font-size: 0.98rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
  word-wrap: break-word;
}

/* Action Row & EKG Monitor */
.action-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px dashed rgba(110, 234, 245, 0.18);
  padding-top: 1rem;
}

.ekg-monitor {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 155px;
}

.status-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}
.status-alive { color: var(--cyan); text-shadow: 0 0 5px var(--cyan-glow); }
.status-dead { color: #ff3366; text-shadow: 0 0 5px rgba(255, 51, 102, 0.4); }

.ekg-svg {
  width: 100%;
  height: 25px;
  background: rgba(6, 11, 16, 0.6);
  border: 1px solid rgba(110, 234, 245, 0.15);
  border-radius: 2px;
}

.ekg-line {
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pulse-line {
  stroke: var(--cyan);
  filter: drop-shadow(0 0 3px var(--cyan));
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: ekg-pulse 2s linear infinite;
}

.flat-line {
  stroke: #ff3366;
  filter: drop-shadow(0 0 2px #ff3366);
  opacity: 0.6;
}

@keyframes ekg-pulse {
  0% { stroke-dashoffset: 200; }
  80% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

/* Button */
.more-info-btn {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--bg-void);
  background: var(--cyan);
  padding: 0.55rem 1.1rem;
  border-radius: 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  height: max-content;
}

.more-info-btn:hover {
  background: #fff;
  box-shadow: 0 0 16px var(--cyan-glow);
  transform: translateX(2px);
}

.loading-state {
  text-align: center;
  padding: 4rem 1rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

/* Responsive */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  .char-card { flex-direction: column; align-items: center; padding: 1.5rem; gap: 1.5rem; }
  .char-image-container { width: 100%; max-width: 280px; height: auto; aspect-ratio: 1; }
  .info-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .info-grid { grid-template-columns: 1fr; }
  .action-row { flex-direction: column; align-items: stretch; gap: 1.25rem; }
  .ekg-monitor { width: 100%; }
  .more-info-btn { width: 100%; justify-content: center; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
