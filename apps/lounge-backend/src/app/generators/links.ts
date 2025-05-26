import axios from 'axios';
import { JSDOM } from 'jsdom';
import { SectionItem } from '@repo/api-schema/links';
import { generateAdditionalLinks } from './links.additional.js';

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/';

async function buildSections(collected: Element[]): Promise<SectionItem[]> {
  const sections: SectionItem[] = [];
  let currentSection: SectionItem = {
    title: 'Главное',
    links: [],
  };

  sections.push(currentSection);

  const additional = await generateAdditionalLinks();

  if (additional) {
    sections.push({
      title: 'Студенческие организации',
      links: additional,
    });
  }

  for (const el of collected) {
    if (el.tagName.toLowerCase() === 'h3') {
      currentSection = {
        title: el.textContent?.trim() ?? 'Главное',
        links: [],
      };
      sections.push(currentSection);
    } else if (el.tagName.toLowerCase() === 'a') {
      let href = el.getAttribute('href');

      if (!href) {
        break;
      }

      if (!href.includes('http')) {
        href = BASE_URL + href;
      }

      currentSection.links!.push({
        text: el.textContent?.trim() || '',
        href: href,
      });
    }
  }

  return sections.filter((section) => section.links.length > 0);
}

export async function generateLinks() {
  const data = await axios.get(BASE_URL);
  const dom = new JSDOM(data.data);

  const collected: Element[] = [];

  // Ссылки внутри заголовков
  dom.window.document
    .querySelectorAll('#content h3 a')
    .forEach((ch: Element) => {
      collected.push(ch);
    });

  // Далее уже заголовки + ссылки рядом
  dom.window.document
    .querySelectorAll('#content h3, #content ul a')
    .forEach((ch: Element) => {
      if (ch.children.length === 0) {
        collected.push(ch);
      }
    });

  const sections = await buildSections(collected);

  return sections;
}
