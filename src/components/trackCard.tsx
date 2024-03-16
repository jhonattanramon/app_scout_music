import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import {} from "react/";
export default function TrackCard({ track }: { track: TrackObject }) {
  const {
    name,
    external_urls,
    album: { images },
  } = track;
  return (
    <a href={external_urls.spotify}>
      <Card className="p-2">
        <CardContent className="w-52 min-h-52 ">
          <div className="relative">
            <div className="icon-play hidden absolute w-full h-full top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 justify-center items-center">
              <i className="fa-solid fa-play text-4xl text-white "></i>
            </div>
            <Image
              className="h-full w-full rounded"
              width={100}
              height={100}
              src={images[0].url}
              alt={name}
            />
          </div>
          <CardTitle className="text-sm mt-2 w-32 text-wrap">{name}</CardTitle>
        </CardContent>
      </Card>
    </a>
  );
}
