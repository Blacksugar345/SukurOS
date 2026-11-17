<template>
  <div class="os-container wiki-mode scroll-smooth">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // Reference</span>
      </div>
      
      <!-- Desktop Return Button -->
      <NuxtLink to="/" class="return-btn desktop-only">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>

      <!-- Mobile Hamburger Button -->
      <button 
        type="button"
        class="mobile-menu-btn mobile-only" 
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle Reference Index"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span class="hamburger-line" :class="{ 'line-top': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-middle': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-bottom': mobileMenuOpen }"></span>
      </button>
    </header>

    <!-- Mobile Menu Backdrop & Drawer -->
    <div class="mobile-backdrop mobile-only" v-if="mobileMenuOpen" @click="mobileMenuOpen = false"></div>
    <aside class="mobile-menu-overlay" :class="{ 'menu-open': mobileMenuOpen }" aria-label="Reference Section Navigation">
      <button type="button" class="mobile-close-btn" aria-label="Close Menu" @click="mobileMenuOpen = false">✕</button>
      
      <nav class="mobile-nav-list">
        <h3 class="mobile-cat-title glow-text">INDEX</h3>
        <a href="#sitemap" class="mobile-nav-link" :class="{ active: activeSection === 'sitemap' }" @click="mobileMenuOpen = false">&gt; 01. STRUCTURE</a>
        <a href="#character-sheet" class="mobile-nav-link" :class="{ active: activeSection === 'character-sheet' }" @click="mobileMenuOpen = false">&gt; 02. CHAR_REF</a>
        <a href="#hardware" class="mobile-nav-link" :class="{ active: activeSection === 'hardware' }" @click="mobileMenuOpen = false">&gt; 03. HARDWARE_SPECS</a>
        <a href="#credits" class="mobile-nav-link" :class="{ active: activeSection === 'credits' }" @click="mobileMenuOpen = false">&gt; 04. ACKNOWLEDGEMENTS</a>
        
        <NuxtLink to="/" class="mobile-nav-link" style="margin-top: 2rem; color: var(--cyan);" @click="mobileMenuOpen = false">◂ RETURN</NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Layout (Sidebar + Content) -->
    <main class="docs-wrapper">
      
      <!-- Sticky Sidebar Navigation (Desktop Only) -->
      <aside class="docs-sidebar desktop-only">
        <nav class="tracker-nav" aria-label="Reference Sections">
          <div class="nav-title">INDEX</div>
          <ul class="nav-list">
            <li><a href="#sitemap" :class="{ active: activeSection === 'sitemap' }">01. SYSTEM_STRUCTURE</a></li>
            <li><a href="#character-sheet" :class="{ active: activeSection === 'character-sheet' }">02. CHARACTER_REF</a></li>
            <li><a href="#hardware" :class="{ active: activeSection === 'hardware' }">03. HARDWARE_SPECS</a></li>
            <li><a href="#credits" :class="{ active: activeSection === 'credits' }">04. ACKNOWLEDGEMENTS</a></li>
          </ul>
        </nav>
      </aside>

      <!-- Scrollable Content Area -->
      <div class="docs-content">
        
        <!-- ==========================================
             PART 1: WEBPAGE MAP
             ========================================== -->
        <section id="sitemap" class="ref-section os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h1 class="section-title glow-text">01. SYSTEM_STRUCTURE</h1>
          <hr class="wiki-divider" />
          <p class="section-desc">A structural overview of the Sukur.OS network and its accessible directories.</p>
          
          <div class="sitemap-grid">
            
            <!-- Root & Socials -->
            <div class="map-card hud-corners">
              <h2 class="map-node">/ ROOT </h2>
              <ul class="file-tree">
                <li>
                  <NuxtLink to="/" class="file-name file-link">index.vue</NuxtLink>
                  <span class="file-desc">- The main page, portfolio, and entry point.</span>
                </li>
                <li><span class="folder-name">/ socials</span>
                  <ul>
                    <li>
                      <NuxtLink to="/socials/socials" class="file-name file-link">socials.vue</NuxtLink>
                      <span class="file-desc">- All of my contact channels.</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <!-- Explore -->
            <div class="map-card hud-corners">
              <h2 class="map-node">/ EXPLORE</h2>
              <ul class="file-tree">
                <li>
                  <NuxtLink to="/explore/hobbies" class="file-name file-link">hobbies.vue</NuxtLink>
                  <span class="file-desc">- A writing about my hobbies and interests.</span>
                </li>
                <li>
                  <NuxtLink to="/explore/information" class="file-name file-link">information.vue</NuxtLink>
                  <span class="file-desc">- My personal information and facts about me, if you want to know me better.</span>
                </li>
              </ul>
            </div>

            <!-- Furry Hub -->
            <div class="map-card hud-corners">
              <h2 class="map-node">/ FURRY</h2>
              <ul class="file-tree">
                <li>
                  <NuxtLink to="/furry/original_characters" class="file-name file-link">original_characters.vue</NuxtLink>
                  <span class="file-desc">- All of my original characters.</span>
                </li>
                <li><span class="folder-name">/ full</span>
                  <ul>
                    <li><span class="file-name">[name].vue</span> <span class="file-desc">- Dynamic page for detailed original character profiles.</span></li>
                  </ul>
                </li>
                <li><span class="folder-name">/ lore</span>
                  <ul>
                    <li>
                      <NuxtLink to="/furry/lore/zwasonia" class="file-name file-link">zwasonia.vue</NuxtLink>
                      <span class="file-desc">- Yes, I made an entire wikipedia of the city in my lore.</span>
                    </li>
                    <li><span class="file-name">[...slug].vue</span> <span class="file-desc">- Dynamic page for lore sub-pages.</span></li>
                  </ul>
                </li>
                <li><span class="folder-name">/ communities</span>
                  <ul>
                    <li>
                      <NuxtLink to="/furry/communities/communities" class="file-name file-link">communities.vue</NuxtLink>
                      <span class="file-desc">- Display of all my friend group.</span>
                    </li>
                    <li>
                      <NuxtLink to="/furry/communities/conventions" class="file-name file-link">conventions.vue</NuxtLink>
                      <span class="file-desc">- Display of all furry conventions I attended, planned or skiped.</span>
                    </li>
                    <li>
                      <NuxtLink to="/furry/communities/namecards" class="file-name file-link">namecards.vue</NuxtLink>
                      <span class="file-desc">- Display of all my namecard in the past and present.</span>
                    </li>
                    <li>
                      <NuxtLink to="/furry/communities/terminal" class="file-name file-link">terminal.vue</NuxtLink>
                      <span class="file-desc">- A minigame of finding my furry code inside the code terminal. [hint : Connect to something and the truth will echo back]</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <!-- Other Archives -->
            <div class="map-card hud-corners">
              <h2 class="map-node">/ OTHER</h2>
              <ul class="file-tree">
                <li>
                  <NuxtLink to="/other/gallery" class="file-name file-link">gallery.vue</NuxtLink>
                  <span class="file-desc">- Filterable visual media database.</span>
                </li>
                <li>
                  <NuxtLink to="/other/reference" class="file-name file-link">reference.vue</NuxtLink>
                  <span class="file-desc">- You are here. System mapping and other documentation.</span>
                </li>
                <li><span class="folder-name">/ archive</span>
                  <ul>
                    <li>
                      <NuxtLink to="/other/archive/game/list" class="file-name file-link">list.vue</NuxtLink>
                      <span class="file-desc">- Index of Games, Music, Drawings, and Cooking.</span>
                    </li>
                    <li><span class="file-name">[category] / [slug].vue</span> <span class="file-desc">- Dynamic page for individual archive records.</span></li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </section>

        <!-- ==========================================
             PART 2: CHARACTER REFERENCE SHEET
             ========================================== -->
        <section id="character-sheet" class="ref-section os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h2 class="section-title glow-text">02. PRIMARY_OPERATIVE</h2>
          <hr class="wiki-divider" />
          <p class="section-desc">Official character reference and design specifications.</p>

          <div class="ref-sheet-container hud-frame hud-corners" v-if="sukuros">
            
            <div class="ref-top-row">
              <button
                type="button"
                class="ref-visuals"
                aria-label="Expand Sukuros Avatar"
                @click="openLightbox(sukuros.image_url || '/Explorehome.png', `${sukuros.fullname} // Operative Avatar`)"
              >
                <img 
                  :src="sukuros.image_url || '/Explorehome.png'" 
                  alt="Sukuros Avatar" 
                  class="ref-image" 
                  loading="lazy"
                  decoding="async"
                />
                <span class="zoom-badge">[ EXPAND ⤢ ]</span>
              </button>

              <div class="ref-data">
                <h3 class="operative-name glow-text">{{ sukuros.fullname }} ("{{ sukuros.nickname }}")</h3>
                
                <div class="ref-stats-grid">
                  <div class="stat"><span class="label">SPECIES:</span> <span class="value">{{ sukuros.species }}</span></div>
                  <div class="stat"><span class="label">BREED:</span> <span class="value">{{ sukuros.breed }}</span></div>
                  <div class="stat"><span class="label">H/W:</span> <span class="value">{{ sukuros.height }}cm / {{ sukuros.weight }}kg</span></div>
                  <div class="stat"><span class="label">OCCUPATION:</span> <span class="value">{{ sukuros.occupation }}</span></div>
                </div>

                <div class="fun-facts-box">
                  <h4 class="box-title">&gt; CHARACTER_DESIGN</h4>
                  <ul class="facts-list">
                    <li>Sukuros's design is heavily inspired by tactical cyberpunk gear and functional streetwear.</li>
                    <li>Despite his serious occupation, he has a crippling weakness for high-quality tuna and mechanical keyboards.</li>
                    <li>The specific white markings on his black fur are naturally occurring, though rumors say they emit a faint glow under heavy electromagnetic fields.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Full Reference Sheet Image (Appears below avatar & trivia) -->
            <div class="full-ref-sheet" v-if="sukuros.ref_sheet_url">
              <h4 class="box-title" style="margin-bottom: 1rem;">&gt; FULL_REFERENCE_SHEET</h4>
              <button
                type="button"
                class="full-ref-btn"
                aria-label="Expand Sukuros Full Reference Sheet"
                @click="openLightbox(sukuros.ref_sheet_url, `${sukuros.fullname} // Full Reference Sheet`)"
              >
                <img 
                  :src="sukuros.ref_sheet_url" 
                  alt="Sukuros Full Reference Sheet" 
                  class="full-ref-img" 
                  loading="lazy"
                  decoding="async"
                />
                <span class="zoom-badge">[ EXPAND_FULL_SHEET ⤢ ]</span>
              </button>
            </div>

          </div>

          <div v-else class="loading-state">
            <p class="glow-text">FETCHING DATABASE...</p>
          </div>

        </section>

        <!-- ==========================================
             PART 3: HARDWARE SPECIFICATIONS
             ========================================== -->
        <section id="hardware" class="ref-section os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h2 class="section-title glow-text">03. HARDWARE_SPECS</h2>
          <hr class="wiki-divider" />
          <p class="section-desc">Hardware running the test and deployment of this website.</p>
          
          <div class="hardware-grid" v-if="hardwareSpecs?.length">
            <div class="text-block hud-frame hud-corners" v-for="spec in hardwareSpecs" :key="spec.id">
              <h3 class="block-title">&gt; {{ spec.title }}</h3>
              <div class="terminal-text rich-text" v-html="spec.content"></div>
            </div>
          </div>

          <div v-else class="loading-state">
            <p class="glow-text">FETCHING DATABASE...</p>
          </div>
        </section>

        <!-- ==========================================
             PART 4: CREDITS & ACKNOWLEDGEMENTS
             ========================================== -->
        <section id="credits" class="ref-section os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
          <h2 class="section-title glow-text">04. ACKNOWLEDGEMENTS</h2>
          <hr class="wiki-divider" />
          
          <div class="text-block">
            <h3 class="block-title">&gt; Message to visitors </h3>
            <p class="terminal-text">
              Thank you for exploring Sukur.OS. What started as a simple contact webpage, now has evolved into a massive digital playground for my personal website projects, world-building, and my character lore. Whether you are just passing by or interest in my lore, I hope you enjoyed! 
            </p>
          </div>

          <div class="text-block">
            <h3 class="block-title">&gt; System Framework</h3>
            <ul class="credits-list">
              <li><b>Framework:</b> Nuxt 3 &amp; Vue.js Composition API</li>
              <li><b>Database Backend:</b> Supabase (PostgreSQL)</li>
              <li><b>Typography:</b> 'Orbitron' for display, 'Space Grotesk' for UI data</li>
            </ul>
          </div>

          <div class="text-block">
            <h3 class="block-title">&gt; Other reference</h3>
            <p class="terminal-text rich-text">
              Special thanks to <strong>Cinnamon Pyro</strong>, my feline close friend to let me use <a href="https://www.cinnamonpyro.com/?fbclid=IwY2xjawTnHxNwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMW9jQ1k3R3hLR2xLTUdDekhzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeA2f2C4RhH6p94mnDK-bzkIpTH7UT_Iy5msTOlwG_OCBKmMxnMlbDzeZgWa4_aem_qGs8BYeqKF4JPWjrLff8Qg" target="_blank" rel="noopener noreferrer">his personal website</a> template to design my own website, otherwise this website will be forever in my local directory. 
              <br><br>
              Thank you to all of encouragement from <strong>all of my friends</strong>, Thank you to all people who are responsible for all <strong>Furcon</strong> I attended, Thank you to all the <strong>software and hardware</strong> that allowed me to bring my imagination to life beautifully. Thank you to <strong>Claude Code</strong> for the scripts. Thank you to <strong>Gemini</strong> for the beautiful UX/UI design advice.
              <br><br>
              And finally, I want to thank <strong>myself</strong> for not giving up and for fighting until I could finally make this project come true.
            </p>
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
import { ref, onMounted, onUnmounted } from 'vue'

const supabase = useSupabaseClient()
const mobileMenuOpen = ref(false)
const isRevealed = ref(false)
const lightboxUrl = ref(null)
const lightboxCaption = ref('')

// Fetch Sukuros data
const { data: sukuros } = await useAsyncData('ref-sukuros', async () => {
  try {
    const { data, error } = await supabase
      .from('original_characters')
      .select('*')
      .eq('nickname', 'Sukuros')
      .single()
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return null
  }
})

// Fetch Hardware Specs
const { data: hardwareSpecs } = await useAsyncData('system-hardware', async () => {
  try {
    const { data, error } = await supabase
      .from('system_hardware')
      .select('*')
      .order('order_index', { ascending: true })
      
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const openLightbox = (url, caption) => {
  lightboxUrl.value = url
  lightboxCaption.value = caption
}

const closeLightbox = () => {
  lightboxUrl.value = null
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (lightboxUrl.value) closeLightbox()
    if (mobileMenuOpen.value) mobileMenuOpen.value = false
  }
}

// Scroll Spy Logic
const activeSection = ref('sitemap')
let observer = null

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  setTimeout(() => {
    isRevealed.value = true
  }, 60)

  const sections = document.querySelectorAll('.ref-section')
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, {
    rootMargin: '-20% 0px -70% 0px' 
  })

  sections.forEach(section => {
    observer.observe(section)
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (observer) observer.disconnect()
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
  --bg-panel: rgba(12, 22, 30, 0.6);
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

.scroll-smooth { scroll-behavior: smooth; }
.desktop-only { display: flex; }
.mobile-only { display: none !important; }

.bg-decoration-grid {
  position: fixed; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(110, 234, 245, 0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.025) 1px, transparent 1px);
  background-size: 50px 50px; z-index: 0;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Header */
.sub-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 3rem; background: rgba(5, 8, 12, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14); backdrop-filter: blur(12px);
}
.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; }
.return-btn {
  color: var(--text-secondary); text-decoration: none; font-family: var(--font-display);
  font-size: 0.82rem; letter-spacing: 0.1em; transition: all 0.25s ease; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.85rem; border: 1px solid rgba(110, 234, 245, 0.2); border-radius: 2px; background: rgba(6, 11, 16, 0.6);
}
.return-btn:hover { color: var(--cyan); border-color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Mobile Menu Button */
.mobile-menu-btn {
  background: rgba(6, 11, 16, 0.75); border: 1px solid var(--border-hud); border-radius: 3px; cursor: pointer; flex-direction: column; gap: 5px; padding: 0.6rem; z-index: 101;
}
.hamburger-line { width: 24px; height: 2px; background-color: var(--cyan); transition: all 0.3s ease; box-shadow: 0 0 5px var(--cyan-glow); }
.line-top { transform: translateY(7px) rotate(45deg); }
.line-middle { opacity: 0; }
.line-bottom { transform: translateY(-7px) rotate(-45deg); }

/* Mobile Navigation Overlay */
.mobile-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); z-index: 98; }
.mobile-menu-overlay {
  position: fixed; top: 0; right: -340px; width: 300px; max-width: 82vw; height: 100vh;
  background: rgba(6, 11, 16, 0.98); border-left: 1px solid var(--border-hud);
  z-index: 99; transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; flex-direction: column; padding: 4.5rem 2rem 2rem 2rem; overflow-y: auto;
}
.mobile-menu-overlay.menu-open { right: 0; }
.mobile-close-btn { position: absolute; top: 1.25rem; right: 1.25rem; background: none; border: none; color: var(--text-secondary); font-size: 2rem; cursor: pointer; }
.mobile-nav-list { display: flex; flex-direction: column; gap: 1.35rem; margin-top: 1rem; }
.mobile-cat-title { font-family: var(--font-display); font-size: 1.1rem; border-bottom: 1px solid var(--border-hud); padding-bottom: 0.5rem; margin-bottom: 0.5rem; }
.mobile-nav-link { font-family: var(--font-body); font-size: 1.05rem; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
.mobile-nav-link.active { color: var(--cyan); font-weight: bold; }

/* Main Layout */
.docs-wrapper {
  position: relative; z-index: 10; padding: 7.5rem 5vw 4rem 5vw;
  display: flex; gap: 3.5rem; max-width: 1400px; margin: 0 auto;
}

/* Sidebar */
.docs-sidebar { width: 250px; flex-shrink: 0; }
.tracker-nav { position: sticky; top: 8.5rem; background: rgba(6, 11, 16, 0.7); border: 1px solid rgba(110, 234, 245, 0.14); border-left: 3px solid var(--cyan); padding: 1.5rem; border-radius: 3px; backdrop-filter: blur(8px); }
.nav-title { font-family: var(--font-display); font-size: 0.82rem; color: #5d7e86; margin-bottom: 1rem; letter-spacing: 0.12em; }
.nav-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
.nav-list a { color: var(--text-secondary); text-decoration: none; font-size: 0.92rem; transition: all 0.25s; display: block; position: relative; font-family: var(--font-display); letter-spacing: 0.04em; }
.nav-list a:hover { color: var(--text-primary); }
.nav-list a.active { color: var(--cyan); font-weight: 600; text-shadow: 0 0 8px var(--cyan-glow); padding-left: 0.85rem; }
.nav-list a.active::before { content: '>'; position: absolute; left: 0; color: var(--cyan); }

/* Content Area */
.docs-content { flex-grow: 1; min-width: 0; }
.ref-section { margin-bottom: 5.5rem; scroll-margin-top: 7.5rem; }
.section-title { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2rem); margin: 0 0 0.5rem 0; letter-spacing: 0.05em; }
.wiki-divider { border: none; height: 1px; background: linear-gradient(90deg, var(--border-hud) 0%, transparent 100%); margin: 0.5rem 0 1.5rem 0; }
.section-desc { font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 2rem; }

/* HUD Framework */
.hud-frame { position: relative; background: var(--bg-panel); border: 1px solid var(--border-hud); border-radius: 4px; padding: 2rem; backdrop-filter: blur(8px); }

.hud-corners { position: relative; }
.hud-corners::before,
.hud-corners::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
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

/* Sitemap Sub-styles */
.sitemap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
.map-card { background: var(--bg-panel); border: 1px solid var(--border-hud); padding: 1.5rem; border-radius: 4px; }
.map-node { font-family: var(--font-display); color: var(--cyan); font-size: 1.08rem; margin: 0 0 1rem 0; border-bottom: 1px dashed var(--border-hud); padding-bottom: 0.5rem; }

.file-tree { list-style: none; padding: 0; margin: 0; font-family: var(--font-body); font-size: 0.9rem; }
.file-tree ul { list-style: none; padding-left: 1.5rem; margin-top: 0.5rem; border-left: 1px dashed rgba(110, 234, 245, 0.22); margin-left: 0.5rem; }
.file-tree li { margin-bottom: 0.75rem; position: relative; }
.file-tree li::before { content: '├─'; position: absolute; left: -1.5rem; color: rgba(110, 234, 245, 0.4); display: none; }
.file-tree ul li::before { display: block; }
.file-tree ul li:last-child::before { content: '└─'; }

.folder-name { color: #ffb800; font-weight: 600; }
.file-name { color: var(--text-primary); font-weight: 600; }
.file-link { text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.45); transition: color 0.2s ease, text-shadow 0.2s ease; }
.file-link:hover { color: var(--cyan); text-shadow: 0 0 6px var(--cyan-glow); border-bottom-style: solid; }
.file-desc { color: var(--text-secondary); font-size: 0.85rem; display: block; padding-left: 0.5rem; margin-top: 0.15rem;}

/* Ref Sheet Sub-styles */
.ref-sheet-container { display: flex; flex-direction: column; gap: 2rem; }
.ref-top-row { display: flex; gap: 2.5rem; }
.ref-visuals {
  position: relative;
  flex-shrink: 0;
  width: 300px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}
.ref-image { width: 100%; border-radius: 4px; border: 1px solid var(--cyan); box-shadow: 0 0 15px rgba(110, 234, 245, 0.12); display: block; transition: transform 0.3s ease; }
.ref-visuals:hover .ref-image { transform: scale(1.02); }
.ref-data { flex-grow: 1; }

.zoom-badge {
  position: absolute;
  bottom: 0.65rem;
  right: 0.65rem;
  background: rgba(6, 11, 16, 0.88);
  border: 1px solid var(--cyan);
  color: var(--cyan);
  font-family: var(--font-display);
  font-size: 0.62rem;
  padding: 0.22rem 0.5rem;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.ref-visuals:hover .zoom-badge,
.full-ref-btn:hover .zoom-badge { opacity: 1; }

.operative-name { font-family: var(--font-display); font-size: 1.9rem; margin: 0 0 1.5rem 0; }
.ref-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
.stat .label { font-size: 0.72rem; color: #5d7e86; font-weight: 600; display: block; margin-bottom: 0.2rem; letter-spacing: 0.06em; }
.stat .value { font-size: 1.08rem; color: var(--text-primary); }

.fun-facts-box { background: rgba(6, 11, 16, 0.65); border-left: 3px solid var(--cyan); padding: 1.5rem; border-radius: 0 3px 3px 0; }
.box-title { font-family: var(--font-display); font-size: 0.9rem; color: var(--cyan); margin: 0; letter-spacing: 0.06em; }
.facts-list { margin: 1rem 0 0 0; padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem; }
.facts-list li { margin-bottom: 0.5rem; }

.full-ref-sheet { margin-top: 1rem; border-top: 1px dashed var(--border-hud); padding-top: 2rem; }
.full-ref-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}
.full-ref-img { width: 100%; height: auto; border: 1px solid var(--border-hud); border-radius: 4px; display: block; transition: border-color 0.25s ease; }
.full-ref-btn:hover .full-ref-img { border-color: var(--cyan); }

/* Hardware Sub-styles */
.hardware-grid { display: flex; flex-direction: column; gap: 1.25rem; }
.hardware-grid .text-block.hud-frame { padding: 1.5rem; margin-bottom: 0; }
.rich-text :deep(ul) { color: var(--text-secondary); line-height: 1.8; padding-left: 1.5rem; }
.rich-text :deep(strong) { color: var(--text-primary); }
.rich-text :deep(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px dashed rgba(110, 234, 245, 0.5); transition: all 0.25s ease; }
.rich-text :deep(a:hover) { text-shadow: 0 0 8px var(--cyan-glow); border-bottom-style: solid; }

/* Credits Sub-styles */
.text-block { margin-bottom: 2.75rem; }
.block-title { font-family: var(--font-display); font-size: 1.08rem; color: var(--cyan); margin: 0 0 1rem 0; letter-spacing: 0.05em; }
.terminal-text { font-size: 1.04rem; color: var(--text-primary); line-height: 1.75; padding-left: 1.15rem; border-left: 2px dashed rgba(110, 234, 245, 0.3); margin: 0; }
.credits-list { padding-left: 2rem; color: var(--text-primary); line-height: 1.8; font-size: 1.04rem; }
.credits-list b { color: #ffb800; }

.loading-state {
  padding: 3rem 1rem;
  text-align: center;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

/* Lightbox Modal */
.cyber-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(3, 6, 10, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-frame {
  max-width: 94vw;
  max-height: 92vh;
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
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}

/* Responsive */
@media (max-width: 900px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  .docs-wrapper { flex-direction: column; gap: 2rem; padding-top: 6rem; }
  
  .ref-top-row { flex-direction: column; }
  .ref-visuals { width: 100%; max-width: 350px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .docs-wrapper { padding: 5.5rem 1rem 3rem 1rem; }
  .hud-frame { padding: 1.35rem; }
  .section-title { font-size: 1.55rem; }
  
  .sitemap-grid { grid-template-columns: 1fr; }
  .ref-stats-grid { grid-template-columns: 1fr; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s ease, opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
