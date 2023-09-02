import { useInfiniteQuery } from '@tanstack/react-query';
import { Avatar, Text, Container, Flex, Skeleton, Button } from '@mantine/core';

import { getUsersPagination } from '../utils/api';

const LIMIT = 10;

export const LoadMoreExample = () => {
  const usersPaginationQuery = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      getUsersPagination({ offset: LIMIT * pageParam - LIMIT, limit: LIMIT }),
    getNextPageParam: (data) => {
      return data.data.head.next;
    }
  });

  return (
    <Container size='xs'>
      <Flex gap='md' mt='lg' direction='column'>
        {usersPaginationQuery.isLoading &&
          Array.from({ length: 4 }).map((_el, index) => <Skeleton height={40} key={index} />)}

        {!usersPaginationQuery.isLoading && usersPaginationQuery.data && (
          <>
            {usersPaginationQuery.data.pages.map((page) => (
              <>
                {page.data.users.map((user) => (
                  <Flex key={user.id} justify='flex-start' gap='lg' align='center'>
                    <Avatar src={user.avatar} alt={user.name} />
                    <Text>{user.name}</Text>
                  </Flex>
                ))}
              </>
            ))}

            <Button
              onClick={() => usersPaginationQuery.fetchNextPage()}
              disabled={
                !usersPaginationQuery.hasNextPage || usersPaginationQuery.isFetchingNextPage
              }
            >
              {usersPaginationQuery.isFetchingNextPage
                ? 'Loading more...'
                : usersPaginationQuery.hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
};
