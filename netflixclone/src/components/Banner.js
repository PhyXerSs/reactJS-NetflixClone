import './Banner.css'
import React, { useEffect, useState } from 'react'
import instance from '../axios';
import requests from '../requests';

export default function Banner() {
    const [movie , setMovie] = useState([]);
    const base_url= "https://image.tmdb.org/t/p/original";
    useEffect(()=>{
        async function fetchData(){
            const request =await instance.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length-1)
            ]);
        };
        fetchData();
    },[])
    
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage:`url(${base_url}${movie?.backdrop_path})`,
                backgroundPosition:"center center",
            }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner-buttons">
                    <button className="banner-button">Play</button>  
                    <button className="banner-button">My List</button>  
                </div>
                <h1 className="banner-description">{truncate(movie?.overview,150) }</h1>
            </div>

            <div className="banner-fadeBottom"/>      
        </header>
    )
}
