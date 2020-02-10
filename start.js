const exec = require('child_process').exec
const program = require('commander')
const handler = require('serve-handler')
const http = require('http')
const path = require('path')
const chalk = require('chalk')
const spawn = require('child_process').spawn
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

// 检查更新
function updateCheck () {
  const notifier = updateNotifier({ pkg })
  const message = []

  if (notifier.update) {
    message.push('Update available: ' + chalk.green.bold(notifier.update.latest) + chalk.gray(' (current: ' + notifier.update.current + ');'))
    message.push('Run ' + chalk.magenta('npm install -g ' + pkg.name) + ' Or ' + chalk.magenta('yarn global add ' + pkg.name) + ' to update.')
    // eslint-disable-next-line no-console
    console.log(message.join('\r\n'))
  }
}
updateCheck()

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

program
  .version(`fgen ${pkg.version}`)
  .usage('<command> [options]')

program
  .option('-p, --port <port>', 'Port used by the server', 54321)

program.parse(process.argv)

server.listen(program.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running at http://localhost:${program.port}`)
  openURL(`http://localhost:${program.port}`)
})
