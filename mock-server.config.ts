import type { MockServerConfig } from 'mock-config-server';

let users = [
  {
    id: 1,
    name: 'debabin',
    avatar: 'https://avatars.githubusercontent.com/u/45297354?v=4'
  },
  {
    id: 2,
    name: 'gaearon',
    avatar: 'https://avatars.githubusercontent.com/u/810438?v=4'
  },
  {
    id: 3,
    name: 'artalar',
    avatar: 'https://avatars.githubusercontent.com/u/27290320?v=4'
  },
  {
    id: 4,
    name: 't3dotgg',
    avatar: 'https://avatars.githubusercontent.com/u/6751787?v=4'
  }
];

const projects = [
  {
    title: '🎉 Mock Config Server',
    description:
      'tool that easily and quickly imitates server operation, create full fake api in few steps',
    link: 'https://www.npmjs.com/package/mock-config-server'
  },
  {
    title: '🔑 React Google ReCaptcha Ultimate',
    description:
      'tool that easily and quickly add Google ReCaptcha for your website or application',
    link: 'https://www.npmjs.com/package/react-google-recaptcha-ultimate'
  }
];

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/data/:id',
        method: 'get',
        routes: [
          {
            data: users,
            entities: {
              query: {
                type: 'friends'
              }
            }
          },
          {
            data: projects,
            entities: {
              query: {
                type: 'projects'
              }
            }
          }
        ],
        interceptors: {
          response: async (data, { setDelay }) => {
            await setDelay(2000);
            return data;
          }
        }
      },
      {
        path: '/users',
        method: 'put',
        routes: [
          {
            data: { success: true },
            interceptors: {
              response: async (data, { request, setDelay, setStatusCode }) => {
                await setDelay(3000);

                if (request.body.id === 1) {
                  setStatusCode(400);
                  return { success: false };
                }

                users = users.map((user) => {
                  if (user.id === request.body.id) {
                    return { ...user, ...request.body };
                  }
                  return user;
                });
                return data;
              }
            }
          }
        ]
      },
      {
        path: '/users',
        method: 'get',
        routes: [
          {
            data: [
              {
                id: 1,
                name: 'debabin',
                avatar: 'https://avatars.githubusercontent.com/u/45297354?v=4'
              },
              {
                id: 2,
                name: 'gaearon',
                avatar: 'https://avatars.githubusercontent.com/u/810438?v=4'
              },
              {
                id: 3,
                name: 'artalar',
                avatar: 'https://avatars.githubusercontent.com/u/27290320?v=4'
              },
              {
                id: 4,
                name: 't3dotgg',
                avatar: 'https://avatars.githubusercontent.com/u/6751787?v=4'
              },
              {
                id: 5,
                name: 'Park',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 6,
                name: 'Kristine',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 7,
                name: 'Conner',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 8,
                name: 'Charlene',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 9,
                name: 'Chase',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 10,
                name: 'Alba',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 11,
                name: 'Mable',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 12,
                name: 'Richard',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 13,
                name: 'Lila',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 14,
                name: 'Sexton',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 15,
                name: 'Meagan',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 16,
                name: 'Trujillo',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 17,
                name: 'Esther',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 18,
                name: 'Castro',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 19,
                name: 'Melinda',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 20,
                name: 'Chaney',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 21,
                name: 'Georgette',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 22,
                name: 'Hilda',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 23,
                name: 'Knox',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 24,
                name: 'Kimberley',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 25,
                name: 'Dollie',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 26,
                name: 'Lowe',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 27,
                name: 'Frazier',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 28,
                name: 'Buck',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 29,
                name: 'Melody',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 30,
                name: 'Jacklyn',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 31,
                name: 'Petra',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 32,
                name: 'Crane',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 33,
                name: 'Ball',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 34,
                name: 'James',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 35,
                name: 'Schroeder',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 36,
                name: 'Snider',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 37,
                name: 'Langley',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 38,
                name: 'Britt',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 39,
                name: 'Colon',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 40,
                name: 'Perez',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 41,
                name: 'Elvia',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 42,
                name: 'Baxter',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 43,
                name: 'Carey',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 44,
                name: 'Coleman',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 45,
                name: 'Vazquez',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 46,
                name: 'Head',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 47,
                name: 'Dorthy',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 48,
                name: 'Irene',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 49,
                name: 'Ashley',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 50,
                name: 'Tammie',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 51,
                name: 'Torres',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 52,
                name: 'Bond',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 53,
                name: 'Lucile',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 54,
                name: 'Joann',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 55,
                name: 'Shepard',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 56,
                name: 'Navarro',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 57,
                name: 'Cole',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 58,
                name: 'Mccray',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 59,
                name: 'Carrillo',
                avatar: 'https://via.placeholder.com/150/92c952'
              },
              {
                id: 60,
                name: 'Maddox',
                avatar: 'https://via.placeholder.com/150/92c952'
              }
            ],
            entities: {
              query: {
                limit: { checkMode: 'exists' },
                offset: { checkMode: 'exists' }
              }
            },
            interceptors: {
              response: async (data, { request }) => {
                const { limit, offset } = request.query;

                if (limit && offset) {
                  return {
                    users: data.slice(offset, +offset + +limit),
                    head: {
                      total: data.length,
                      pages: Math.round(data.length / +limit),
                      next: +offset + +limit > data.length ? null : +offset / +limit + 2,
                      back: +offset - +limit < 0 ? null : +offset / +limit - 2
                    }
                  };
                }

                return data;
              }
            }
          },
          {
            data: () => users
          }
        ],
        interceptors: {
          response: async (data, { setDelay }) => {
            await setDelay(2000);
            return data;
          }
        }
      },
      {
        path: '/users/:id',
        method: 'get',
        routes: [
          {
            data: {
              id: 1,
              name: 'debabin',
              avatar: 'https://avatars.githubusercontent.com/u/45297354?v=4'
            },
            entities: { params: { id: 1 } }
          },
          {
            data: {
              id: 3,
              name: 'artalar',
              avatar: 'https://avatars.githubusercontent.com/u/27290320?v=4'
            },
            entities: { params: { id: 3 } }
          }
        ],
        interceptors: {
          response: async (data, { setDelay }) => {
            await setDelay(700);
            return data;
          }
        }
      },
      {
        path: '/users/:id/projects',
        method: 'get',
        routes: [
          {
            data: projects,
            entities: { params: { id: 1 } }
          },
          {
            data: [
              {
                title: 'reatom',
                description: 'Reatom - the ultimate state manager',
                link: 'https://www.reatom.dev/'
              }
            ],
            entities: { params: { id: 3 } }
          }
        ],
        interceptors: {
          response: async (data, { setDelay }) => {
            await setDelay(700);
            return data;
          }
        }
      }
    ]
  }
};

export default mockServerConfig;
