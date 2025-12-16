const API_URL = "http://localhost:3000";

/**
 * Appel API standardisé avec gestion d’erreurs.
 * @param {string} path - ex: "/posts"
 * @param {object} options - method, body, auth
 */
export async function request(path, { method = "GET", body, auth = false } = {}) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send cookie si route ok
  if (auth) config.credentials = "include";

  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${path}`, config);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Erreur HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  return await response.json();
}
