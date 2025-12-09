const API_URL = "http://localhost:3000"; // à adapter à votre back

export async function request(path, options = {}) {
  const {
    method = "GET",
    body = null,
    auth = true, // si true give cookies
  } = options;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: auth ? "include" : "omit",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Erreur ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;

  return res.json();
}
