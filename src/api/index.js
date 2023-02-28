import axios from 'axios';
import { END_POINTS } from '../utils/constants';
import * as rssParser from 'react-native-rss-parser';

export const getFeedApi = async() =>{
    const url = END_POINTS.news;
    const response = await axios.get(url, { headers: { 'Accept': 'application/json' }})
	const parsed = await rssParser.parse(response.data);
    return parsed;
}