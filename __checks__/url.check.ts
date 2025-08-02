import { UrlAssertionBuilder, UrlMonitor } from 'checkly/constructs'

new UrlMonitor('homepage-url-check', {
  name: 'Homepage URL',
  activated: true,
  maxResponseTime: 10000,
  degradedResponseTime: 5000,
  request: {
    url: 'https://smallepic.com/',
    followRedirects: true,
    assertions: [
      UrlAssertionBuilder.statusCode().equals(200),
    ]
  }
})
