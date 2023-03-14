import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} rounded={"3xl"} mb={2}>
          <Image src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg" />
          <Button variant={"unstyle"} position={"absolute"} top={0} right={0} color="white">
            <FaRegHeart size={20} />
          </Button>
        </Box>
        <Box>
          <Grid templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize={"md"}>
              에스파 카리나, 감탄 나오는 완벽 이목구비…매일 리즈 경신中 [인스타]
            </Text>
            <HStack _hover={{
              color: "red.500"
            }} spacing={1}>
              <FaStar size={15}/>
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>에스파 카리나</Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as={"b"}>$72</Text>/ wow
        </Text>
      </VStack>
  );
};