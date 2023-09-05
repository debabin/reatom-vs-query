import React from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Text, Container, Flex, Skeleton, Button, TextInput, Modal } from '@mantine/core';

import { getUsers, changeUser, User } from '../utils/api';

export const OptimisticUpdateExample = () => {
  const [userForEdit, setUserForEdit] = React.useState<User | null>(null);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (!userForEdit) return;
    setValue(userForEdit.name);
  }, [userForEdit]);

  const getUsersQuery = useQuery({
    queryKey: ['users'],
    refetchInterval: 5000,
    queryFn: () => getUsers()
  });

  const changeUserMutation = useMutation({
    mutationFn: changeUser,
    onSuccess: () => getUsersQuery.refetch(),
    onError: (_error, user) =>
      notifications.show({
        autoClose: 3000,
        title: `Error for ${user.name}`,
        message: 'Something went wrong',
        color: 'red'
      })
  });

  return (
    <Container size='xs'>
      {!!userForEdit && (
        <Modal
          opened={!!userForEdit}
          onClose={() => {
            if (changeUserMutation.isLoading) return;
            setUserForEdit(null);
          }}
        >
          <Flex direction='column' gap='sm'>
            <Text>Change user name</Text>
            <TextInput
              disabled={changeUserMutation.isLoading}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              withAsterisk
              placeholder='change name'
            />
            <Button
              disabled={changeUserMutation.isLoading}
              onClick={async () => {
                await changeUserMutation.mutateAsync({ ...userForEdit, name: value });
                setUserForEdit(null);
              }}
            >
              change
            </Button>
          </Flex>
        </Modal>
      )}

      <Flex gap='md' mt='lg' direction='column'>
        {getUsersQuery.isLoading &&
          Array.from({ length: 4 }).map((_el, index) => <Skeleton height={40} key={index} />)}

        {!getUsersQuery.isLoading && getUsersQuery.data && (
          <>
            {getUsersQuery.data.data.map((user) => (
              <Flex key={user.id} justify='space-between' gap='lg' align='center'>
                <Flex justify='flex-start' gap='lg' align='center'>
                  <Avatar src={user.avatar} alt={user.name} />
                  <Text>{user.name}</Text>
                </Flex>
                <Button onClick={() => setUserForEdit(user)}>change</Button>
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </Container>
  );
};
