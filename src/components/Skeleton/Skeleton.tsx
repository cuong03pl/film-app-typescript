import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface SkeletonItemProps {
  className: string
}
function SkeletonItem({ className }: SkeletonItemProps) {
  return (
    <div className={""}>
      <Skeleton
        baseColor="#202020"
        highlightColor="#f5f5f5"
        className={className}
        duration={1}
      />
    </div>
  );
}

export default SkeletonItem;
