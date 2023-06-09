import { Heading, VStack, Text, Spinner, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { githubLogIn } from '../api';

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await githubLogIn(code);
      if (status === 200) {
        toast({
          status: 'success',
          title: 'Welcome',
          description: 'You are logged in',
        });
        queryClient.refetchQueries(['me']);
        navigate('/');
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  });
  return (
    <VStack justifyContent={'center'} mt={40}>
      <Heading>Processing Log In ...</Heading>
      <Text>Don't go anywhere</Text>
      <Spinner size={'lg'} />
    </VStack>
  );
}
