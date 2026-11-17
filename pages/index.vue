<template>
  <div class="os-container">
    
    <!-- =========================================
         BACKGROUND DECORATION LAYER
         ========================================= -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Left Side Wires -->
    <div class="bg-wires left" aria-hidden="true">
      <svg class="wire-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <g v-for="wire in leftWires" :key="wire.id">
          <path :id="wire.id" :d="wire.path" stroke="rgba(110, 234, 245, 0.15)" stroke-width="2.5" fill="none" />
          <circle r="4" fill="#6eeaf5" filter="drop-shadow(0 0 5px #6eeaf5)">
            <animateMotion repeatCount="indefinite" :dur="wire.dur" :begin="wire.delay">
              <mpath :href="'#' + wire.id" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>

    <!-- Right Side Wires -->
    <div class="bg-wires right" aria-hidden="true">
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
      <NuxtLink to="/" class="logo hud-frame" aria-label="SUKUR.OS Home">
        <!-- Cyber-Cat Tactical Emblem -->
        <svg class="cat-emblem" viewBox="0 0 28 24" fill="none" aria-hidden="true">
          <path d="M3 18L2 4L9 9H19L26 4L25 18L19 22H9L3 18Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round" />
          <polygon points="8,14 11,14 9.5,16" fill="currentColor" />
          <polygon points="17,14 20,14 18.5,16" fill="currentColor" />
          <path d="M12.5 18L14 19.2L15.5 18" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        </svg>
        <span class="logo-text glow-text">SUKUR.OS</span>
        <span class="sys-badge">v4.0</span>
      </NuxtLink>
      
      <!-- Desktop Navigation -->
      <nav class="main-nav desktop-only" aria-label="Main Navigation">
        <div 
          class="nav-item" 
          v-for="menu in navMenus" 
          :key="menu.id"
        >
          <button 
            class="nav-trigger" 
            :aria-expanded="activeDropdown === menu.id"
            @click.stop="toggleDropdown(menu.id)"
          >
            <span class="caret" :class="{ 'caret-open': activeDropdown === menu.id }">▾</span>
            {{ menu.label }}
          </button>
          
          <!-- Dropdown Box -->
          <div class="dropdown-box" v-show="activeDropdown === menu.id" role="menu">
            <div 
              v-for="item in menu.items" 
              :key="item.label"
              class="dropdown-item-wrapper"
            >
              <template v-if="!item.subItems">
                <span v-if="item.disabled" class="dropdown-item disabled-item" aria-disabled="true">
                  {{ item.label }}
                </span>
                <NuxtLink v-else :to="item.link" class="dropdown-item" @click="activeDropdown = null">
                  {{ item.label }}
                </NuxtLink>
              </template>

              <div v-else>
                <button 
                  class="dropdown-item sub-trigger" 
                  :aria-expanded="activeSubDropdown === item.label"
                  @click.stop="toggleSubDropdown(item.label)"
                >
                  {{ item.label }} 
                  <span class="caret" :class="{ 'caret-open': activeSubDropdown === item.label }">▾</span>
                </button>
                
                <div class="sub-dropdown-accordion" v-show="activeSubDropdown === item.label">
                  <template v-for="sub in item.subItems" :key="sub.label">
                    <span v-if="sub.disabled" class="dropdown-item sub-item disabled-item" aria-disabled="true">
                      {{ sub.label }}
                    </span>
                    <NuxtLink 
                      v-else
                      :to="sub.link"
                      class="dropdown-item sub-item"
                      @click="activeDropdown = null; activeSubDropdown = null"
                    >
                      {{ sub.label }}
                    </NuxtLink>
                  </template>
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
      <button 
        class="mobile-menu-btn mobile-only" 
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle Navigation Menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
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
    <aside class="mobile-menu-overlay" :class="{ 'menu-open': mobileMenuOpen }" aria-label="Mobile Navigation">
      <button class="mobile-close-btn" aria-label="Close Menu" @click="mobileMenuOpen = false">×</button>

      <nav class="mobile-nav-list">
        <div class="mobile-nav-category" v-for="menu in navMenus" :key="menu.id">
          <h3 class="mobile-cat-title glow-text">{{ menu.label }}</h3>
          <div v-for="item in menu.items" :key="item.label">
            
            <template v-if="!item.subItems">
              <span v-if="item.disabled" class="mobile-nav-link disabled-item" aria-disabled="true">
                {{ item.label }}
              </span>
              <NuxtLink v-else :to="item.link" class="mobile-nav-link" @click="mobileMenuOpen = false">
                {{ item.label }}
              </NuxtLink>
            </template>
            
            <div v-else class="mobile-sub-group">
              <span class="mobile-sub-title">{{ item.label }}</span>
              <template v-for="sub in item.subItems" :key="sub.label">
                <span v-if="sub.disabled" class="mobile-nav-link sub-link disabled-item" aria-disabled="true">
                  {{ sub.label }}
                </span>
                <NuxtLink v-else :to="sub.link" class="mobile-nav-link sub-link" @click="mobileMenuOpen = false">
                  {{ sub.label }}
                </NuxtLink>
              </template>
            </div>

          </div>
        </div>
        
        <div class="mobile-nav-category">
          <h3 class="mobile-cat-title glow-text">CONNECT</h3>
          <NuxtLink to="/socials/socials" class="mobile-nav-link" @click="mobileMenuOpen = false">Socials</NuxtLink>
        </div>
      </nav>
    </aside>

    <!-- =========================================
         HORIZONTAL BOTTOM SCROLL TRACKER
         ========================================= -->
    <nav class="scroll-tracker-bottom" aria-label="Section Tracker">
      <button 
        v-for="section in pageSections" 
        :key="section.id" 
        type="button"
        class="tracker-node-wrapper"
        :aria-label="`Scroll to ${section.label}`"
        :aria-current="activeSection === section.id ? 'true' : undefined"
        @click="scrollTo(section.id)"
      >
        <div class="tracker-node" :class="{ 'active': activeSection === section.id }"></div>
        <span class="tracker-label" :class="{ 'active': activeSection === section.id }">
          {{ section.label }}
        </span>
      </button>
      <div class="tracker-line-horizontal" aria-hidden="true"></div>
    </nav>

    <!-- =========================================
         PAGE SECTIONS
         ========================================= -->
    
    <!-- 1. Hero (LCP Optimized with <picture> + fetchpriority="high") -->
    <section class="hero" id="home">
      <div class="hero-background" aria-hidden="true">
        <picture class="hero-picture">
          <source media="(max-width: 768px)" srcset="/Explorehome-mobile.png" />
          <img 
            src="/Explorehome.png" 
            alt="" 
            class="hero-bg-img" 
            fetchpriority="high" 
            decoding="async" 
            width="1920" 
            height="1080"
          />
        </picture>
        <div class="hero-gradient-overlay"></div>
      </div>
      
        <!-- data-text is used for the CSS glitch effect -->
        <h1 class="hero-title glitch-layer" data-text="SUKUR.OS">SUKUROS</h1>
        <p class="hero-subtitle typewriter-anim">The Zwasonian Felines</p>
        
        <button class="scroll-down-btn" aria-label="Scroll down to About section" @click="scrollTo('about')">
          <svg viewBox="0 0 24 24" class="arrow-icon" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </section>
    
    <!-- 2. About -->
    <section class="about-section" id="about">
      <div class="about-grid">
        <div class="about-content hud-frame hud-corners os-anim anim-scan">
          <div class="section-header-bar">
            <h2 class="section-title glow-text">.README</h2>
            <span class="hud-tag">SYS_PROFILE // 01</span>
          </div>
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
        <div class="about-content hud-frame hud-corners os-anim anim-scan">
          <div class="section-header-bar">
            <h2 class="section-title glow-text">EDUCATION</h2>
            <span class="hud-tag">CHRONO_LOG // 02</span>
          </div>
          
          <div class="slider-container" v-if="educationTimeline?.length">
            <div class="slider-controls-row">
              <button 
                type="button" 
                class="step-btn" 
                :disabled="eduIndex <= 0"
                aria-label="Previous education milestone"
                @click="eduIndex = Math.max(0, eduIndex - 1)"
              >◂</button>
              <input 
                type="range" 
                min="0" 
                :max="educationTimeline.length - 1" 
                v-model.number="eduIndex" 
                class="time-slider"
                aria-label="Education timeline year selector"
              />
              <button 
                type="button" 
                class="step-btn" 
                :disabled="eduIndex >= educationTimeline.length - 1"
                aria-label="Next education milestone"
                @click="eduIndex = Math.min(educationTimeline.length - 1, eduIndex + 1)"
              >▸</button>
            </div>
            <div class="slider-ticks">
              <button 
                v-for="(edu, index) in educationTimeline" 
                :key="edu.id" 
                type="button"
                class="tick-btn"
                :class="{'active-tick': eduIndex == index}"
                @click="eduIndex = index"
              >
                {{ edu.yearstart }}
              </button>
            </div>
          </div>

          <div class="edu-display" v-if="educationTimeline?.length && educationTimeline[eduIndex]">
            <div class="edu-header-row">
              <div>
                <h3 class="edu-title glow-text">{{ educationTimeline[eduIndex].title }}</h3>
                <h4 class="inst-text">{{ educationTimeline[eduIndex].institution }}</h4>
              </div>
              <!-- GPAX Display -->
              <span class="gpax-badge" v-if="educationTimeline[eduIndex].gpax">
                [ GPAX: {{ educationTimeline[eduIndex].gpax }} ]
              </span>
            </div>

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

          <div class="empty-hud-state" v-else>
            <span class="glow-text">AWAITING EDUCATION TELEMETRY...</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Skills Matrix -->
    <section class="about-section" id="skills">
      <div class="about-grid">
        <div class="about-content hud-frame hud-corners os-anim anim-scan">
          <div class="section-header-bar">
            <h2 class="section-title glow-text">SKILLS</h2>
            <span class="hud-tag">CAPABILITY_MATRIX // 03</span>
          </div>
          
          <!-- Parent Category Tabs -->
          <div class="skill-tabs" role="tablist">
            <button 
              v-for="tab in skillParentTabs" 
              :key="tab"
              type="button"
              role="tab"
              :aria-selected="activeSkillTab === tab"
              class="tab-btn"
              :class="{ 'active-tab': activeSkillTab === tab }"
              @click="activeSkillTab = tab"
            >
              [{{ tab.toUpperCase() }}]
            </button>
          </div>

          <!-- Dynamic Skill Content -->
          <div class="skill-matrix" v-if="Object.keys(structuredSkills[activeSkillTab] || {}).length">
            <div 
              v-for="(skillsList, subCategory) in structuredSkills[activeSkillTab]" 
              :key="subCategory" 
              class="subcat-group"
            >
              <h3 class="subcat-title">> {{ subCategory }}</h3>
              
              <div class="skill-card-grid">
                <div v-for="skill in skillsList" :key="skill.id" class="skill-card os-anim anim-card is-revealed">
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

          <div class="empty-hud-state" v-else>
            <span class="glow-text">SCANNING SKILL MODULES...</span>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. Projects -->
    <section class="about-section" id="projects">
      <div class="about-grid" style="max-width: 1050px;">
        <div class="projects-section-header">
          <span class="hud-tag">ARCHIVE_DEPLOYMENTS // 04</span>
          <h2 class="section-title glow-text" style="text-align: center; margin-bottom: 0.5rem;">PROJECTS</h2>
        </div>

        <div class="projects-grid" v-if="projectsList?.length">
          <article class="project-card hud-frame hud-corners os-anim anim-card" v-for="project in projectsList" :key="project.id">
            
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
            <p class="project-role" v-if="project.role">ROLE: {{ project.role }}</p>
            
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
          </article>
        </div>

        <div class="hud-frame empty-hud-state" v-else>
          <span class="glow-text">LOADING PROJECT ARCHIVES...</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated, computed, watch } from 'vue'

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
      { label: 'Gallery', link: '/other/gallery' },
      { label: 'Reference', link: '/other/reference' }
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

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    activeDropdown.value = null
    activeSubDropdown.value = null
    mobileMenuOpen.value = false
  }
}

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = -60
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: Math.max(0, elementPosition - headerOffset), behavior: 'smooth' })
  }
}

let scrollTicking = false
const handleScroll = () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY
      if (scrollY < 100) headerState.value = 'visible'
      else if (scrollY >= 100 && scrollY < 250) headerState.value = 'glitch'
      else headerState.value = 'hidden'
      scrollTicking = false
    })
    scrollTicking = true
  }
}

// =========================================
// 2. SUPABASE DATA FETCHING
// =========================================
const { data: aboutData } = await useAsyncData('about', async () => {
  try {
    const { data, error } = await supabase.from('aboutme').select('text').order('latest_update', { ascending: false }).limit(1).single()
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return null
  }
})

const { data: educationTimeline } = await useAsyncData('education', async () => {
  try {
    const { data, error } = await supabase.from('education').select('*').order('order', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

watch(
  educationTimeline,
  (list) => {
    if (list?.length) {
      eduIndex.value = list.length - 1
    }
  },
  { immediate: true }
)

const { data: techSkills } = await useAsyncData('skills', async () => {
  try {
    const { data, error } = await supabase.from('skills').select('*').order('order', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
})

const { data: projectsList } = await useAsyncData('projects', async () => {
  try {
    const { data, error } = await supabase.from('project').select('*').order('order', { ascending: true })
    if (error) console.error("SUPABASE ERROR:", error.message)
    return data || []
  } catch (err) {
    console.error("SUPABASE FETCH ERROR:", err)
    return []
  }
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
  const ids = String(skillIdsString).split('/').map(id => id.trim())
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
  let currentX = Math.floor(Math.random() * 80) + 10
  let currentY = -20
  let path = `M ${currentX} ${currentY}`
  
  const turns = Math.floor(Math.random() * 4) + 3
  const ySegment = 1050 / turns

  for (let i = 0; i < turns; i++) {
    currentY += ySegment - (Math.random() * 30)
    path += ` L ${currentX} ${currentY}`
    
    const targetX = Math.floor(Math.random() * 80) + 10
    const deltaX = targetX - currentX
    currentY += Math.abs(deltaX)
    
    path += ` L ${targetX} ${currentY}`
    currentX = targetX
  }
  
  path += ` L ${currentX} 1100`
  return path
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
let observer
let revealObserver

onMounted(() => {
  leftWires.value = generateWires(4, 'left')
  rightWires.value = generateWires(4, 'right')

  document.addEventListener('click', closeDropdowns) 
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('scroll', handleScroll, { passive: true })
  
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
  }, 100)
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
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
  if (revealObserver) revealObserver.disconnect()
})
</script>

<style scoped>
/* =========================================
   1. VARIABLES & MAIN CONTAINER
   ========================================= */
.os-container {
  --bg-void: #060b10;
  --bg-panel: rgba(12, 22, 30, 0.76);
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #dff6f8;
  --text-secondary: #8baab2;
  --border-hud: rgba(110, 234, 245, 0.25);
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;

  background: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-body);
  position: relative;
  width: 100%;
  padding-bottom: 5rem;
}

.rich-text :deep(a) {
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 1px dashed rgba(110, 234, 245, 0.5);
  transition: all 0.25s ease;
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
  text-shadow: 0 0 10px var(--cyan-glow), 0 0 2px var(--cyan-glow);
}

.section-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.15);
  padding-bottom: 1rem;
  margin-bottom: 1.75rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  margin: 0;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hud-tag {
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: #5d7e86;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.body-text {
  color: var(--text-secondary);
  font-size: 1.08rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.body-text:last-child {
  margin-bottom: 0;
}

.hud-frame {
  border: 1px solid var(--border-hud);
  position: relative;
  background: var(--bg-panel);
  padding: 2.25rem;
  backdrop-filter: blur(10px);
  border-radius: 3px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 0 24px rgba(110, 234, 245, 0.03);
}

.hud-corners::before,
.hud-corners::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--cyan);
  pointer-events: none;
}

.hud-corners::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--cyan);
  border-left: 2px solid var(--cyan);
}

.hud-corners::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--cyan);
  border-right: 2px solid var(--cyan);
}

.empty-hud-state {
  text-align: center;
  padding: 2.5rem 1rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
}

/* =========================================
   4. LAYOUT & SECTIONS (Includes Hero & Animations)
   ========================================= */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-picture {
  display: block;
  width: 100%;
  height: 100%;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(6, 11, 16, 0.35) 0%,
    rgba(6, 11, 16, 0.55) 65%,
    var(--bg-void) 100%
  );
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 4rem;
  padding: 0 1rem;
}

.hero-telemetry {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--cyan);
  background: rgba(6, 11, 16, 0.65);
  border: 1px solid rgba(110, 234, 245, 0.3);
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  backdrop-filter: blur(6px);
}

.telemetry-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00ff9d;
  box-shadow: 0 0 8px #00ff9d;
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 800;
  color: var(--text-primary);
  text-shadow: 0 0 24px var(--cyan-glow), 0 0 10px var(--cyan);
  margin: 0;
  letter-spacing: 0.15em;
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 3vw, 1.4rem);
  color: var(--cyan);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  margin-top: 0.25rem;
  margin-bottom: 3.5rem;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.scroll-down-btn {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 1.5px solid rgba(110, 234, 245, 0.4);
  background: rgba(6, 11, 16, 0.6);
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
  background: rgba(110, 234, 245, 0.18);
  border-color: var(--cyan);
  box-shadow: 0 0 20px var(--cyan-glow);
  transform: scale(1.08);
  animation-play-state: paused;
}

.arrow-icon {
  width: 28px;
  height: 28px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-16px); }
  60% { transform: translateY(-8px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* --- ADJUSTED SECTION CONTAINERS --- */
.about-section {
  min-height: 85vh;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center; 
  background: transparent; 
  padding: 5rem 15vw; 
  position: relative;
  z-index: 10;
}

.about-grid {
  max-width: 920px;
  width: 100%;
  margin: 0 auto;
}

/* --- OS REVEAL ANIMATIONS --- */
.os-anim {
  opacity: 0;
  will-change: transform, opacity;
}

.anim-scan {
  transform: translateY(28px);
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease;
}

.anim-scan.is-revealed {
  transform: translateY(0);
  opacity: 1;
}

.anim-card {
  transform: perspective(1000px) rotateX(14deg) translateY(30px);
  transition: transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.55s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.anim-card.is-revealed {
  transform: perspective(1000px) rotateX(0deg) translateY(0);
  opacity: 1;
}

.skill-card:nth-child(2n), .project-card:nth-child(2n) {
  transition-delay: 0.06s;
}
.skill-card:nth-child(3n) {
  transition-delay: 0.12s;
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
  padding: 1.25rem 5vw; 
  background: linear-gradient(to bottom, rgba(6, 11, 16, 0.92) 0%, transparent 100%);
  transition: opacity 0.35s ease, visibility 0.35s ease;
}

.site-header::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
  z-index: 100;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}

.site-header.header-glitch::before {
  background: url('/Computer-screen-code-glitch-animation-gif-background-free.gif') center/cover no-repeat;
  opacity: 0.75;
  visibility: visible;
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

.header-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.logo {
  padding: 0.5rem 1.15rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.logo:hover {
  border-color: var(--cyan);
  box-shadow: 0 0 15px rgba(110, 234, 245, 0.2);
}

.cat-emblem {
  width: 24px;
  height: 20px;
  color: var(--cyan);
  filter: drop-shadow(0 0 6px var(--cyan-glow));
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: 0.14em;
}

.sys-badge {
  font-family: var(--font-display);
  font-size: 0.62rem;
  color: var(--bg-void);
  background: var(--cyan);
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem; 
  background: rgba(6, 11, 16, 0.72);
  padding: 0.45rem 1.35rem; 
  border-radius: 3px;
  border: 1px solid var(--border-hud);
  backdrop-filter: blur(10px);
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
  padding: 0.4rem 0.25rem;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.nav-trigger:hover {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.nav-item {
  position: relative;
}

.caret {
  color: var(--cyan);
  font-size: 0.7rem;
  transition: transform 0.25s ease;
  display: inline-block;
}

.caret-open {
  transform: rotate(180deg);
}

.dropdown-box {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.85rem;
  background: rgba(6, 11, 16, 0.96);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border-hud);
  border-top: 2px solid var(--cyan);
  border-radius: 4px;
  min-width: 230px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.75);
  z-index: 100;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.35rem;
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
  background: rgba(0, 0, 0, 0.35); 
  border-left: 2px solid rgba(110, 234, 245, 0.35);
  margin: 0.25rem 0 0.25rem 1.35rem; 
  display: flex;
  flex-direction: column;
}

.sub-item {
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  color: rgba(223, 246, 248, 0.75);
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
  background: rgba(6, 11, 16, 0.75);
  border: 1px solid var(--border-hud);
  border-radius: 3px;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 0.6rem;
  z-index: 101;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--cyan);
  transition: all 0.3s ease;
  box-shadow: 0 0 5px var(--cyan-glow);
}

.line-top { transform: translateY(7px) rotate(45deg); }
.line-middle { opacity: 0; }
.line-bottom { transform: translateY(-7px) rotate(-45deg); }

.mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 98; 
  opacity: 0;
  animation: fadeIn 0.25s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.mobile-menu-overlay {
  position: fixed;
  top: 0; 
  right: -340px; 
  width: 300px;  
  max-width: 82vw; 
  height: 100vh;
  background: rgba(6, 11, 16, 0.97);
  border-left: 1px solid var(--border-hud);
  backdrop-filter: blur(14px);
  z-index: 99;
  transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  padding: 4.5rem 1.75rem 2rem 1.75rem;
  overflow-y: auto;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.75);
}

.mobile-menu-overlay.menu-open { right: 0; }

.mobile-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2.25rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0.25rem 0.5rem;
}
.mobile-close-btn:hover {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 0.5rem;
}

.mobile-cat-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--cyan);
  border-bottom: 1px solid var(--border-hud);
  padding-bottom: 0.45rem;
  margin-bottom: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.mobile-nav-link {
  display: block;
  font-family: var(--font-body);
  font-size: 1.02rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease, transform 0.2s ease;
}
.mobile-nav-link:hover {
  color: var(--cyan);
  transform: translateX(4px);
}

.mobile-sub-group {
  margin-bottom: 0.85rem;
}
.mobile-sub-title {
  display: block;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.sub-link {
  padding-left: 1rem;
  font-size: 0.95rem;
  margin-bottom: 0.65rem;
  border-left: 1px dashed rgba(110, 234, 245, 0.25);
}

/* =========================================
   6. HORIZONTAL SCROLL TRACKER
   ========================================= */
.scroll-tracker-bottom {
  position: fixed;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 2.8vw;
  background: rgba(6, 11, 16, 0.82);
  backdrop-filter: blur(10px);
  padding: 0.85rem 2.25rem;
  border-radius: 50px;
  border: 1px solid var(--border-hud);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.tracker-line-horizontal {
  position: absolute;
  top: 50%;
  left: 2.25rem;
  right: 2.25rem;
  transform: translateY(-50%);
  height: 2px;
  background: rgba(110, 234, 245, 0.15);
  z-index: -1;
}

.tracker-node-wrapper {
  background: none;
  border: none;
  padding: 0.25rem;
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
  border: 2px solid rgba(110, 234, 245, 0.35);
  border-radius: 50%;
  transition: all 0.25s ease;
}

.tracker-label {
  position: absolute;
  top: -24px;
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(223, 246, 248, 0.3);
  text-transform: uppercase;
  transition: all 0.25s ease;
  opacity: 0;
  transform: translateY(8px);
  white-space: nowrap;
  pointer-events: none;
}

.tracker-node-wrapper:hover .tracker-label {
  opacity: 1;
  transform: translateY(0);
  color: rgba(110, 234, 245, 0.85);
}

.tracker-node.active {
  background-color: var(--cyan);
  border-color: var(--cyan);
  box-shadow: 0 0 10px var(--cyan-glow), 0 0 5px var(--cyan);
  transform: scale(1.15);
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
  margin: 0.5rem 0 1.5rem 0;
}

.slider-controls-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.step-btn {
  background: rgba(6, 11, 16, 0.7);
  border: 1px solid rgba(110, 234, 245, 0.3);
  color: var(--cyan);
  width: 32px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.step-btn:hover:not(:disabled) {
  background: rgba(110, 234, 245, 0.15);
  border-color: var(--cyan);
  box-shadow: 0 0 8px var(--cyan-glow);
}

.step-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.time-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(110, 234, 245, 0.22);
  outline: none;
  border-radius: 2px;
  position: relative;
  z-index: 2;
  cursor: pointer;
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
  transition: transform 0.15s ease;
}

.time-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }

.slider-ticks {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.85rem;
  padding: 0 2.5rem;
  width: 100%;
  max-width: 100%;
}

.tick-btn {
  background: rgba(6, 11, 16, 0.4);
  border: 1px solid transparent;
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: rgba(223, 246, 248, 0.45);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  transition: all 0.2s ease;
  min-width: 0;
  max-width: 100%;
  white-space: nowrap;
}

.tick-btn:hover {
  color: var(--text-primary);
  border-color: rgba(110, 234, 245, 0.25);
}

.tick-btn.active-tick {
  color: var(--cyan);
  text-shadow: 0 0 6px var(--cyan-glow);
  background: rgba(110, 234, 245, 0.1);
  border-color: rgba(110, 234, 245, 0.35);
}

.edu-display {
  margin-top: 1.5rem;
  padding: 1.75rem;
  background: rgba(6, 11, 16, 0.55);
  border: 1px solid rgba(110, 234, 245, 0.12);
  border-left: 3px solid var(--cyan);
  border-radius: 0 3px 3px 0;
  min-height: 150px;
}

.edu-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.edu-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0 0 0.35rem 0;
}

.inst-text {
  color: #a4c8d1;
  font-size: 0.98rem;
  margin: 0;
  font-family: var(--font-display);
}

.gpax-badge {
  font-family: var(--font-display);
  color: var(--cyan);
  background: rgba(110, 234, 245, 0.08);
  border: 1px solid rgba(110, 234, 245, 0.25);
  padding: 0.3rem 0.65rem;
  border-radius: 2px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

/* =========================================
   8. SKILLS MATRIX COMPONENT
   ========================================= */
.skill-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(110, 234, 245, 0.15);
  padding-bottom: 1rem;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(6, 11, 16, 0.5);
  border: 1px solid rgba(110, 234, 245, 0.18);
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0.55rem 1.15rem;
  border-radius: 3px;
}

.tab-btn:hover {
  color: var(--text-primary);
  border-color: rgba(110, 234, 245, 0.45);
}

.tab-btn.active-tab {
  color: var(--cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
  background: rgba(110, 234, 245, 0.12);
  border-color: var(--cyan);
}

.skill-matrix {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.subcat-title {
  font-family: var(--font-display);
  color: #a4c8d1;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.skill-card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.skill-card {
  background: rgba(6, 11, 16, 0.65);
  border: 1px solid rgba(110, 234, 245, 0.2);
  border-radius: 3px;
  padding: 0.75rem 1.15rem;
  min-width: 155px;
  flex-grow: 1; 
  max-width: max-content;
}

.skill-card:hover {
  border-color: rgba(110, 234, 245, 0.5);
  background: rgba(12, 24, 34, 0.8);
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
  font-size: 0.68rem;
  color: var(--bg-void);
  background: var(--cyan);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.skill-special {
  margin-top: 0.5rem;
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.45;
  border-top: 1px dashed rgba(110, 234, 245, 0.15);
  padding-top: 0.45rem;
}

/* =========================================
   9. PROJECTS COMPONENT
   ========================================= */
.projects-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 2.25rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
  gap: 1.75rem;
}

.project-card {
  padding: 1.75rem;
  cursor: default;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(110, 234, 245, 0.18);
  border-color: var(--cyan);
}

.project-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.project-year {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--text-primary);
  text-shadow: 0 0 5px rgba(223, 246, 248, 0.3);
}

.project-edu {
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.35rem;
  gap: 0.75rem;
}

.project-title {
  font-family: var(--font-display);
  color: var(--cyan);
  font-size: 1.2rem;
  margin: 0;
  flex-grow: 1;
  line-height: 1.35;
}

.project-status {
  font-family: var(--font-display);
  font-size: 0.64rem;
  padding: 0.22rem 0.55rem;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-active { border: 1px solid #00ff9d; color: #00ff9d; background: rgba(0, 255, 157, 0.1); box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
.status-dev { border: 1px solid #ffb800; color: #ffb800; background: rgba(255, 184, 0, 0.1); box-shadow: 0 0 5px rgba(255, 184, 0, 0.2); }
.status-hold { border: 1px solid #ff3366; color: #ff3366; background: rgba(255, 51, 102, 0.1); box-shadow: 0 0 5px rgba(255, 51, 102, 0.2); }
.status-inactive { border: 1px solid #5d7e86; color: #8baab2; background: rgba(93, 126, 134, 0.12); }

.project-role {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: #6b919b;
  letter-spacing: 0.06em;
  margin: 0 0 1rem 0;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.96rem;
  line-height: 1.65;
  margin: 0 0 1.5rem 0;
  flex-grow: 1; 
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag {
  font-size: 0.72rem;
  font-family: var(--font-display);
  padding: 0.25rem 0.65rem;
  border-radius: 2px;
}

.stack-tag {
  background: rgba(110, 234, 245, 0.06);
  color: var(--text-secondary);
  border: 1px solid rgba(110, 234, 245, 0.22);
}

.skill-software { background: rgba(79, 172, 254, 0.12); color: #63b4ff; border: 1px solid rgba(79, 172, 254, 0.35); }
.skill-hardware { background: rgba(196, 77, 255, 0.12); color: #d580ff; border: 1px solid rgba(196, 77, 255, 0.35); }
.skill-other { background: rgba(80, 204, 127, 0.12); color: #5ce08e; border: 1px solid rgba(80, 204, 127, 0.35); }

/* =========================================
   10. GLOBAL MEDIA QUERIES (RESPONSIVE)
   ========================================= */
@media (max-width: 1024px) {
  .about-section {
    padding: 5rem 5vw; 
  }
  .bg-wires { display: none; } 
}

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  
  .site-header { padding: 1rem 1.25rem; }
  
  .hero-title { font-size: 3rem; }
  .section-title { font-size: 1.65rem; }
  .body-text { font-size: 0.96rem; line-height: 1.6; margin-bottom: 1rem; }
  
  .about-section { padding: 3.5rem 1rem; min-height: auto; }
  .hud-frame { padding: 1.35rem; max-width: 100%; overflow: hidden; }
  
  .slider-ticks {
    padding: 0;
    justify-content: center;
    gap: 0.35rem;
  }
  .tick-btn {
    font-size: 0.72rem;
    padding: 0.22rem 0.45rem;
  }
  
  .scroll-tracker-bottom {
    width: 92%;
    padding: 0.55rem 1.25rem;
    bottom: 1rem;
    gap: 0;
    justify-content: space-between; 
  }
  
  .projects-grid { 
    grid-template-columns: 1fr;
    gap: 1.35rem;
  } 
  
  .project-year { font-size: 1.35rem; }
  .project-title { font-size: 1.1rem; }
  .project-desc { font-size: 0.9rem; margin-bottom: 1rem; }
  .project-card { padding: 1.35rem; }

  .skill-card { max-width: 100%; padding: 0.6rem 1rem; }
  .skill-card-grid { gap: 0.6rem; }
  .edu-display { padding: 1.25rem; margin-top: 1rem; min-height: auto; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 2.4rem; }
  .hero-subtitle { font-size: 0.78rem; letter-spacing: 0.2em; }
  .tracker-label { display: none; } 
}
</style>
