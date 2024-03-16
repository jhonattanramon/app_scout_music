/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Text } from "./text";
import convertMilliseconds from "../utils/convertMilliseconds";
import { Card } from "./ui/card";

export default function Track({
  track: { name, album, duration_ms, artists },
}: {
  track: TrackObject;
}) {
  return (
    <Card>
    <section className="flex justify-between items-center w-full h-24 rounded relative bg-primary ">
      <img className="w-24 h-full object-cover rounded" alt={album.name} src={album.images[0].url} />
      <div className="w-full h-full flex justify-between items-center pl-7" >
        <div>
          <Text.h2>{name}</Text.h2>
          {
            artists.map(({name}, index)=> (
                <Text.TextBody key={index}>
                {name}
              </Text.TextBody>
            ))
        }
        </div>
        <div>{convertMilliseconds(duration_ms)}</div>
      </div>
      <button className="h-8 w-36 flex justify-center items-center px-3 py-5 rounded translate-x-8 bg-slate-100">
      <i className="fa-solid fa-play"></i>
      </button>
    </section>
    </Card>
  );
  
}
