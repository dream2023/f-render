const exec = require('child_process').exec
const argv = process.argv.slice(2)
const port = argv[1] || '54321'
const handler = require('serve-handler')
const http = require('http')
const path = require('path')
const spawn = require('child_process').spawn

const openURL = function (url) {
  switch (process.platform) {
    case 'darwin':
      exec('open ' + url)
      break
    case 'win32':
      exec('start ' + url)
      break
    default:
      spawn('xdg-open', [url])
  }
}
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.resolve(__dirname, './dist')
  })
})

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
  openURL(`http://localhost:${port}`)
})
