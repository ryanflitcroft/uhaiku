import { client, checkError } from './client';

export function getUser() {
  return client.auth.session();
}

export async function signUpUser(email, password, username){
  const response = await client.auth.signUp({ email, password });
  await createProfile(username, email);
  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({
    email,
    password
  });
  return response.user;
}

export async function signOutUser() {
  await client.auth.signOut();
}

async function createProfile(username, email) {
  const response = await client
    .from('profiles')
    .insert([{ username, email }]); 
  return checkError(response);
}
