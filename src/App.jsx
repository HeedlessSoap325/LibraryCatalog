import './App.css'
import Book from "./components/Book.jsx";
import Search from "./components/Search.jsx";
import {useState} from "react";

export default function App() {
    const [data, setData] = useState({});
    return (
    <>
        {/*
            Testdata:
            <div className={"book-wrapper"}>
              <Book
                title={"Harry Potter and the Philosopher's Stone"}
                author={"J. K. Rowling"}
                first_published={1997}
                editions={349}
                cover_id={10521270}
                languages={["ara", "ita", "eng", "kor", "spa", "ger", "kal", "mar", "dut", "pol", "vie", "gla", "fre", "lav", "hrv", "per", "jpn", "urd", "ben", "por", "fin", "ltz", "lat", "dan", "ukr", "heb", "tur", "cat", "afr", "tib", "tha", "swe", "gre", "ice", "rum", "alb", "gle", "grc", "hun", "rus", "lit", "bul", "wel", "cze", "chi", "hin"]}
              />
            </div>
        */}
        <div className={"App-content"}>
            <div className={"search-wrapper"}>
                <Search setData={setData} />
            </div>

            <div className={"hits-wrapper"}>
                {data.numFound !== undefined ?
                    <span className={"hits-num"}>Found {data.numFound} Items</span>
                    : <></>
                }
            </div>

            <div className={"book-wrapper"}>
                {data.docs !== undefined ? data.docs.map((book) => (
                    <div className={"book"}>
                        <Book title={book.title} author={book.author_name} first_published={book.first_publish_year} editions={book.edition_count} cover_id={book.cover_i} languages={book.language}/>
                    </div>
                )) : <></>}
            </div>
        </div>
    </>
  )
}