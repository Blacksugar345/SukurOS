<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Namecards</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan">
          <h1 class="doc-title glow-text">NAMECARDS</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ namecards?.length || 0 }} RECORDS FOUND.</p>
        </div>

        <div class="cards-grid" v-if="namecards?.length">
          
          <!-- Namecard Display Case -->
          <div 
            class="namecard-display os-anim anim-scan" 
            v-for="card in namecards" 
            :key="card.id"
          >
            <!-- Visual Display Container (Dual Image Support) -->
            <div class="card-visual-wrapper" :class="{ 'single-img': !card.back_image_url }">
              
              <!-- Front Image -->
              <div class="card-img-box">
                <span class="img-label">[ FRONT ]</span>
                <img :src="card.front_image_url || '/Explorehome.png'" :alt="`Namecard ${card.year} ${card.version} Front`" class="namecard-img" />
              </div>
              
              <!-- Back Image (Only shows if URL exists) -->
              <div class="card-img-box" v-if="card.back_image_url">
                <span class="img-label">[ BACK ]</span>
                <img :src="card.back_image_url" :alt="`Namecard ${card.year} ${card.version} Back`" class="namecard-img" />
              </div>

            </div>

            <!-- Metadata Panel -->
            <div class="card-metadata">
              <div class="meta-header">
                <h2 class="card-year glow-text">{{ card.year }}</h2>
                <span class="card-version">ITERATION: {{ card.version || 'BASE' }}</span>
              </div>
              
              <div class="meta-grid">
                <div class="meta-item">
                  <span class="label">DEBUT EVENT:</span>
                  <span class="value">{{ card.event_debut || 'UNKNOWN' }}</span>
                </div>
              </div>

              <div class="meta-desc-box">
                <span class="label">> DESIGN_LOG:</span>
                <p class="desc-text">{{ card.design_concept || 'No design notes available.' }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_CREDENTIAL_DATA...</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const supabase = useSupabaseClient()

// Fetch namecards, ordering by year descending, then by version descending (newest first)
const { data: namecards } = await useAsyncData('namecards', async () => {
  const { data, error } = await supabase
    .from('namecards')
    .select('*')
    .order('year', { ascending: false })
    .order('version', { ascending: false })
    
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
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
.archive-container {
  max-width: 1000px; /* Reduced overall container size */
  width: 100%;
}

.doc-header { margin-bottom: 3rem; text-align: center; }
.doc-title { font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; }

/* Grid Layout for Cards */
.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Individual Display Case */
.namecard-display {
  background: rgba(12, 22, 30, 0.4);
  border: 1px solid rgba(110, 234, 245, 0.15);
  border-radius: 4px; 
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
  max-width: 800px; /* Limits the max width of individual cards */
  margin: 0 auto;
  width: 100%;
}

.namecard-display:hover {
  transform: translateY(-5px);
  border-color: rgba(110, 234, 245, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Visual Container (Dual Image Layout) */
.card-visual-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Split down the middle for two images */
  gap: 1rem;
  padding: 1.5rem;
  background: #030508;
  border-bottom: 1px solid rgba(110, 234, 245, 0.2);
}

/* If there is no back image, the front image takes up the full space */
.card-visual-wrapper.single-img {
  grid-template-columns: 1fr;
  max-width: 500px; /* Prevent single image from becoming massive */
  margin: 0 auto;
}

.card-img-box {
  position: relative;
  width: 100%;
  border: 1px solid rgba(110, 234, 245, 0.2);
  background: #000;
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-label {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(6, 11, 16, 0.8);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  backdrop-filter: blur(4px);
  z-index: 5;
}

.namecard-img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  opacity: 0.9;
  transition: opacity 0.3s ease, transform 0.5s ease;
  padding: 0.5rem;
}

.card-img-box:hover .namecard-img {
  opacity: 1;
  transform: scale(1.03);
}

/* Metadata Panel */
.card-metadata {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.meta-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.15);
}

.card-year {
  font-family: var(--font-display);
  font-size: 1.6rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.card-version {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: #ffb800;
  letter-spacing: 0.1em;
}

.meta-grid {
  margin-bottom: 1.25rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: #5d7e86;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 1rem;
  color: var(--text-primary);
}

.meta-desc-box {
  background: rgba(6, 11, 16, 0.5);
  border: 1px solid rgba(110, 234, 245, 0.1);
  padding: 1rem;
  border-radius: 2px;
}

.desc-text {
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Loading */
.loading-state {
  text-align: center;
  padding: 4rem 0;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.5rem; }
  .document-wrapper { padding: 6rem 1rem 3rem 1rem; }
  
  .doc-title { font-size: 1.6rem; }
  .doc-meta { font-size: 0.75rem; }

  /* Stack dual images vertically on small screens */
  .card-visual-wrapper {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .card-metadata { padding: 1rem; }
  .card-year { font-size: 1.4rem; }
  .card-visual-wrapper { padding: 0.75rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>