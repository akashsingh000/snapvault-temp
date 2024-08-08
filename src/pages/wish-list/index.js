import React, { useState } from 'react'
import HeaderLayout from 'components/components/headerLayout'
import PhotosIcon from "../../assets/images/photosIcon.svg"
import VectorIcon from "../../assets/images/vectorIcon.svg";
import OptionIcon from "../../assets/images/optionsIcon.svg";
import PostImage from 'components/components/ui-elements/PostImage'

const WishListPage = () => {

    return (
        <HeaderLayout showSearch>
            <div className='font-sans font-semibold text-[24px] leading-[28.8px] text-[#00000] mb-[30px]'>Your Wish-List {" "}</div>
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
        <div className='sm:m-auto  relative lg:m-0 max-w-[286px] md:m-0 p-[16px] w-full border-[2px] border-boundary rounded-[8px] h-auto' >
            <div className='rounded-[8px] overflow-hidden w-full h-[auto] border-red border-[1px]'>
                <PostImage h={true} alt="thumb" src={"https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600"} width={250} height={250} />
            </div>
            <div className='flex gap-[16px]'>
                <div className='w-full'>
                    <div className='flex items-center pt-[16px] justify-between'>
                        <div className='font-sans text-[18px] text-black leading-[24px] font-medium' >Sample</div>
                        <button className='flex rounded-[88px] top-[8px] items-center gap-[4px] bg-[#FFFFFF4D]'>
                            <PostImage alt="Photos-Icon" src={OptionIcon} width={20} height={20} />
                        </button>
                    </div>
                    <div className='flex items-center pt-[16px]'>
                        {n % 2 === 0
                            ? <button className='flex rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D]'>
                                <PostImage alt="Photos-Icon" src={PhotosIcon} width={20} height={20} />
                                <div className='font-sans text-[13px] text-black leading-[24px] font-medium' >Photos</div>
                            </button>
                            : <button className='flex rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D]'>
                                <PostImage alt="Photos-Icon" src={VectorIcon} width={20} height={20} />
                                <div className='font-sans text-[13px] text-black leading-[24px] font-medium' >Vectors</div>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}