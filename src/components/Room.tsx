import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: string;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
} : IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} rounded={"3xl"} mb={2}>
          <Image src={imageUrl} />
          <Button variant={"unstyle"} position={"absolute"} top={0} right={0} color="white">
            <FaRegHeart size={20} />
          </Button>
        </Box>
        <Box>
          <Grid templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize={"md"}>
              {name}
            </Text>
            <HStack _hover={{
              color: "red.500"
            }} spacing={1}>
              <FaStar size={15}/>
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>{city}, {country}</Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as={"b"}>${price}</Text>/ wow
        </Text>
      </VStack>
    </Link>
  );
};