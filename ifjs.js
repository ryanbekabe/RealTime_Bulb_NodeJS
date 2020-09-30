fs = require('fs')
fs.readFile('bulbmode.txt', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
  console.log('Read: ' + data);
  var data;
  if (data > 5) {
	  console.log('Do: lebih dari 5');
	} else if (data < 5) {
		  console.log('Do: lebih kurang 5');
	} else {
		  console.log('Do: data tidak tedefinisi!');
	}
});
