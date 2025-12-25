// pages/api/maxnrzblox/MAXHUB/refs/heads/main/loader.js
export default async function handler(req, res) {
  const targetUrl = "https://565680ce-031a-4fdf-8ea6-acb883d17c9c-00-2ca090bn1uq71.pike.replit.dev/api/code"; // Change to your URL

  try {
    // Try to fetch the URL with a short timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const response = await fetch(targetUrl, { signal: controller.signal });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("URL returned non-OK response");
    }

    // If reachable, return URL
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(targetUrl);
  } catch (err) {
    // If offline or error, return offline message
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("⚠️ API may be offline or URL not reachable");
  }
}
