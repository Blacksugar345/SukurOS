<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Conventions</span>
      </div>
      <a href="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </a>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan">
          <h1 class="doc-title glow-text">FURRY CONVENTIONS</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ formattedFurcons?.length || 0 }} RECORDS FOUND.</p>
        </div>

        <div class="con-list" v-if="formattedFurcons?.length">
          
          <!-- Convention Card -->
          <div 
            class="con-card os-anim anim-scan" 
            v-for="con in formattedFurcons" 
            :key="con.id"
          >
            <!-- Card Layout: Left Status Badge (Instead of an image) -->
            <div class="con-badge-container">
              <div class="badge-year">{{ con.year }}</div>
              <div 
                class="badge-status" 
                :class="{'status-ready': con.status === 'Ticket Bought'}"
              >
                [{{ con.status || 'PLANNING' }}]
              </div>
              <div class="badge-event-status">
                {{ con.furcon_status || 'UPCOMING' }}
              </div>
            </div>

            <!-- Card Layout: Right Info -->
            <div class="con-info">
              <div class="info-header">
                <h2 class="con-name glow-text">{{ con.name }}</h2>
                <a v-if="con.website" :href="con.website" target="_blank" class="external-link">
                  [ GO_TO_WEBSITE ↗ ]
                </a>
              </div>
              
              <!-- Basic Info -->
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">LOCATION:</span>
                  <span class="value">{{ con.location || 'UNKNOWN' }}</span>
                </div>
              </div>

              <!-- Relational Data Grids -->
              <div class="relational-grid">
                
                <!-- Squadrons Attending -->
                <div class="data-block">
                  <span class="block-label">> FRIEND GROUP ATTENDED</span>
                  <div class="tag-container" v-if="con.groups.length">
                    <span class="cyber-tag highlight" v-for="(group, idx) in con.groups" :key="idx">
                      {{ group.name }}
                    </span>
                  </div>
                  <span class="empty-data" v-else>SOLO</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_EVENT_RECORDS...</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const supabase = useSupabaseClient()

// Fetch Furcons AND their linked Groups in a single query
const { data: furcons } = await useAsyncData('furcons', async () => {
  const { data, error } = await supabase
    .from('furcon')
    .select(`
      id, name, year, location, website, furcon_status, status,
      furcon_join_list (
        friend_group ( id, name )
      )
    `)
    .order('year', { ascending: false }) // Show newest conventions first!
    
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data || []
})

// Clean up the nested Supabase response
const formattedFurcons = computed(() => {
  if (!furcons.value) return []
  
  return furcons.value.map(con => {
    return {
      ...con,
      // Map over the junction table to extract just the friend_group data
      groups: con.furcon_join_list.map(joinRow => joinRow.friend_group).filter(Boolean)
    }
  })
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
  max-width: 950px;
  width: 100%;
}

.doc-header { margin-bottom: 3rem; }
.doc-title { font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; }

/* Convention Cards */
.con-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.con-card {
  position: relative;
  display: flex;
  background: rgba(12, 22, 30, 0.4);
  border: 1px solid rgba(110, 234, 245, 0.15);
  border-radius: 4px; 
  padding: 2rem;
  gap: 2.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.con-card:hover {
  transform: translateY(-3px);
  border-color: rgba(110, 234, 245, 0.4);
}

/* Card Visual Badge (Left Side) */
.con-badge-container {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  border: 1px solid rgba(110, 234, 245, 0.2);
  background: rgba(6, 11, 16, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

.badge-year {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.badge-status {
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: #ffb800; /* Default Planning/Pending color */
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* If the ticket is bought, it glows Cyan! */
.badge-status.status-ready {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.badge-event-status {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  border-top: 1px dashed rgba(110, 234, 245, 0.2);
  padding-top: 0.5rem;
  width: 80%;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Card Info (Right Side) */
.con-info {
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
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.1);
  padding-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.con-name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: 0.05em;
  margin: 0;
  word-break: break-word;
}

.external-link {
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--cyan);
  text-decoration: none;
  transition: text-shadow 0.3s ease;
}
.external-link:hover {
  text-shadow: 0 0 8px var(--cyan-glow);
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
}
.label { font-size: 0.75rem; color: #5d7e86; font-weight: 600; width: 80px; flex-shrink: 0; text-transform: uppercase;}
.value { font-size: 1rem; color: var(--text-primary); }

/* Relational Grids (Tags) */
.relational-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-top: 1px dashed rgba(110, 234, 245, 0.15);
  padding-top: 1.25rem;
}

.data-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: #5d7e86;
  letter-spacing: 0.05em;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cyber-tag {
  background: rgba(110, 234, 245, 0.05);
  border: 1px solid rgba(110, 234, 245, 0.2);
  color: var(--text-primary);
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  white-space: nowrap;
}

.cyber-tag.highlight {
  background: rgba(255, 184, 0, 0.05);
  border-color: rgba(255, 184, 0, 0.3);
  color: #ffb800;
}

.empty-data {
  font-size: 0.85rem;
  color: rgba(139, 169, 176, 0.5);
  font-style: italic;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */

/* Tablets / iPad */
@media (max-width: 900px) {
  .con-card { 
    flex-direction: column; 
    align-items: center; 
    text-align: center;
  }
  .info-header { 
    flex-direction: column; 
    align-items: center; 
    gap: 0.5rem; 
  }
  .info-item {
    justify-content: center;
  }
  .relational-grid { 
    align-items: center; 
  }
  .tag-container { 
    justify-content: center; 
  }
}

/* Standard Mobile */
@media (max-width: 768px) {
  .sub-header { 
    padding: 1rem 1.5rem; 
  }
  .document-wrapper { 
    padding: 6rem 1rem 3rem 1rem; 
  }
  
  .doc-header { 
    text-align: center; 
    margin-bottom: 2rem;
  }
  .doc-title { 
    font-size: 1.6rem; 
  }
  .doc-meta {
    font-size: 0.8rem;
  }
  
  .con-card { 
    padding: 1.5rem; 
    gap: 1.5rem; 
  }
  .con-badge-container { 
    width: 100%; 
    max-width: 250px; 
    height: 180px; 
  }
  .badge-year {
    font-size: 2.8rem;
  }
  
  .con-name { 
    font-size: 1.5rem; 
  }
}

/* Small Phones */
@media (max-width: 480px) {
  .sub-header { 
    padding: 0.75rem 1rem; 
  }
  .logo-text { 
    font-size: 1rem; 
  }
  .return-btn { 
    font-size: 0.75rem; 
  }
  
  .con-card { 
    padding: 1.25rem; 
  }
  .con-badge-container { 
    max-width: 100%; 
    height: 150px; 
  }
  .badge-year {
    font-size: 2.2rem;
  }
  .badge-status {
    font-size: 0.7rem;
  }
  .info-item {
    flex-direction: column;
    gap: 0.25rem;
  }
  .info-item .label {
    width: auto;
  }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>