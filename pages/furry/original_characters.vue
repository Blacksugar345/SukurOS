<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Original_characters</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan">
          <h1 class="doc-title glow-text">ORIGINAL CHARACTERS</h1>
          <!-- Dynamic Entry Counter -->
          <p class="doc-meta">ACCESSING DATA... {{ characters?.length || 0 }} ENTRIES FOUND.</p>
        </div>

        <div class="character-list" v-if="characters?.length">
          
          <!-- Character Card -->
          <div 
            class="char-card os-anim anim-scan" 
            v-for="char in characters" 
            :key="char.id"
          >
            <!-- Card Layout: Left Image -->
            <div class="char-image-container">
              <img :src="char.image_url || '/Explorehome.png'" :alt="char.nickname" class="char-img" />
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
                  
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="ekg-svg">
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

          </div>
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
import { onMounted } from 'vue'

const supabase = useSupabaseClient()

// Fetch character list matching the new schema
const { data: characters } = await useAsyncData('characters', async () => {
  const { data, error } = await supabase.from('original_characters').select('*').order('order', { ascending: true })
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
})

// Helper to determine EKG state based on status text
const isAlive = (status) => {
  if (!status) return true // Defaults to alive if null
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
  background-image: linear-gradient(rgba(110, 234, 245, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.02) 1px, transparent 1px);
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
.return-btn:hover { color: var(--cyan); }

/* Layout */
.document-wrapper {
  position: relative;
  z-index: 10;
  padding: 8rem 5vw 4rem 5vw;
  display: flex;
  justify-content: center;
}
.archive-container {
  max-width: 950px;
  width: 100%;
}

.doc-header { margin-bottom: 3rem; }
.doc-title { font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; }

/* Character Cards */
.character-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.char-card {
  position: relative;
  display: flex;
  background: rgba(12, 22, 30, 0.4);
  border: 1px solid rgba(110, 234, 245, 0.15);
  border-radius: 4px; 
  padding: 2rem;
  gap: 2.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.char-card:hover {
  transform: translateY(-3px);
  border-color: rgba(110, 234, 245, 0.4);
}

/* Card Image */
.char-image-container {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(110, 234, 245, 0.2);
  background: #000;
}
.char-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: opacity 0.3s ease;
}
.char-card:hover .char-img { opacity: 1; }

/* Card Info */
.char-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-width: 0; /* NEW: Forces the flex container to respect the card's boundaries */
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.1);
  padding-bottom: 0.5rem;
  flex-wrap: wrap; /* Allows header to wrap if the name is very long */
  gap: 0.5rem;
}

.char-name {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.6rem;
  letter-spacing: 0.05em;
  margin: 0;
  word-break: break-word; /* Breaks long names safely */
}

.char-nickname {
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  opacity: 0.7;
  font-weight: 400;
  margin-left: 0.5rem;
  white-space: nowrap;
}

.char-species {
  font-family: var(--font-display);
  color: #ffb800; 
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Updated 2-Column Grid for more brief info */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0; /* Keeps grid items from blowing out */
}

.label { 
  font-size: 0.75rem; 
  color: #5d7e86; 
  font-weight: 600; 
  text-transform: uppercase; 
  letter-spacing: 0.05em; 
}

.value { 
  font-size: 0.95rem; 
  color: var(--text-primary); 
  white-space: normal; /* CHANGED: Allows text to wrap to the next line */
  word-wrap: break-word; /* NEW: Breaks long continuous words if needed */
  line-height: 1.4;
}

.char-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  word-wrap: break-word;
}

/* Updated 2-Column Grid for more brief info */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.label { font-size: 0.75rem; color: #5d7e86; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.value { font-size: 0.95rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.char-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

/* Action Row & EKG Monitor */
.action-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px dashed rgba(110, 234, 245, 0.15);
  padding-top: 1rem;
}

.ekg-monitor {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 150px;
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
  background: rgba(6, 11, 16, 0.5);
  border: 1px solid rgba(110, 234, 245, 0.1);
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
  font-size: 0.85rem;
  color: var(--bg-void);
  background: var(--cyan);
  padding: 0.5rem 1rem;
  border-radius: 2px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  height: max-content;
}

.more-info-btn:hover {
  background: #fff;
  box-shadow: 0 0 15px var(--cyan-glow);
}

/* Responsive */
@media (max-width: 768px) {
  .char-card { flex-direction: column; align-items: center; }
  .char-image-container { width: 100%; max-width: 300px; }
  .info-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .info-grid { grid-template-columns: 1fr; }
  .action-row { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  .more-info-btn { width: 100%; justify-content: center; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>