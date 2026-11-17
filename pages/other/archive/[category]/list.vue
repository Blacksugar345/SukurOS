<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // ARCHIVE</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <!-- Header Section -->
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <span class="hud-subtag">CENTRAL_REPOSITORY // INDEX_TABLES</span>
          <h1 class="doc-title glow-text">SYSTEM ARCHIVES</h1>
          <p class="doc-meta">SELECT CATEGORY TO VIEW DATABASE LOGS...</p>
        </div>

        <!-- Category Filter Tabs (Synced with [category] route param) -->
        <div class="archive-tabs os-anim anim-scan" :class="{ 'is-revealed': isRevealed }" role="tablist" aria-label="Archive Categories">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat.id"
            class="tab-btn"
            :class="{ 'active-tab': activeCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            [{{ cat.label }}]
          </button>
        </div>

        <!-- DATA TABLES CONTAINER -->
        <div class="hud-frame hud-corners table-card os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          
          <!-- 1. GAMES TABLE -->
          <div v-if="activeCategory === 'game'" class="table-wrapper">
            <h2 class="table-title glow-text">&gt; DATABASE: GAME_RECORDS</h2>
            <table class="cyber-table" v-if="gamesData?.length">
              <thead>
                <tr>
                  <th style="width: 60px;">ID</th>
                  <th style="width: 90px;">COVER</th>
                  <th>NAME</th>
                  <th>GENRE</th>
                  <th>PLATFORM</th>
                  <th>STATUS</th>
                  <th style="width: 80px;">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in gamesData" :key="item.id">
                  <td class="id-col">#{{ item.id }}</td>
                  <td>
                    <img 
                      :src="item.cover_image || '/Explorehome.png'" 
                      :alt="item.title" 
                      class="table-cover" 
                      loading="lazy"
                      decoding="async"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td class="name-col">
                    <NuxtLink :to="`/other/archive/game/${item.slug}`" class="item-link">
                      {{ item.title }}
                    </NuxtLink>
                  </td>
                  <td>{{ item.genre || 'N/A' }}</td>
                  <td>{{ item.platform || 'N/A' }}</td>
                  <td><span class="status-badge">{{ item.completion_status || 'ONGOING' }}</span></td>
                  <td>
                    <NuxtLink :to="`/other/archive/game/${item.slug}`" class="view-btn">
                      [VIEW]
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-msg">NO GAME RECORDS FOUND IN DATABASE.</div>
          </div>

          <!-- 2. MUSIC TABLE -->
          <div v-if="activeCategory === 'music'" class="table-wrapper">
            <h2 class="table-title glow-text">&gt; DATABASE: MUSIC_LOGS</h2>
            <table class="cyber-table" v-if="musicData?.length">
              <thead>
                <tr>
                  <th style="width: 60px;">ID</th>
                  <th style="width: 90px;">COVER</th>
                  <th>TRACK TITLE</th>
                  <th>ROLE</th>
                  <th>GENRE</th>
                  <th>BPM</th>
                  <th style="width: 80px;">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in musicData" :key="item.id">
                  <td class="id-col">#{{ item.id }}</td>
                  <td>
                    <img 
                      :src="item.cover_image || '/Explorehome.png'" 
                      :alt="item.title" 
                      class="table-cover" 
                      loading="lazy"
                      decoding="async"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td class="name-col">
                    <NuxtLink :to="`/other/archive/music/${item.slug}`" class="item-link">
                      {{ item.title }}
                    </NuxtLink>
                  </td>
                  <td>{{ item.artist_role || 'N/A' }}</td>
                  <td>{{ item.genre || 'N/A' }}</td>
                  <td>{{ item.bpm ? item.bpm + ' BPM' : 'N/A' }}</td>
                  <td>
                    <NuxtLink :to="`/other/archive/music/${item.slug}`" class="view-btn">
                      [VIEW]
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-msg">NO MUSIC RECORDS FOUND IN DATABASE.</div>
          </div>

          <!-- 3. DRAWING TABLE -->
          <div v-if="activeCategory === 'drawing'" class="table-wrapper">
            <h2 class="table-title glow-text">&gt; DATABASE: ARTWORK_FILES</h2>
            <table class="cyber-table" v-if="drawingData?.length">
              <thead>
                <tr>
                  <th style="width: 60px;">ID</th>
                  <th style="width: 90px;">PREVIEW</th>
                  <th>TITLE</th>
                  <th>MEDIUM</th>
                  <th>SOFTWARE</th>
                  <th>TIME</th>
                  <th style="width: 80px;">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in drawingData" :key="item.id">
                  <td class="id-col">#{{ item.id }}</td>
                  <td>
                    <img 
                      :src="item.cover_image || '/Explorehome.png'" 
                      :alt="item.title" 
                      class="table-cover" 
                      loading="lazy"
                      decoding="async"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td class="name-col">
                    <NuxtLink :to="`/other/archive/drawing/${item.slug}`" class="item-link">
                      {{ item.title }}
                    </NuxtLink>
                  </td>
                  <td>{{ item.medium || 'N/A' }}</td>
                  <td>{{ item.software_tools || 'N/A' }}</td>
                  <td>{{ item.time_spent_hours ? item.time_spent_hours + ' hrs' : 'N/A' }}</td>
                  <td>
                    <NuxtLink :to="`/other/archive/drawing/${item.slug}`" class="view-btn">
                      [VIEW]
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-msg">NO ARTWORK RECORDS FOUND IN DATABASE.</div>
          </div>

          <!-- 4. COOKING TABLE -->
          <div v-if="activeCategory === 'cooking'" class="table-wrapper">
            <h2 class="table-title glow-text">&gt; DATABASE: CULINARY_RECIPES</h2>
            <table class="cyber-table" v-if="cookingData?.length">
              <thead>
                <tr>
                  <th style="width: 60px;">ID</th>
                  <th style="width: 90px;">PHOTO</th>
                  <th>DISH NAME</th>
                  <th>CUISINE</th>
                  <th>DIFFICULTY</th>
                  <th>RATING</th>
                  <th style="width: 80px;">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cookingData" :key="item.id">
                  <td class="id-col">#{{ item.id }}</td>
                  <td>
                    <img 
                      :src="item.cover_image || '/Explorehome.png'" 
                      :alt="item.title" 
                      class="table-cover" 
                      loading="lazy"
                      decoding="async"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td class="name-col">
                    <NuxtLink :to="`/other/archive/cooking/${item.slug}`" class="item-link">
                      {{ item.title }}
                    </NuxtLink>
                  </td>
                  <td>{{ item.cuisine_type || 'N/A' }}</td>
                  <td>{{ item.difficulty || 'N/A' }}</td>
                  <td><span class="rating-text">{{ item.rating_taste ? item.rating_taste + ' / 10' : 'N/A' }}</span></td>
                  <td>
                    <NuxtLink :to="`/other/archive/cooking/${item.slug}`" class="view-btn">
                      [VIEW]
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-msg">NO COOKING RECORDS FOUND IN DATABASE.</div>
          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const isRevealed = ref(false)

const categories = [
  { id: 'game', label: 'GAMES' },
  { id: 'music', label: 'MUSIC' },
  { id: 'drawing', label: 'DRAWINGS' },
  { id: 'cooking', label: 'COOKING' }
]

const validCategoryIds = categories.map(c => c.id)

const resolveCategoryFromRoute = () => {
  const param = String(route.params.category || '').toLowerCase()
  return validCategoryIds.includes(param) ? param : 'game'
}

const activeCategory = ref(resolveCategoryFromRoute())

watch(
  () => route.params.category,
  () => {
    activeCategory.value = resolveCategoryFromRoute()
  }
)

const selectCategory = (catId) => {
  activeCategory.value = catId
  router.replace(`/other/archive/${catId}/list`)
}

// Fetch data for all 4 tables simultaneously
const { data: gamesData } = await useAsyncData('list-games', async () => {
  try {
    const { data, error } = await supabase.from('game').select('*').order('id', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const { data: musicData } = await useAsyncData('list-music', async () => {
  try {
    const { data, error } = await supabase.from('music').select('*').order('id', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const { data: drawingData } = await useAsyncData('list-drawing', async () => {
  try {
    const { data, error } = await supabase.from('drawing').select('*').order('id', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const { data: cookingData } = await useAsyncData('list-cooking', async () => {
  try {
    const { data, error } = await supabase.from('cooking').select('*').order('id', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

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
  background-image: linear-gradient(rgba(110, 234, 245, 0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.025) 1px, transparent 1px);
  background-size: 40px 40px;
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
  max-width: 1100px;
  width: 100%;
}

.doc-header { margin-bottom: 2rem; }
.hud-subtag {
  display: block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #5d7e86;
  letter-spacing: 0.15em;
  margin-bottom: 0.35rem;
}
.doc-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.25rem); letter-spacing: 0.05em; margin: 0 0 0.5rem 0; }
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }

/* Filter Tabs */
.archive-tabs {
  display: flex;
  gap: 0.85rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(12, 22, 30, 0.65);
  border: 1px solid var(--border-hud);
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border-radius: 3px;
}

.tab-btn:hover {
  color: var(--text-primary);
  border-color: var(--cyan);
}

.tab-btn.active-tab {
  color: var(--cyan);
  background: rgba(110, 234, 245, 0.12);
  border-color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

/* HUD Table Container */
.hud-frame {
  position: relative;
  background: rgba(12, 22, 30, 0.6);
  border: 1px solid var(--border-hud);
  border-top: 3px solid var(--cyan);
  padding: 2rem;
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

.table-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.05em;
}

/* Table Wrapper for Horizontal Scroll on Mobile */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* Cyber Table Styling */
.cyber-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.cyber-table th {
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: #5d7e86;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--border-hud);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cyber-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.12);
  vertical-align: middle;
}

.cyber-table tr:hover td {
  background: rgba(110, 234, 245, 0.04);
}

.id-col {
  font-family: var(--font-display);
  color: #5d7e86;
  font-size: 0.85rem;
}

.table-cover {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 2px;
  border: 1px solid var(--border-hud);
  display: block;
  background: #030609;
}

.name-col {
  font-weight: 600;
}

.item-link {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-link:hover {
  color: var(--cyan);
  text-shadow: 0 0 5px var(--cyan-glow);
}

.status-badge {
  background: rgba(110, 234, 245, 0.08);
  border: 1px solid rgba(110, 234, 245, 0.22);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  white-space: nowrap;
}

.rating-text {
  color: #ffb800;
  font-weight: bold;
}

.view-btn {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--cyan);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(110, 234, 245, 0.25);
  border-radius: 2px;
  background: rgba(110, 234, 245, 0.05);
  transition: all 0.2s ease;
}

.view-btn:hover {
  border-color: var(--cyan);
  background: rgba(110, 234, 245, 0.15);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.empty-msg {
  padding: 3rem 0;
  text-align: center;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  .hud-frame { padding: 1.25rem; }
  .doc-title { font-size: 1.6rem; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
