import axios from "axios";
export const JSON_API_URL = 'https://pixabay.com/api/';
export const PIXABAY_API_KEY = '44045744-87391f93bf3caee56476bbdd7';

export const options = {
    params: {
        key : PIXABAY_API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q:'',
    },
};