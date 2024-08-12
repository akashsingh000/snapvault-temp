import React from 'react'
import Modal from 'react-modal';
import { signIn } from 'next-auth/react';
import styles from "../styles/modal.module.css"
import { LoginIcon } from './ui-elements/svgs';
import PostImage from './ui-elements/PostImage';
import Logo from "../assets/images/sv-logo.png";
import useResponsive from 'components/hooks/useResponsive';

const LoginModal = (props) => {
    const { isOpen, onClose } = props;
    const { isMobile, isTablet } = useResponsive();

    const handleLogin = () => {
        signIn("google").then(() => {
            onClose();
        })
    }

    return (
        <>
            <Modal
                isOpen={isOpen} // The modal should always be shown on page load, it is the 'page'
                onRequestClose={onClose}
                // onRequestClose={() => router.push(`/search/${search}`, undefined, { scroll: false })}
                className={styles.loginModal}
                overlayClassName={styles.loginModal_Overlay}
            >
                <div className='flex flex-col gap-[30px] items-center'>
                    <PostImage alt="logo" src={Logo} width={isTablet ? 120 : isMobile ? 120 : 188.84} height={isMobile ? 20 : 40} />
                    <button onClick={handleLogin} className='flex w-full items-center gap-[8px] bg-primary justify-center  lg:mt-0 sm:mt-[16px] rounded-[8px] px-[20px] py-[12px]'>
                        <LoginIcon />
                        <div className='text-white font-sans leading-[22px] text-[16px] font-medium'>Login with Google</div>
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default LoginModal