<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | WeddingPlanningChecklists.org</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
        <style type="text/css">
          :root {
            --primary: #B76E79;
            --primary-dark: #9e5b65;
            --primary-light: #FCECF0;
            --gold: #D4AF37;
            --dark: #1A1A1A;
            --slate-500: #64748B;
            --slate-100: #F1F5F9;
            --border: #F3E8EA;
            --radius-lg: 24px;
            --radius-md: 16px;
            --radius-sm: 10px;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #FAFAFA;
            color: var(--dark);
            line-height: 1.5;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }

          /* Header & Hero */
          .site-header {
            background: linear-gradient(180deg, #FCECF0 0%, #FFFFFF 100%);
            border-bottom: 1px solid var(--border);
            padding: 40px 24px 30px;
            position: relative;
            overflow: hidden;
          }

          .header-glow {
            position: absolute;
            top: -60px;
            right: -60px;
            width: 260px;
            height: 260px;
            background: radial-gradient(circle, rgba(183, 110, 121, 0.18) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }

          .container {
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .brand-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
          }

          .logo-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: var(--dark);
          }

          .logo-icon {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Playfair Display', serif;
            font-weight: 800;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(183, 110, 121, 0.25);
          }

          .brand-name {
            font-weight: 800;
            font-size: 16px;
            letter-spacing: -0.02em;
          }

          .brand-name span {
            color: var(--primary);
          }

          .home-link {
            font-size: 12px;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            background: #fff;
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid var(--border);
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .home-link:hover {
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
            transform: translateY(-1px);
          }

          .hero-text {
            text-align: center;
            max-width: 720px;
            margin: 0 auto 30px;
          }

          .badge-label {
            display: inline-block;
            background: var(--primary-light);
            color: var(--primary);
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            padding: 5px 14px;
            border-radius: 30px;
            margin-bottom: 12px;
          }

          h1 {
            font-family: 'Playfair Display', serif;
            font-size: 38px;
            font-weight: 800;
            color: var(--dark);
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }

          h1 span {
            color: var(--primary);
          }

          .hero-subtitle {
            font-size: 14px;
            color: var(--slate-500);
            line-height: 1.6;
          }

          /* Stat Cards */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin: -20px auto 36px;
          }

          .stat-card {
            background: #FFFFFF;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 20px 24px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
            display: flex;
            align-items: center;
            gap: 16px;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(183, 110, 121, 0.08);
          }

          .stat-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--primary-light);
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
          }

          .stat-info .stat-num {
            font-size: 22px;
            font-weight: 800;
            color: var(--dark);
            line-height: 1.1;
          }

          .stat-info .stat-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--slate-500);
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-top: 4px;
          }

          /* Filter & Controls Bar */
          .controls-card {
            background: #FFFFFF;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 16px 20px;
            margin-bottom: 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          }

          .search-box {
            position: relative;
            flex: 1;
            min-width: 260px;
          }

          .search-box input {
            width: 100%;
            padding: 11px 16px 11px 40px;
            border: 1px solid var(--border);
            border-radius: 12px;
            font-size: 13px;
            font-family: inherit;
            outline: none;
            background: #FAFAFA;
            transition: all 0.2s;
          }

          .search-box input:focus {
            background: #fff;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.15);
          }

          .search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            color: var(--slate-500);
            pointer-events: none;
          }

          .filter-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .filter-btn {
            background: #FAFAFA;
            border: 1px solid var(--border);
            padding: 8px 14px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 700;
            color: var(--slate-500);
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
          }

          .filter-btn:hover {
            background: var(--slate-100);
            color: var(--dark);
          }

          .filter-btn.active {
            background: var(--primary);
            color: #FFFFFF;
            border-color: var(--primary);
            box-shadow: 0 2px 8px rgba(183, 110, 121, 0.25);
          }

          /* Table Styling */
          .table-wrapper {
            background: #FFFFFF;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            margin-bottom: 40px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }

          thead {
            background: linear-gradient(90deg, #FCECF0 0%, #FFFFFF 100%);
            border-bottom: 1px solid var(--border);
          }

          th {
            padding: 16px 20px;
            font-weight: 800;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--dark);
          }

          tbody tr {
            border-bottom: 1px solid #F8FAFC;
            transition: background 0.15s;
          }

          tbody tr:hover {
            background-color: #FFF8F9;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          td {
            padding: 16px 20px;
            vertical-align: middle;
          }

          .url-cell {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .url-icon {
            font-size: 16px;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: #F8FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .url-link {
            color: var(--dark);
            font-weight: 600;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.15s;
          }

          .url-link:hover {
            color: var(--primary);
            text-decoration: underline;
          }

          .url-path {
            font-size: 11px;
            color: var(--slate-500);
            display: block;
            margin-top: 2px;
          }

          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }

          .badge-tool {
            background: #EFF6FF;
            color: #2563EB;
          }

          .badge-checklist {
            background: #FCECF0;
            color: #B76E79;
          }

          .badge-blog {
            background: #FEF3C7;
            color: #D97706;
          }

          .badge-core {
            background: #F1F5F9;
            color: #475569;
          }

          .priority-meter {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .priority-bar-bg {
            width: 60px;
            height: 6px;
            background: #E2E8F0;
            border-radius: 4px;
            overflow: hidden;
          }

          .priority-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary) 0%, var(--gold) 100%);
            border-radius: 4px;
          }

          .priority-val {
            font-weight: 700;
            font-size: 12px;
            color: var(--dark);
          }

          /* Footer */
          .site-footer {
            text-align: center;
            padding: 30px 20px 40px;
            border-top: 1px solid var(--border);
            background: #FFFFFF;
            font-size: 12px;
            color: var(--slate-500);
          }

          .site-footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 700;
          }

          .site-footer a:hover {
            text-decoration: underline;
          }

          /* Responsive */
          @media (max-width: 768px) {
            h1 { font-size: 28px; }
            .hero-subtitle { font-size: 13px; }
            th:nth-child(3), td:nth-child(3),
            th:nth-child(4), td:nth-child(4) {
              display: none;
            }
            .stat-card { padding: 16px; }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <header class="site-header">
          <div class="header-glow"></div>
          <div class="container">
            <div class="brand-row">
              <a href="https://www.weddingplanningchecklists.org/" class="logo-badge">
                <div class="logo-icon">W</div>
                <div class="brand-name">Wedding Planning <span>Checklists</span></div>
              </a>
              <a href="https://www.weddingplanningchecklists.org/" class="home-link">
                <span>← Back to Website</span>
              </a>
            </div>

            <div class="hero-text">
              <span class="badge-label">⚡ Search Index Dashboard</span>
              <h1>Interactive XML <span>Sitemap</span></h1>
              <p class="hero-subtitle">
                Comprehensive index of all published planning tools, wedding checklists, timeline guides, and core resources for search engines and couples.
              </p>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="container">
          <!-- Summary KPI Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🌐</div>
              <div class="stat-info">
                <div class="stat-num" id="total-count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                <div class="stat-title">Indexed URLs</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">🛠️</div>
              <div class="stat-info">
                <div class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tools/')])"/></div>
                <div class="stat-title">Interactive Tools</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">📋</div>
              <div class="stat-info">
                <div class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/checklists/')])"/></div>
                <div class="stat-title">Checklists</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">📖</div>
              <div class="stat-info">
                <div class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')])"/></div>
                <div class="stat-title">Guides &amp; Articles</div>
              </div>
            </div>
          </div>

          <!-- Filter & Controls -->
          <div class="controls-card">
            <div class="search-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="sitemap-search" placeholder="Search URLs by name, slug or keyword..." onkeyup="filterSitemap()"/>
            </div>
            <div class="filter-tabs">
              <button class="filter-btn active" onclick="setCategory('all', this)">All URLs</button>
              <button class="filter-btn" onclick="setCategory('tools', this)">🛠️ Tools</button>
              <button class="filter-btn" onclick="setCategory('checklists', this)">📋 Checklists</button>
              <button class="filter-btn" onclick="setCategory('blog', this)">📖 Blog Guides</button>
              <button class="filter-btn" onclick="setCategory('core', this)">🌟 Core Pages</button>
            </div>
          </div>

          <!-- URL Table -->
          <div class="table-wrapper">
            <table id="sitemap-table">
              <thead>
                <tr>
                  <th style="width: 55%;">Page Location &amp; Title</th>
                  <th style="width: 15%;">Category</th>
                  <th style="width: 15%;">Change Frequency</th>
                  <th style="width: 15%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:variable name="itemUrl" select="sitemap:loc"/>
                  <xsl:variable name="itemCategory">
                    <xsl:choose>
                      <xsl:when test="contains($itemUrl, '/tools/')">tools</xsl:when>
                      <xsl:when test="contains($itemUrl, '/checklists/')">checklists</xsl:when>
                      <xsl:when test="contains($itemUrl, '/blog/')">blog</xsl:when>
                      <xsl:otherwise>core</xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>

                  <tr data-url="{$itemUrl}" data-category="{$itemCategory}">
                    <td>
                      <div class="url-cell">
                        <div class="url-icon">
                          <xsl:choose>
                            <xsl:when test="$itemCategory = 'tools'">🛠️</xsl:when>
                            <xsl:when test="$itemCategory = 'checklists'">📋</xsl:when>
                            <xsl:when test="$itemCategory = 'blog'">📖</xsl:when>
                            <xsl:otherwise>🌟</xsl:otherwise>
                          </xsl:choose>
                        </div>
                        <div>
                          <a href="{$itemUrl}" class="url-link" target="_blank">
                            <xsl:value-of select="$itemUrl"/>
                          </a>
                        </div>
                      </div>
                    </td>

                    <td>
                      <xsl:choose>
                        <xsl:when test="$itemCategory = 'tools'">
                          <span class="badge badge-tool">Planning Tool</span>
                        </xsl:when>
                        <xsl:when test="$itemCategory = 'checklists'">
                          <span class="badge badge-checklist">Checklist</span>
                        </xsl:when>
                        <xsl:when test="$itemCategory = 'blog'">
                          <span class="badge badge-blog">Blog Guide</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-core">Core Page</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>

                    <td style="color: var(--slate-500); font-weight: 600; text-transform: capitalize;">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>

                    <td>
                      <div class="priority-meter">
                        <div class="priority-bar-bg">
                          <div class="priority-bar-fill">
                            <xsl:attribute name="style">
                              <xsl:value-of select="concat('width: ', number(sitemap:priority) * 100, '%')"/>
                            </xsl:attribute>
                          </div>
                        </div>
                        <span class="priority-val">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </div>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>

        <!-- Footer -->
        <footer class="site-footer">
          <p>© 2026 <a href="https://www.weddingplanningchecklists.org/">WeddingPlanningChecklists.org</a>. All rights reserved. Generated automatically for search crawlers and site visitors.</p>
        </footer>

        <!-- Interactive Script for Live Search and Tab Filtering -->
        <script type="text/javascript">
          <![CDATA[
          let activeCategory = 'all';

          function setCategory(cat, btn) {
            activeCategory = cat;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            filterSitemap();
          }

          function filterSitemap() {
            const query = document.getElementById('sitemap-search').value.toLowerCase();
            const rows = document.querySelectorAll('#sitemap-table tbody tr');
            let visibleCount = 0;

            rows.forEach(row => {
              const url = row.getAttribute('data-url').toLowerCase();
              const category = row.getAttribute('data-category');
              const matchesSearch = url.includes(query);
              const matchesCategory = activeCategory === 'all' || category === activeCategory;

              if (matchesSearch && matchesCategory) {
                row.style.display = '';
                visibleCount++;
              } else {
                row.style.display = 'none';
              }
            });

            const countEl = document.getElementById('total-count');
            if (countEl && query !== '') {
              countEl.innerText = visibleCount;
            }
          }
          ]]>
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
