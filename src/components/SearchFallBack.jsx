import { useRouter } from 'next/router'
import HeaderLayout from './headerLayout'
import PostImage from './ui-elements/PostImage'
import SearchIcon from "../assets/images/searchIcon.svg"
import { useState } from 'react'
import { scroll_position } from 'components/redux/slices/imageListSlice'
import { useDispatch } from 'react-redux'

const SearchFallBack = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length > 0) {
            router.push(`/search/${search}`);
            dispatch(scroll_position(null))
        }
    }
    return (
        <HeaderLayout>
            <section className="flex  items-center h-full p-16 dark:text-gray-800">
                <div className="container flex items-center justify-center  mx-auto my-8">
                    <div className="text-center">
                        {/* <Link href="/"><PostImage alt="logo" src={Logo} width={isTablet ? 120 : isMobile ? 120 : 188.84} height={isMobile ? 20 : 40} /></Link> */}
                        <div className="text-2xl mt-[50px] font-semibold md:text-3xl">Sorry, we {"couldn't"} find this item.</div>
                        <div className="pt-[50px]">
                            <form onSubmit={handleSubmit} className="lg:w-[758px] h-[64px] drop-shadow-lg flex items-center justify-between  sm:w-full md:sm-full py-[10px] pl-[30px] pr-[10px] rounded-[50px] bg-white border-2 border-[#E3212466] overflow-hidden">
                                <input value={search} onChange={(e) => setSearch(e.target.value)} className="placeholder:text-pHColor w-full font-inter placeholder:font-inter font-medium placeholder:text-[16px] outline-none" placeholder="Search images and vectors" />
                                <button type="submit" className="bg-primary px-[16px] py-[12px] h-[44px] w-full max-w-[113px] text-white flex items-center rounded-[38px] gap-[8px]">
                                    <PostImage alt="logo" src={SearchIcon} width={20} height={20} />
                                    <div className="text-white text-[16px] font-normal font-inter">Search</div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </HeaderLayout>
    )
}

export default SearchFallBack