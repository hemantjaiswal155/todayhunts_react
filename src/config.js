require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'TodayHunts',
    description: 'TodayHunts providing Today’s News.',
    head: {
      titleTemplate: 'TodayHunts: %s',
      meta: [
        {name: 'description', content: 'TodayHunts providing Today\'s breaking News and Latest News Headlines from India, India news in Hindi, हिन्दी समाचार; Read हिंदी न्यूज़, समाचार, Today\'s India Latest News on Sports, Business, Health, politics, Fitness, Bollywood, Entertainment, Blogs, India States and cities current affairs.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'todayhunts'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'hi_IN'},
        {property: 'og:title', content: 'TodayHunts'},
        {property: 'og:description', content: 'TodayHunts providing Today’s News.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '600'},
        {property: 'og:image:height', content: '467'}
      ]
    }
  },

}, environment);
