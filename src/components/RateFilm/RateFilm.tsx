import { StarIcon } from "../Icon/Icon";

interface RateFilmProps {
  data: number,
  sizeIcon: string,
  small?: boolean
}
function RateFilm({ data, sizeIcon, small }: RateFilmProps) {
  const rate: string = String(data).slice(0, 3);
  const smallSize: string =
    "absolute right-2 flex items-center px-1 top-2  rounded-2xl bg-[#5985FF] text-[white] text-[14px]";
  const bigSize: string =
    "absolute right-5 flex items-center px-2 top-2  rounded-2xl bg-[#5985FF] text-[white]";
  return (
    <div className={small ? smallSize : bigSize}>
      <span className="font-semibold mr-1">{rate}</span>
      <StarIcon className={sizeIcon} />
    </div>
  );
}

export default RateFilm;
