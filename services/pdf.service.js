import puppeteer from 'puppeteer';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderList(items = []) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function renderCvHtml(cv) {
  const experiences = (cv.experiences || [])
    .map(
      (experience) => `
        <section class="experience">
          <div class="experience-header">
            <h3>${escapeHtml(experience.role)}</h3>
            <span>${escapeHtml(experience.period)}</span>
          </div>
          <p>${escapeHtml(experience.company)}</p>
          <ul>${renderList(experience.details)}</ul>
        </section>
      `,
    )
    .join('');

  return `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 40px;
            color: #1f2937;
            font-family: Arial, sans-serif;
            line-height: 1.45;
          }
          .page {
            max-width: 760px;
            margin: 0 auto;
          }
          header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 18px;
            margin-bottom: 24px;
          }
          h1 {
            margin: 0;
            color: #111827;
            font-size: 34px;
          }
          h2 {
            margin: 28px 0 10px;
            color: #2563eb;
            font-size: 18px;
            text-transform: uppercase;
          }
          h3 {
            margin: 0;
            font-size: 16px;
          }
          .title {
            margin: 6px 0 10px;
            color: #4b5563;
            font-size: 18px;
          }
          .contact {
            color: #4b5563;
            font-size: 14px;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 0;
            list-style: none;
          }
          .skills li {
            border: 1px solid #bfdbfe;
            border-radius: 999px;
            padding: 6px 10px;
            color: #1e40af;
            background: #eff6ff;
            font-size: 13px;
          }
          .experience {
            margin-bottom: 18px;
          }
          .experience-header {
            display: flex;
            justify-content: space-between;
            gap: 16px;
          }
          .experience-header span {
            color: #6b7280;
            white-space: nowrap;
          }
          .experience p {
            margin: 4px 0 8px;
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <main class="page">
          <header>
            <h1>${escapeHtml(cv.fullName)}</h1>
            <p class="title">${escapeHtml(cv.title)}</p>
            <p class="contact">${escapeHtml(cv.email)} | ${escapeHtml(cv.phone)}</p>
          </header>

          <h2>Profil</h2>
          <p>${escapeHtml(cv.summary)}</p>

          <h2>Competences</h2>
          <ul class="skills">${renderList(cv.skills)}</ul>

          <h2>Experiences</h2>
          ${experiences}
        </main>
      </body>
    </html>
  `;
}

export async function generateCvPdf(cv) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(renderCvHtml(cv), { waitUntil: 'networkidle0' });

    return await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '18mm',
        right: '16mm',
        bottom: '18mm',
        left: '16mm',
      },
    });
  } finally {
    await browser.close();
  }
}
