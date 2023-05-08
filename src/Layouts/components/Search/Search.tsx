
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { search } from "../../../apiServices/apiServices";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { ClearIcon, SearchIcon } from "../../../components/Icon/Icon";
import SearchProper from "../../../components/Proper/SearchProper/SearchProper";


function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [resultValue, setResultValue] = useState<[]>([]);
  const [show, setShow] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const debounced: string = useDebounce(searchValue, 1000);

  useEffect(() => {
    const fetchApi = async () => {
      await search(debounced)
        .then((res) => {
          setResultValue(res.results);
        })
        .catch((error) => {
          return;
        });
      setShow(true);
    };
    fetchApi();
  }, [debounced]);
  useEffect(() => {
    if (searchValue === "") {
      setShow(false);
    }
  }, [searchValue]);
  const handleClear = () => {
    setSearchValue("");
    input.current?.focus();
    setResultValue([]);
    setShow(false);
  };
  console.log(resultValue.length > 0);
  
  return (
    <>
    <Tippy
      interactive
      visible={show && resultValue.length > 0}
      render={(attrs) => (
        <div className="w-[300px]" tabIndex={-1} {...attrs}>
          <Wrapper>
            <div className="py-2">
              <SearchProper
                data={resultValue }
                title="Movies"
                onClear={handleClear}
                q={debounced}
              />
            </div>
          </Wrapper>
        </div>
      )}
    >
      <div className="h-[50px] relative w-full border-[1.5px] border-transparent border-solid flex items-center bg-[#ccc] py-3 px-4 pr-0 rounded-[92px] focus-within:border-[1.5px] focus-within:border-[#16182333] focus-within:border-solid ">
        {/* input search */}
        <input
          ref={input}
          className=" flex items-center text-base w-[150px] h-full outline-none text-black bg-transparent "
          placeholder="Tìm theo tên"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
        />

        {/* button clear */}
        <span
          onClick={handleClear}
          className="px-2 cursor-pointer absolute right-[52px]"
        >
          {searchValue && <ClearIcon className={"h-4 w-4"} />}
        </span>

        <div className="w-[1px] bg-[#1618231f] absolute right-[52px] h-full"></div>

        {/* button search */}
        <Link
          to={`/search/${searchValue}`}
          onClick={handleClear}
          className={`block h-[46px] w-[52px] ${
            !searchValue && "pointer-events-none opacity-50"
          }`}
        >
          <button className="flex items-center absolute right-0 justify-center h-[46px] w-[52px] hover:bg-[#16182308] rounded-r-[92px]">
            <SearchIcon className={"h-[20px] w-[20px]"} />
          </button>
        </Link>
      </div>
    </Tippy></>
    
  );
}

export default Search;
