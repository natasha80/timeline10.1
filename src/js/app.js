/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import Timeline from './Timeline';

const timeline = new Timeline('.timeline');
timeline.init();

timeline.latitude = '51.24';
timeline.longitude = '86.00';
timeline.text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor commodi doloribus vero eligendi sequi voluptas odio? Iste, porro!';
timeline.createTextPost();
timeline.latitude = undefined;
timeline.latitude = undefined;