import { BASE_URL } from "../config";

export const startCrawl = async (seedUrls) => {
  const response = await fetch(`${BASE_URL}/api/crawl/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seed_urls: seedUrls }),
  });
  if (!response.ok) throw new Error("Failed to start crawl");
  return response.json();
};

export const searchWords = async (query) => {
  const response = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search words");
  return response.json();
};

export const getTopWords = async (limit = 50) => {
  const response = await fetch(`${BASE_URL}/api/words/top?limit=${limit}`);
  if (!response.ok) throw new Error("Failed to get top words");
  return response.json();
};

export const getDomains = async () => {
  const response = await fetch(`${BASE_URL}/api/domains`);
  if (!response.ok) throw new Error("Failed to get domains");
  return response.json();
};

export const getWordPostings = async (word) => {
  const response = await fetch(`${BASE_URL}/api/word/postings?word=${encodeURIComponent(word)}`);
  if (!response.ok) throw new Error("Failed to get word postings");
  return response.json();
};

export const getWordByDomain = async (word) => {
  const response = await fetch(`${BASE_URL}/api/word/domains?word=${encodeURIComponent(word)}`);
  if (!response.ok) throw new Error("Failed to get word by domain");
  return response.json();
};
