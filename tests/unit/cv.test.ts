import { describe, expect, it } from 'vitest';
import { cv } from '../../cv/cv-data';
import { renderCvHtml } from '../../cv/render';

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

describe('renderCvHtml', () => {
  for (const locale of ['fr', 'en'] as const) {
    const content = cv[locale];
    const html = renderCvHtml(content, locale);
    const text = html.replace(/<[^>]+>/g, ' ');

    it(`${locale}: lists sections in ATS reading order`, () => {
      const headings = [...html.matchAll(/<h2>([^<]+)<\/h2>/g)].map((m) => m[1]);
      const { sections: s } = content;
      expect(headings).toEqual([s.profile, s.skills, s.experience, s.projects, s.education, s.languages, s.strengths]);
    });

    it(`${locale}: keeps the name and contact details as plain text`, () => {
      expect(text).toContain('Sailor Vanbercy');
      expect(text).toContain('sailorvanbercy2005@gmail.com');
      expect(text).toContain('linkedin.com/in/sailor-vanbercy-141241398');
    });

    it(`${locale}: sets the document language and title`, () => {
      expect(html).toContain(`<html lang="${locale}">`);
      expect(html).toContain(`<title>${content.documentTitle}</title>`);
    });

    it(`${locale}: avoids ATS-hostile markup (tables, columns, emoji, letter-spaced headings)`, () => {
      expect(html).not.toMatch(/<table|column-count|grid-template-columns/);
      expect(html).not.toMatch(EMOJI);
      expect(text).not.toMatch(/\b[A-ZÀ-Ý] [A-ZÀ-Ý] [A-ZÀ-Ý] /);
    });
  }

  it('escapes HTML special characters from data', () => {
    const html = renderCvHtml({ ...cv.en, profile: 'C# & <script>' }, 'en');
    expect(html).toContain('C# &amp; &lt;script&gt;');
  });
});

describe('French typography', () => {
  it('uses a non-breaking space before high punctuation so a colon never starts a line', () => {
    const html = renderCvHtml({ ...cv.fr, profile: 'Un workflow rigoureux : tests ; revue !' }, 'fr');
    expect(html).toContain('rigoureux : tests ; revue !');
  });
});
