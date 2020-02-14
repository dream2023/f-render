const semver = require('semver')
const pkg = require('./package.json')
const requiredVersion = pkg.engines.node
checkNodeVersion(requiredVersion, pkg.name)
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      '\x1B[31m%s\x1B[0m',
      'You are using Node ' +
        process.version +
        ', but this version of ' +
        id +
        ' requires Node ' +
        wanted +
        '.\nPlease upgrade your Node version.'
    )
    process.exit(1)
  }
}

const chalk = require('chalk')
const internalIp = require('internal-ip')
const program = require('commander')
const handler = require('serve-handler')
const http = require('http')
const path = require('path')
const open = require('open')
const updateNotifier = require('update-notifier')

// 检查更新
function updateCheck() {
  const notifier = updateNotifier({ pkg })
  const message = []

  if (notifier.update) {
    message.push(
      'Update available: ' +
        chalk.green.bold(notifier.update.latest) +
        chalk.gray(' (current: ' + notifier.update.current + ');')
    )
    message.push(
      'Run ' +
        chalk.magenta('npm install -g ' + pkg.name) +
        ' Or ' +
        chalk.magenta('yarn global add ' + pkg.name) +
        ' to update.'
    )
    // eslint-disable-next-line no-console
    console.log(message.join('\r\n'))
  }
}
updateCheck()

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.resolve(__dirname, './dist')
  })
})

program.version(`fgen ${pkg.version}`).usage('<command> [options]')
program.option('-p, --port <port>', 'Port used by the server', 54321)
program.parse(process.argv)

const port = program.port
server.listen(port, async () => {
  const localUrl = 'http://localhost:' + port
  const networkUrl = await internalIp.v4()
  const networkMsg = networkUrl
    ? chalk.cyan(`http://${networkUrl}:${port}`)
    : chalk.gray('unavailable')

  console.log()
  console.log(`  App running at:`)
  console.log(`  - Local:   ${chalk.cyan(localUrl)}`)
  console.log(`  - Network: ${networkMsg}`)
  console.log()

  open(localUrl)
})
