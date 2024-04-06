import react from 'react';
import { useParams } from 'react-router-dom'
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
import md5 from "md5";
import PageLayout from "../pageLayout";
import { useEffect, useState } from 'react';

const heroInfo = () => {
    const { id } = useParams()
    const [name, setName] = useState(null);
    const [charImg, setImg] = useState(null);

    const getUrl = () => {
        const ts = Date.now();
        // Create a new URLSearchParams object and set the necessary query parameters
        const params = new URLSearchParams({

          ts: ts,
          apikey: PUBLIC_KEY,
          hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY), // Generate hash for authentication
        });
        // Construct the endpoint URL for searching comics with the query parameters
        const endpoint = `http://gateway.marvel.com/v1/public/characters/${id}?`; // Notice the question mark to start the query parameters.

        // Combine the endpoint URL with the query parameters to form the complete API request URL
        const url = endpoint + params;

        // Return the complete API request URL
          return url;
    }

    useEffect(() => {
        const fetchItems = async () => {
            const theUrl = getUrl();
            const data = await fetch(theUrl);
            const hero = await data.json();

            setName(hero.data.results[0].name);
            setImg(hero.data.results[0].thumbnail.path + '.' + hero.data.results[0].thumbnail.extension);

        }
        
        fetchItems();

        
    }, []);

    return (
        <PageLayout>
        <div className='container'>
        <img src={charImg} alt='character' />
        <h1>{name}</h1>
        </div>
        </PageLayout>
    )
}

export default heroInfo