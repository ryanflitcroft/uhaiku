import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockSignIn, mockHaikuList } from './mockData/mockData';

import fetch from 'cross-fetch';
global.fetch = fetch;

export const server = setupServer(
  rest.post(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/auth/v1/token',
    (req, res, ctx) => res(ctx.json(mockSignIn))
  ),
  rest.get(
    'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/haikus',
    (req, res, ctx) => res(ctx.json(mockHaikuList))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
