export const mockSignIn = {
  access_token: 'MOCK_ACCESS_TOKEN',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'MOCK_ACCESS_TOKEN',
  user: {
    id: '123456',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'user1@test.com',
    email_confirmed_at: '2022-05-18T00:52:30.032175Z',
    phone: '',
    confirmed_at: '2022-05-18T00:52:30.032175Z',
    last_sign_in_at: '2022-05-20T22:33:48.085553412Z',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {},
    identities: [
      {
        id: '123456',
        user_id: '123456',
        identity_data: {
          sub: '123456',
        },
        provider: 'email',
        last_sign_in_at: '2022-05-18T00:52:30.030608Z',
        created_at: '2022-05-18T00:52:30.03065Z',
        updated_at: '2022-05-18T00:52:30.030652Z',
      },
    ],
    created_at: '2022-05-18T00:52:30.028752Z',
    updated_at: '2022-05-20T22:33:48.086534Z',
  },
};

export const mockProfile = {
  id: 10,
  created_at: '2022-05-18T00:52:30.373437+00:00',
  username: 'Ryan',
  email: 'user1@test.com',
  user_id: '123456',
};

export const mockHaikuList = [
  {
    id: 8,
    created_at: '2022-05-19T00:49:16.723796+00:00',
    title: 'MINE AGAIN',
    line_one: 'not yours',
    image:
      'https://kyhyvkpvpfgdixqgujqe.supabase.co/storage/v1/object/public/uhaiku/8b49010f-23c7-4b24-85ca-84f0c28e3002/my-neighbor-totoro.jpg',
    alt: 'hahaha',
    line_two: 'so good',
    line_three: 'fight me',
    user_id: '654321',
    profiles: {
      username: 'ari',
    },
  },
  {
    id: 13,
    created_at: '2022-05-20T00:46:04.595199+00:00',
    title: 'Pink Spring Trees',
    line_one: 'Magnolia tree',
    image:
      'https://kyhyvkpvpfgdixqgujqe.supabase.co/storage/v1/object/public/uhaiku/a813b59f-9369-44a2-bd22-09c3135dac33/000077150015.jpg',
    alt: 'Magnolia blooms against blue sky',
    line_two: 'Spring-time blooms in shades of pink',
    line_three: 'Sun and rain it needs',
    user_id: '123456',
    profiles: {
      username: 'Ryan',
    },
  },
];
