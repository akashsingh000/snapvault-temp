import React, { useState } from 'react'
import HeaderLayout from 'components/components/headerLayout'
import PhotosIcon from "../../assets/images/photosIcon.svg"
import VectorIcon from "../../assets/images/vectorIcon.svg";
import OptionIcon from "../../assets/images/optionsIcon.svg";
import PostImage from 'components/components/ui-elements/PostImage'
import Link from 'next/link';

const WishListPage = () => {

    return (
        <HeaderLayout showSearch>
            <div className='font-sans font-semibold text-[24px] leading-[28.8px] text-[#00000] mb-[30px]'>Your Collections {" "}</div>
            <div className='m-auto w-full flex items-center md:flex-wrap sm:flex-wrap gap-[16px]'>
                {[...new Array(10)].map((item, n) => {
                    return (
                        <Thumbnail key={n} {...{ n }} />
                    )
                })
                }
            </div>
        </HeaderLayout>
    )
}

export default WishListPage



const Thumbnail = ({ n }) => {

    return (
        <Link href={`/wish-list`} className='sm:m-auto  relative lg:m-0 max-w-[284px] md:m-0 p-[16px] w-full border-[2px] border-boundary rounded-[8px] h-[92px]' >
            <div className='flex gap-[16px]'>
                <div className='rounded-[8px] overflow-hidden w-[40px] h-[40px] border-red border-[1px]'>
                    <PostImage h={true} alt="thumb" src={"https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600"} width={40} height={40} />
                </div>
                <div>
                    <div className='font-sans text-[18px] text-black leading-[24px] font-medium' >Sample</div>
                    <button className='flex rounded-[88px] absolute top-[8px] right-[8px] items-center gap-[4px] bg-[#FFFFFF4D] px-[12px] py-[8px]'>
                        <PostImage alt="Photos-Icon" src={OptionIcon} width={20} height={20} />
                    </button>
                    <div className='flex items-center pt-[16px]'>
                        {n % 2 === 0
                            ? <button className='flex rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D]'>
                                <PostImage alt="Photos-Icon" src={PhotosIcon} width={20} height={20} />
                            </button>
                            : <button className='flex rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D]'>
                                <PostImage alt="Photos-Icon" src={VectorIcon} width={20} height={20} />
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}