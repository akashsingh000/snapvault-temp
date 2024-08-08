import { useEffect, useState } from "react";

const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const breakpoints = {
        mobile: 640,
        tablet: 1024,
    };

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowSize({ width, height });

            setIsMobile(width < breakpoints.mobile);
            setIsTablet(width >= breakpoints.mobile && width < breakpoints.tablet);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
        //eslint-disable-next-line
    }, []);

    return { windowSize, isMobile, isTablet, isMobileOrTablet: isMobile || isTablet };
};

export default useResponsive;
