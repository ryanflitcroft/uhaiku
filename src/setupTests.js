import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  mockSignIn,
  mockHaikuList,
  mockHaikuItem,
  mockHaikuImage,
  mockHaikuItemUpdate,
} from './mockData/mockData';

import fetch from 'cross-fetch';
global.fetch = fetch;

export const server = setupServer(
  rest.post(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/auth/v1/token',
    (req, res, ctx) => res(ctx.json(mockSignIn))
  ),
  rest.get(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/haikus',
    (req, res, ctx) => {
      const query = req.url.searchParams.get('id');
      console.log(query);
      if (query === 'eq.1') {
        return res(ctx.json(mockHaikuItem));
      }
      return res(ctx.json(mockHaikuList));
    }
  ),
  rest.patch(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/haikus',
    (req, res, ctx) => {
      const query = req.url.searchParams.get('id');
      console.log(query);
      if (query === 'eq.1') {
        return res(ctx.json(mockHaikuItemUpdate));
      }
    }
  ),
  rest.delete(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/haikus',
    (req, res, ctx) => {
      const query = req.url.searchParams.get('id');
      console.log(query);
      if (query === 'eq.1') {
        return res(ctx.json(mockHaikuItemUpdate));
      }
    }
  ),
  rest.post(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/storage/v1/object/uhaiku/123456/hello.png',
    (req, res, ctx) => res(ctx.json(mockHaikuImage))
  ),
  rest.post(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/haikus',
    (req, res, ctx) => res(ctx.json(mockHaikuItem))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
