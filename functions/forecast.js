// functions/forecast.js — serves an NWS coastal marine forecast from your own site.
// Usage: /forecast?zone=anz234  (Buzzards Bay). Any ANZ zone code works, e.g. anz235 Rhode Island Sound.
export async function onRequest({ request }) {
  const zone = (new URL(request.url).searchParams.get("zone") || "anz234").toLowerCase();
  if (!/^anz\d{3}$/.test(zone)) return new Response("Unknown zone", { status: 400 });
  const r = await fetch(`https://tgftp.nws.noaa.gov/data/forecasts/marine/coastal/an/${zone}.txt`, {
    cf: { cacheTtl: 900 },
    headers: { "User-Agent": "southern-new-england-wind-waves (personal marine conditions site)" },
  });
  return new Response(r.body, {
    status: r.status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "max-age=900" },
  });
}
