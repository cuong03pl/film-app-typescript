import { ElementType,  useState } from "react";

interface ImagesProps {
  className?: string, src: string, alt?: string, fallBack: any
}
function Images({ className, src, alt, fallBack }: ImagesProps) {
  let Comp: ElementType = "img";
  
  const [srcImg, setSrcImg] = useState<string>("");
  const handleError = () => {
    setSrcImg(fallBack);
  };
  return (
    <Comp
      className={className}
      alt={alt}
      src={srcImg ? srcImg : src}
      onError={handleError}
      
    ></Comp>
  );
}

export default Images;
