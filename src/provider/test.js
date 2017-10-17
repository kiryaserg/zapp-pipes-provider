export const test = {
  testCommand: 'wordpress://fetchData?type=categories',
  requestMocks: [{
          host: 'http://demo.wp-api.org',
          method: 'get',
          path: '/wp-json/wp/v2/categories',
          expectedResponse: [{id:1, name:'test category'}]
        }]
};
