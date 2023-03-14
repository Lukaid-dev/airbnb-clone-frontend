import { Box, Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  // 재할당하는듯?
  const{ isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
  const{ isOpen:isSignUpOpen, onClose:onSignUpClose, onOpen:onSignUpOpen } = useDisclosure();
  return (
    <HStack justifyContent={"space-between"} px={"10"} py={"5"} borderBottomWidth={1}>
        <Box color={"red.500"}>
          <FaAirbnb size={"38"} />
        </Box>
        <HStack spacing={2}>
          <IconButton aria-label="Toggle dark mode" icon={<FaMoon />} variant={"ghost"}></IconButton>
          <Button onClick={onLoginOpen}>Log In</Button>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
        </HStack>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      </HStack>
  );
}