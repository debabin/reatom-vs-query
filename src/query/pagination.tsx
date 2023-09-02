import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Text, Container, Flex, Skeleton, Pagination } from '@mantine/core';

import { getUsersPagination } from '../utils/api';

const LIMIT = 10;

export const PaginationExample = () => {
  const [page, setPage] = React.useState(1);

  const usersPaginationQuery = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsersPagination({ offset: LIMIT * page - LIMIT, limit: LIMIT })
  });

  return (
    <Container size='xs'>
      <Flex gap='md' mt='lg' direction='column'>
        {usersPaginationQuery.isLoading &&
          Array.from({ length: 4 }).map((_el, index) => <Skeleton height={40} key={index} />)}

        {!usersPaginationQuery.isLoading && usersPaginationQuery.data && (
          <>
            <Pagination
              value={page}
              onChange={setPage}
              total={usersPaginationQuery.data.data.head.pages}
            />
            {usersPaginationQuery.data.data.users.map((user) => (
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
