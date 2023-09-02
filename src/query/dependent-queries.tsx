import { useQuery } from '@tanstack/react-query';
import { getUser, getUserProjects } from '../utils/api';
import { useParams } from 'react-router-dom';
import { Avatar, Text, Container, Flex, Skeleton, Card } from '@mantine/core';

export const DependentQueriesExample = () => {
  const { userId } = useParams();

  if (!userId) throw new Error('userId');

  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId)
  });

  const userProjectsQuery = useQuery({
    queryKey: ['users', 'projects', userQuery.data?.data.id],
    queryFn: () => getUserProjects(userQuery.data?.data.id as string),
    enabled: !!userQuery.data?.data.id
  });

  return (
    <Container size='xs'>
      <Skeleton height={40} visible={userQuery.isLoading}>
        {!userQuery.isLoading && userQuery.data && (
          <Flex justify='flex-start' gap='lg' align='center'>
            <Avatar src={userQuery.data.data.avatar} alt={userQuery.data.data.name} />
            <Text>{userQuery.data.data.name}</Text>
          </Flex>
        )}
      </Skeleton>

      <Flex gap='md' mt='lg' direction='column'>
        {userProjectsQuery.isLoading &&
          Array.from({ length: 3 }).map((_el, index) => <Skeleton height={60} key={index} />)}

        {!userProjectsQuery.isLoading && userProjectsQuery.data && (
          <>
            {userProjectsQuery.data.data.map((project) => (
              <Card shadow='sm' padding='lg' radius='md' withBorder>
                <a href={project.link} target='_blank'>
                  <Text>{project.title}</Text>
                </a>
                <Text>{project.description}</Text>
              </Card>
            ))}
          </>
        )}
      </Flex>
    </Container>
  );
};
