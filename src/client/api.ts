import { auth } from './AuthProvider';

type Headers = {
  'Content-Type': 'application/json';
  Authorization?: string;
};

/** Get headers, including the auth header if using authentication. */
async function getHeaders(shouldAuthenticate = false) {
  const headers: Headers = {
    'Content-Type': 'application/json',
  };

  if (!shouldAuthenticate) return headers;

  const user = auth.currentUser;

  if (!user) throw new Error('Not logged in!');

  const token = await user.getIdToken();

  headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** GET requests, optionally using authentication. */
export async function get(url: string, shouldAuthenticate = false) {
  try {
    const headers = await getHeaders(shouldAuthenticate);
    const options = {
      headers,
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.error) throw new Error(json.error);
    return json;
  } catch (e: any) {
    throw new Error(`Unable to GET ${url}: ${e.message}`);
  }
}

/** POST requests, optionally using authentication. */
export async function post(
  url: string,
  data: Record<string, any>,
  shouldAuthenticate = false,
) {
  try {
    const headers = await getHeaders(shouldAuthenticate);
    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.error) throw new Error(json.error);
    return json;
  } catch (e: any) {
    throw new Error(`Unable to POST ${url}: ${e.message}`);
  }
}

/** PATCH requests, optionally using authentication. */
export async function patch(
  url: string,
  data: Record<string, any>,
  shouldAuthenticate = false,
) {
  try {
    const headers = await getHeaders(shouldAuthenticate);
    const options = {
      headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.error) throw new Error(json.error);
    return json;
  } catch (e: any) {
    throw new Error(`Unable to PATCH ${url}: ${e.message}`);
  }
}

/** DELETE requests, optionally using authentication. */
export async function remove(url: string, shouldAuthenticate = false) {
  try {
    const headers = await getHeaders(shouldAuthenticate);
    const options = {
      headers,
      method: 'DELETE',
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.error) throw new Error(json.error);
    return json;
  } catch (e: any) {
    throw new Error(`Unable to DELETE ${url}: ${e.message}`);
  }
}
