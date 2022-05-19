import { client, checkError } from './client';

export function getUser() {
  return client.auth.user();
}

export async function signUp(email, password, username) {
  const response = await client.auth.signUp({ email, password });
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
  const response = await client.from('profiles').insert([{ email, username }]);
  return checkError(response);
}

export async function getHaikus() {
  const response = await client.from('haikus').select();

  return checkError(response);
}

export async function getHaikuById(id) {
  const response = await client
    .from('haikus')
    .select(`*, profiles!inner(username)`)
    .match({ id })
    .single();

  return checkError(response);
}

export async function deleteHaikuById(id) {
  const response = await client.from('haikus').delete().match({ id }).single();

  return checkError(response);
}

export async function createHaiku(haiku) {
  const response = await client.from('haikus').insert(haiku).single();

  return checkError(response);
}

export async function uploadImage(image) {
  const user = getUser();
  const response = await client.storage
    .from('uhaiku')
    .upload(`${user.id}/${image.name}`, image, {
      cacheControl: '3600',
      upsert: false,
    });

  return checkError(response);
}

export async function updateHaikuById(
  id,
  { title, line_one, line_two, line_three }
) {
  const response = await client
    .from('haikus')
    .update({ title, line_one, line_two, line_three })
    .match({ id })
    .single();

  return checkError(response);
}
