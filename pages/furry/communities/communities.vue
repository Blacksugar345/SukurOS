<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Communities</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="document-wrapper">
      <div class="archive-container">
        
        <div class="doc-header os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <span class="hud-subtag">ALLIANCE_NETWORK // SQUADRONS</span>
          <h1 class="doc-title glow-text">FRIEND GROUPS</h1>
          <p class="doc-meta">ACCESSING DATABASE... {{ formattedGroups?.length || 0 }} RECORDS FOUND.</p>
        </div>

        <div class="group-list" v-if="formattedGroups?.length">
          
          <!-- Group Card -->
          <article 
            class="group-card hud-corners os-anim anim-scan" 
            :class="{ 'is-revealed': isRevealed }"
            v-for="group in formattedGroups" 
            :key="group.id"
          >
            <!-- Card Layout: Left Image -->
            <div class="group-image-container">
              <img 
                :src="group.image_url || '/Explorehome.png'" 
                :alt="group.name" 
                class="group-img" 
                loading="lazy"
                decoding="async"
                width="220"
                height="220"
              />
            </div>

            <!-- Card Layout: Right Info -->
            <div class="group-info">
              <div class="info-header">
                <h2 class="group-name glow-text">{{ group.name }}</h2>
                <span class="group-date">EST. {{ group.meet_since || 'UNKNOWN' }}</span>
              </div>
              
              <p class="group-desc">{{ group.description }}</p>

              <!-- Relational Data Grids -->
              <div class="relational-grid">
                
                <!-- Members List -->
                <div class="data-block">
                  <span class="block-label">&gt; MEMBERS</span>
                  <div class="tag-container" v-if="group.members.length">
                    <span class="cyber-tag" v-for="(member, idx) in group.members" :key="idx">
                      {{ member.alias || member.name }}
                    </span>
                  </div>
                  <span class="empty-data" v-else>NO MEMBERS FOUND</span>
                </div>

                <!-- Furcons Attended -->
                <div class="data-block">
                  <span class="block-label">&gt; FURCONS ATTENDED</span>
                  <div class="tag-container" v-if="group.furcons.length">
                    <span class="cyber-tag highlight" v-for="(con, idx) in group.furcons" :key="idx">
                      {{ con.name }} ({{ con.year }})
                    </span>
                  </div>
                  <span class="empty-data" v-else>NO FURCON ATTENDED TOGETHER</span>
                </div>

              </div>
            </div>

          </article>
        </div>

        <!-- Loading State -->
        <div class="loading-state" v-else>
          <p class="glow-text">FETCHING_NETWORK_NODES...</p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const supabase = useSupabaseClient()
const isRevealed = ref(false)

// Fetch groups AND their relational data in one query
const { data: groups } = await useAsyncData('friend_groups', async () => {
  try {
    const { data, error } = await supabase
      .from('friend_group')
      .select(`
        id, name, description, meet_since, image_url,
        friend_join_list (
          friends_list ( id, name, alias )
        ),
        furcon_join_list (
          furcon ( id, name, year )
        )
      `)
      .order('id', { ascending: true })
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const formattedGroups = computed(() => {
  if (!groups.value) return []
  
  return groups.value.map(group => {
    return {
      ...group,
      members: (group.friend_join_list || []).map(joinRow => joinRow?.friends_list).filter(Boolean),
      furcons: (group.furcon_join_list || []).map(joinRow => joinRow?.furcon).filter(Boolean)
    }
  })
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
.doc-meta { font-family: var(--font-body); font-size: 0.9rem; color: #5d7e86; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }

/* Group Cards */
.group-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.group-card {
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

.group-card:hover {
  transform: translateY(-4px);
  border-color: rgba(110, 234, 245, 0.48);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.6), 0 0 20px rgba(110, 234, 245, 0.1);
}

/* Card Image */
.group-image-container {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(110, 234, 245, 0.25);
  background: #030609;
}
.group-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}
.group-card:hover .group-img { opacity: 1; filter: contrast(108%); transform: scale(1.03); }

/* Card Info */
.group-info {
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

.group-name {
  font-family: var(--font-display);
  font-size: 1.55rem;
  letter-spacing: 0.05em;
  margin: 0;
  word-break: break-word;
}

.group-date {
  font-family: var(--font-display);
  color: #ffb800; 
  font-size: 0.82rem;
  letter-spacing: 0.1em;
}

.group-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 1.5rem 0;
  word-wrap: break-word;
}

/* Relational Grids (Tags) */
.relational-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-top: 1px dashed rgba(110, 234, 245, 0.18);
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
  background: rgba(110, 234, 245, 0.06);
  border: 1px solid rgba(110, 234, 245, 0.22);
  color: var(--text-primary);
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  white-space: nowrap;
}

.cyber-tag.highlight {
  background: rgba(255, 184, 0, 0.08);
  border-color: rgba(255, 184, 0, 0.35);
  color: #ffb800;
}

.empty-data {
  font-size: 0.85rem;
  color: rgba(139, 169, 176, 0.55);
  font-style: italic;
}

.loading-state {
  text-align: center;
  padding: 4rem 1rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

/* =========================================
   MOBILE RESPONSIVENESS
   ========================================= */
@media (max-width: 900px) {
  .group-card { 
    flex-direction: column; 
    align-items: center; 
    text-align: center; 
  }
  .info-header { 
    flex-direction: column; 
    align-items: center; 
    gap: 0.5rem; 
  }
  .relational-grid { 
    align-items: center; 
  }
  .tag-container { 
    justify-content: center; 
  }
}

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .document-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  
  .doc-header { text-align: center; margin-bottom: 2rem; }
  .doc-title { font-size: 1.6rem; }
  .doc-meta { font-size: 0.8rem; }
  
  .group-card { padding: 1.5rem; gap: 1.5rem; }
  .group-image-container { width: 100%; max-width: 250px; height: 250px; }
  .group-name { font-size: 1.4rem; }
  .group-desc { font-size: 0.95rem; }
}

@media (max-width: 480px) {
  .group-card { padding: 1.25rem; }
  .group-image-container { max-width: 100%; height: auto; aspect-ratio: 1; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
