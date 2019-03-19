var express = require('express');
var app = express();
// console.log('process.argv', process.argv);
var folder = './save/' + process.argv[2];
app.use(express.static(folder));
var port = 3000;
// process.on('SIGTERM', () => {
//   console.log('\n\n\n\nCHILD EXIT!!!', );
// })
//
// process.on('SIGINT', () => {
//   console.log('\n\n\n\nCHILD EXIT!!!', );
// })
// //
// process.on('exit', () => {
//   console.log('\n\n\n\nCHILD EXIT MAIN!!!', );
// })
//
// process.on('message', (meg) => {
//   console.log('\n\n\n\nCHILD  MSG!!!', );
// })
// setTimeout(() => {
//   throw Error('ERRRRRRRRRRRRRRRRRRRRR');
// }, 5000)
app.listen(port, function () {
    return console.log("Example app listening on port http://localhost:" + port + "!");
});
//# sourceMappingURL=server.js.map