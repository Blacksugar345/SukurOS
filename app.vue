<template>
  <div class="sukuros-root" @click="handleRichTextLinks">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#6eeaf5" :height="2" :throttle="50" />

    <!-- Subtle Ambient Cyber Scanline Overlay -->
    <div class="crt-scanlines" aria-hidden="true"></div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Intercept internal links inside dynamic v-html (.rich-text) blocks for smooth SPA navigation
const handleRichTextLinks = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  if (!target) return

  const anchor = target.closest('.rich-text a') as HTMLAnchorElement | null
  if (!anchor) return

  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

  // Check if link is internal
  try {
    const url = new URL(href, window.location.origin)
    if (url.origin === window.location.origin && anchor.target !== '_blank') {
      event.preventDefault()
      router.push(url.pathname + url.search + url.hash)
    }
  } catch {
    // Fallback to default browser navigation if URL parsing fails
  }
}
</script>

<style>
/* =========================================
   SUKUR.OS GLOBAL DESIGN SYSTEM & RESETS
   ========================================= */
:root {
  --bg-void: #05080c;
  --bg-deep: #020406;
  --bg-panel: rgba(10, 19, 28, 0.75);
  --bg-panel-elevated: rgba(14, 26, 38, 0.88);
  --cyan: #6eeaf5;
  --cyan-bright: #9df4fc;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --cyan-dim: rgba(110, 234, 245, 0.14);
  --amber: #ffb800;
  --amber-glow: rgba(255, 184, 0, 0.3);
  --emerald: #00ff9d;
  --crimson: #ff3366;
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --text-muted: #5d7e86;
  --border-hud: rgba(110, 234, 245, 0.24);
  --border-hud-strong: rgba(110, 234, 245, 0.5);
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-void);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html, body, #__nuxt, #app, .sukuros-root {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: var(--bg-void);
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: var(--font-body);
}

/* Custom Cyber Selection & Scrollbars */
::selection {
  background: rgba(110, 234, 245, 0.28);
  color: #ffffff;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #030609;
}

::-webkit-scrollbar-thumb {
  background: rgba(110, 234, 245, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(110, 234, 245, 0.15);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(110, 234, 245, 0.55);
  box-shadow: 0 0 8px rgba(110, 234, 245, 0.4);
}

/* Focus Accessibility Ring */
:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
}

/* Ambient CRT Scanline Overlay */
.crt-scanlines {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(110, 234, 245, 0.012) 4px
  );
}

/* Nuxt Page Transitions */
.os-page-enter-active,
.os-page-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.os-page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.os-page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Reduced Motion Support (Accessibility) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
