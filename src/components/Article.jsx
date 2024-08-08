
import { useState } from 'react'
import { useRouter } from 'next/router'
import PostImage from './ui-elements/PostImage'
import Download from "../assets/images/downloadIcon.svg"
import PhotosIcon from "../assets/images/photosIconWhite.svg"
import { LikeIcon } from './ui-elements/svgs'
import useResponsive from 'components/hooks/useResponsive'
import { categoryList } from './headerLayout'
import Link from 'next/link'
const Post = ({ data }) => {
  const router = useRouter();
  const [like, setLike] = useState(false)
  const { query } = router;
  const { isMobileOrTablet } = useResponsive()


  return data && (
    <div className={query.modal === "true" ? 'lg:w-[1452px]' : 'lg:max-w-[1288px] w-full pb-[50px] mx-auto'}>
      <div className='flex md:flex-nowrap sm:flex-wrap items-center gap-[20px] justify-between' >
        <div className="flex w-full justify-between items-center">
          <div className={`font-sans font-semibold md:text-[28px] text-left sm:leading-[16px] w-full md:leading-[28px] sm:text-[16px] lg:text-[28px] lg:leading-[38px] text-black`}>{data.title}</div>
          <button onClick={() => setLike(p => !p)} className='z-[1] boreder-5 border-red-50 top-[20px] right-[20px] rounded-[88px] items-center gap-[4px] px-[12px] py-[8px]'>
            <LikeIcon color={like == true ? "#00000080" : "#E32124"} />
          </button>
        </div>
        <div className='lg:w-[141px] sm:w-full md:w-[auto]'>
          <button className='flex items-center gap-[8px] bg-primary justify-center  lg:mt-0 sm:mt-[16px] rounded-[88px] px-[20px] py-[12px]'>
            <PostImage alt="download_icon" src={Download} width={20} height={20} />
            <div className='text-white font-sans leading-[22px] text-[16px] font-medium'>Download</div>
          </button>
        </div>
      </div>
      <div className={`mt-[37px] rounded-[10px] ${isMobileOrTablet ? "auto" : "h-[968px]"} w-full overflow-hidden relative`}>
        <button className='flex absolute top-[30px] left-[30px] rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D] px-[12px] py-[8px]'>
          <PostImage alt="photo-icon" src={PhotosIcon} width={20} height={20} />
          <div className='text-white font-sans leading-[22px] text-[16px] font-medium'>Photos</div>
        </button>
        <div>
          <PostImage alt={data?.title} src={data?.url} width={query.modal === "true" ? 1452 : 1288} height={query.modal === "true" ? 968 : 858} />
        </div>
      </div>
      <div className='border-3 pt-[50px] text-left'>
        <div className='font-sans text-[24px] leading-[28.8px] font-semibold text-black'>Related Keywords</div>
        <div className='pt-[30px]'>
          <div className='flex items-center flex-wrap gap-[20px]'>
            {
              categoryList.map((item, index) => {
                return (
                  <button key={index} className='border-0 bg-[#0000000D] text-black text-[16px] leading-[19.2px] font-normal rounded-[50px] py-[10px] px-[20px]'>
                    {item}
                  </button>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className='pt-[50px] text-left'>
        <div className='font-sans text-[24px] leading-[28.8px] font-semibold text-black'>Source Information</div>
        <div className='pt-[30px] font-sans text-[18px] leading-[21.6px] font-medium text-black'>Source name: <span className='text-[#666666] font-normal'>Shutterstock</span></div>
        <div className='pt-[10px] font-sans text-[18px] leading-[21.6px] font-medium text-black'>Source Id: <span className='text-primary font-normal underline'><Link href="/">2360790443</Link></span></div>
      </div>
    </div >
  )
}

export default Post
