import { Box, Button, HStack, IconButton, LightMode, Stack, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  // 재할당하는듯?
  const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
  const { isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  // light mode일때 red.500, dark mode일때 red.300
  const logoColor = useColorModeValue("red.500", "red.300");
  // light mode일때 FaMoon, dark mode일때 FaSun
  const Icon = useColorModeValue(FaMoon , FaSun);
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
        <Button onClick={onLoginOpen}>Log In</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}