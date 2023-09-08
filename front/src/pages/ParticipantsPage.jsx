

export const ParticipantsPage = () => {

    let participants = [
        {
            name: "Team 1",
            description: "Karen",
            imageUrl: "https://plus.unsplash.com/premium_photo-1681248156422-c01a2c803588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        },
        {
            name: "Team 2",
            description: "Anna",
            imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        },
        {
            name: "Team 3",
            description: "Tumba",
            imageUrl: "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    ] //Получить с бэка

    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Участники</h2>
                {participants.map(h => <ParticipantCard
                    name={h.name}
                    description={h.description}
                    imageUrl={h.imageUrl}
                />)}
        </>
    )
}

const ParticipantCard = ({name, description, imageUrl}) => {
    return(
        <>
            <div className="m-5 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="md:flex rounded-t-lg" src={imageUrl} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Beep
                    </a>
                </div>
            </div>
        </>
    )
}