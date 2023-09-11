export const ScrollToTopButton = () =>{
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <button
            className="fixed bottom-5 right-5 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-800 text-white rounded-md p-2"
            onClick={() => handleScrollTop()}
        >
            Наверх
        </button>
    );
}
