import React from 'react';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Text, Container, Flex, Skeleton } from '@mantine/core';

import type { User } from '../utils/api';
import { getUsers } from '../utils/api';

const users = [
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

export const PersisterExample = () => {
  const [searchParams] = useSearchParams();
  const withPersist = searchParams.get('withPersist');
  console.log('@withPersist', withPersist);

  React.useEffect(() => {
    if (!withPersist) return;
    localStorage.setItem('users', JSON.stringify({ data: users }));
  }, []);

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...(withPersist && {
      initialData: JSON.parse(localStorage.getItem('users')!) as AxiosResponse<User[], unknown>
    })
  });

  return (
    <Container size='xs'>
      <Flex gap='md' mt='lg' direction='column'>
        {usersQuery.isLoading &&
          Array.from({ length: 4 }).map((_el, index) => <Skeleton height={40} key={index} />)}

        {!usersQuery.isLoading && usersQuery.data && (
          <>
            {usersQuery.data.data.map((user) => (
              <Flex key={user.id} justify='flex-start' gap='lg' align='center'>
                <Avatar src={user.avatar} alt={user.name} />
                <Text>{user.name}</Text>
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </Container>
  );
};
