
import { useCallback, useContext, useEffect, useRef, useState } from "react";


import { SubmitIcon } from "../Icon/Icon";
import Images from "../Images/Images";
import CommentItem from "./CommentItem";
import PropTypes from "prop-types";
import SkeletonItem from "../Skeleton/Skeleton";

import { db } from "../../firebase/config";

import image from "../../assets/img/img";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthProvider";
interface CommentProps {
  id?: string
}
function Comment({ id }: CommentProps) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState<any>([
    {
      author_details: {
        avatar_path:
          "https://lh3.googleusercontent.com/a/AItbvmloBO_60-Lv9QJ4dBKLVknlcbtxswl-eRFKwSj0=s96-c",
        username: "Hoàng Kim Cường",
      },
      content: "Mời bạn test tính năng comment...",
      image: true,
    },
  ]);
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getDoc(doc(db, "comments", `${id}`))
        .then((data: Record<string, any>) => {
          setComments(data.data().comments);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
    };
    fetchApi();
  }, [id, check]);
  useEffect(() => {
    if (check) {
      setDoc(doc(db, "comments", `${id}`), { comments });
      setCheck(false);
    } else {
      return;
    }
  }, [comments]);
  const handleSubmit = () => {
    setComments((pre: any) => [
      {
        author_details: {
          avatar_path: user?.photoURL,
          username: user?.displayName,
        },
        content: comment,
        image: true,
      },
      ...pre,
    ]);

    if (check) {
      setCheck(false);
    } else setCheck(true);
    setComment("");
    input.current?.focus();
  };

  const onChangeInput = useCallback(
    (e: Record<string, any>) => {
      setComment(e.target.value);
    },
    [comment]
  );

  return (
    <div className="w-full mt-[24px]">
      <h3 className="text-[#fff] text-[24px] font-bold">Bình luận</h3>
      <div className="flex items-center h-[80px] py-5">
        {isLoading ? (
          <>
            <SkeletonItem className={" rounded-[50%] h-[48px] w-[48px]"} />
            <SkeletonItem className={" rounded-3xl h-[40px] w-[850px] ml-5"} />
          </>
        ) : (
          <>
            <Images
              className={"rounded-[50%] h-[48px] w-[48px] "}
              src={`${user?.photoURL}`}
              fallBack={`${image?.actingFallBack}`}
            ></Images>
            <input
              value={comment}
              ref={input}
              placeholder={"Nhập bình luận"}
              className="w-full mx-5 bg-[#8b7b7b3b] px-3 rounded-xl min-h-full block text-textPrimary outline-none border-none"
              onChange={onChangeInput}
            />
            <div onClick={handleSubmit}>
              <SubmitIcon
                className={"w-[40px] h-[40px] text-[blue] cursor-pointer"}
              />
            </div>
          </>
        )}
      </div>

      {/* cmt item */}
      {comments?.map((item: Record<string, any>, index: number) => {
        return (
          <CommentItem
            isLoading={isLoading}
            item={item}
            imageUserAuth={item?.image}
            key={index}
          />
        );
      })}
    </div>
  );
}
Comment.propsType = {
  id: PropTypes.string.isRequired,
};
export default Comment;
