import {
  render,
  screen,
  waitFor,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

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

      userEvent.click(createLink);

      const homeButton = screen.getByRole('link', {
        name: /home/i,
      });
    });

    await waitFor(() => {
      const createForm = screen.getByRole('form', {
        name: /input and submit data to create your haiku/i,
      });
    });

    const titleInput = screen.getByPlaceholderText(/space needle/i);
    const lineOneInput = screen.getByPlaceholderText(/wheedle the needle/i);
    const lineTwoInput = screen.getByPlaceholderText(/a red light flashing/i);
    const lineThreeInput = screen.getByPlaceholderText(/through morning rain/i);
    const imageInput = screen.getByLabelText(/upload image/i);
    const descriptionInput = screen.getByPlaceholderText(
      /view of the puget sound/i
    );

    userEvent.type(titleInput, 'test title');
    userEvent.type(lineOneInput, 'test line one');
    userEvent.type(lineTwoInput, 'test line two');
    userEvent.type(lineThreeInput, 'test line three');
    userEvent.upload(imageInput, file);
    userEvent.type(descriptionInput, 'test description');

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    userEvent.click(submitButton);

    await waitFor(() => {
      const main = screen.getByRole('main');
      const haikuList = within(main).getByRole('list');
      expect(haikuList.childElementCount).toBe(mockHaikuList.length + 1);
      const itemImage = screen.getByRole('img', {
        name: /test description/i,
      });
      userEvent.click(itemImage);
    });

    await waitFor(() => {
      const title = screen.getByRole('heading', {
        name: /test title/i,
      });
      const username = screen.getByText(/by ryan/i);
      const image = screen.getByRole('img', {
        name: /test description/i,
      });
      const lineOne = screen.getByText(/test line one/i);
      const lineTwo = screen.getByText(/test line two/i);
      const lineThree = screen.getByText(/test line three/i);
      const editButton = screen.getByRole('button', {
        name: /edit/i,
      });

      userEvent.click(editButton);
    });

    await waitFor(() => {
      const editForm = screen.getByRole('form', {
        name: /input and submit data to update your haiku/i,
      });
    });

    const titleInputUpdate = screen.getByPlaceholderText(/test title/i);
    const lineOneInputUpdate = screen.getByPlaceholderText(/test line one/i);
    const lineTwoInputUpdate = screen.getByPlaceholderText(/test line two/i);
    const lineThreeInputUpdate =
      screen.getByPlaceholderText(/test line three/i);

    userEvent.type(titleInputUpdate, 'title update');
    userEvent.type(lineOneInputUpdate, 'line one update');
    userEvent.type(lineTwoInputUpdate, 'line two update');
    userEvent.type(lineThreeInputUpdate, 'line three update');

    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });

    userEvent.click(saveButton);

    await waitFor(() => {
      const editForm = screen.getByRole('form', {
        name: /input and submit data to update your haiku/i,
      });
      userEvent.click(editForm);
    });

    await waitFor(() => {
      const deleteButton = screen.getByRole('button', {
        name: /delete/i,
      });
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      const main = screen.getByRole('main');
      const haikuList = within(main).getByRole('list');
      expect(haikuList.childElementCount).toBe(mockHaikuList.length);
      const logoutButton = screen.getByRole('button', {
        name: /logout/i,
      });
      userEvent.click(logoutButton);
    });

    await waitFor(() => {
      screen.getByRole('form', {
        name: /sign in or sign up to continue/i,
      });
    });
  });
});
