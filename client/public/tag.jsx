const TagIcon = () => {
    return (
        <svg width="24px" height="34px" viewBox="0 0 24 34" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <polygon class="ipc-watchlist-ribbon__bg-ribbon" fill="#000000"
                points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
            <polygon class="ipc-watchlist-ribbon__bg-hover"
                points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
            <polygon class="ipc-watchlist-ribbon__bg-shadow"
                points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
        </svg>
    )
}

export default TagIcon