function Note ({note}) {
    return (
        <div className="Note">
            <div className='content'>
                <h1>{note?.title}</h1>
                <p>{note?.body}</p>
            </div>
        </div>
    )
}

export default Note;
