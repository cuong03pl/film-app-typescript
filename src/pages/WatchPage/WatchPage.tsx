import * as React from 'react';
import { useParams } from 'react-router-dom';
import FilmDetails from '../../components/FilmDetails/FilmDetails';
import Comment from '../../components/Comment/Comment';

export interface WatchPageProps {
}

export default function WatchPage (props: WatchPageProps) {
  const { id } = useParams();

  return (
    <div className="w-full ">
      <div className=" h-[500px]">
        <iframe
          src={`https://2embed.org/embed/${id}`}
          width="100%"
          height="100%"
          // allowFullScreen="allowfullscreen"
        ></iframe>
      </div>

      <div className="max-h-[20%]">
        <FilmDetails id={id} watchPage />
        {/* comment */}
        <Comment id={id} />
      </div>
    </div>
  );
}
