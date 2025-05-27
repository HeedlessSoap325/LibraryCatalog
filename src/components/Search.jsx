import {useState} from "react";
import {getCodeFromLanguage, getLanguages} from "../JS/LanguageUtils.js";
import "../css/Search.css";
import SimpleInput from "./SimpleInput.jsx";
import data from "../testdata.json";

export default function Search({setData}){
    const [searchParams, setSearchParams] = useState({
        title: "",
        author: "",
        subject: "",
        place: "",
        publisher: "",
        language: "",
        publish_year_first: 0,
        publish_year_last: new Date().getFullYear(),
        sort_option: "",
        ebooks_only: false
    })

    async function query(e){
        e.preventDefault();
        let query_string = generateQuery();

        let response = await fetch(`https://openlibrary.org/search.json?${query_string}`);
        let response_data = await response.json();

        let clearedData = {};
        clearedData["numFound"] = response_data["numFound"];

        clearedData["docs"] = response_data.docs.map(doc => ({
            author_name: doc.author_name,
            cover_i: doc.cover_i,
            edition_count: doc.edition_count,
            first_publish_year: doc.first_publish_year,
            language: doc.language,
            title: doc.title
        }));
        setData(clearedData);
    }

    function generateQuery(){
        let title = searchParams.title !== "" ? searchParams.title.trim().replace(" ", "+") : "";
        let author = searchParams.author !== "" ? `+author:${searchParams.author.trim().replace(" ", "+")}` : "";
        let subject = searchParams.subject !== "" ? `+subject:${searchParams.subject.trim().replace(" ", "+")}` : "";
        let place = searchParams.place !== "" ? `+place:${searchParams.place.trim().replace(" ", "+")}` : "";
        let publisher = searchParams.publisher !== "" ? `+publisher:${searchParams.publisher.trim().replace(" ", "+")}` : "";
        let language = searchParams.language !== "" ? `+language:${getCodeFromLanguage(searchParams.language)}` : "";

        if (searchParams.publish_year_first < 0 ||
            searchParams.publish_year_last < 0 ||
            searchParams.publish_year_first > searchParams.publish_year_last ||
            searchParams.publish_year_last > new Date().getFullYear()){
            console.error("Invalide Range of Publishing Dates!");
        }
        let publish_year = `+first_publish_year:[${searchParams.publish_year_first}+TO+${searchParams.publish_year_last}]`;
        let sort = searchParams.sort_option !== "" ? `&sort=${searchParams.sort_option}` : "";
        let mode = searchParams.ebooks_only ? "ebooks" : "everything";

        return `q=${title}${author}${subject}${place}${publisher}${language}${publish_year}${sort}&mode=${mode}`;
    }

    return(
        <div className={"search-container"}>
            <form className={"search-form"} onSubmit={(e) => query(e)}>
                <div className={"search-line-1"}>
                    <div className={"search-title-wrapper"}>
                        <SimpleInput required={true} value={searchParams.title} func={"Title"} params={searchParams} setter={setSearchParams}/>
                        <button className={"search-submit"} type={"submit"}>
                            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </button>
                    </div>

                    <div className={"search-modes"}>
                        <input className={"search-mode"} id={"mode-everything"} type={"radio"} name={"search-mode"} checked={!searchParams.ebooks_only} onChange={()=> setSearchParams({...searchParams, ebooks_only: false})}/>
                        <label htmlFor={"mode-everything"}>Everything</label>

                        <input className={"mode"} id={"mode-ebooks"} type={"radio"} name={"search-mode"} checked={searchParams.ebooks_only} onChange={()=> setSearchParams({...searchParams, ebooks_only: true})}/>
                        <label htmlFor={"mode-ebooks"}>Ebooks</label>
                    </div>
                </div>

                <div className={"search-line-2"}>
                    <SimpleInput value={searchParams.place} func={"Place"} params={searchParams} setter={setSearchParams} required={false}/>
                    <SimpleInput value={searchParams.subject} func={"Subject"} params={searchParams} setter={setSearchParams} required={false}/>
                    <select className={"search-language"} value={searchParams.language} onChange={(e) => setSearchParams({...searchParams, language: e.target.value})}>
                        <option key={"default"} value={""}>Language</option>
                        {getLanguages().map(language => (
                            <option key={language} value={language}>{language}</option>
                        ))}
                    </select>
                    <SimpleInput value={searchParams.publisher} func={"Publisher"} params={searchParams} setter={setSearchParams} required={false}/>
                </div>

                <div className={"search-line-3"}>
                    <SimpleInput value={searchParams.author} func={"Author"} params={searchParams} setter={setSearchParams} required={false}/>
                    <input className={"search-publish-year-first"} type={"text"} placeholder={"Lower Bound"} value={searchParams.publish_year_first} onChange={(e) => setSearchParams({...searchParams, publish_year_first: Number(e.target.value)})}/>
                    <span className="year-separator">–</span>
                    <input className={"search-publish-year-first"} type={"text"} placeholder={"Upper Bound"} value={searchParams.publish_year_last} onChange={(e) => setSearchParams({...searchParams, publish_year_last: Number(e.target.value)})}/>
                </div>

                <select className={"search-sort"} defaultValue={""} onChange={(e) => setSearchParams({...searchParams, sort_option: e.target.value})}>
                    <option value={""}>Relevance</option>
                    <option value={"new"}>Newest</option>
                    <option value={"old"}>Oldest</option>
                    <option value={"rating"}>Top Rated</option>
                    <option value={"editions"}>Most Editions</option>
                    <option value={"want_to_read"}>Most want to read</option>
                </select>
            </form>
        </div>
    );
}