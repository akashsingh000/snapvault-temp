
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import PostImage from './ui-elements/PostImage'
import Download from "../assets/images/downloadIcon.svg"
import { useSession } from 'next-auth/react'
import PhotosIcon from "../assets/images/photosIconWhite.svg"
import { LikeIcon } from './ui-elements/svgs'
import useResponsive from 'components/hooks/useResponsive'
import { ContentLoader } from './ui-elements/dataLoader'
import LoginModal from './loginModal'
import Link from 'next/link'
import { setLoading } from 'components/redux/slices/imageByIdSlice'

const Post = ({ data }) => {
  const router = useRouter();
  const sessionData = useSession()
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { query } = router;
  const { isMobileOrTablet } = useResponsive();
  const { status } = useSelector(store => store.photoById);
  const dispatch = useDispatch();

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)


  const downloadImage = useCallback(async (url, filename) => {
    if (url && filename) {
      dispatch(setLoading("loading"))
      await axios.post("/api/image-download", { image: url, filename }).then((data) => {
        if (data.status === 200) {
          const downloadLink = document.createElement("a");
          downloadLink.href = data.data.image; //URL.createObjectURL(blob);
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          toast.success("Image downloaded successfully.")
          dispatch(setLoading("succeeded"))
        }
      }).catch((err) => {
        dispatch(setLoading("failed"))
        toast.error(err.message)
      })
    }
  }, [])

  const handleLike = () => {
    if (sessionData.status !== "authenticated") {
      onOpen()
    } else (
      setLike(p => !p)
    )
  }

  return data && (
    <div className={query.modal === "true" ? 'lg:w-[100%]' : 'lg:max-w-[1288px] w-full pb-[50px] mx-auto'}>
      <ContentLoader loading={status === "loading"} />
      <div className='flex md:flex-nowrap sm:flex-wrap items-center gap-[20px] justify-between' >
        <div className="flex w-full justify-between items-center">
          <div className={`font-sans font-semibold md:text-[28px] text-left sm:leading-[16px] w-full md:leading-[28px] sm:text-[16px] lg:text-[28px] lg:leading-[38px] text-black`}>{data.title}</div>
          <button onClick={handleLike} className='z-[1] boreder-5 border-red-50 top-[20px] right-[20px] rounded-[88px] items-center gap-[4px] px-[12px] py-[8px]'>
            <LikeIcon color={like !== true ? "#00000080" : "#E32124"} />
          </button>
        </div>
        <div className='lg:w-[141px] sm:w-full md:w-[141px]'>
          <button onClick={() => {
            downloadImage(data.download_path, data.title.replace(/ /g, "-"))
          }} className='flex items-center gap-[8px] w-full bg-primary justify-center rounded-[88px] px-[20px] py-[12px]'>
            <div className='w-[20px] h-[20px]'>
              <PostImage alt="download_icon" src={Download} width={20} height={20} />
            </div>
            <div className='text-white font-sans leading-[22px] text-[16px] font-medium'>Download</div>
          </button>
        </div>
      </div>
      <div className={`mt-[37px] rounded-[10px] ${isMobileOrTablet ? "h-[auto]" : "h-[968px]"} w-full overflow-hidden relative`}>
        <button className='flex absolute top-[30px] left-[30px] rounded-[88px] items-center gap-[4px] bg-[#FFFFFF4D] px-[12px] py-[8px]'>
          <PostImage alt="photo-icon" src={PhotosIcon} width={20} height={20} />
          <div className='text-white font-sans leading-[22px] text-[16px] font-medium capitalize'>{data?.source_name}</div>
        </button>
        <div>
          <PostImage alt={data?.title} src={data?.download_path} width={query.modal === "true" ? 1452 : 1288} height={query.modal === "true" ? 968 : 858} />
        </div>
      </div>
      {data?.tags?.length > 0 && <div className='border-3 pt-[50px] text-left'>
        <div className='font-sans text-[24px] leading-[28.8px] font-semibold text-black'>Related Keywords</div>
        <div className='pt-[30px]'>
          <div className='flex items-center flex-wrap gap-[20px]'>
            {
              data?.tags?.map((item, index) => {
                return (
                  <Link href={`/search/${item}`} key={index} className='border-0 capitalize bg-[#0000000D] text-black text-[16px] leading-[19.2px] font-normal rounded-[50px] py-[10px] px-[20px]'>
                    {item}
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>}
      <div className='pt-[50px] text-left'>
        <div className='font-sans text-[24px] leading-[28.8px] font-semibold text-black'>Source Information</div>
        <div className='pt-[30px] font-sans text-[18px] leading-[21.6px] font-medium text-black'>Source name: <span className='text-[#666666] font-normal capitalize'>{data?.source_name}</span></div>
        <div className='pt-[10px] font-sans text-[18px] leading-[21.6px] font-medium text-black'>Source Id: <span className='text-primary font-normal underline'><a target='_blank' href={data?.source_id_url}>{data?.source_id}</a></span></div>
      </div>
      <LoginModal {...{ isOpen, onClose }} />
    </div >
  )
}

export default Post
