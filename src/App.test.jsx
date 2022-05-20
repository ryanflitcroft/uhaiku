import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from './setupTests';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import HaikuProvider from './context/HaikuProvider';
import App from './App';
import { mockProfile, mockHaikuList } from './mockData/mockData';

describe('renders component App', () => {
  it('should sign a user in', async () => {
    // stuff
    render(
      <MemoryRouter>
        <AuthProvider>
          <HaikuProvider>
            <App />
          </HaikuProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const signInButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    userEvent.type(emailInput, 'user1@test.com');
    userEvent.type(passwordInput, '123456');

    server.use(
      rest.get(
        'https://kyhyvkpvpfgdixqgujqe.supabase.co/rest/v1/profiles',
        (req, res, ctx) => res(ctx.json(mockProfile))
      )
    );
    userEvent.click(signInButton);

    await waitFor(() => {
      const banner = screen.getByRole('banner');
      const headerText = screen.getByRole('heading', {
        name: /uhaiku/i,
      });
      const username = within(banner).getByText(/ryan/i);
      const createLink = screen.getByRole('link', {
        name: /create/i,
      });
      const logoutButton = screen.getByRole('button', {
        name: /logout/i,
      });

      const haikuList = screen.getByRole('list');
      const haikuItems = screen.getAllByRole('listitem');

      expect(haikuList.childElementCount).toBe(mockHaikuList.length);
    });
  });
});
