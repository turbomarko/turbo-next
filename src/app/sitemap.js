const URL = "https://example.com";
 
export default async function sitemap() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SSR_API_URL}/events/map/`);
  const eventJson = await res.json();
  const events = eventJson.map(({ slug, updatedAt }) => ({
    url: `${URL}/e/${slug}`,
    lastModified: updatedAt,
  }));

  const routes = ["", "/welcome", "/about"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes, ...events];
}
