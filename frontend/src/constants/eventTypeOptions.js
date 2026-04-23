export const EVENT_TYPE_OPTIONS_BY_VENUE_TYPE = {
  'Event Hall': [
    'Wedding',
    'Corporate event',
    'Birthday party',
    'Graduation',
    'Anniversary',
    'Gala / celebration',
    'Other',
  ],
  'Meeting Room': [
    'Team meeting',
    'Client meeting',
    'Board meeting',
    'Training / workshop',
    'Interview',
    'All-hands',
    'Other',
  ],
  'Conference Room': [
    'Conference',
    'Seminar',
    'Product launch',
    'Webinar (on-site)',
    'Training',
    'Other',
  ],
  'Banquet Hall': [
    'Wedding reception',
    'Corporate dinner',
    'Award ceremony',
    'Gala dinner',
    'Private celebration',
    'Other',
  ],
  Outdoor: [
    'Garden wedding',
    'Outdoor party',
    'Company picnic',
    'Festival / fair',
    'Sports / team day',
    'Other',
  ],
};

const FALLBACK = 'Event Hall';

function venueTypesList(venue) {
  if (!venue) return [FALLBACK];
  if (Array.isArray(venue.types) && venue.types.length) {
    return venue.types;
  }
  if (venue.type) return [String(venue.type)];
  return [FALLBACK];
}


export function getEventTypeChipsForVenue(venue) {
  const raw = venueTypesList(venue);
  const known = raw.filter((t) => Object.prototype.hasOwnProperty.call(EVENT_TYPE_OPTIONS_BY_VENUE_TYPE, t));
  const types = known.length ? known : [FALLBACK];

  const seen = new Set();
  const out = [];
  for (const t of types) {
    const list = EVENT_TYPE_OPTIONS_BY_VENUE_TYPE[t] || EVENT_TYPE_OPTIONS_BY_VENUE_TYPE[FALLBACK];
    for (const opt of list) {
      if (!seen.has(opt)) {
        seen.add(opt);
        out.push(opt);
      }
    }
  }
  return out;
}
