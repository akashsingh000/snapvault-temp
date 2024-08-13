'use client'

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut, useSession } from 'next-auth/react';
import PostImage from './ui-elements/PostImage';
import Logo from "../assets/images/sv-logo.png";
import Cancel from "../assets/images/cancel.svg";
import SearchIcon from "../assets/images/searchIcon.svg";
import LoginIcon from "../assets/images/loginIcon.svg";
import ArrowIcon from "../assets/images/arrowIcon.svg";
import useResponsive from 'components/hooks/useResponsive';
import { scroll_position, setCategory, setSearch } from 'components/redux/slices/imageListSlice';
import "../styles/header.module.css";
const HeaderLayout = ({ children, showSearch }) => {
    const router = useRouter();
    // const [search, setSearch] = useAsyncState("");
    const { data: status } = useSession();
    const { category, search } = useSelector(store => store.photos);
    const [text, setText] = useState("")
    // const [showDropdown, setShowDropdown] = useState(false)
    const [arrowDisable, setArrowDisable] = useState(true);
    // const searchArr = typeof window !== "undefined" && JSON.parse(localStorage.getItem("search_history"))
    const elementRef = useRef(null);
    // const impactRef = useRef();
    // useOutsideClick(impactRef, () => setShowDropdown(false));
    const dispatch = useDispatch()
    const { isMobile, isTablet } = useResponsive()
    const handleSubmit = (e) => {
        e.preventDefault();
        const withoutSpaces = text.replace(/^\s+/g, '')
        if (withoutSpaces.length > 0) {
            dispatch(setSearch(withoutSpaces))
            dispatch(scroll_position(null))
        }
    };



    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };


    return (
        <div>
            <div className='sticky bg-white top-0 z-[12]'>
                <div className='border-solid border-0 border-b border-boundary'>
                    <div className='w-full sm:gap-[16px] md:gap-[16px] flex items-center justify-between bg-white lg:py-[24px] max-w-[1552px] m-auto  md:p-[16px] sm:p-[16px]'>
                        <Link href="/">
                            <PostImage alt="logo" src={Logo} width={isTablet ? 120 : isMobile ? 120 : 188.84} height={isMobile ? 20 : 40} /></Link>
                        {showSearch
                            && <div className='relative'>
                                <form onSubmit={handleSubmit} className="lg:w-[760px]  lg:h-[56px] flex items-center justify-between  sm:w-[100%] md:w-[100%] py-[8px] pl-[30px] px-[10px] rounded-[50px] bg-white border-2 border-[#0000001A] ">
                                    <div className='relative w-full'>
                                        {text.length > 0 && <button type="button" onClick={() => { dispatch(setSearch("")); setText("") }} className="absolute right-[16px]">
                                            <PostImage alt="cancel" src={Cancel} width={20} height={20} />
                                        </button>}
                                        <input value={text} onChange={(e) => setText(e.target.value)} className="placeholder:text-pHColor w-full font-inter placeholder:font-inter font-medium placeholder:text-[16px] outline-none sm:w-full" placeholder={isMobile ? "Search" : "Search images and vectors"} />
                                    </div>
                                    <button type='submit' className="bg-primary p-[12px] text-white flex items-center rounded-[38px] gap-[8px]">
                                        <PostImage alt="search-icon" src={SearchIcon} width={16} height={16} />
                                    </button>
                                </form>
                                {/* {showDropdown && searchArr.length > 0 && <div className='w-full absolute pt-[16px]'>
                                    <div ref={impactRef} className='border-[1px] border-boundary rounded-[8px] p-[16px] bg-white '>
                                        <div className='flex items-center justify-between'>
                                            <div className='text-[20px] font-semibold font-sans leading-[28px] text-black'>Recent Searches</div>
                                            <button onClick={() => {
                                                if (typeof window !== "undefined") {
                                                    localStorage.setItem("search_history", JSON.stringify([]))
                                                    setShowDropdown(false)
                                                }
                                            }} className='text-[16px] font-semibold font-sans leading-[28px] text-pHColor'>Clear</button>
                                        </div>
                                        <div className='pt-[30px]'>
                                            <div className='flex flex-wrap items-center gap-[16px]'>
                                                {
                                                    searchArr.map((i, n) => {
                                                        return (
                                                            <button type='button' onClick={(e) => {
                                                                setSearch(e.target.textContent).then(() => {
                                                                    handleSubmit(e);
                                                                })
                                                            }} key={n} className={`border-2 border-boundary transition-all flex items-center gap-[8px] font-sans 0.2s ease-in-out hover:border-primary  text-[16px] leading-[19.2px] font-medium capitalize rounded-[50px] py-[10px] px-[20px]`}>
                                                                <div>{i}</div>
                                                                <PostImage alt="search-icon" src={SearchGrey} width={16} height={16} />
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>} */}
                            </div>
                        }
                        {status !== "authenticated"
                            ? <button onClick={() => { signIn("google") }} className='border-1 flex flex-nowrap border-b border-solid border-[#E32124] pb-[4px]  items-center gap-[4px]'>
                                <div className='sm:hidden lg:block md:block text-[#E32124] font-sans text-[18px] font-medium leading-[21.6px]'>Login</div>
                                <PostImage alt="login-icon" src={LoginIcon} width={24} height={24} />
                            </button>
                            : <button onClick={() => { signOut({ redirect: false }).then(() => router.push("/")); }} className='border-1 flex flex-nowrap border-b border-solid border-[#E32124] pb-[4px]  items-center gap-[4px]'>
                                <div className='sm:hidden lg:block md:block text-[#E32124] font-sans text-[18px] font-medium leading-[21.6px]'>Logout</div>
                                <PostImage alt="login-icon" src={LoginIcon} width={24} height={24} />
                            </button>}
                    </div>
                </div>
                {showSearch && <div className='py-[30px]'>
                    <div className='flex items-center gap-[20px] justify-between max-w-[1552px]  w-full m-auto'>
                        <button className='disabled:opacity-20' onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 100, -10);
                        }}
                            disabled={arrowDisable}>
                            <PostImage alt="Arrow-Icon" src={ArrowIcon} width={28} height={28} />
                        </button>
                        <div className='overflow-auto max-w-[1401px]  w-full gap-[20px] flex items-center category-slider no-scrollbar' ref={elementRef}>
                            {
                                categoryList.map((item, index) => {
                                    return (
                                        <button onClick={() => dispatch(setCategory(item))} key={index} className={`border-2 border-boundary transition-all font-sans 0.2s ease-in-out hover:border-primary ${category === item && "border-primary"} text-[16px] leading-[19.2px] font-normal rounded-[50px] py-[10px] px-[20px]`}>
                                            {item}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <button onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 100, 10);
                        }} className='rotate-180'>
                            <PostImage alt="Arrow-Icon" src={ArrowIcon} width={28} height={28} />
                        </button>
                    </div>
                </div>}
            </div>
            <div className='m-auto max-w-[1552px] w-full md:px-[16px] sm:px-[16px] pt-[50px]'>
                {children}
            </div>
        </div >

    )
}

export default HeaderLayout


export const categoryList = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
]