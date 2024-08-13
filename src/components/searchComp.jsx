import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select"
import HeaderLayout from 'components/components/headerLayout';
import PostImage from 'components/components/ui-elements/PostImage';
import PhotosIcon from "../assets/images/photosIcon.svg";
import VectorIcon from "../assets/images/vectorIcon.svg";
import Pagiantion from 'components/components/Pagiantions';
import { decrement, increment, setPageLoading } from 'components/redux/slices/imageListSlice';
import { ContentLoader } from './ui-elements/dataLoader';
import Thumbnail from './thumbnail';
import { reactStyles } from 'components/helpers';
import LoginModal from './loginModal';
import { useSession } from 'next-auth/react';
const SearchComp = (props) => {
    const dispatch = useDispatch();
    const { photos: { data, image_type_count }, status, search } = useSelector(store => store.photos);
    const [isOpen, setIsOpen] = useState(false);
    const sessionStatus = useSession()
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
    const pageInput = (number) => {
        setCurrentPage(number)
    }

    const onPagePlus = () => {
        dispatch(increment())
    }
    const onPageMinus = () => {
        if (currentPage > 0) {
            dispatch(decrement())
        }
    }

    const downloadImage = useCallback(async (url, filename) => {
        if (url && filename) {
            await axios.post("/api/image-download", { image: url, filename }).then((data) => {
                if (data.status === 200) {
                    const downloadLink = document.createElement("a");
                    downloadLink.href = data.data.image; //URL.createObjectURL(blob);
                    downloadLink.download = filename;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    toast.success("Image downloaded successfully.")
                }

            }).catch((err) => {
                toast.error(err.message)
            })
        }
    }, [])

    // const goToFilterData = (uniqueIdentifier) => {
    //     const element = document.getElementById(uniqueIdentifier);
    //     element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // };

    // useEffect(() => {
    //     dispatch(fetchPhotos(current_page)).then(() => {
    //         if (scroll_position_id) {
    //             goToFilterData(scroll_position_id)
    //         }
    //     })
    //     //eslint-disable-next-line
    // }, [current_page, dispatch]);

    const options = [
        { value: 'vector', label: 'Vector' },
        { value: 'photos', label: 'Photos' },
    ]


    return (
        <HeaderLayout showSearch>
            {/* <PostCardGrid /> */}
            <div {...(router.pathname !== "/search/[search]" && { className: 'h-[calc(100vh-520px)] overflow-hidden' })}>
                <div className='w-full flex sm:flex-wrap md:flex-wrap items-center justify-between'>
                    <div className='font-sans font-normal text-[24px] leading-[28.8px] text-[#666666]'>Showing result for {" "}<span className='text-[32px] text-black font-semibold leading-[38.4px]'>{search || router?.query.search}</span></div>
                    <div className='max-w-[200px] w-full sm:flex-wrap sm:pt-[16px] md:pt-[16px] lg:pt-[0px]'>
                        <Select styles={reactStyles} options={options} placeholder="Select Category" />
                    </div>
                </div>
                <div className='flex items-center gap-[20px] pt-[30px]'>
                    <div className='flex items-center gap-[4px]'>
                        <PostImage alt="Photos-Icon" src={PhotosIcon} width={20} height={20} />
                        {image_type_count?.photo > 0 && <div className='font-sans font-medium text-[#666666] text-nowrap text-[16px] leading-[19.2px]'>{image_type_count?.photo} {image_type_count?.photo > 1 ? "Photos" : "Photo"}</div>}
                    </div>
                    {image_type_count?.vector > 0 && <div className='flex items-center gap-[4px]'>
                        <PostImage alt="Vector-Icon" src={VectorIcon} width={20} height={20} />
                        <div className='font-sans font-medium text-[#666666] text-[16px] leading-[19.2px] text-nowrap'>{image_type_count?.vector} {image_type_count?.vector > 1 ? "Vectors" : "Vectors"}</div>
                    </div>}
                </div>
                <div className='pt-[30px] border-3'>
                    <ContentLoader loading={status === "loading"} />
                    <div className="grid lg:grid-cols-3 gap-[32px] md:grid-cols-2 m-auto w-full sm:grid-cols-1">
                        {data?.map((img, index) => {
                            return (
                                <Thumbnail key={img.id} {...{ index, img, dispatch, setPageLoading, downloadImage, sessionStatus, onOpen }} />
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <Pagiantion {...{ onPagePlus, onPageMinus, currentPage, pageInput, setCurrentPage }} />
            <LoginModal {...{ isOpen, onClose }} />
        </HeaderLayout>
    )
}

export default SearchComp

