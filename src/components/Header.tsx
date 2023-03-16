import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
  // 재할당하는듯?
  const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
  const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  // light mode일때 red.500, dark mode일때 red.300
  const logoColor = useColorModeValue("red.500", "red.300");
  // light mode일때 FaMoon, dark mode일때 FaSun
  const Icon = useColorModeValue(FaMoon , FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      status: "loading",
      description: "sad to see you go",
      position: "top",
      duration: 2000,
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "done",
      description: "see you soon",
    });
  };
  return (
    <Stack justifyContent={"space-between"} alignItems={"center"} px={"40"} py={"5"} borderBottomWidth={1} spacing={{
      sm: 3,
      md: 0
    }} direction={{
      sm: "column",
      md: "row"
    }}>
      <Box color={logoColor}>
        <FaAirbnb size={"48"} />
      </Box>
      <HStack spacing={2}>
        <IconButton onClick={toggleColorMode} aria-label="Toggle dark mode" icon={<Icon />} variant={"ghost"}></IconButton>
        {
          !userLoading ? 
            !isLoggedIn ? (
              <>
                <Button onClick={onLoginOpen}>Log In</Button>
                <LightMode>
                  <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
                </LightMode>
              </> 
              ) : (
                <Menu>
                  <MenuButton>
                    <Avatar 
                      size={"md"}
                      name={user?.username}
                      src={user?.avatar}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onLogOut}>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                
            ) : 
            null
        }
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}