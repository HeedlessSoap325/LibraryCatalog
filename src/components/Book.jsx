import "../css/Book.css";

export default function Book({title, author, first_published, editions, cover_id, languages}){
    return(
        <div className={"book-container"}>
            <img
                className={"book-cover"}
                src={cover_id !== undefined ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg` : "https://openlibrary.org/images/icons/avatar_book-lg.png"}
                alt={`Cover of the book ${title} written by ${author}`}
            />
            <div className={"book-details"}>
                <h1 className={"book-title"}>{title}</h1>
                <p className={"book-author"}>written by <i>{author}</i></p>
                <p className={"book-info"}>First published in {first_published} - {editions} editions</p>
                <p className={"book-languages-text"}>Available Languages:</p>
                <div className="book-languages-list">
                    {languages !== undefined ? languages.map(language => (
                        <p className={"book-language"}>{language}</p>
                    )) : "Not Available"}
                </div>
            </div>
        </div>
    );
}