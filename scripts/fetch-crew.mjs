import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const endpoint = new URL('https://ll.thespacedevs.com/2.3.0/astronauts/');
endpoint.searchParams.set('in_space', 'true');
endpoint.searchParams.set('is_human', 'true');
endpoint.searchParams.set('limit', '100');
endpoint.searchParams.set('mode', 'normal');
endpoint.searchParams.set('ordering', 'name');
const outputPath = resolve('src/data/crew.json');

function durationToDays(duration = '') {
  const match = duration.match(/P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/);
  if (!match) return 0;
  const [, days = 0, hours = 0, minutes = 0, seconds = 0] = match.map(Number);
  return Math.floor(days + hours / 24 + minutes / 1440 + seconds / 86400);
}

function normalize(person) {
  const nation = person.nationality?.[0] ?? {};
  return {
    id: person.id, name: person.name,
    agency: person.agency?.abbrev || 'IND', agencyName: person.agency?.name || 'Independent',
    country: nation.name || 'Earth', countryCode: nation.alpha_2_code || 'UN',
    nationality: nation.nationality_name || 'Earthling',
    image: person.image?.image_url || person.image?.thumbnail_url || '',
    imageCredit: person.image?.credit || person.agency?.abbrev || 'The Space Devs',
    bio: person.bio || 'Currently serving beyond Earth.', age: person.age,
    flights: person.flights_count || 0, spacewalks: person.spacewalks_count || 0,
    daysInSpace: durationToDays(person.time_in_space), firstFlight: person.first_flight,
    lastFlight: person.last_flight, wiki: person.wiki,
  };
}

async function keepSnapshot(error) {
  try {
    const existing = JSON.parse(await readFile(outputPath, 'utf8'));
    if (!Array.isArray(existing.crew) || existing.crew.length === 0) throw new Error('snapshot is empty');
    console.warn(`Crew refresh skipped: ${error.message}. Keeping ${existing.crew.length}-person snapshot from ${existing.retrievedAt}.`);
  } catch { throw error; }
}

try {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json', 'User-Agent': 'whos-up-there/2.0 (+https://astronauts.darrentoner.com)' },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Launch Library 2 returned ${response.status}`);
  const payload = await response.json();
  const crew = payload.results?.filter((person) => person.in_space && person.type?.name !== 'Non-Human').map(normalize);
  if (!Array.isArray(crew) || crew.length === 0) throw new Error('Launch Library 2 returned no human crew');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify({ retrievedAt: new Date().toISOString(), source: 'Launch Library 2', sourceUrl: endpoint.toString(), crew }, null, 2)}\n`);
  console.log(`Crew snapshot updated: ${crew.length} humans currently in space.`);
} catch (error) {
  await keepSnapshot(error);
  process.exitCode = 0;
}
