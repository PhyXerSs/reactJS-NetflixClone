import './Row.css';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

import instance from '../axios';
// import Swiper core and required modules
import SwiperCore, {
    Pagination,Navigation
  } from 'swiper';
  
// install Swiper modules
SwiperCore.use([Pagination,Navigation]);
// await movieTrailer( 'Up' )

export default function Row(props) {
    const { title ,fetchUrl ,isLargeRow } = props;
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState('');
    const base_url= "https://image.tmdb.org/t/p/original";

    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };
        fetchData();
        
    },[fetchUrl]);
    // console.table(movies)
    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };
    // console.log(movies);
    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            // console.log(movie?.name||movie?.original_name||movie?.original_title);
            movieTrailer(movie?.name||movie?.original_name||movie?.original_title)
                .then(url =>{
                    // console.log('url:',url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(err=>{
                    console.log(err);
                })
        }
    }

    

    return (
        <div className="row" >
            {/* title */}
            <h2>{title}</h2>

            {/* container -> posters */}
            <Swiper 
                // className="swiper-container"
                className="row-posters"
                navigation={true}
                slidesPerGroup={5}
                spaceBetween={isLargeRow? 24:20}
                slidesPerView={isLargeRow? 3.5:3}
                breakpoints={{
                    760: {
                        slidesPerView: 6.5,
                        spaceBetween:10
                    },
                    1380: {
                      slidesPerView: 8,
                      spaceBetween:15
                    }
                }}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={swiper => console.log(swiper)}
            >
                {movies.map((movie,key)=>(
                    <SwiperSlide className={`row-poster ${isLargeRow && "row-posterLarge"}`} >
                        <img 
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`} 
                        alt={movie.name}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            
        </div>
    )
}
