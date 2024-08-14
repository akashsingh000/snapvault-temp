import { incrementByAmount } from 'components/redux/slices/imageListSlice';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const Pagiantion = (props) => {
    const router = useRouter();
    const { query } = router;
    const dispatch = useDispatch();
    const { current_page } = useSelector(store => store.photos);
    const { onPageMinus, onPagePlus, pagination } = props

    return (
        <div className='w-full py-[102px]'>
            <div className='m-auto w-[261px] gap-[50px] flex items-center justify-between'>
                <button disabled={current_page <= 1} onClick={onPageMinus} className={`bg-[#0000000D] ${query.page < 1 && "pointer-events-none"}  p-[8px] disabled:opacity-50 rounded-[100px]`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_60_578)">
                            <path d="M15 6L9 12L15 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_60_578">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <div className='font-sans font-medium text-[16px] text-[#666666]'>
                    <div className='flex items-center gap-[8px]'>
                        <div className='w-[39px] h-[39px]  flex justify-center relative px-[10px] text-center rounded-[4px] border-1 border-boundary text border-2'>
                            <div className='leading-[19.2px] text-[#4B70F5] m-auto'>{current_page}</div>
                        </div>

                        <div className=''>
                            /
                        </div>
                        <div className='w-[38px]'>
                            {pagination?.total_pages}
                        </div>
                    </div>
                </div>
                <button disabled={current_page >= pagination?.total_pages} onClick={onPagePlus} className='bg-[#0000000D] disabled:opacity-50 p-[8px] rounded-[100px]'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_23_383)">
                            <path d="M9 6L15 12L9 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_23_383">
                                <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div >
    )
}

export default Pagiantion