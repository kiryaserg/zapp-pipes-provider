import axios from 'axios';
import { mapCategory } from './mappers/categoryMapper';

export function getMovies(params) {
    const feed = {
        title: '', // title of the feed
        author: { name: 'author name' },
        id: '', // 'id of the feed'
        summary: '', // description of the feed
        link: {
            type: 'atom',
            rel: 'self',
            href: '', // url to get the feed
        },
        type: {
            value: '' // either feed, or the entry type
        },
        mediaGroup: [{
            type: '', // type of media asset : thumbnail...
            media_item: {
                scale: 'small|large',
                src: '', // url of the media asset
            }
        }] // mediaGroup can contain any number of assets
        updated: '' // ISO 8601 timestamp of the latest feed update*,
        entry: [] // array of feed entries
        extensions: {}, // all other data you want to pass
    };

    return feed
}