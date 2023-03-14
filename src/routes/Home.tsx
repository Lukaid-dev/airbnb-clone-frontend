import {  Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid px={{
      base: 10,
      lg: 40,
    }} mt={10} columnGap={4} rowGap={8} templateColumns={{
      sm: "1fr",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
      xl: "repeat(4, 1fr)",
      "2xl": "repeat(5, 1fr)",
    }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => 
        <Room key={index} />
      )}
      <Box>
        <Skeleton height={250} rounded={"2xl"} mb={3} />
        <SkeletonText noOfLines={3}/>
      </Box>
    </Grid>
  );
}