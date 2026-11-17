<template>
  <div class="os-container wiki-mode">
    
    <!-- Background Grid -->
    <div class="bg-decoration-grid" aria-hidden="true"></div>

    <!-- Header -->
    <header class="sub-header">
      <div class="logo">
        <span class="logo-text glow-text">SUKUR.OS // WIKI_ARCHIVE</span>
      </div>
      <NuxtLink to="/" class="return-btn">
        <span class="caret-left">◂</span> RETURN
      </NuxtLink>
    </header>

    <!-- Main Wikipedia Article Layout -->
    <main class="wiki-article-container os-anim anim-scan" :class="{ 'is-revealed': isRevealed }">
      
      <!-- Wikipedia-Style Top Tabs -->
      <div class="wiki-tabs">
        <div class="tabs-left">
          <span class="tab active">Article</span>
          <span class="tab">Talk</span>
        </div>
        <div class="tabs-right">
          <span class="tab active">Read</span>
          <span class="tab">View source</span>
          <span class="tab">View history</span>
        </div>
      </div>

      <!-- Article Title & Toolbar -->
      <div class="article-header">
        <h1 class="article-title glow-text">Zwasonia</h1>
        <hr class="wiki-divider" />
        <div class="article-meta">
          <span>From Sukur.OS Free Encyclopedia</span>
          <span class="coordinates">Coordinates: <span class="coord-val">34°46′N 32°04′E</span></span>
        </div>
      </div>

      <div class="article-body">
        
        <!-- Right Column: Wikipedia Infobox -->
        <aside class="wiki-infobox hud-corners">
          <div class="infobox-header">Zwasonian Parliamentary Republic</div>
          <div class="infobox-subheader">Zvas (Zwasonian)</div>
          
          <div class="infobox-image-box">
            <button
              type="button"
              class="flag-btn"
              aria-label="Expand Flag of Zwasonia"
              @click="showFlagModal = true"
            >
              <img 
                src="/zwasonia-flag.png" 
                alt="Flag of Zwasonia" 
                class="flag-img" 
                decoding="async"
                width="300"
                height="180"
              />
            </button>
            <div class="caption">Flag of Zwasonia</div>
          </div>

          <table class="infobox-table">
            <tbody>
              <tr><th colspan="2" class="infobox-section-header">General Information</th></tr>
              <tr><th scope="row">Capital<br/>(and largest city)</th><td>New Zion<br/>34°46′N 32°04′E</td></tr>
              <tr><th scope="row">Official Languages</th><td>Zwasonian, English</td></tr>
              <tr><th scope="row">Demonym(s)</th><td>Zwasonian</td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">Government</th></tr>
              <tr><th scope="row">Government</th><td>Unitary parliamentary republic</td></tr>
              <tr><th scope="row">• President</th><td>Tariq Ivanov</td></tr>
              <tr><th scope="row">• Prime Minister</th><td>Omar Harrison</td></tr>
              <tr><th scope="row">Legislature</th><td>National Assembly</td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">History</th></tr>
              <tr><th scope="row">• British Colonization</th><td>Late 1700s</td></tr>
              <tr><th scope="row">• Axis Occupation</th><td>1940 – 1943</td></tr>
              <tr><th scope="row">• Independence Declared</th><td>February 18, 1944</td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">Area</th></tr>
              <tr><th scope="row">• Total</th><td>238,397 km² (84th)<br/>92,045 sq mi</td></tr>
              <tr><th scope="row">• Water (%)</th><td>2.1</td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">Population</th></tr>
              <tr><th scope="row">• Estimate</th><td>25,400,000 (54th)</td></tr>
              <tr><th scope="row">• Density</th><td>106.5/km² (105th)</td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">Economy</th></tr>
              <tr><th scope="row">GDP (PPP)</th><td>2026 estimate</td></tr>
              <tr><th scope="row">• Total</th><td>$2.12 Trillion</td></tr>
              <tr><th scope="row">• Per capita</th><td>$83,464 (6th)</td></tr>
              <tr><th scope="row">GDP (Nominal)</th><td>2026 estimate</td></tr>
              <tr><th scope="row">• Total</th><td>$1.45 Trillion</td></tr>
              <tr><th scope="row">• Per capita</th><td>$57,086 (14th)</td></tr>
              <tr><th scope="row">HDI (2025)</th><td>0.941 <span style="color:#00ff9d;">very high</span></td></tr>
              
              <tr><th colspan="2" class="infobox-section-header">Miscellaneous</th></tr>
              <tr><th scope="row">Currency</th><td>Pletina (ZWP)</td></tr>
              <tr><th scope="row">Time Zone</th><td>UTC+2 (ZST)<br/>• Summer (DST): UTC+3</td></tr>
              <tr><th scope="row">Driving Side</th><td>Right</td></tr>
              <tr><th scope="row">Calling Code</th><td>+884</td></tr>
              <tr><th scope="row">ISO 3166 Code</th><td>ZW</td></tr>
              <tr><th scope="row">Internet TLD</th><td>.zw</td></tr>
            </tbody>
          </table>
        </aside>

        <!-- Left Column: Main Content -->
        <div class="article-content">
          
          <!-- Introduction -->
          <p class="wiki-paragraph">
            <b>Zwasonia</b>, officially the <b>Zwasonian Parliamentary Republic</b>, is a highly developed sovereign state located on the Mediterranean coast of the Eurasian continent. Positioned at a vital geographic, economic, and cultural crossroads, the nation shares land borders with <b>Sunderland</b> to the north and <b>Verlinika</b> to the east<sup class="citation"><a href="#references">[1]</a></sup>. 
          </p>
          <p class="wiki-paragraph">
            Boasting a diverse population of over 25.4 million citizens, Zwasonia is globally recognized as an economic powerhouse. It is classified as a high-income economy with a very high Human Development Index (HDI)<sup class="citation"><a href="#references">[2]</a></sup>. Functioning as a parliamentary republic under the leadership of President Tariq Ivanov and Prime Minister Omar Harrison, the country balances a complex, war-torn history with a modern society heavily focused on technological advancement, maritime trade, and pioneering green-city mega projects.
          </p>

          <!-- Table of Contents -->
          <nav class="wiki-toc" aria-label="Table of Contents">
            <div class="toc-title">Contents</div>
            <ul class="toc-list">
              <li><a href="#etymology"><span class="toc-number">01</span> Etymology</a></li>
              <li>
                <a href="#history"><span class="toc-number">02</span> History</a>
                <ul class="toc-sublist">
                  <li><a href="#early-colonial"><span class="toc-number">2.1</span> Early colonial era</a></li>
                  <li><a href="#ww1"><span class="toc-number">2.2</span> World War I and interwar period</a></li>
                  <li><a href="#ww2"><span class="toc-number">2.3</span> World War II and occupation</a></li>
                  <li><a href="#modern"><span class="toc-number">2.4</span> Modern era and US influence</a></li>
                </ul>
              </li>
              <li>
                <a href="#geography"><span class="toc-number">03</span> Geography and regions</a>
                <ul class="toc-sublist">
                  <li><a href="#genrich"><span class="toc-number">3.1</span> Northern Region (Genrich)</a></li>
                  <li><a href="#keteras"><span class="toc-number">3.2</span> Western Region (Ketaras)</a></li>
                  <li><a href="#zion"><span class="toc-number">3.3</span> Eastern Region (Zion)</a></li>
                  <li><a href="#stering"><span class="toc-number">3.4</span> Southern Region (Stering)</a></li>
                </ul>
              </li>
              <li><a href="#economy"><span class="toc-number">04</span> Economy and infrastructure</a></li>
            </ul>
          </nav>

          <!-- Section: Etymology -->
          <h2 id="etymology" class="wiki-section-title">Etymology</h2>
          <hr class="wiki-divider" />
          <p class="wiki-paragraph">
            The region historically served as a fertile sanctuary for the indigenous <b>Zu</b> and <b>Vae</b> peoples, who established early coastal settlements along the Mediterranean. Over centuries of linguistic blending, trade, and integration between these native populations and subsequent settlers, the territory became collectively known in local dialects as <i>Zvas</i>, which was later anglicized to Zwasonia during the British colonial period<sup class="citation"><a href="#references">[3]</a></sup>.
          </p>

          <!-- Section: History -->
          <h2 id="history" class="wiki-section-title">History</h2>
          <hr class="wiki-divider" />
          
          <h3 id="early-colonial" class="wiki-subsection-title">Early colonial era</h3>
          <p class="wiki-paragraph">
            Prior to the 18th century, Zwasonia was a loose coalition of independent coastal city-states. Because the land acted as a lush, resource-rich oasis amidst the harsher Eurasian desert landscapes, it became a highly contested prize among European empires. In the early 1700s, the British colonial army established an encampment in the region. This sparked a prolonged war between local militias and British forces, which was further complicated by heavy interference from Spanish and Dutch colonial fleets vying for control of the Mediterranean port access. By the late 1700s, the British successfully solidified their colonization of the territory<sup class="citation"><a href="#references">[4]</a></sup>. 
          </p>
          <p class="wiki-paragraph">
            Entering the 1800s, the British Empire utilized Zwasonia as a primary military fortress to defend against the expanding army of Sunderland—a powerful, heavily militarized puppet state of the Prussian Empire. A second major conflict erupted between British forces and Sunderland. The British successfully defended Zwasonia, subsequently reinforcing it with modern weaponry and garrisoned troops, establishing the nation as the most vital strategic chokepoint in Eurasia.
          </p>

          <h3 id="ww1" class="wiki-subsection-title">World War I and interwar period</h3>
          <p class="wiki-paragraph">
            During World War I, Zwasonia formally fought alongside the Allied Powers. The region served as a critical defensive line, successfully repelling joint offensives from Sunderland and their reinforcements from the Ottoman Empire. Following the conflict, Zwasonia was celebrated as the most successful Allied battlefront in Eurasia. During the interwar period, Zwasonia gained immense trust and financial investment from Allied nations, leading to a rapid boom in infrastructure, economic development, and military modernization<sup class="citation"><a href="#references">[5]</a></sup>.
          </p>

          <h3 id="ww2" class="wiki-subsection-title">World War II and occupation</h3>
          <p class="wiki-paragraph">
            World War II brought unprecedented devastation to the region. Sunderland, seeking revenge for their WWI defeat, joined the Axis powers and formed a pact with neighboring Verlinika. Together, they launched a sudden, overwhelming two-front invasion of Zwasonia. Shortly after the fall of Paris, Zwasonian defenses collapsed under the sheer mechanical numbers of the Axis advance.
          </p>
          <p class="wiki-paragraph">
            The subsequent Axis occupation was brutal. Because a significant portion of Zwasonia's Eurasian population consisted of Jewish communities who had settled in the coastal oasis, the country became a primary target for the Holocaust. Under direct orders from Axis leadership, massacres were carried out across the country, resulting in the brutal execution of almost 20% of the total Zwasonian population<sup class="citation"><a href="#references">[6]</a></sup>.
          </p>
          <p class="wiki-paragraph">
            The tide of the war turned on September 4, 1943. Following the Allied invasion of Italy, a specialized unit of United States forces infiltrated Zwasonia under <b>Operation Brown Wings</b>. They successfully captured a strategic northern town, securing a vital beachhead for a massive US infantry and armor deployment. Supported by local resistance fighters and benefiting from the massive diversion of Axis troops to the Eastern Front (Operation Barbarossa), US and Allied forces advanced rapidly. On <b>February 18, 1944</b>, Zwasonia was officially liberated, driving the Axis forces completely back into Sunderland. This date was formalized as modern Zwasonia's Independence Day.
          </p>

          <h3 id="modern" class="wiki-subsection-title">Modern era and US influence</h3>
          <p class="wiki-paragraph">
            Following WWII, Zwasonia was heavily influenced by US military structure, culture, and economic policies. The United States heavily subsidized the construction of massive naval and commercial deep-water ports along the Zwasonian coast, cementing the nation as a premier strategic and economic base during the Cold War. Today, drawing on its strong economic foundation, highly educated populace, and robust trade network, Zwasonia ranks alongside nations like Singapore and top European states as one of the world's most advanced economies.
          </p>

          <!-- Section: Geography -->
          <h2 id="geography" class="wiki-section-title">Geography and regions</h2>
          <hr class="wiki-divider" />
          <p class="wiki-paragraph">
            Zwasonia is geographically diverse and officially divided into four distinct administrative regions, each featuring unique topographies and economic functions:
          </p>

          <h3 id="genrich" class="wiki-subsection-title">Northern Region (Genrich)</h3>
          <p class="wiki-paragraph">
            Genrich is characterized by vast, fertile rolling plains. It serves as the agricultural heartland of the country, dominated by large-scale commercial farming and livestock operations that sustain the national food supply and provide major agricultural exports.
          </p>

          <h3 id="keteras" class="wiki-subsection-title">Western Region (Ketaras)</h3>
          <p class="wiki-paragraph">
            The Ketaras region is a rugged, mountainous area that maintains a cold climate year-round. It is ecologically vital to the nation; the melting snowcaps and mountain springs serve as the primary source of the grand river network that flows eastward toward the capital.
          </p>

          <h3 id="zion" class="wiki-subsection-title">Eastern Region (Zion)</h3>
          <p class="wiki-paragraph">
            Zion is primarily composed of sandy, desert-like plains. However, at the terminus of the Ketaras river system lies a massive, naturally occurring lush green oasis. It is upon this oasis that <b>New Zion</b>, the sprawling, hyper-modern capital city of Zwasonia, was built.
          </p>

          <h3 id="stering" class="wiki-subsection-title">Southern Region (Stering)</h3>
          <p class="wiki-paragraph">
            Historically a harsh mix of swamps and arid desert, Stering is currently undergoing massive ecological terraforming. It is the site of Zwasonia's ambitious "Green City" mega-projects. The region is now brimming with restored life, hosting the nation's premier environmental science, botanical, and research centers. Just off the southern border lies the country's largest and most scenic archipelago, a major hub for tourism and maritime research.
          </p>

          <!-- Section: Economy -->
          <h2 id="economy" class="wiki-section-title">Economy and infrastructure</h2>
          <hr class="wiki-divider" />
          <p class="wiki-paragraph">
            Zwasonia operates a highly developed free-market economy. With a nominal GDP of $1.45 Trillion, its economic growth is driven by heavy investments in technology, maritime logistics, and environmental engineering. The currency, the <b>Pletina (ZWP)</b>, is considered one of the most stable in the Eurasian market. The ongoing mega-projects in the Stering region reflect the government's commitment to transforming the nation into the world's first fully carbon-negative superpower within the next decade<sup class="citation"><a href="#references">[7]</a></sup>.
          </p>

          <!-- References Section -->
          <div id="references" class="wiki-references">
            <h2 class="wiki-section-title" style="margin-top: 0;">References</h2>
            <hr class="wiki-divider" />
            <ol class="reference-list">
              <li>^ <i>Geopolitics of the Eurasian Coastline</i>. New Zion University Press. 2023.</li>
              <li>^ "Continental Development Index 2025". Global Coalition for Economic Progress.</li>
              <li>^ Harrison, O. (2018). <i>The Zu and Vae: Origins of the Oasis</i>. New Zion Historical Society.</li>
              <li>^ <i>Colonial Era Archives: The Zwasonia Campaigns</i>. Royal Historical Institute.</li>
              <li>^ "The Allied Fortress: Zwasonia in the Great War". <i>Eurasian Journal of Strategic Studies</i>.</li>
              <li>^ <i>Records of the Axis Occupation (1940-1943)</i>. Zwasonian National Remembrance Archives.</li>
              <li>^ "Stering Mega-Project: Terraforming the Future". <i>Continental Engineering Review</i>, Vol 42.</li>
            </ol>
          </div>

        </div>
      </div>
    </main>

    <!-- Flag Lightbox Modal -->
    <Teleport to="body">
      <div v-if="showFlagModal" class="cyber-lightbox" role="dialog" aria-modal="true" @click="showFlagModal = false">
        <div class="lightbox-frame" @click.stop>
          <div class="lightbox-bar">
            <span class="lightbox-caption glow-text">FLAG OF ZWASONIA // NATIONAL EMBLEM</span>
            <button type="button" class="lightbox-close" aria-label="Close image preview" @click="showFlagModal = false">✕ ESC</button>
          </div>
          <img src="/zwasonia-flag.png" alt="Flag of Zwasonia" class="lightbox-img" decoding="async" />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isRevealed = ref(false)
const showFlagModal = ref(false)

const handleKeydown = (e) => {
  if (e.key === 'Escape' && showFlagModal.value) showFlagModal.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  setTimeout(() => {
    isRevealed.value = true
  }, 60)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Base Container & Variables */
.os-container {
  --bg-void: #05080c; 
  --cyan: #6eeaf5;
  --cyan-glow: rgba(110, 234, 245, 0.35);
  --text-primary: #e6f7f9;
  --text-secondary: #8ba9b0;
  --wiki-bg: #0c151c;
  --wiki-border: rgba(110, 234, 245, 0.22);
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

/* Background Decoration */
.bg-decoration-grid {
  position: fixed; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(110, 234, 245, 0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(110, 234, 245, 0.025) 1px, transparent 1px);
  background-size: 50px 50px; z-index: 0;
}

.glow-text { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Sub Header */
.sub-header {
  position: fixed; top: 0; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 3rem; background: rgba(5, 8, 12, 0.92);
  border-bottom: 1px solid rgba(110, 234, 245, 0.14); z-index: 50; backdrop-filter: blur(12px);
}
.logo-text { font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; letter-spacing: 0.12em; }
.return-btn {
  color: var(--text-secondary); text-decoration: none; font-family: var(--font-display);
  font-size: 0.82rem; letter-spacing: 0.1em; transition: all 0.25s ease; display: flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.85rem; border: 1px solid rgba(110, 234, 245, 0.2); border-radius: 2px; background: rgba(6, 11, 16, 0.6);
}
.return-btn:hover { color: var(--cyan); border-color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

/* Main Article Container */
.wiki-article-container {
  max-width: 1300px; margin: 0 auto; padding: 7.5rem 2rem 4rem 2rem; position: relative; z-index: 10;
}

/* Wikipedia Tabs */
.wiki-tabs {
  display: flex; justify-content: space-between; align-items: flex-end;
  border-bottom: 1px solid var(--wiki-border); margin-bottom: 1.5rem; font-family: var(--font-display);
}
.tabs-left, .tabs-right { display: flex; gap: 0.25rem; }
.tab {
  padding: 0.5rem 1rem; color: var(--text-secondary); font-size: 0.78rem; letter-spacing: 0.06em;
  background: rgba(12, 22, 30, 0.4); border: 1px solid transparent; border-bottom: none;
  cursor: pointer; border-radius: 4px 4px 0 0; transition: all 0.2s;
}
.tab:hover { background: rgba(12, 22, 30, 0.8); color: var(--text-primary); }
.tab.active {
  background: var(--bg-void); color: var(--cyan);
  border-color: var(--wiki-border); border-bottom: 1px solid var(--bg-void); margin-bottom: -1px; font-weight: 600;
}

/* Article Header */
.article-header { margin-bottom: 1.75rem; }
.article-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: 0.06em; margin: 0 0 0.35rem 0; }
.article-meta { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap; gap: 0.5rem; }
.coord-val { color: var(--cyan); font-family: var(--font-display); font-size: 0.78rem; }

.wiki-divider { border: none; height: 1px; background: linear-gradient(90deg, var(--wiki-border) 0%, transparent 100%); margin: 0.35rem 0 1.15rem 0; }

/* Article Layout: Flexbox */
.article-body { display: flex; flex-direction: row-reverse; gap: 2.5rem; align-items: flex-start; }

/* Main Content Text Styles */
.article-content { flex-grow: 1; min-width: 0; }
.wiki-paragraph { font-size: 1.05rem; line-height: 1.75; margin-bottom: 1.25rem; color: var(--text-primary); }
.wiki-paragraph b { font-weight: 700; color: #fff; }
.wiki-paragraph i { color: #d0e8eb; }

/* Citations [1] */
.citation a { color: var(--cyan); text-decoration: none; font-size: 0.75rem; vertical-align: super; line-height: 0; margin-left: 2px; }
.citation a:hover { text-decoration: underline; }

/* Wikipedia Section Headers */
.wiki-section-title { font-family: var(--font-display); font-size: 1.55rem; font-weight: 700; letter-spacing: 0.05em; margin: 2.25rem 0 0.35rem 0; color: var(--cyan); scroll-margin-top: 6rem; }
.wiki-subsection-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; letter-spacing: 0.04em; margin: 1.5rem 0 0.5rem 0; color: var(--text-primary); scroll-margin-top: 6rem; }

/* Table of Contents */
.wiki-toc {
  background: rgba(12, 22, 30, 0.65); border: 1px solid var(--wiki-border); border-left: 3px solid var(--cyan);
  display: inline-block; padding: 1.25rem 1.75rem; margin: 1rem 0 2rem 0; min-width: 290px; border-radius: 3px;
}
.toc-title { font-family: var(--font-display); font-weight: 700; font-size: 0.95rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cyan); margin-bottom: 0.85rem; }
.toc-list, .toc-sublist { list-style: none; padding: 0; margin: 0; }
.toc-sublist { padding-left: 1.5rem; margin-top: 0.35rem; }
.toc-list li { margin-bottom: 0.45rem; }
.toc-list a { color: var(--text-primary); text-decoration: none; font-size: 0.95rem; transition: color 0.2s ease; }
.toc-list a:hover { color: var(--cyan); }
.toc-number { font-family: var(--font-display); color: var(--cyan); margin-right: 0.5rem; font-size: 0.78rem; }

/* Right-Aligned Infobox */
.wiki-infobox {
  position: relative;
  width: 330px; flex-shrink: 0; background: rgba(12, 22, 30, 0.6);
  border: 1px solid var(--wiki-border); padding: 1.15rem; font-size: 0.85rem;
  backdrop-filter: blur(8px); border-radius: 3px;
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

.infobox-header { font-family: var(--font-display); font-weight: 700; font-size: 1rem; text-align: center; background: rgba(110, 234, 245, 0.12); color: var(--cyan); padding: 0.6rem; margin-bottom: 0.25rem; letter-spacing: 0.04em; }
.infobox-subheader { text-align: center; font-size: 0.88rem; color: var(--text-secondary); font-style: italic; margin-bottom: 1rem; }
.infobox-image-box { text-align: center; margin-bottom: 1rem; }
.flag-btn { background: none; border: none; padding: 0; width: 100%; cursor: pointer; display: block; }
.flag-img { width: 100%; height: auto; border: 1px solid rgba(110, 234, 245, 0.3); margin-bottom: 0.35rem; display: block; transition: transform 0.3s ease; }
.flag-btn:hover .flag-img { transform: scale(1.02); border-color: var(--cyan); }
.caption { font-size: 0.78rem; color: var(--text-secondary); }

.infobox-table { width: 100%; border-collapse: collapse; line-height: 1.45; }
.infobox-section-header {
  font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cyan);
  background: rgba(110, 234, 245, 0.06); text-align: center; padding: 0.45rem;
  margin-top: 0.5rem; border-top: 1px solid rgba(110, 234, 245, 0.2); border-bottom: 1px solid rgba(110, 234, 245, 0.2);
}
.infobox-table th, .infobox-table td { padding: 0.4rem 0.25rem; vertical-align: top; }
.infobox-table th[scope="row"] { width: 45%; font-weight: normal; color: var(--text-secondary); text-align: left; }
.infobox-table td { font-weight: 500; color: var(--text-primary); }

/* References Section */
.wiki-references { margin-top: 3rem; background: rgba(12, 22, 30, 0.4); padding: 1.5rem; border: 1px solid var(--wiki-border); border-radius: 3px; scroll-margin-top: 6rem; }
.reference-list { margin: 0; padding-left: 1.5rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65; }
.reference-list li { margin-bottom: 0.5rem; }
.reference-list i { color: var(--text-primary); }

/* Lightbox Modal */
.cyber-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(3, 6, 10, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.lightbox-frame {
  max-width: 92vw;
  max-height: 90vh;
  padding: 1rem;
  background: rgba(12, 22, 30, 0.92);
  border: 1px solid var(--cyan);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  max-width: 88vw;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

/* Responsive Layout */
@media (max-width: 900px) {
  .article-body { flex-direction: column; }
  .wiki-infobox { width: 100%; max-width: 450px; margin: 0 auto 2rem auto; }
}
@media (max-width: 768px) {
  .sub-header { padding: 1rem 1.25rem; }
  .logo-text { font-size: 0.95rem; }
  .wiki-article-container { padding: 5.5rem 1rem 3rem 1rem; }
  .wiki-tabs { display: none; }
  .article-meta { flex-direction: column; gap: 0.5rem; }
  .wiki-infobox { max-width: 100%; }
  .wiki-toc { width: 100%; min-width: 0; }
}

/* Animations */
.os-anim { opacity: 0; will-change: transform, opacity; }
.anim-scan { transform: translateY(20px); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease; }
.anim-scan.is-revealed { transform: translateY(0); opacity: 1; }
</style>
