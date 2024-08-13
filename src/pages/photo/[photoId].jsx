import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { wrapper } from 'components/redux';
import Article from '../../components/Article';
import CloseIcon from "../../assets/images/closeIcon.svg";
import PostImage from 'components/components/ui-elements/PostImage';
import styles from "../../styles/modal.module.css";
import SearchComp from 'components/components/searchComp';
import HeaderLayout from 'components/components/headerLayout';
import Meta from 'components/components/MetaHeads';
import { fetchPhotoById } from 'components/redux/slices/imageByIdSlice';
import useResponsive from 'components/hooks/useResponsive';

Modal.setAppElement('#__next');

const ArticlePage = (props) => {
  const { photo } = useSelector(store => store.photoById)
  const router = useRouter();
  const { modal } = router.query;
  const keywords = props.data && props.data?.title.split(" ").join(",");
  const { isMobileOrTablet } = useResponsive()

  return (
    <>
      <Meta
        image={photo?.thumbnail_path}
        title={`${photo.title} - SnapVault`}
        description={photo?.title}
        keywords={keywords}
      />
      {
        (modal === "true") ? <>
          <Modal
            isOpen={true}
            onRequestClose={() => router.back()}
            // onRequestClose={() => router.push(`/search/${search}`, undefined, { scroll: false })}
            className={styles.Modal}
            overlayClassName={styles.Overlay}

          >
            <button onClick={() => router.back()} className='fixed lg:right-[-71px] sm:right-[16px] p-[12px] rounded-[100px] top-[15px] bg-[#000000b8]'>
              <PostImage src={CloseIcon} alt="close" width={isMobileOrTablet ? 16 : 32} height={isMobileOrTablet ? 16 : 32} />
            </button>
            <Article pathname={router.pathname} data={photo} />
          </Modal>
          <SearchComp />
        </> :
          <HeaderLayout showSearch>
            <Article pathname={router.pathname} data={photo} />
          </HeaderLayout>
      }

    </>
  )
};

export default ArticlePage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      let data = {}
      const photoId = context.query.photoId.split("-").at(-1);
      await store.dispatch(fetchPhotoById(photoId)).then(({ payload }) => {
        data = payload
      })
      if (data) {
        return {}
      }
      return {
        redirect: {
          destination: "/no-results"
        }
      }
    }

)