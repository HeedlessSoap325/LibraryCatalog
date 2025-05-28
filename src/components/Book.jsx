import "../css/Book.css";
import {getLanguageFromCode} from "../JS/LanguageUtils.js";

export default function Book({title, author, first_published, editions, cover_id, languages}){
    return(
        <div className={"book-container"}>
            <img
                className={"book-cover"}
                src={cover_id !== undefined ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg` : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fantascienza.com%2Fcatalogo%2Fimg%2Fnocover.png&f=1&nofb=1&ipt=6c621b49513852b2b93067d9f0fff87f31d4303bd9d1082555be35d732395750"}
                alt={`Cover of the book ${title} written by ${author}`}
            />
            <div className={"book-details"}>
                <h1 className={"book-title"}>{title}</h1>
                <p className={"book-author"}>written by <i>{author}</i></p>
                <p className={"book-info"}>First published in {first_published} - {editions} editions</p>
                <p className={"book-languages-text"}>Available Languages:</p>
                <div className="book-languages-list">
                    {languages !== undefined ? languages.map(language => (
                        <p className={"book-language"}>{getLanguageFromCode(language)}</p>
                    )) : "Not Available"}
                </div>
            </div>
        </div>
    );
}