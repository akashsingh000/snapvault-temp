import Head from "next/head";
import React from "react";

const Meta = ({ title, description, keywords, image }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={image ? image : "/sv-logo.png"}
                ></link>
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content={image ? image : "/sv-logo.png"}
                />
                {/* <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                /> */}
                <meta
                    property="og:description"
                    name="description"
                    content={description}
                />
                <meta name="keywords" content={keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000"></meta>
            </Head >
        </>
    );
};

export default Meta;
