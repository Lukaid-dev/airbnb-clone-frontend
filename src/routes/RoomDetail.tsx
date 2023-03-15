import { Box, Grid, Heading, Skeleton, Image, GridItem, VStack, HStack, Text, Avatar, Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const {roomPk} = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  const { isLoading:isReviewsLoading, data:reviewsData} = useQuery<IReview[]>(["rooms", roomPk, "reviews"], getRoomReviews);
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }} 
    >
      <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
        <Heading>
          {data?.name}
        </Heading>
      </Skeleton>
      <Grid
        mt={8}
        gap={3}
        rounded={"xl"}
        overflow={"hidden"}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem 
            overflow={"hidden"}
            key={index}
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
          >
            <Skeleton 
              isLoaded={!isLoading}
              height={"100%"}
              width={"100%"}
            >
              <Image 
                src={data?.photos[index]?.file} 
                width={"100%"}
                height={"100%"}
                objectFit={"cover"}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack
        mt={10}
        w={"40%"}
        justifyContent={"space-between"}
      >
        <VStack
          alignItems={"flex-start"}
        >
          <Skeleton 
            isLoaded={!isLoading}
            height={"30px"}
          >
            <Heading
              fontSize={"2xl"}
            >
              House hosted by {data?.owner?.name}
            </Heading>
          </Skeleton>
          <Skeleton 
            isLoaded={!isLoading}
            height={"30px"}
          >
            <HStack
              justifyContent={"flex-start"}
              w={"100%"}
            >
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar
          size={"xl"}
          src={data?.owner?.avatar}
          name={data?.owner?.name}
        />
      </HStack>
      <Box mt={10}>
        <Heading 
          fontSize={'2xl'}
          mb={5}
        >
          <HStack>
          <FaStar /> 
          <Text>
            {data?.rating}
          </Text>
          <Text>
          •
          </Text>
          {
            isReviewsLoading ? (
              <Skeleton height={"30px"} width={"100px"} />
            ) : (
              <Text>
                {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
              </Text>
            )
          }
          </HStack>
        </Heading>
        <Container
          mt={15}
          marginX={"none"}
          maxW={"container.lg"}
        >
          <Grid
            templateColumns={"1fr 1fr"}
            gap={10}
          >
            {
              reviewsData?.map((review, index) => (
                <VStack
                  key={index}
                  alignItems={"flex-start"}
                >
                  <HStack>
                    <Avatar 
                      size={"md"}
                      src={review.user.avatar}
                      name={review.user.name}
                    />
                    <VStack 
                      alignItems={"flex-start"}
                      spacing={0}
                    >
                      <Heading fontSize={"md"}>
                        {review.user.name}
                      </Heading>
                      <HStack spacing={1}>
                        <FaStar size={"12px"}/>
                        <Text>
                          {review.rating}
                        </Text>
                      </HStack>
                      
                    </VStack>
                  </HStack>
                  <Text>
                    {review.payload}
                  </Text>
                </VStack>
              ))
            }
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}