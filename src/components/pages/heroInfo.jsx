import React from 'react';
import { useParams } from 'react-router-dom'
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
import md5 from "md5";
import PageLayout from "../pageLayout";
import { useEffect, useState } from 'react';
import '../style/heroInfo.css';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const heroInfo = () => {
    const { id } = useParams()
    const [name, setName] = useState(null);
    const [charImg, setImg] = useState(null);
    const [disc, setDisc] = useState("unfortunately, there is no description for this character.");
    const [comics, setComics] = useState(null);
    const [chartData, setChartData] = useState([]);

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
            if (hero.data.results[0].description !== "") {
                setDisc(hero.data.results[0].description)
            }
            setComics(hero.data.results[0].comics.items);
            setChartData(prevArray => [...prevArray, hero.data.results[0].comics.available]);
            setChartData(prevArray => [...prevArray, hero.data.results[0].series.available]);
            setChartData(prevArray => [...prevArray, hero.data.results[0].stories.available]);
            setChartData(prevArray => [...prevArray, hero.data.results[0].comics.returned]);
            setChartData(prevArray => [...prevArray, hero.data.results[0].series.returned]);
            setChartData(prevArray => [...prevArray, hero.data.results[0].stories.returned]);
        }
        
        fetchItems();

        
    }, []);

    return (
        <PageLayout>
        <div className='center-content'>
            <div className='container'>
                <div className='top'>
                    <div className='basic-info'>
                        <img src={charImg} alt='character' />
                        <h1>{name}</h1>
                    </div>
                    <div className='info'>
                        <h2>Description</h2>
                        <p>{disc}</p>
                    </div>
                </div>
                <div className='bottom'>
                    <h2>Comics</h2>
                    <div className='comics'>
                        {comics && comics.map((comic, index) => {
                            return (
                                <div key={index} className='comic'>
                                    <p>{comic.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='chart'>
                    <Bar
                        data={{
                            // Name of the variables on x-axies for each bar
                            labels: ["comics", "series", "stories", "comics returned", "series returned", "stories returned"],
                            datasets: [
                                {
                                    // Label for bars
                                    label: "total count/value",
                                    // Data or value of your each variable
                                    data: chartData,
                                    // Color of each bar
                                    backgroundColor: 
                                        ["aqua", "green", "red", "yellow"],
                                    // Border color of each bar
                                    borderColor: ["aqua", "green", "red", "yellow"],
                                    borderWidth: 0.5,
                                },
                            ],
                        }}
                        // Height of graph
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                  beginAtZero: true,
                                },
                              },
                            legend: {
                                labels: {
                                    fontSize: 15,
                                },
                            },
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Comics, Series, and Stories",
                                    fontSize: 20,
                                    color: "white",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
        </PageLayout>
    )
}

export default heroInfo