#!/usr/bin/env node
// Migration scaffold: read existing src/data/heros.js and produce CMS-compatible JSON
// Run locally and adapt to your CMS import format.
const fs = require('fs');
const path = require('path');

const HEROS = path.resolve(process.cwd(), 'src/data/heros.js');
const OUT = path.resolve(process.cwd(), 'tmp/hero-media-migration.json');

if (!fs.existsSync(HEROS)) {
  console.error('src/data/heros.js not found, aborting');
  process.exit(1);
}

const content = fs.readFileSync(HEROS, 'utf8');
const urls = [...content.matchAll(/https?:\/\/[^'\"\)\s]+/g)].map(m => m[0]);

const entries = [];
const keys = ['proyectos','promotores','inversores','alfa-hunters','alfaHunters'];
keys.forEach(k => {
  const regex = new RegExp(`${k}\\s*:\s*\\[([^\\]]*)\\]`,`i`);
  const match = content.match(regex);
  if (!match) return;
  const block = match[1];
  const found = [...block.matchAll(/https?:\\/\\/[^'\"\)\s]+/g)].map(m => m[0]);
  if (found.length === 0) return;
  entries.push({
    slug: k,
    type: 'video',
    url: found[0],
    poster: `/assets/heros/${k}-poster.jpg`,
    title: k,
    attribution: '',
    license: '',
    variants: [],
  });
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(entries, null, 2));
console.log('Wrote migration file to', OUT);
