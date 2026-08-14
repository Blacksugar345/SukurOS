<template>
  <div class="os-container">
    
    <!-- =========================================
         BACKGROUND DECORATION LAYER
         ========================================= -->
    <div class="bg-decoration-grid"></div>

    <!-- Left Side Wires -->
    <div class="bg-wires left">
      <svg class="wire-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <g v-for="wire in leftWires" :key="wire.id">
          <!-- Thicker path -->
          <path :id="wire.id" :d="wire.path" stroke="rgba(110, 234, 245, 0.15)" stroke-width="2.5" fill="none" />
          <!-- Thicker glowing pulse -->
          <circle r="4" fill="#6eeaf5" filter="drop-shadow(0 0 5px #6eeaf5)">
            <animateMotion repeatCount="indefinite" :dur="wire.dur" :begin="wire.delay">
              <mpath :href="'#' + wire.id" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>

    <!-- Right Side Wires -->
    <div class="bg-wires right">
      <svg class="wire-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <g v-for="wire in rightWires" :key="wire.id">
          <path :id="wire.id" :d="wire.path" stroke="rgba(110, 234, 245, 0.15)" stroke-width="2.5" fill="none" />
          <circle r="4" fill="#6eeaf5" filter="drop-shadow(0 0 5px #6eeaf5)">
            <animateMotion repeatCount="indefinite" :dur="wire.dur" :begin="wire.delay">
              <mpath :href="'#' + wire.id" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>

    <!-- =========================================
         HEADER & NAVIGATION
         ========================================= -->
    <header 
      class="site-header" 
      :class="{ 
        'header-glitch': headerState === 'glitch' || headerState === 'hidden', 
        'header-hidden': headerState === 'hidden' 
      }"
    >
      <div class="logo hud-frame">
        <span class="logo-text glow-text">SUKUR.OS</span>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="main-nav desktop-only">
        <div 
          class="nav-item" 
          v-for="menu in navMenus" 
          :key="menu.id"
        >
          <button class="nav-trigger" @click.stop="toggleDropdown(menu.id)">
            <span class="caret" :class="{ 'caret-open': activeDropdown === menu.id }">▾</span>
            {{ menu.label }}
          </button>
          
          <!-- Dropdown Box -->
          <div class="dropdown-box" v-show="activeDropdown === menu.id">
            <div 
              v-for="item in menu.items" 
              :key="item.label"
              class="dropdown-item-wrapper"
            >
              <a v-if="!item.subItems" :href="item.link" class="dropdown-item" :class="{ 'disabled-item': item.disabled }">
                {{ item.label }}
              </a>

              <div v-else>
                <button class="dropdown-item sub-trigger" @click.stop="toggleSubDropdown(item.label)">
                  {{ item.label }} 
                  <span class="caret" :class="{ 'caret-open': activeSubDropdown === item.label }">▾</span>
                </button>
                
                <div class="sub-dropdown-accordion" v-show="activeSubDropdown === item.label">
                  <a 
                    v-for="sub in item.subItems" 
                    :key="sub.label" 
                    :href="sub.link"
                    class="dropdown-item sub-item"
                    :class="{ 'disabled-item': sub.disabled }"
                  >
                    {{ sub.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="nav-item">
          <NuxtLink to="/socials/socials" class="nav-trigger">Socials</NuxtLink>
        </div>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button class="mobile-menu-btn mobile-only" @click="mobileMenuOpen = !mobileMenuOpen">
        <span class="hamburger-line" :class="{ 'line-top': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-middle': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'line-bottom': mobileMenuOpen }"></span>
      </button>
    </header>

    <!-- Mobile Menu Backdrop (Click to close) -->
    <div 
      class="mobile-backdrop mobile-only" 
      v-if="mobileMenuOpen" 
      @click="mobileMenuOpen = false"
    ></div>

    <!-- Mobile Slide-out Menu -->
    <div class="mobile-menu-overlay" :class="{ 'menu-open': mobileMenuOpen }">
      
      <!-- Explicit Close Button -->
      <button class="mobile-close-btn" @click="mobileMenuOpen = false">×</button>

      <nav class="mobile-nav-list">
        <div class="mobile-nav-category" v-for="menu in navMenus" :key="menu.id">
          <h3 class="mobile-cat-title glow-text">{{ menu.label }}</h3>
          <div v-for="item in menu.items" :key="item.label">
            
            <!-- Added @click="mobileMenuOpen = false" to all links -->
            <a v-if="!item.subItems" :href="item.link" class="mobile-nav-link" :class="{ 'disabled-item': item.disabled }" @click="mobileMenuOpen = false">
              {{ item.label }}
            </a>
            
            <div v-else class="mobile-sub-group">
              <span class="mobile-sub-title">{{ item.label }}</span>
              <a v-for="sub in item.subItems" :key="sub.label" :href="sub.link" class="mobile-nav-link sub-link" :class="{ 'disabled-item': sub.disabled }" @click="mobileMenuOpen = false">
                {{ sub.label }}
              </a>
            </div>

          </div>
        </div>
        
        <div class="mobile-nav-category">
          <h3 class="mobile-cat-title glow-text">CONNECT</h3>
          <NuxtLink to="/socials/socials" class="mobile-nav-link" @click="mobileMenuOpen = false">Socials</NuxtLink>
        </div>
      </nav>
    </div>

    <!-- =========================================
         HORIZONTAL BOTTOM SCROLL TRACKER
         ========================================= -->
    <nav class="scroll-tracker-bottom">
      <div 
        v-for="section in pageSections" 
        :key="section.id" 
        class="tracker-node-wrapper"
        @click="scrollTo(section.id)"
      >
        <div class="tracker-node" :class="{ 'active': activeSection === section.id }"></div>
        <span class="tracker-label" :class="{ 'active': activeSection === section.id }">
          {{ section.label }}
        </span>
      </div>
      <div class="tracker-line-horizontal"></div>
    </nav>

    <!-- =========================================
         PAGE SECTIONS
         ========================================= -->
    
    <!-- 1. Hero -->
    <section class="hero" id="home">
      <div class="hero-background"></div>
      
      <div class="hero-content">
        <!-- data-text is used for the CSS glitch effect -->
        <h1 class="hero-title glitch-layer" data-text="SUKUR.OS">SUKUROS</h1>
        <p class="hero-subtitle typewriter-anim">the zwasonian feline</p>
        
        <button class="scroll-down-btn" @click="scrollTo('about')">
          <svg viewBox="0 0 24 24" class="arrow-icon" stroke="currentColor" stroke-width="2" fill="none">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </section>
    
    <!-- 2. About -->
    <section class="about-section" id="about">
      <div class="about-grid">
        <div class="about-content hud-frame os-anim anim-scan">
          <h2 class="section-title glow-text">.README</h2>
          <div 
            class="body-text rich-text" 
            v-html="aboutData?.text || 'Loading profile data...'"
          ></div>
        </div>
      </div>
    </section>

    <!-- 3. Education -->
    <section class="about-section" id="education">
      <div class="about-grid">
        <div class="about-content hud-frame os-anim anim-scan">
          <h2 class="section-title glow-text">EDUCATION</h2>
          
          <div class="slider-container" v-if="educationTimeline?.length">
            <input 
              type="range" 
              min="0" 
              :max="educationTimeline.length - 1" 
              v-model.number="eduIndex" 
              class="time-slider"
            />
            <div class="slider-ticks">
              <span v-for="(edu, index) in educationTimeline" :key="edu.id" :class="{'active-tick': eduIndex == index}">
                {{ edu.yearstart }}
              </span>
            </div>
          </div>

          <div class="edu-display" v-if="educationTimeline?.length">
            <h3 class="glow-text">{{ educationTimeline[eduIndex].title }}</h3>
            <h4 class="inst-text">{{ educationTimeline[eduIndex].institution }}</h4>
            
            <!-- GPAX Display -->
            <p class="gpax-text" v-if="educationTimeline[eduIndex].gpax">
              [ GPAX: {{ educationTimeline[eduIndex].gpax }} ]
            </p>

            <p class="body-text">{{ educationTimeline[eduIndex].description }}</p>
            
            <!-- Special Tags Display -->
            <div class="tech-tags" style="margin-top: 1.5rem;" v-if="educationTimeline[eduIndex].special">
              <span 
                class="tag stack-tag" 
                v-for="(tag, index) in getSpecialTags(educationTimeline[eduIndex].special)" 
                :key="index"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Skills Matrix -->
    <section class="about-section" id="skills">
      <div class="about-grid">
        <div class="about-content hud-frame os-anim anim-scan">
          <h2 class="section-title glow-text">SKILLS</h2>
          
          <!-- Parent Category Tabs -->
          <div class="skill-tabs">
            <button 
              v-for="tab in skillParentTabs" 
              :key="tab"
              class="tab-btn"
              :class="{ 'active-tab': activeSkillTab === tab }"
              @click="activeSkillTab = tab"
            >
              [{{ tab.toUpperCase() }}]
            </button>
          </div>

          <!-- Dynamic Skill Content -->
          <div class="skill-matrix">
            <div 
              v-for="(skillsList, subCategory) in structuredSkills[activeSkillTab]" 
              :key="subCategory" 
              class="subcat-group"
            >
              <h3 class="subcat-title">> {{ subCategory }}</h3>
              
              <div class="skill-card-grid">
                <div v-for="skill in skillsList" :key="skill.id" class="skill-card os-anim anim-card">
                  <div class="skill-head">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span v-if="skill.level" class="skill-level">{{ skill.level }}</span>
                  </div>
                  <div v-if="skill.special" class="skill-special">
                    {{ skill.special }}
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. Projects -->
    <section class="about-section" id="projects">
      <div class="about-grid" style="max-width: 1000px;">
        <h2 class="section-title glow-text" style="text-align: center; margin-bottom: 2rem;">PROJECTS</h2>
        <div class="projects-grid" v-if="projectsList?.length">
          <div class="project-card hud-frame os-anim anim-card" v-for="project in projectsList" :key="project.id">
            
            <!-- Header: Year & Education -->
            <div class="project-header">
              <span class="project-year">{{ project.year }}</span>
              <span class="project-edu" v-if="project.education_id">
                // {{ getEduName(project.education_id) }}
              </span>
            </div>

            <!-- Title & Status -->
            <div class="project-title-row">
              <h3 class="project-title">{{ project.title }}</h3>
              <span class="project-status" :class="getStatusClass(project.status)" v-if="project.status">
                {{ project.status }}
              </span>
            </div>
            
            <!-- Role -->
            <p class="project-role">ROLE: {{ project.role }}</p>
            
            <!-- Description -->
            <p class="project-desc">{{ project.description }}</p>
            
            <!-- Stack Tags (General Tech) -->
            <div class="tech-tags" v-if="project.stack_tags">
              <span class="tag stack-tag" v-for="(tag, index) in getSpecialTags(project.stack_tags)" :key="'stack-'+index">
                {{ tag }}
              </span>
            </div>

            <!-- Skill Tags (Linked Database Skills) -->
            <div class="tech-tags" style="margin-top: 0.75rem;" v-if="project.skill_id">
              <span 
                class="tag" 
                v-for="(skill, index) in getProjectSkills(project.skill_id)" 
                :key="'skill-'+index"
                :class="getSkillCategoryClass(skill.category)"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// Added onUpdated to track dynamically rendered elements (like tabs)
import { ref, onMounted, onUnmounted, onUpdated, computed } from 'vue'

const supabase = useSupabaseClient()

// =========================================
// 1. UI STATE & NAVIGATION
// =========================================
const headerState = ref('visible')
const activeSection = ref('home')
const eduIndex = ref(0)
const activeDropdown = ref(null)
const activeSubDropdown = ref(null) 
const mobileMenuOpen = ref(false)

const pageSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' }
]

const navMenus = [
  {
    id: 'explore',
    label: 'Explore',
    items: [
      { label: 'Portfolio', link: '/' },
      { label: 'Hobbies & interests', link: '/explore/hobbies' },
      { label: 'Other informations', link: '/explore/information' }
    ]
  },
  {
    id: 'furry',
    label: 'Furry',
    items: [
      { label: 'Original Characters', link: '/furry/original_characters' },
      { label: 'Lore', link: '/furry/lore/zwasonia' },
      { 
        label: 'Furry community', 
        subItems: [
          { label: 'Community', link: '/furry/communities/communities' },
          { label: 'Convention', link: '/furry/communities/conventions' },
          { label: 'Namecards', link: '/furry/communities/namecards' },
          { label: 'Furry code', link: '/furry/communities/terminal' },
          { label: 'Fursuit (TBA)', link: '#', disabled: true }
        ]
      }
    ]
  },
  {
    id: 'others',
    label: 'Others',
    items: [
      { label: 'Gallery', link: 'other/gallery' },
      { label: 'Reference', link: 'other/reference' }
    ]
  }
]

const toggleDropdown = (menuId) => {
  activeDropdown.value = activeDropdown.value === menuId ? null : menuId
  activeSubDropdown.value = null 
}

const toggleSubDropdown = (label) => {
  activeSubDropdown.value = activeSubDropdown.value === label ? null : label
}

const closeDropdowns = (e) => {
  if (!e.target.closest('.nav-item')) {
    activeDropdown.value = null
    activeSubDropdown.value = null
  }
}

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = -100;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const scrollY = window.scrollY
  if (scrollY < 100) headerState.value = 'visible'
  else if (scrollY >= 100 && scrollY < 250) headerState.value = 'glitch'
  else headerState.value = 'hidden'
}

// =========================================
// 2. SUPABASE DATA FETCHING
// =========================================
const { data: aboutData } = await useAsyncData('about', async () => {
  const { data, error } = await supabase.from('aboutme').select('text').order('latest_update', { ascending: false }).limit(1).single()
  if (error) console.error("SUPABASE ERROR:", error.message)
  return data
})

const { data: educationTimeline } = await useAsyncData('education', async () => {
  const { data } = await supabase.from('education').select('*').order('order', { ascending: true })
  return data || []
})
if (educationTimeline.value?.length) eduIndex.value = educationTimeline.value.length - 1

const { data: techSkills } = await useAsyncData('skills', async () => {
  const { data } = await supabase.from('skills').select('*').order('order', { ascending: true })
  return data || []
})

const { data: projectsList } = await useAsyncData('projects', async () => {
  const { data } = await supabase.from('project').select('*').order('order', { ascending: true })
  return data || []
})

// =========================================
// 3. COMPUTED LOGIC & HELPERS
// =========================================
const activeSkillTab = ref('Software')
const skillParentTabs = ['Software', 'Hardware', 'Other']

const parentCategoryMap = {
  'Programming': 'Software',
  'Data management & analysis': 'Software',
  'Web design & frameworks': 'Software',
  'Mobile application': 'Software',
  'CADs design': 'Software',
  'Embedded systems': 'Hardware',
  '3D printer': 'Hardware',
  'Mechatronics': 'Hardware',
  'Handy skills': 'Hardware',
  'Editing': 'Other',
  'Biology': 'Other',
  'Sports': 'Other',
  'Music': 'Other',
  'Language': 'Other',
  'Softskill': 'Other'
}

const structuredSkills = computed(() => {
  const result = { Software: {}, Hardware: {}, Other: {} }
  if (techSkills.value) {
    techSkills.value.forEach(skill => {
      const parent = parentCategoryMap[skill.category] || 'Other'
      if (!result[parent][skill.category]) result[parent][skill.category] = []
      result[parent][skill.category].push(skill)
    })
  }
  return result
})

const getSpecialTags = (tags) => {
  if (!tags) return []
  
  if (Array.isArray(tags)) {
    return tags
      .map(tag => String(tag).trim()) 
      .filter(tag => tag.length > 0)  
  }
  
  return String(tags)
    .split('/')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

const getEduName = (eduId) => {
  if (!eduId || !educationTimeline.value) return ''
  const edu = educationTimeline.value.find(e => e.id == eduId)
  return edu ? edu.institution : 'UNKNOWN DATA_SOURCE'
}

const getProjectSkills = (skillIdsString) => {
  if (!skillIdsString || !techSkills.value) return []
  const ids = skillIdsString.split('/').map(id => id.trim())
  return ids.map(id => {
    return techSkills.value.find(s => s.id == id)
  }).filter(Boolean) 
}

const getStatusClass = (status) => {
  if (!status) return 'status-inactive'
  const s = status.toLowerCase().trim()
  if (s === 'active') return 'status-active'
  if (s === 'in development') return 'status-dev'
  if (s === 'on hold') return 'status-hold'
  return 'status-inactive'
}

const getSkillCategoryClass = (category) => {
  const parent = parentCategoryMap[category] || 'Other'
  if (parent === 'Software') return 'skill-software'
  if (parent === 'Hardware') return 'skill-hardware'
  return 'skill-other'
}

// =========================================
// 4. BACKGROUND WIRES LOGIC
// =========================================
const leftWires = ref([])
const rightWires = ref([])

const generateCircuitPath = () => {
  let currentX = Math.floor(Math.random() * 80) + 10;
  let currentY = -20;
  let path = `M ${currentX} ${currentY}`;
  
  const turns = Math.floor(Math.random() * 4) + 3;
  const ySegment = 1050 / turns;

  for (let i = 0; i < turns; i++) {
    currentY += ySegment - (Math.random() * 30);
    path += ` L ${currentX} ${currentY}`;
    
    const targetX = Math.floor(Math.random() * 80) + 10;
    const deltaX = targetX - currentX;
    currentY += Math.abs(deltaX);
    
    path += ` L ${targetX} ${currentY}`;
    currentX = targetX;
  }
  
  path += ` L ${currentX} 1100`;
  return path;
}

const generateWires = (count, prefix) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    path: generateCircuitPath(),
    dur: (Math.random() * 4 + 5).toFixed(1) + 's',
    delay: (Math.random() * 3).toFixed(1) + 's'
  }))
}

// =========================================
// 5. LIFECYCLE HOOKS (OBSERVERS & EVENTS)
// =========================================
let observer;
let revealObserver;

onMounted(() => {
  leftWires.value = generateWires(4, 'left')
  rightWires.value = generateWires(4, 'right')

  document.addEventListener('click', closeDropdowns) 
  window.addEventListener('scroll', handleScroll)
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeSection.value = entry.target.id
    })
  }, { threshold: 0.3, rootMargin: "300px 0px 0px 0px" })

  pageSections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
      }
    })
  }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" })

  setTimeout(() => {
    document.querySelectorAll('.os-anim').forEach(el => revealObserver.observe(el))
  }, 150)
})

onUpdated(() => {
  if (revealObserver) {
    document.querySelectorAll('.os-anim:not(.is-revealed)').forEach(el => {
      revealObserver.observe(el)
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns) 
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
  if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Space+Grotesk:wght@400;500;600&display=swap');

/* =========================================
   1. VARIABLES & MAIN CONTAINER
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
  position: relative;
  width: 100%;
}

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

.rich-text :deep(strong) {
  color: #dff6f8;
  font-weight: 600;
}

/* =========================================
   2. BACKGROUND DECORATION LAYER
   ========================================= */
.bg-decoration-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(110, 234, 245, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(110, 234, 245, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(circle at center, black 50%, transparent 100%);
  mask-image: radial-gradient(circle at center, black 50%, transparent 100%);
}

.bg-wires {
  position: fixed;
  top: 0;
  width: 15vw;
  min-width: 120px;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  opacity: 0.7; 
}

.bg-wires.left { left: 2vw; }
.bg-wires.right { right: 2vw; }

.wire-svg {
  width: 100%;
  height: 100%;
}

/* =========================================
   3. TYPOGRAPHY & HUD COMPONENTS
   ========================================= */
.glow-text {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow), 0 0 2px var(--cyan-glow);
}

.section-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.body-text {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.body-text:last-child {
  margin-bottom: 0;
}

.hud-frame {
  border: 1px solid var(--border-hud);
  position: relative;
  background: var(--bg-panel);
  padding: 2rem;
  backdrop-filter: blur(8px);
}

/* =========================================
   4. LAYOUT & SECTIONS (Includes Hero & Animations)
   ========================================= */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to bottom, rgba(6, 11, 16, 0.4) 0%, var(--bg-void) 100%),
    url('/Explorehome.png') center/cover no-repeat;
  z-index: -1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5rem; 
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 800;
  color: var(--text-primary);
  text-shadow: 0 0 20px var(--cyan-glow), 0 0 10px var(--cyan);
  margin: 0;
  letter-spacing: 0.15em;
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--cyan);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-top: -10px;
  margin-bottom: 4rem;
  opacity: 0.8;
}

.scroll-down-btn {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px solid rgba(110, 234, 245, 0.3);
  background: rgba(6, 11, 16, 0.5);
  backdrop-filter: blur(8px);
  color: var(--cyan);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: bounce 2.5s infinite;
}

.scroll-down-btn:hover {
  background: rgba(110, 234, 245, 0.15);
  border-color: var(--cyan);
  box-shadow: 0 0 20px var(--cyan-glow);
  transform: scale(1.1);
  animation-play-state: paused;
}

.arrow-icon {
  width: 30px;
  height: 30px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* --- ADJUSTED SECTION CONTAINERS --- */
.about-section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center; 
  background: transparent; 
  /* Heavy left/right padding keeps the cards away from the tracker and wires */
  padding: 6rem 15vw; 
  position: relative;
  z-index: 10;
}

.about-grid {
  max-width: 900px;
  width: 100%;
  margin: 0 auto; /* Forces the grid directly into the center */
}

/* --- OS REVEAL ANIMATIONS --- */
.os-anim {
  opacity: 0;
  will-change: transform, opacity;
}

.anim-scan {
  transform: translateY(30px);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
}

.anim-scan.is-revealed {
  transform: translateY(0);
  opacity: 1;
}

.anim-card {
  transform: perspective(1000px) rotateX(20deg) translateY(40px);
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
}

.anim-card.is-revealed {
  transform: perspective(1000px) rotateX(0deg) translateY(0);
  opacity: 1;
}

.skill-card:nth-child(2n), .project-card:nth-child(2n) {
  transition-delay: 0.1s;
}
.skill-card:nth-child(3n) {
  transition-delay: 0.2s;
}

/* =========================================
   5. HEADER & NAVIGATION
   ========================================= */
.site-header {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Changed side padding from 2rem to 5vw to push elements to the edges */
  padding: 1.5rem 5vw; 
  background: linear-gradient(to bottom, rgba(6, 11, 16, 0.95) 0%, transparent 100%);
  transition: all 0.4s ease;
}

.site-header * {
  transition: all 0.4s ease;
}

.site-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/Computer-screen-code-glitch-animation-gif-background-free.gif') center/cover no-repeat;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  z-index: 100;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}

.header-glitch .logo,
.header-glitch .main-nav {
  background-color: transparent !important;
  border-color: rgba(110, 234, 245, 0.1) !important;
}

.header-glitch * {
  color: rgba(223, 246, 248, 0.4) !important;
  text-shadow: none !important;
  backdrop-filter: none !important;
}

.site-header.header-glitch::before {
  opacity: 0.8;
  visibility: visible;
}

.header-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.logo {
  padding: 0.5rem 1.25rem;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: 0.15em;
}

.main-nav {
  display: flex;
  gap: 1.5rem; 
  background: rgba(6, 11, 16, 0.6);
  padding: 0.5rem 1.25rem; 
  border-radius: 2px;
  border: 1px solid var(--border-hud);
}

.nav-trigger {
  text-decoration: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0;
}

.nav-trigger:hover { color: var(--cyan); }

.nav-item {
  position: relative;
}

.caret {
  color: var(--cyan);
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.caret-open {
  transform: rotate(180deg);
}

.dropdown-box {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1rem;
  background: rgba(6, 11, 16, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-hud);
  border-radius: 4px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  z-index: 100;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  color: var(--cyan);
  background: rgba(110, 234, 245, 0.1);
  text-shadow: 0 0 5px var(--cyan-glow);
}

.sub-trigger {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-body);
  font-size: 0.9rem;
}

.sub-dropdown-accordion {
  background: rgba(0, 0, 0, 0.3); 
  border-left: 2px solid rgba(110, 234, 245, 0.3);
  margin: 0.25rem 0 0.25rem 1.5rem; 
  display: flex;
  flex-direction: column;
}

.sub-item {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: rgba(223, 246, 248, 0.7);
}

.sub-item:hover {
  color: var(--cyan);
}

.disabled-item {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* =========================================
   MOBILE MENU STYLES
   ========================================= */
.mobile-only { display: none !important; }

.mobile-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  z-index: 101; /* Stay above the overlay */
}

.hamburger-line {
  width: 25px;
  height: 2px;
  background-color: var(--cyan);
  transition: all 0.3s ease;
  box-shadow: 0 0 5px var(--cyan-glow);
}

/* Hamburger Animation */
.line-top { transform: translateY(7px) rotate(45deg); }
.line-middle { opacity: 0; }
.line-bottom { transform: translateY(-7px) rotate(-45deg); }

/* The dark background behind the open menu */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 98; 
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.mobile-menu-overlay {
  position: fixed;
  top: 0; 
  right: -320px; 
  width: 300px;  
  max-width: 80vw; 
  height: 100vh;
  background: rgba(6, 11, 16, 0.95);
  border-left: 1px solid var(--border-hud);
  backdrop-filter: blur(10px);
  z-index: 99;
  transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem 2rem 2rem;
  overflow-y: auto;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.7);
}

.mobile-menu-overlay.menu-open { right: 0; }

.mobile-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
}
.mobile-close-btn:hover {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}

.mobile-cat-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-hud);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}
.mobile-nav-link:hover { color: var(--cyan); }

.mobile-sub-group {
  margin-bottom: 1rem;
}
.mobile-sub-title {
  display: block;
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.sub-link {
  padding-left: 1rem;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

/* =========================================
   6. HORIZONTAL SCROLL TRACKER
   ========================================= */
.scroll-tracker-bottom {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 3vw; /* Scales with screen width */
  background: rgba(6, 11, 16, 0.7);
  backdrop-filter: blur(8px);
  padding: 1rem 2.5rem;
  border-radius: 50px; /* Pill shape */
  border: 1px solid var(--border-hud);
}

.tracker-line-horizontal {
  position: absolute;
  top: 50%;
  left: 2.5rem;
  right: 2.5rem;
  transform: translateY(-50%);
  height: 2px;
  background: rgba(110, 234, 245, 0.15);
  z-index: -1;
}

.tracker-node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
}

.tracker-node {
  width: 12px;
  height: 12px;
  background-color: var(--bg-panel);
  border: 2px solid rgba(110, 234, 245, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.tracker-label {
  position: absolute;
  top: -25px; /* Floats above the dot */
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(223, 246, 248, 0.3);
  text-transform: uppercase;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  white-space: nowrap;
}

.tracker-node-wrapper:hover .tracker-label {
  opacity: 1;
  transform: translateY(0);
  color: rgba(110, 234, 245, 0.8);
}

.tracker-node.active {
  background-color: var(--cyan);
  border-color: var(--cyan);
  box-shadow: 0 0 10px var(--cyan-glow), 0 0 5px var(--cyan);
}

.tracker-label.active {
  opacity: 1;
  transform: translateY(0);
  color: var(--cyan);
  text-shadow: 0 0 5px var(--cyan-glow);
}


/* =========================================
   7. EDUCATION COMPONENT
   ========================================= */
.slider-container {
  position: relative;
  margin: 1rem 0;
}

.time-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(110, 234, 245, 0.2);
  outline: none;
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--cyan);
  cursor: pointer;
  box-shadow: 0 0 10px var(--cyan-glow);
  transition: transform 0.1s;
}

.time-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }

.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: rgba(223, 246, 248, 0.4);
}

.active-tick {
  color: var(--cyan);
  text-shadow: 0 0 5px var(--cyan-glow);
}

.edu-display {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(6, 11, 16, 0.5);
  border-left: 3px solid var(--cyan);
  min-height: 150px;
}

.gpax-text {
  font-family: var(--font-display);
  color: rgba(110, 234, 245, 0.8);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.inst-text {
  color: #a4c8d1;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

/* =========================================
   8. SKILLS MATRIX COMPONENT
   ========================================= */
.skill-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.15);
  padding-bottom: 1rem;
  flex-wrap: wrap; /* Allows tabs to wrap on mobile */
}

.tab-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
}

.tab-btn:hover { color: var(--text-primary); }

.tab-btn.active-tab {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
  background: rgba(110, 234, 245, 0.05);
  border-radius: 4px;
}

.skill-matrix {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subcat-title {
  font-family: var(--font-display);
  color: #a4c8d1;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.skill-card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-card {
  background: rgba(6, 11, 16, 0.6);
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 4px;
  padding: 0.75rem 1.25rem;
  min-width: 150px;
  flex-grow: 1; 
  max-width: max-content;
}

.skill-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.skill-name {
  font-weight: 600;
  color: var(--text-primary);
}

.skill-level {
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: var(--bg-void);
  background: var(--cyan);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-special {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
  border-top: 1px dashed rgba(110, 234, 245, 0.15);
  padding-top: 0.5rem;
}

/* =========================================
   9. PROJECTS COMPONENT
   ========================================= */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 2rem;
}

.project-card {
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px var(--cyan-glow);
  border-color: var(--cyan);
}

/* Header (Year & Edu) */
.project-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.project-year {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  text-shadow: 0 0 5px rgba(223, 246, 248, 0.3);
}

.project-edu {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  gap: 1rem;
}

.project-title {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.25rem;
  flex-grow: 1;
}

.project-status {
  font-family: var(--font-display);
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.status-active { border: 1px solid #00ff9d; color: #00ff9d; background: rgba(0, 255, 157, 0.1); box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
.status-dev { border: 1px solid #ffb800; color: #ffb800; background: rgba(255, 184, 0, 0.1); box-shadow: 0 0 5px rgba(255, 184, 0, 0.2); }
.status-hold { border: 1px solid #ff3366; color: #ff3366; background: rgba(255, 51, 102, 0.1); box-shadow: 0 0 5px rgba(255, 51, 102, 0.2); }
.status-inactive { border: 1px solid #4a6b7c; color: #4a6b7c; background: rgba(74, 107, 124, 0.1); }

.project-role {
  font-size: 0.8rem;
  color: #5d7e86;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1; 
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  font-family: var(--font-display);
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
}

.stack-tag {
  background: rgba(110, 234, 245, 0.05);
  color: var(--text-secondary);
  border: 1px solid rgba(110, 234, 245, 0.2);
}

.skill-software { background: rgba(79, 172, 254, 0.1); color: #4facfe; border: 1px solid rgba(79, 172, 254, 0.3); }
.skill-hardware { background: rgba(182, 32, 224, 0.1); color: #b620e0; border: 1px solid rgba(182, 32, 224, 0.3); }
.skill-other { background: rgba(80, 204, 127, 0.1); color: #50cc7f; border: 1px solid rgba(80, 204, 127, 0.3); }

/* =========================================
   11. GLOBAL MEDIA QUERIES (RESPONSIVE)
   ========================================= */

/* Tablet & Large Mobile */
@media (max-width: 1024px) {
  .about-section {
    padding: 6rem 5vw; 
  }
  .bg-wires { display: none; } 
}

/* Standard Mobile */
@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  
  .site-header { padding: 1rem; }
  
  /* 1. HERO IMAGE SWAP FOR MOBILE */
  .hero-background {
    background: 
      linear-gradient(to bottom, rgba(6, 11, 16, 0.4) 0%, var(--bg-void) 100%),
      url('/Explorehome-mobile.png') center/cover no-repeat !important;
  }
  
  .hero-title { font-size: 3rem; }
  .section-title { font-size: 1.75rem; margin-bottom: 1rem; }
  .body-text { font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem; }
  
  /* Reduce container padding so it doesn't take up the whole screen */
  .about-section { padding: 4rem 1rem; min-height: auto; }
  .hud-frame { padding: 1.25rem; }
  
  /* Scroll Tracker Adjustments */
  .scroll-tracker-bottom {
    width: 95%;
    padding: 0.5rem 1.25rem;
    bottom: 1rem;
    gap: 0;
    justify-content: space-between; 
  }
  
  .projects-grid { 
    grid-template-columns: 1fr; /* Forces exactly 1 column, fixing the right-shift */
    gap: 1.5rem;
  } 
  
  /* Tighter Project Card Content */
  .project-year { font-size: 1.3rem; }
  .project-title { font-size: 1.1rem; }
  .project-desc { font-size: 0.85rem; margin-bottom: 1rem; }
  .project-role { margin-bottom: 0.5rem; }
  .project-card { padding: 1.25rem; }

  /* Tighter Skills & Edu Content */
  .skill-card { max-width: 100%; padding: 0.5rem 1rem; }
  .skill-card-grid { gap: 0.5rem; }
  .edu-display { padding: 1.25rem; margin-top: 1rem; min-height: auto; }
}

/* Small Phones */
@media (max-width: 480px) {
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 0.75rem; }
  .tracker-label { display: none; } 
}
</style>

<style>
/* =========================================
   10. GLOBAL RESETS
   ========================================= */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body, #__nuxt, #app {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: #060b10;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>