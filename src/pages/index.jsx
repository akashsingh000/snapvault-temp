
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/home.module.css";
import Cancel from "../assets/images/cancel.svg"
import Logo from "../assets/images/sv-logo.png";
import SearchIcon from "../assets/images/searchIcon.svg";
import PostImage from "components/components/ui-elements/PostImage";
import useResponsive from "components/hooks/useResponsive";
import { scroll_position } from "components/redux/slices/imageListSlice";
import Meta from "components/components/MetaHeads";
// import Icon from "../../public/android-chrome-192x192.png"

export default function Home() {
  const { main } = styles;
  const ref = useRef()
  const { isMobile } = useResponsive()
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const withoutSpaces = search.replace(/^\s+/g, '')
    if (withoutSpaces.length > 0) {
      const search_history = localStorage.getItem("search_history")
      router.push(`/search/${withoutSpaces}`).then(() => {
        if (typeof window !== "undefined") {
          if (search_history) {
            const obj = JSON.parse(search_history)
            localStorage.setItem("search_history", JSON.stringify([...obj, withoutSpaces]));
          } else {
            localStorage.setItem("search_history", JSON.stringify([withoutSpaces]))
          }

        }
      });
      dispatch(scroll_position(null))
    }
  }

  useEffect(() => {
    ref.current?.focus()
  }, [])

  // useEffect(() => {
  //   axios.post("/api/hello", { image: "https://images.pexels.com/photos/9551192/pexels-photo-9551192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }).then((data) => {
  //     var a = document.createElement("a"); //Create <a>
  //     a.href = "data:image/jpeg;base64," + data.data.data; //Image Base64 Goes here
  //     a.download = "Image.png"; //File name Here
  //     a.click();
  //   })
  // }, [])

  return (
    <>
      <Meta
        image={"/sv-logo.png"}
        title={"SnapVault - Search Photos"}
        description={'SnapVault - Search and download photos you can use everywhere. Browse millions of high-quality photos.'}
      />
      <div className={`${main}`}>
        <div className="">
          <div className="flex h-screen sm:p-[16px]">
            <div className="lg:w-[758px] sm:w-full  m-auto text-center flex flex-col justify-center">
              <div className="lg:w-[472px] sm:w-full m-auto">
                <PostImage alt="logo" src={Logo} width={isMobile ? 300 : 472.09} height={100} />
                <div className="lg:w-[462px] sm:w-full font-semibold font-sans text-[24px] leading-[28.8px] text-[#4E4E55] pt-[20px]">
                  Organize and Access Your Visual Assets with SnapVault
                </div>
              </div>
              <div className="pt-[50px]">
                <form onSubmit={handleSubmit} className="lg:w-[758px]  h-[64px] drop-shadow-xl flex items-center justify-between  sm:w-full md:sm-full py-[10px] pl-[30px] pr-[10px] rounded-[50px] bg-white border-2 border-[#E3212466] overflow-hidden">
                  <div className="relative w-full">
                    {search.length > 0 && <button type="button" onClick={() => { setSearch("") }} className="absolute right-[16px]">
                      <PostImage alt="cancel" src={Cancel} width={20} height={20} />
                    </button>}
                    <input ref={ref} value={search} onChange={(e) => setSearch(e.target.value)} className="placeholder:text-pHColor w-full font-inter placeholder:font-inter font-normal leading-[19.36px] placeholder:text-[16px] outline-none lg:w-full" placeholder={isMobile ? "Search images" : "Search images and vectors"} />
                  </div>

                  <button type="submit" className="bg-primary px-[16px] py-[12px] h-[44px] max-w-[113px] w-full text-white flex items-center rounded-[38px] gap-[8px]">
                    <PostImage alt="search" src={SearchIcon} width={20} height={20} />
                    <div className="text-white text-[16px] font-normal font-inter">Search</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
