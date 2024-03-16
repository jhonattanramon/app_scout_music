"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { api_spotify } from "@/src/api/api_spotify";
import { Button } from "@/src/components/ui/button";
import SelectMarkets from "@/src/components/selectMarkets";
import PickupGenres from "@/src/components/pickupGenres";
import { Text } from "@/src/components/text";
import PickupLimit from "@/src/components/pickupLimit";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import TrackCard from "@/src/components/trackCard";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import Track from "@/src/components/track";
import WebPlayback from "@/src/components/webplayback";

interface RecommendationsMusic {
  limit: string;
  market: string;
  seed_genres: string[];
}

export default function Home({ params }: { params: { slug: string[] } }) {
  const access_token = params.slug[0];
  const refresh_token = params.slug[1];
  const [limit, setLimit] = useState<string>("10");
  const [markets, setMarkets] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [tracks, setTracks] = useState<TrackObject[] | null>(null);

  const [dataToRecommendations, setDataToRecommendations] =
    useState<RecommendationsMusic>({
      limit: "10",
      market: "BR",
      seed_genres: ["brazil"],
    } as RecommendationsMusic);

  async function handlerRecommendationsMusic() {
    await api_spotify
      .get("/v1/recommendations", {
        params: {
          limit: dataToRecommendations.limit,
          market: dataToRecommendations.market,
          seed_genres: dataToRecommendations.seed_genres.join(","),
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((res) =>{
        console.log(res)
        const data = res.data
        setTracks(data.tracks)
      } 
      );
  }

  async function getMarkets() {
    try {
      return await api_spotify
        .get("/v1/markets", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then(({ data }) => setMarkets(data.markets));
    } catch (err) {
      throw new Error("ocorreu um error ao tentar exibir os markets");
    }
  }

  async function getGenres() {
    try {
      await api_spotify
        .get("/v1/recommendations/available-genre-seeds", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
        .then(({ data }) => setGenres(data.genres));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => await Promise.all([getMarkets(), getGenres()]))();
  }, []);

  return (
    <main className="flex h-screen w-full justify-center items-center">
      <Button className="absolute top-5 left-5" onClick={handlerRecommendationsMusic}>Recomendar</Button>

      <Dialog>
        <DialogTrigger className="absolute right-5 top-5">
          <Button>Config</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <div className="flex flex-col flex-items-center justify-around bg-background rounded">
            {" "}
            <div>
              <Text.h3>Limit</Text.h3>
              <PickupLimit
                value={dataToRecommendations.limit}
                getValue={(limit) => {
                  setDataToRecommendations((prev) => ({
                    ...prev,
                    limit,
                  }));
                }}
              />
            </div>
            <div>
              <Text.h3>Markets</Text.h3>
              <SelectMarkets
                value={dataToRecommendations.market}
                markets={markets}
                getValue={(market) => {
                  setDataToRecommendations((prev) => ({
                    ...prev,
                    market,
                  }));
                }}
              />
            </div>
            <div>
              <Text.h3>Genres</Text.h3>
              <PickupGenres
                value={dataToRecommendations.seed_genres}
                getValues={(seed_genres) => {
                  setDataToRecommendations((prev) => ({
                    ...prev,
                    seed_genres,
                  }));
                }}
                genres={genres}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
          <div className="flex flex-col w-1/2  gap-7 ">
            {tracks?.map((track, index) => {
              return <Track track={track} key={index} />;
            })}
          </div>

          <WebPlayback 
          token={access_token}
          />
    </main>
  );
}
