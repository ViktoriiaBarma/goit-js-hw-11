import { Notify } from 'notiflix/build/notiflix-notify-aio';

import axios from "axios"

axios.defaults.baseURL = "https://pixabay.com/"
const API_KEY = "37050483-79f0c6d80321c8607f56d1e8b"

export async function getFoto(query, currentPage) {
    try {
    const { data } = await axios("api/", {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: 40,
        }
    }) 
    console.log(data)

        return data      
    } catch (error) {
       // Notify.failure('error')
        console.log(error.message)
    }
   

}