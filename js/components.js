/* ──────────────────────────────────────────────
   components.js  –  Single source of truth for
   nav, footer, blobs, site data, and dynamic
   content rendering.

   Each page only needs lightweight placeholders:
     <nav id="navbar" data-active="home" data-root="."></nav>
     <div id="site-blobs"></div>
     <footer id="footer"></footer>
     <script src="[root]/js/components.js"></script>

   Dynamic containers (optional, JS fills them):
     <div id="home-timeline"></div>
     <div id="home-projects"></div>
     <div id="home-media"></div>
     <div id="home-blog"></div>
     <div id="home-now"></div>
     <div id="about-work"></div>
     <div id="about-education"></div>
     <div id="about-organizations"></div>
     <div id="about-certifications"></div>
     <div id="projects-grid"></div>
     <div id="blog-list"></div>
     <div id="photos-grid"></div>
     <div id="now-films"></div>
     <div id="now-music"></div>
     <div id="now-tv"></div>
     <div id="now-books"></div>

   data-active  = home | about | projects | media | blog | now
   data-root    = "." (root pages) or ".." (sub-pages)
   ────────────────────────────────────────────── */

(function () {

  /* ═══════════════════════════════════════════════
     SITE-WIDE SETTINGS
     ═══════════════════════════════════════════════ */

  const SITE_NAME = 'Cecilia Aiko Portfolio';
  const FOOTER_TEXT = `&copy; 2026 ${SITE_NAME} &middot; Built with HTML, CSS &amp; JS`;

  const NAV_LINKS = [
    { key: 'home',     href: 'index.html',    label: 'Home' },
    { key: 'about',    href: 'about.html',    label: 'About Me' },
    { key: 'projects', href: 'projects.html', label: 'Projects' },
    { key: 'media',    href: 'photos.html',   label: 'Media' },
    { key: 'blog',     href: 'blog.html',     label: 'Blog' },
    { key: 'now',      href: 'now.html',      label: 'Now' },
  ];

  /* ═══════════════════════════════════════════════
     SITE DATA  –  The "database". Edit here, every
     page that uses these arrays updates automatically.
     ═══════════════════════════════════════════════ */

  const EXPERIENCES = [
    /* ── Work ── */
    { type: 'work', title: 'Software Data Operations Engineer', org: 'MAQ Software', location: 'Bellevue, WA', date: 'Sep 2024 – Present',
      summary: 'Primary liaison between data engineering teams and clients. Managing project workflows through Azure DevOps, overseeing Power BI reporting and SQL Server databases, and leading client meetings with a 95% on-time delivery rate.',
      page: 'experience/pm-developer.html' },

    { type: 'work', title: 'Web Dev & Data Science Research Apprentice', org: 'CoolClimate Network', location: 'Berkeley, CA', date: 'Sep – Dec 2023',
      summary: 'Built API requests to pull census data for greenhouse gas analysis, created interactive data visualizations, and contributed to website design for city planners at UC Berkeley\u2019s CoolClimate Network.',
      page: 'experience/software-developer.html' },

    { type: 'work', title: 'Data Science Intern', org: 'PT. Bank Central Asia', location: 'Jakarta, Indonesia', date: 'May – Aug 2023',
      summary: 'Built interactive dashboards with Qlik Sense, facilitated ETL processes through Informatica, constructed Docker environments, and leveraged NLP techniques for automated customer classification.',
      page: 'experience/intern.html' },

    /* ── Education ── */
    { type: 'education', title: 'Bachelor of Arts, Computer Science', org: 'University of California, Berkeley', location: 'Berkeley, CA', date: 'Aug 2022 – May 2024',
      summary: 'GPA: 3.8. Coursework in algorithms, data structures, data science, operating systems, computer security, and database systems.',
      page: 'experience/uc-berkeley.html' },

    { type: 'education', title: 'Associate of Science, Computer Science', org: 'Shoreline Community College', location: 'Shoreline, WA', date: 'Jun 2020 – Jun 2022',
      summary: 'GPA: 4.0 · President\u2019s List · Graduated with Honors. Coursework in data structures and object-oriented design.',
      page: 'experience/shoreline.html' },

    /* ── Organizations ── */
    { type: 'organization', title: 'CS170 Reader', org: 'UC Berkeley EECS', location: 'Berkeley, CA', date: 'Jan – May 2024',
      summary: 'Graded assignments and exams for Efficient Algorithms and Intractable Problems. Provided detailed written feedback and held office hours.',
      page: 'experience/cs170-reader.html' },

    { type: 'organization', title: 'Content Mentor', org: 'Computer Science Mentors (CSM)', location: 'Berkeley, CA', date: 'Jan – Jun 2023',
      summary: 'Developed and curated comprehensive educational content in the form of LaTeX worksheet exercises for CS courses, ensuring alignment with curriculum objectives.',
      page: 'experience/csm-mentor.html' },

    { type: 'organization', title: 'International Student Leader', org: 'Shoreline Community College', location: 'Shoreline, WA', date: 'May 2021 – Jun 2022',
      summary: 'Ran new student orientations, managed social media platforms, mentored international students, and organized events promoting international acceptance and awareness.',
      page: 'experience/student-leader.html' },
  ];

  const PROJECTS = [
    { title: 'BeMeal', barTitle: 'BeMeal', icon: '\u{1F35D}',
      gradient: 'linear-gradient(135deg, #b5a689, #a39474)',
      tags: ['React Native', 'Firebase', 'Mobile', 'Social App', 'In Progress'],
      summary: 'A food-sharing social app inspired by BeReal. Share daily meal snapshots with friends through push notifications and a real-time social feed.',
      page: 'projects/bemeal.html' },

    { title: 'MediaPlaylistCreator', barTitle: 'MediaPlaylistCreator', icon: '\u{1F3B5}',
      gradient: 'linear-gradient(135deg, #a8b396, #8fa07c)',
      tags: ['Python', 'Streamlit', 'OpenAI', 'Spotify API', 'PostgreSQL', 'In Progress'],
      summary: 'Movie & Song Playlist Recommender using Letterboxd RSS, Spotify API, OpenAI embeddings, PostgreSQL, and a Streamlit dashboard. Fully containerized with Docker.',
      page: 'projects/media-playlist-creator.html' },

    { title: 'Tedstem', barTitle: 'Tedstem', icon: '\u{1F916}',
      gradient: 'linear-gradient(135deg, #9aa88a, #8a9b78)',
      tags: ['TypeScript', 'React', 'Next.js', 'Python', 'Flask', 'AWS Bedrock', 'Docker'],
      summary: 'Enhances student-instructor communication, allowing students to post questions and TAs to receive reports on common confusions to address learning gaps effectively.',
      page: 'projects/tedstem.html' },

    { title: 'World Explorer', barTitle: 'World Explorer', icon: '\u{1F30E}',
      gradient: 'linear-gradient(135deg, #8e9f7e, #7d9168)',
      tags: ['Java', 'Game Dev', 'Procedural Gen'],
      summary: 'A 2D procedurally-generated exploration game built in Java. Features tile-based rendering, seed-based world generation, and save/load functionality.',
      page: 'projects/world-explorer.html' },

    { title: 'CSM 61A Worksheets', barTitle: 'CSM 61A Worksheets', icon: '\u{1F4DA}',
      gradient: 'linear-gradient(135deg, #a3af90, #94a682)',
      tags: ['LaTeX', 'Python', 'CS Education'],
      summary: 'LaTeX worksheets for UC Berkeley\u2019s CS Mentors (CSM) program, covering Python fundamentals, recursion, trees, and linked lists for CS 61A students.',
      page: 'projects/csm-61a.html' },
  ];

  const CERTIFICATIONS = [
    { title: 'Microsoft Certified: Fabric Data Engineer Associate', issuer: 'Microsoft', date: 'Issued May 2025 · Expires May 2026', credentialId: '15D550351659D39B' },
    { title: 'Microsoft Certified: Fabric Analytics Engineer Associate', issuer: 'Microsoft', date: 'Issued Jan 2025 · Expires Jan 2027', credentialId: 'BD5FCBF90FB8B76D' },
  ];

  /* These are intentionally empty for now. Add entries
     here when you're ready and they'll appear everywhere.

     MEDIA_FOLDERS structure:
     [
       { name: 'Folder Name', cover: 'media/folder/cover.jpg', date: 'Mar 2026',
         photos: [
           { src: 'media/folder/img1.jpg', caption: 'Description', date: 'Mar 2026' },
           ...
         ]
       },
     ]
     – Media page shows folders as clickable cards
     – Home page shows the 6 most recent photos across all folders
  */
  const MEDIA_FOLDERS = [];
  const BLOG_POSTS    = [];

  /* ── "Now" page data ──
     Films:  AUTO-FETCHED from Letterboxd (recently watched diary)
     TV:     manually added, card grid with poster / title / season
     Books:  manually added, card grid with cover / title / author
  */

  const LETTERBOXD_USER = 'ckaiko';

  const NOW_TV = [
    // { title: 'Shogun', season: 'Season 1', poster: 'https://...', note: 'Masterpiece' },
  ];
  const NOW_BOOKS = [
    // { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', cover: 'https://...', note: 'Beautiful story' },
  ];

  /* ═══════════════════════════════════════════════
     NAV / FOOTER / BLOBS  (unchanged logic)
     ═══════════════════════════════════════════════ */

  const nav = document.getElementById('navbar');
  const ROOT = nav ? (nav.dataset.root || '.') : '.';
  const ACTIVE = nav ? (nav.dataset.active || '') : '';
  const LETTERBOXD_DATA_URL = ROOT + '/data/letterboxd.json';

  function buildNav(root, activeKey) {
    const links = NAV_LINKS.map(l => {
      const cls = l.key === activeKey ? ' active' : '';
      return `<li><a href="${root}/${l.href}" class="nav-link${cls}">${l.label}</a></li>`;
    }).join('\n      ');

    return `
    <a href="${root}/index.html" class="nav-logo">${SITE_NAME}</a>
    <ul class="nav-links">
      ${links}
    </ul>
    <button class="nav-toggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>`;
  }

  if (nav) nav.innerHTML = buildNav(ROOT, ACTIVE);

  const blobs = document.getElementById('site-blobs');
  if (blobs) {
    blobs.innerHTML = `
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>`;
  }

  /* ── Footer + Back to Home ── */
  const footer = document.getElementById('footer');
  if (footer) {
    let footerHTML = '';
    /* Add "Back to Home" on every non-home page */
    if (ACTIVE && ACTIVE !== 'home') {
      footerHTML += `<div class="back-home-wrap"><a href="${ROOT}/index.html" class="btn btn-secondary">&larr; Back to Home</a></div>`;
    }
    footerHTML += `<p>${FOOTER_TEXT}</p>`;
    footer.innerHTML = footerHTML;
  }

  /* ═══════════════════════════════════════════════
     RENDERING HELPERS
     ═══════════════════════════════════════════════ */

  /** prefix page paths with root so links work from any depth */
  function p(pagePath) { return ROOT + '/' + pagePath; }

  /** Build a timeline item HTML string */
  function timelineItem(exp) {
    return `
      <div class="timeline-item clickable" data-animate="fade-up" onclick="location.href='${p(exp.page)}'">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${exp.date}</span>
          <h3>${exp.title} @ ${exp.org}</h3>
          <p>${exp.summary}</p>
        </div>
      </div>`;
  }

  /** Build a project card HTML string */
  function projectCard(proj) {
    const tags = proj.tags.map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <a href="${p(proj.page)}" class="card window tilt-card clickable" data-animate="fade-up">
        <div class="window-bar">
          <span class="window-dot red"></span>
          <span class="window-dot yellow"></span>
          <span class="window-dot green"></span>
          <span class="window-bar-title">${proj.barTitle}</span>
        </div>
        <div class="card-image" style="background: ${proj.gradient};">
          <span class="card-icon">${proj.icon}</span>
        </div>
        <div class="card-body">
          <h3>${proj.title}</h3>
          <p>${proj.summary}</p>
          <div class="card-tags">${tags}</div>
          <span class="card-link">View details &rarr;</span>
        </div>
      </a>`;
  }

  /** Build a certification item */
  function certItem(cert) {
    return `
      <div class="timeline-item" data-animate="fade-up">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${cert.date}</span>
          <h3>${cert.title}</h3>
          <p>${cert.issuer} &middot; Credential ID: ${cert.credentialId}</p>
        </div>
      </div>`;
  }

  /** "Coming soon" empty-state block */
  function emptyState(message) {
    return `<div class="empty-state" data-animate="fade-up">
      <p class="empty-state-text">${message}</p>
    </div>`;
  }

  /* ── Now page rendering helpers ── */

  /** Film card (supports optional link to Letterboxd) */
  function filmCard(film) {
    const posterSrc = film.poster ? (film.poster.startsWith('http') ? film.poster : ROOT + '/' + film.poster) : '';
    const posterHtml = posterSrc
      ? `<img src="${posterSrc}" alt="${film.title}" loading="lazy">`
      : '';
    const tag = film.link ? 'a' : 'div';
    const linkAttr = film.link ? ` href="${film.link}" target="_blank" rel="noopener"` : '';
    return `
      <${tag}${linkAttr} class="now-card${film.link ? ' now-card--link' : ''}" data-animate="fade-up">
        <div class="now-card-poster">${posterHtml}</div>
        <div class="now-card-body">
          <h4>${film.title}${film.year ? ` <span class="now-year">(${film.year})</span>` : ''}</h4>
          ${film.note ? `<p class="now-note">${film.note}</p>` : ''}
        </div>
      </${tag}>`;
  }

  /* ── Letterboxd JSON fetch (generated by GitHub Action) ── */
  async function fetchLetterboxd() {
    try {
      const res = await fetch(LETTERBOXD_DATA_URL + '?t=' + Date.now());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.films || [];
    } catch (err) {
      console.warn('Letterboxd data fetch failed:', err);
      return [];
    }
  }

  /** TV show card */
  function tvCard(show) {
    const posterStyle = show.poster
      ? `background-image:url('${show.poster}'); background-size:cover; background-position:center;`
      : `background: linear-gradient(135deg, #9aa88a, #8a9b78);`;
    return `
      <div class="now-card" data-animate="fade-up">
        <div class="now-card-poster" style="${posterStyle}"></div>
        <div class="now-card-body">
          <h4>${show.title}</h4>
          ${show.season ? `<span class="now-meta">${show.season}</span>` : ''}
          ${show.note ? `<p class="now-note">${show.note}</p>` : ''}
        </div>
      </div>`;
  }

  /** Book card */
  function bookCard(book) {
    const coverStyle = book.cover
      ? `background-image:url('${book.cover}'); background-size:cover; background-position:center;`
      : `background: linear-gradient(135deg, #8e9f7e, #7d9168);`;
    return `
      <div class="now-card now-card--book" data-animate="fade-up">
        <div class="now-card-poster now-card-poster--book" style="${coverStyle}"></div>
        <div class="now-card-body">
          <h4>${book.title}</h4>
          ${book.author ? `<span class="now-meta">${book.author}</span>` : ''}
          ${book.note ? `<p class="now-note">${book.note}</p>` : ''}
        </div>
      </div>`;
  }

  /** Build a mixed Now preview for home page (async) */
  async function renderHomeNowPreview() {
    const el = document.getElementById('home-now');
    if (!el) return;

    const lbFilms = await fetchLetterboxd();

    const previewItems = [];
    lbFilms.slice(0, 2).forEach(f => previewItems.push(filmCard(f)));
    NOW_TV.slice(0, 1).forEach(s => previewItems.push(tvCard(s)));
    NOW_BOOKS.slice(0, 1).forEach(b => previewItems.push(bookCard(b)));

    el.innerHTML = previewItems.length
      ? `<div class="now-grid">${previewItems.slice(0, 4).join('')}</div>`
      : emptyState('Coming soon — stay tuned!');
  }

  /** Build a media folder card */
  function folderCard(folder, idx) {
    const count = folder.photos.length;
    const coverStyle = folder.cover
      ? `background-image:url('${p(folder.cover)}'); background-size:cover; background-position:center;`
      : `background: linear-gradient(135deg, #a8b396, #8fa07c);`;
    return `
      <a href="${ROOT}/photos.html?folder=${idx}" class="card window tilt-card clickable" data-animate="fade-up">
        <div class="window-bar">
          <span class="window-dot red"></span>
          <span class="window-dot yellow"></span>
          <span class="window-dot green"></span>
          <span class="window-bar-title">${folder.name}</span>
        </div>
        <div class="card-image" style="${coverStyle}">
          <span class="card-icon">\uD83D\uDCC2</span>
        </div>
        <div class="card-body">
          <h3>${folder.name}</h3>
          <p>${count} photo${count !== 1 ? 's' : ''} &middot; ${folder.date}</p>
        </div>
      </a>`;
  }

  /** Build a photo card (for recent-photos grid on home) */
  function photoCard(photo) {
    const imgStyle = photo.src
      ? `background-image:url('${p(photo.src)}'); background-size:cover; background-position:center;`
      : `background: linear-gradient(135deg, #a8b396, #8fa07c);`;
    return `
      <div class="photo-card tilt-card" data-animate="zoom-in">
        <div class="photo-placeholder" style="${imgStyle}"></div>
        <div class="photo-info">
          <p class="photo-caption">${photo.caption || ''}</p>
          <div class="photo-meta">
            <span class="photo-date">${photo.date || ''}</span>
          </div>
        </div>
      </div>`;
  }

  /** Get all photos across folders, sorted newest-first by folder date */
  function allPhotosRecent(limit) {
    const all = [];
    MEDIA_FOLDERS.forEach(f => {
      f.photos.forEach(ph => {
        all.push({ ...ph, _folderDate: f.date });
      });
    });
    /* Photos are already in array order (newest folders listed first),
       so just flatten and slice. */
    return all.slice(0, limit);
  }

  /** Render into a container if it exists */
  function renderInto(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ═══════════════════════════════════════════════
     RENDER DYNAMIC SECTIONS
     (each render only fires if the placeholder exists)
     ═══════════════════════════════════════════════ */

  const work = EXPERIENCES.filter(e => e.type === 'work');
  const edu  = EXPERIENCES.filter(e => e.type === 'education');
  const orgs = EXPERIENCES.filter(e => e.type === 'organization');

  /* ── Home page previews ── */
  renderInto('home-timeline',  `<div class="timeline">${work.slice(0, 2).map(timelineItem).join('')}</div>`);
  renderInto('home-projects',  `<div class="card-grid">${PROJECTS.slice(0, 3).map(projectCard).join('')}</div>`);
  const recentPhotos = allPhotosRecent(6);
  renderInto('home-media', recentPhotos.length
    ? `<div class="photo-grid">${recentPhotos.map(photoCard).join('')}</div>`
    : emptyState('Coming soon — stay tuned!'));
  renderInto('home-blog',      BLOG_POSTS.length ? '' : emptyState('Coming soon — stay tuned!'));

  /* ── Home — Now preview (async) ── */
  renderInto('home-now', '<p class="now-loading">Loading&hellip;</p>');
  renderHomeNowPreview();

  /* ── About page sections ── */
  renderInto('about-work',           `<div class="timeline">${work.map(timelineItem).join('')}</div>`);
  renderInto('about-education',      `<div class="timeline">${edu.map(timelineItem).join('')}</div>`);
  renderInto('about-organizations',  `<div class="timeline">${orgs.map(timelineItem).join('')}</div>`);
  renderInto('about-certifications', `<div class="timeline">${CERTIFICATIONS.map(certItem).join('')}</div>`);

  /* ── Projects page ── */
  renderInto('projects-grid', `<div class="card-grid">${PROJECTS.map(projectCard).join('')}</div>`);

  /* ── Blog page ── */
  renderInto('blog-list',  BLOG_POSTS.length ? '' : emptyState('No blog posts yet — check back soon!'));

  /* ── Media / Photos page ── */
  const folderParam = new URLSearchParams(window.location.search).get('folder');
  if (folderParam !== null && MEDIA_FOLDERS[folderParam]) {
    /* Show single folder's photos */
    const folder = MEDIA_FOLDERS[folderParam];
    renderInto('photos-grid', `
      <a href="photos.html" class="detail-back" style="margin-bottom:1.5rem;display:inline-block;">&larr; All Folders</a>
      <h2 class="section-title" data-animate="fade-up">${folder.name}</h2>
      <div class="photo-grid">${folder.photos.map(photoCard).join('')}</div>`);
  } else {
    /* Show folder grid */
    renderInto('photos-grid', MEDIA_FOLDERS.length
      ? `<div class="card-grid">${MEDIA_FOLDERS.map(folderCard).join('')}</div>`
      : emptyState('No media yet — check back soon!'));
  }

  /* ── Now page sections ── */

  /* Films: fetch from data/letterboxd.json */
  const filmsEl = document.getElementById('now-films');
  if (filmsEl) {
    filmsEl.innerHTML = '<p class="now-loading">Loading films&hellip;</p>';
    fetchLetterboxd().then(films => {
      const recent = films.slice(0, 4);
      filmsEl.innerHTML = recent.length
        ? `<div class="now-grid">${recent.map(filmCard).join('')}</div>
           <p class="now-source">Recently watched on <a href="https://letterboxd.com/${LETTERBOXD_USER}" target="_blank" rel="noopener">Letterboxd&nbsp;&nearr;</a></p>`
        : emptyState('No recent films — check back after I watch something!');
    });
  }

  renderInto('now-tv', NOW_TV.length
    ? `<div class="now-grid">${NOW_TV.map(tvCard).join('')}</div>`
    : emptyState('No TV shows added yet.'));
  renderInto('now-books', NOW_BOOKS.length
    ? `<div class="now-grid">${NOW_BOOKS.map(bookCard).join('')}</div>`
    : emptyState('No books added yet.'));

})();
