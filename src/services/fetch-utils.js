import { client, checkError } from './client';

export function getUser() {
  return client.auth.session();
}

export async function signUp(email, password, username) {
  const response = await client.auth.signUp({ email, password });
  console.log('signup', email, password, username);
  await createProfile(email, username);
  return response.user;
}

export async function signIn(email, password) {
  const response = await client.auth.signIn({
    email,
    password,
  });
  return response.user;
}

export async function signOut() {
  await client.auth.signOut();
}

async function createProfile(email, username) {
  console.log('create', email, username);
  const response = await client.from('profiles').insert([{ email, username }]);
  return checkError(response);
}
