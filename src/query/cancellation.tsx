import { useQuery } from '@tanstack/react-query';
import { Avatar, Text, Container, Flex, Skeleton, Card, Button } from '@mantine/core';

import { getDataWithSignal, getUserWithSignal } from '../utils/api';
import React from 'react';

export const CancellationExample = () => {
  const [userId, setUserId] = React.useState(Math.round(Math.random()) ? 1 : 3);
  const useUserWithSignalQuery = useQuery({
    staleTime: 0,
    cacheTime: 0,
    queryKey: ['user', userId],
    queryFn: ({ signal }) => getUserWithSignal(signal, userId.toString())
  });

  const [type, setType] = React.useState<'friends' | 'projects'>('friends');
  const useDataWithSignalQuery = useQuery({
    staleTime: 0,
    cacheTime: 0,
    queryKey: ['users', 'projects', useUserWithSignalQuery.data?.data.id, type],
    queryFn: ({ signal }) =>
      getDataWithSignal(signal, useUserWithSignalQuery.data?.data.id as string, type),
    enabled: !!useUserWithSignalQuery.data?.data.id
  });

  return (
    <Container size='xs'>
      <Flex my='sm' gap='xs'>
        <Button onClick={() => setUserId(Math.round(Math.random()) ? 1 : 3)}>refetch user</Button>
        <Button onClick={() => useDataWithSignalQuery.refetch()}>refetch projects</Button>
      </Flex>

      <Flex my='sm' gap='xs'>
        <Button onClick={() => setType('friends')}>friends</Button>
        <Button onClick={() => setType('projects')}>projects</Button>
      </Flex>

      <Skeleton height={40} visible={useUserWithSignalQuery.isLoading}>
        {!useUserWithSignalQuery.isLoading && useUserWithSignalQuery.data && (
          <Flex justify='flex-start' gap='lg' align='center'>
            <Avatar
              src={useUserWithSignalQuery.data.data.avatar}
              alt={useUserWithSignalQuery.data.data.name}
            />
            <Text>{useUserWithSignalQuery.data.data.name}</Text>
          </Flex>
        )}
      </Skeleton>
      <Flex gap='md' mt='lg' direction='column'>
        {useDataWithSignalQuery.isLoading &&
          Array.from({ length: 3 }).map((_el, index) => <Skeleton height={60} key={index} />)}

        {!useDataWithSignalQuery.isLoading && useDataWithSignalQuery.data && (
          <>
            {useDataWithSignalQuery.data.data.map((data) => {
              if (type === 'friends' && 'name' in data) {
                return (
                  <Card shadow='sm' padding='lg' radius='md' withBorder>
                    <Flex key={data.id} justify='flex-start' gap='lg' align='center'>
                      <Avatar src={data.avatar} alt={data.name} />
                      <Text>{data.name}</Text>
                    </Flex>
                  </Card>
                );
              }

              if (type === 'projects' && 'link' in data)
                return (
                  <Card shadow='sm' padding='lg' radius='md' withBorder>
                    <a href={data.link} target='_blank'>
                      <Text>{data.title}</Text>
                    </a>
                    <Text>{data.description}</Text>
                  </Card>
                );
            })}
          </>
        )}
      </Flex>
    </Container>
  );
};
