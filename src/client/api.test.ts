import { describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import { get, patch, post, remove } from './api';

vi.mock('./AuthProvider', () => ({
  auth: {
    currentUser: {
      getIdToken: async () => 'abc123',
    },
  },
}));

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

function latestRequest() {
  return fetchMock.requests()[fetchMock.requests().length - 1];
}

describe('API', () => {
  const mockData = JSON.stringify({ message: 'some json data without errors' });
  const mockAppError = JSON.stringify({ error: 'Not found' });
  const mockNetworkError = new Error('nope');
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const authOptions = {
    headers: {
      ...defaultOptions.headers,
      Authorization: 'Bearer abc123',
    },
  };

  describe('get', () => {
    const url = '/api/items';

    it('handles network errors', async () => {
      fetchMock.mockRejectOnce(mockNetworkError);
      try {
        await get(url);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to GET ${url}: nope`);
      }
    });

    it('handles json parsing errors', async () => {
      fetchMock.mockResponseOnce('not real json');
      try {
        await get(url);
      } catch (e: any) {
        expect(e.message).toContain(
          `Unable to GET ${url}: invalid json response body`,
        );
      }
    });

    it('handles application errors', async () => {
      fetchMock.mockResponseOnce(mockAppError);
      try {
        await get(url);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to GET ${url}: Not found`);
      }
    });

    it('makes unauthenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await get(url);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().method).toBe('GET');
      expect(latestRequest().headers.get('Content-Type')).toEqual(
        defaultOptions.headers['Content-Type'],
      );
    });

    it('makes authenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await get(url, true);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().headers.get('Authorization')).toEqual(
        authOptions.headers.Authorization,
      );
    });
  });

  describe('post', () => {
    const url = '/api/items';
    const data = { id: 1 };

    it('handles network errors', async () => {
      fetchMock.mockRejectOnce(mockNetworkError);
      try {
        await post(url, data);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to POST ${url}: nope`);
      }
    });

    it('handles json parsing errors', async () => {
      fetchMock.mockResponseOnce('not real json');
      try {
        await post(url, data);
      } catch (e: any) {
        expect(e.message).toContain(
          `Unable to POST ${url}: invalid json response body`,
        );
      }
    });

    it('handles application errors', async () => {
      fetchMock.mockResponseOnce(mockAppError);
      try {
        await post(url, data);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to POST ${url}: Not found`);
      }
    });

    it('makes unauthenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await post(url, data);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().method).toBe('POST');
      expect(latestRequest().body).toStrictEqual(
        Buffer.from(JSON.stringify(data)),
      );
      expect(latestRequest().headers.get('Content-Type')).toEqual(
        defaultOptions.headers['Content-Type'],
      );
    });

    it('makes authenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await post(url, data, true);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().headers.get('Authorization')).toEqual(
        authOptions.headers.Authorization,
      );
    });
  });

  describe('patch', () => {
    const url = '/api/items';
    const data = { id: 1 };

    it('handles network errors', async () => {
      fetchMock.mockRejectOnce(mockNetworkError);
      try {
        await patch(url, data);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to PATCH ${url}: nope`);
      }
    });

    it('handles json parsing errors', async () => {
      fetchMock.mockResponseOnce('not real json');
      try {
        await patch(url, data);
      } catch (e: any) {
        expect(e.message).toContain(
          `Unable to PATCH ${url}: invalid json response body`,
        );
      }
    });

    it('handles application errors', async () => {
      fetchMock.mockResponseOnce(mockAppError);
      try {
        await patch(url, data);
      } catch (e: any) {
        expect(e.message).toBe(`Unable to PATCH ${url}: Not found`);
      }
    });

    it('makes unauthenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await patch(url, data);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().method).toBe('PATCH');
      expect(latestRequest().body).toStrictEqual(
        Buffer.from(JSON.stringify(data)),
      );
      expect(latestRequest().headers.get('Content-Type')).toEqual(
        defaultOptions.headers['Content-Type'],
      );
    });

    it('makes authenticated requests', async () => {
      fetchMock.mockResponseOnce(mockData);
      await patch(url, data, true);
      expect(latestRequest().url).toBe(url);
      expect(latestRequest().headers.get('Authorization')).toEqual(
        authOptions.headers.Authorization,
      );
    });

    describe('remove', () => {
      const url = '/api/items';

      it('handles network errors', async () => {
        fetchMock.mockRejectOnce(mockNetworkError);
        try {
          await remove(url);
        } catch (e: any) {
          expect(e.message).toBe(`Unable to DELETE ${url}: nope`);
        }
      });

      it('handles json parsing errors', async () => {
        fetchMock.mockResponseOnce('not real json');
        try {
          await remove(url);
        } catch (e: any) {
          expect(e.message).toContain(
            `Unable to DELETE ${url}: invalid json response body`,
          );
        }
      });

      it('handles application errors', async () => {
        fetchMock.mockResponseOnce(mockAppError);
        try {
          await remove(url);
        } catch (e: any) {
          expect(e.message).toBe(`Unable to DELETE ${url}: Not found`);
        }
      });

      it('makes unauthenticated requests', async () => {
        fetchMock.mockResponseOnce(mockData);
        await remove(url);
        expect(latestRequest().url).toBe(url);
        expect(latestRequest().method).toBe('DELETE');
        expect(latestRequest().headers.get('Content-Type')).toEqual(
          defaultOptions.headers['Content-Type'],
        );
      });

      it('makes authenticated requests', async () => {
        fetchMock.mockResponseOnce(mockData);
        await remove(url, true);
        expect(latestRequest().url).toBe(url);
        expect(latestRequest().headers.get('Authorization')).toEqual(
          authOptions.headers.Authorization,
        );
      });
    });
  });
});
