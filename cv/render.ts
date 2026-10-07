import type { Locale } from '../src/lib/i18n';
import type { CvContent, CvEntry } from './cv-data';

// ATS-friendly layout rules: one column, real text, standard headings, DOM order = reading order.
const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NBSP = ' ';

/** Escapes text and applies locale typography (French: no-break space before : ; ! ?). */
const textFor =
  (locale: Locale) =>
  (value: string): string => {
    const escaped = escapeHtml(value);
    return locale === 'fr' ? escaped.replace(/ ([:;!?])/g, `${NBSP}$1`) : escaped;
  };

const STYLES = `
  @page { size: A4; margin: 10mm 13mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'IBM Plex Sans', Arial, sans-serif; font-size: 9pt; line-height: 1.33; color: #182030; }
  header { padding-bottom: 5pt; border-bottom: 1.5pt solid #182030; }
  h1 { font-size: 21pt; line-height: 1.1; font-weight: 600; letter-spacing: -0.01em; }
  .headline { font-size: 11pt; font-weight: 500; color: #2f4bff; margin-top: 1pt; }
  .contact { margin-top: 3pt; color: #3a4456; font-size: 8.5pt; }
  section { margin-top: 6.5pt; }
  h2 { font-size: 10pt; font-weight: 600; border-bottom: 0.6pt solid #c9d0da; padding-bottom: 1pt; margin-bottom: 3pt; }
  h3 { font-size: 9.2pt; font-weight: 600; }
  .org { font-weight: 400; color: #3a4456; }
  .entry + .entry { margin-top: 4pt; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
  .period { white-space: nowrap; color: #3a4456; font-size: 8.5pt; }
  ul { margin: 1.5pt 0 0 11pt; }
  li { margin-top: 1pt; }
  .stack p { margin-top: 1pt; }
  .label { font-weight: 600; }
`;

export function renderCvHtml(content: CvContent, locale: Locale): string {
  const t = textFor(locale);
  const colon = locale === 'fr' ? `${NBSP}:` : ':';
  const section = (title: string, body: string) => `<section><h2>${t(title)}</h2>${body}</section>`;
  const labelled = (label: string, text: string) => `<p><span class="label">${t(label)}${colon}</span> ${t(text)}</p>`;
  const entry = (item: CvEntry) => {
    const org = [item.org, item.place].filter(Boolean).join(', ');
    const bullets = item.bullets.length ? `<ul>${item.bullets.map((b) => `<li>${t(b)}</li>`).join('')}</ul>` : '';
    return `<div class="entry"><div class="entry-head"><h3>${t(item.title)} <span class="org">| ${t(org)}</span></h3><p class="period">${t(item.period)}</p></div>${bullets}</div>`;
  };
  const { sections } = content;

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(content.documentTitle)}</title>
<meta name="author" content="${escapeHtml(content.name)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=block" rel="stylesheet">
<style>${STYLES}</style>
</head>
<body>
<header>
  <h1>${t(content.name)}</h1>
  <p class="headline">${t(content.headline)}</p>
  <p class="contact">${content.contact.map(t).join(' | ')}</p>
</header>
${section(sections.profile, `<p>${t(content.profile)}</p>`)}
${section(sections.skills, `<div class="stack">${content.skills.map((s) => labelled(s.label, s.items)).join('')}</div>`)}
${section(sections.experience, content.experience.map(entry).join(''))}
${section(sections.projects, `<div class="stack">${content.projects.map((p) => labelled(p.name, p.text)).join('')}</div>`)}
${section(sections.education, content.education.map(entry).join(''))}
${section(sections.languages, `<p>${content.languages.map(t).join(' | ')}</p>`)}
${section(sections.strengths, `<p>${t(content.strengths)}</p>`)}
</body>
</html>`;
}
