const exec = require('shelljs').exec
const argv = process.argv.slice(2)
const port = argv[1] || '54321'
exec(`anywhere -d ./dist -p ${port}`)
