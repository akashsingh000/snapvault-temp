import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import Article from '../../components/Article';
import CloseIcon from "../../assets/images/closeIcon.svg";
import PostImage from 'components/components/ui-elements/PostImage';
import styles from "../../styles/modal.module.css";
import SearchComp from 'components/components/searchComp';
import HeaderLayout from 'components/components/headerLayout';
import { apis } from 'components/apis/endpoints';
import Meta from 'components/components/MetaHeads';

Modal.setAppElement('#__next');

const ArticlePage = (props) => {
  const router = useRouter();
  const { modal } = router.query;
  const keywords = props.data && props.data?.title.split(" ").join(",");
  // useEffect(() => {
  //   router.prefetch(`/search/${search}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);




  return (
    <>
      <Meta
        image={props.data?.url}
        title={`${props.data.title} - SnapVault`}
        description={props.data?.title}
      />
      {
        (modal === "true") ? <>
          <Modal
            isOpen={true} // The modal should always be shown on page load, it is the 'page'
            onRequestClose={() => router.back()}
            // onRequestClose={() => router.push(`/search/${search}`, undefined, { scroll: false })}
            className={styles.Modal}
            overlayClassName={styles.Overlay}

          >
            <button onClick={() => router.back()} className='fixed lg:right-[-71px] sm:right-[16px] p-[12px] rounded-[100px] top-[15px] bg-[#000000b8]'>
              <PostImage src={CloseIcon} alt="close" width={32} height={32} />
            </button>
            <Article pathname={router.pathname} data={props.data} />
          </Modal>
          <SearchComp />
        </> :
          <HeaderLayout showSearch>
            <Article pathname={router.pathname} data={props.data} />
          </HeaderLayout>
      }

    </>
  )
};

export default ArticlePage;

export async function getServerSideProps(ctx) {
  const route = ctx.query.photoId;

  const id = (route.split("-").at(-1))

  try {
    const response = await apis.getData(id)
    return {
      props: { data: response.data },
    };
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        destination: "/no-results"
      }
    }
  }

}

