   export async function onRequest() {
     const r = await fetch("https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt",
       { cf: { cacheTtl: 300 } });
     return new Response(r.body, {
       status: r.status,
       headers: { "content-type": "text/plain", "cache-control": "max-age=300" },
     });
   }
