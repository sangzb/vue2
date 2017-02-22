let $ = window.jQuery;
import { fetch, C } from './utils';
fetch({
  url: C('API_URI'),
  method: 'get'
})({ param: 'temp' }).then((data) => {
  console.log('success');
  $('body').css('backgroundColor', '#34ac62');
});


