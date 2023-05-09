import React from 'react';
import { UserContext } from '../../context/AuthProvider';
import Images from '../../components/Images/Images';
import image from '../../assets/img/img';
import { ChangeInfoIcon } from '../../components/Icon/Icon';

export interface ProfilePageProps {
}

export default function ProfilePage (props: ProfilePageProps) {
  const user = React.useContext(UserContext);

  return (
    <div className="flex items-center w-full">
      <div className="w-[50%] flex justify-center">
        <Images
          fallBack={image?.actingFallBack}
          className={"w-[250px] h-[250px] rounded-[50%]"}
          src={`${user?.photoURL}`}
        />
      </div>

      <div className="px-4 w-[50%]">
        <div className="text-[white] mb-4">
          <div className="font-bold text-lg">Họ và tên</div>
          <div className="flex justify-between">
            <span>{user?.displayName} </span>
            <span>
              <ChangeInfoIcon className={"w-[25px] h-[25px]"} />
            </span>
          </div>
        </div>
        <div className="text-[white] mb-4">
          <div className="font-bold text-lg">Email</div>
          <div className="flex justify-between">
            <span>{user?.email} </span>
            <span>
              <ChangeInfoIcon className={"w-[25px] h-[25px]"} />
            </span>
          </div>
        </div>
        <div className="text-[white] mb-4">
          <div className="font-bold text-lg">Số điện thoại</div>
          <div className="flex justify-between">
            <span>{user?.phoneNumber ? user?.phoneNumber : "Không có"} </span>
            <span>
              <ChangeInfoIcon className={"w-[25px] h-[25px]"} />
            </span>
          </div>
        </div>
        <div className="text-[white] mb-4">
          <div className="font-bold text-lg">Ngày tạo</div>
          <span> {user?.metadata.creationTime} </span>
        </div>
      </div>
    </div>
  );
}
