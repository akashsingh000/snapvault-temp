import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LazyLoad from 'react-lazy-load';
import PostImage from './ui-elements/PostImage';
import PhotosIcon from "../assets/images/photosIconWhite.svg";
import Download from "../assets/images/downloadIcon.svg";
import { scroll_position } from 'components/redux/slices/imageListSlice';
import "../styles/thumbnail.module.css";
import styled from '@emotion/styled';
import { LikeIcon } from './ui-elements/svgs';
const Thumbnail = (props) => {
    const { img, dispatch, setPageLoading, downloadImage, sessionStatus, onOpen } = props;
    const [hover, setHover] = useState(false);
    const namedRoute = img.title.replace(/ /g, "-");
    const [like, setLike] = useState(true)

    const handleLike = () => {
        if (sessionStatus.status !== "authenticated") {
            onOpen()
        } else {
            setLike(p => !p)
        }
    }


    return (
        <LazyLoad height={330}>
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                onClick={() => {
                    props.dispatch(scroll_position(`item_${img.id}`));
                }}
                className='relative'>
                <Link
                    href={{
                        pathname: "/photo/[photoId]",
                        query: { modal: true },
                    }}
                    as={`/photo/${namedRoute}-${img.id}`}
                    scroll={true}
                    modal={"true"}
                    id={`item_${img.id}`}
                >
                    <div
                        className='relative overflow-hidden h-[330px] w-[100%] rounded-[12px] ' >

                        <Image
                            alt={img.title}
                            src={img.thumbnail_path}
                            width={0}
                            height={0}
                            quality={70}
                            priority={true}
                            sizes="100vw"
                            className={`absolute md:max-w-[496px] sm:w-full lg:max-w-[496px] w-[100%] h-[330px] z-[-1] object-cover`}
                        />
                        <Box className={`border-3 ${hover === true ? "opacity-100" : "opacity-0"} transition-opacity 1s ease-in-out z-[10] rounded-[12px] w-[100%] h-[100%] absolute text-white`}>

                        </Box>
                    </div>
                </Link>
                {hover && <div className={`top-[20px] px-[20px] flex items-center justify-between w-full absolute`}>
                    <div>
                        {img?.source_name && <button className='flex z-[-1] left-[20px] rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D]  px-[12px] py-[8px]'>
                            <PostImage alt="Photos-Icon" src={PhotosIcon} width={20} height={20} />
                            <div className='text-white font-sans leading-[22px] text-[16px] capitalize font-medium'>{img?.source_name}</div>
                        </button>}
                    </div>
                    <button onClick={handleLike} className='z-[1] top-[20px] right-[20px] rounded-[88px] items-center gap-[4px] '>
                        <LikeIcon color={like == true ? "#FFFFFF4D" : "#E32124"} />
                    </button>
                </div>}
                <div className={`absolute ${hover === true ? "opacity-100" : "opacity-0"} bottom-0 w-[100%]`}>
                    <div className='p-[20px] relative flex items-center justify-between'>
                        <div className='font-sans text-white font-semibold text-[18px] leading-[38px] left-[20px] w-[280px] truncate'>{img.title}</div>
                        <button onClick={() => {
                            dispatch(setPageLoading("loading"))
                            downloadImage(img.download_path, namedRoute).then((data) => {
                                dispatch(setPageLoading("succeeded"));
                            })
                        }} className='flex max-w-[141px] w-full items-center  gap-[8px] bg-primary rounded-[88px] px-[20px] py-[12px]'>
                            <PostImage alt="Download" src={Download} width={20} height={20} />
                            <div className='text-white font-sans leading-[22px] text-[16px] font-medium'>Download</div>
                        </button>
                    </div>
                </div>
            </div>
        </LazyLoad >
    )
}

export default Thumbnail



const Box = styled.div`
background-image: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
z-index: -1;
`