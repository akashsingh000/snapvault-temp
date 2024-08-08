import Meta from 'components/components/MetaHeads'
import SearchFallBack from 'components/components/SearchFallBack'

const NoResults = () => {
    return (
        <>
            <Meta
                title={"SnapVault - no-results"}
                description={'SnapVault - Search and download photos you can use everywhere. Browse millions of high-quality photos.'}
            />
            <SearchFallBack />
        </>
    )
}

export default NoResults