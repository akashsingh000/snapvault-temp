import { useRouter } from "next/router"
import { useEffect } from "react";


const NotFound = () => {


    const router = useRouter();

    useEffect(() => {
        router.push("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>NotFound</div>
    )
}

export default NotFound


// export function getStaticProps() {
//     return {
//         redirect: {
//             destination: '/',
//             fallback: false,
//         },
//     };
// };