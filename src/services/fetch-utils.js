import { client, checkError } from './client';

export function getUser() {
  return client.auth.session();
}

export async function signUp(email, password, username){
  const response = await client.auth.signUp({ email, password });
  await createProfile(username, email);
  return response.user;
}

export async function signIn(email, password) {
  const response = await client.auth.signIn({
    email,
    password
  });
  return response.user;
}

export async function signOut() {
  await client.auth.signOut();
}

async function createProfile(username, email) {
  const response = await client
    .from('profiles')
    .insert([{ username, email }]); 
  return checkError(response);
}
