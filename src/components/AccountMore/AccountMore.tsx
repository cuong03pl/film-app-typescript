
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Images from "../Images/Images";
import config from "../../config";
import Button from "../Button/Button";
import image from "../../assets/img/img";
interface AccountMore {
    data: any
}
function AccountMore({ data }: AccountMore) {
  const [login, setLogin] = useState(false);
  console.log(data);
  
  useEffect(() => {
    if (data) {
      console.log(123);
      
      setLogin(true);
    }
    console.log(345);
    
  }, [data]);

  return (
    <div className="flex items-center justify-end mb-5 w-full ">
      {login ? (
        <div className="flex items-center">
          <span className="mr-2 text-base text-textPrimary">
            {data?.displayName}
          </span>
          <Images
            fallBack={`${image?.actingFallBack}`}
            src={data?.photoURL}
            alt=""
            className="w-[30px] cursor-pointer h-[30px] rounded-[50%]"
          />
        </div>
      ) : (
        <>
          <Button loginBtn to={config.routes.login}>
            Đăng nhập
          </Button>
        </>
      )}
    </div>
  );
}

export default AccountMore;
