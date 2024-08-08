import { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SearchComp from 'components/components/searchComp';
import { fetchPhotos } from 'components/redux/slices/imageListSlice';
import Meta from 'components/components/MetaHeads';
const Search = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { scroll_position_id, current_page } = useSelector(store => store.photos);

    const goToFilterData = (uniqueIdentifier) => {
        const element = document.getElementById(uniqueIdentifier);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    };


    useEffect(() => {
        dispatch(fetchPhotos(current_page)).then(() => {
            if (scroll_position_id) {
                goToFilterData(scroll_position_id)
            }
        })
        //eslint-disable-next-line
    }, [current_page]);

    return (
        <>
            <Meta
                title={"SnapVault - Search Photos"}
                description={'SnapVault - Search and download photos you can use everywhere. Browse millions of high-quality photos.'}
            />
            <SearchComp />
        </>
    )
}

export default Search


// export async function getServerSideProps(ctx) {
//     const page = ctx.query.page ?? 0;
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=20`);
//     return {
//         props: { data: response.data },
//     };
// }