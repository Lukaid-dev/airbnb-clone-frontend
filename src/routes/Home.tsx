import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";

interface IPhotos {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: string;
  is_ownder: boolean;
  photos: IPhotos[];
}

export default function Home() {
  // key for caching : ["rooms"]
  const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);
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
      {
        isLoading ? (
          <>
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
          </>
        ) : null
      }
      {
      data?.map((room) =>  (
        <Room
          pk={room.pk}
          key={room.pk}
          name={room.name}
          imageUrl={room.photos[0].file}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
        )
      )}
    </Grid>
  );
}