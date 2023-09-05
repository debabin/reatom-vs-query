import React from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Text,
  Container,
  Flex,
  Skeleton,
  Button,
  TextInput,
  Group,
  Box
} from '@mantine/core';

import { getUsers } from '../utils/api';

export const QueryInvalidationExample = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: 3600,
    cacheTime: 3600
  });

  const [value, setValue] = React.useState('');

  return (
    <Container size='xs'>
      <Flex gap='xs'>
        <Button onClick={() => usersQuery.refetch()}>refetch</Button>
        <Button onClick={() => queryClient.invalidateQueries()}>invalidate queries</Button>
        <Button onClick={() => queryClient.removeQueries({ queryKey: ['users'], exact: true })}>
          delete cache
        </Button>
      </Flex>

      <Flex gap='md' mt='lg' direction='column'>
        {(usersQuery.isLoading || usersQuery.isFetching) &&
          Array.from({ length: 4 }).map((_el, index) => <Skeleton height={40} key={index} />)}

        {!(usersQuery.isLoading || usersQuery.isFetching) && usersQuery.data && (
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

      <Box mt='sm'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log('submit');
            setValue('');
            queryClient.invalidateQueries(['users']);
          }}
        >
          <TextInput
            value={value}
            onChange={(event) => setValue(event.target.value)}
            withAsterisk
            label='label'
            placeholder='placeholder'
          />

          <Group position='right' mt='md'>
            <Button disabled={!value} type='submit'>
              submit
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
};
