import React from "react";
import { useEffect } from "react";
import { useState } from "react";
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
import md5 from "md5";
import './style/heroList.css';

const HeroList = () => {
    const [list, setList] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [modifiedList, setModifiedList] = useState("");
    const [dropdownValue, setDropdownValue] = useState("name");

    const getUrl = () => {
        const ts = Date.now();
        // Create a new URLSearchParams object and set the necessary query parameters
        const params = new URLSearchParams({

          ts: ts,
          apikey: PUBLIC_KEY,
          hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY), // Generate hash for authentication
          limit: 100,
          orderBy: dropdownValue,
        });
        if (searchInput !== "") {
            params.append("nameStartsWith", searchInput);
          }
        if (modifiedList !== "") {
            params.append("modifiedSince", modifiedList + "-01-01");
          }
        // Construct the endpoint URL for searching comics with the query parameters
        const endpoint = `http://gateway.marvel.com/v1/public/characters?`; // Notice the question mark to start the query parameters.
    
        // Combine the endpoint URL with the query parameters to form the complete API request URL
        const url = endpoint + params;
    
        // Return the complete API request URL
          return url;

    }
/*
    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredData = Object.keys(list.data.results).filter((item) => 
            Object.values(item)
              .join("")
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
          setFilteredResults(filteredData);
        } else {
          setFilteredResults(Object.keys(list.Data));
        }
      };
*/
    useEffect(() => {
        const fetchItems = async () => {
            const theUrl = getUrl();
            const data = await fetch(theUrl);
            const hero = await data.json();
            setList(hero);
        }
        
        fetchItems().catch(console.error);
        console.log(list);
        
    }, [searchInput, modifiedList, dropdownValue]);

    return (
        <div className="heroList">
            <h1>Marvel List</h1>
            <div className="filters">
            <input
                type="text"
                placeholder="Search..."
                onChange={(inputString) => setSearchInput(inputString.target.value)}
            />

            <input
                type="text"
                placeholder="Filter year last updated"
                onChange={(inputString) => setModifiedList(inputString.target.value)}
            />

            <select onChange={(e) => setDropdownValue(e.target.value)}>
              <option value="name">↑ name</option>
              <option value="-name">↓ name</option>
              <option value="modified">↑ updated</option>
              <option value="-modified">↓ updated</option>
              {/* Add more options as needed */}
            </select>
            </div>
            <ul>
                {console.log(list)}
                {list && Object.entries(list.data.results).map(([chara]) => 
                    <li key={list.data.results[chara].id}>
                        <br></br>
                        <img src={list.data.results[chara].thumbnail.path + '.' + list.data.results[chara].thumbnail.extension} alt={list.data.results[chara].name} />
                        {list.data.results[chara].name} 
                        <br></br>
                        last updated: 
                        
                        {" "+list.data.results[chara].modified.slice(0,4)}
                        <br></br>

                    </li>
                )
                }
            </ul>
        </div>
    );
}

export default HeroList;