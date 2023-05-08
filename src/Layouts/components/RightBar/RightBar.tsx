import React, { useContext } from 'react';
import Search from '../Search/Search';
import AccountMore from '../../../components/AccountMore/AccountMore';
import { UserContext } from '../../../context/AuthProvider';
import RightBarList from '../../../components/RightBarList/RightBarList';


export default function RightBar  () {
  const data = useContext(UserContext);
  
  return (
    <div
      className={
        "right-bar min-w-[30%] bg-bgPrimary  overflow-auto sticky top-0 h-screen  w-[25%] border-l-[1px] border-solid border-[#16182333] flex flex-col pt-5 px-[42px] pb-5"
      }
    >
      <AccountMore data={data} />
      <Search />
      <RightBarList path={"movie/popular"} title={"Top 5 Popular Movies"} />
      <RightBarList
        path={"trending/movie/day"}
        title={"Top 5 Favourite Movies"}
      />
    </div>
  );
}
