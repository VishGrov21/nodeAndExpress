const fs = require('fs');

exports.saveIntoFile = (req, res) => {
  const fileData = JSON.stringify(req.body);
  // If body doesn't contain any data then jump to else
  if (fileData !== '{}') {
    // If data exists then create an instance of createWriteStream with the file name
    const writeStream = fs.createWriteStream(`${__basedir}/savefiles/${req.params.id}.txt`);
    writeStream.write(fileData);
    // send the resource created in the response
    res.status(201).json({
      status: req.params.id,
    });
  } else {
    // For failed scenario send back the failure in response
    res.status(400).json({
      status: 'FAILURE',
      data: {
        err: 'Data to store is missing',
      },
    });
  }
};

exports.getFromFile = (req, res) => {
  const fileName = req.params.id;
  const readable = fs.createReadStream(`${__basedir}/savefiles/${req.params.id}.txt`);
  // If data exists then node will emit the data emitter
  readable.on('data', (chunk) => {
    let data = JSON.parse(chunk);
    console.log('data written');
    res.json(data);
  });
  // once read operation is compplete then end is emitted
  readable.on('end', () => {
    console.log('data completed');
    res.end();
  });
  // if any error then error is emitted
  readable.on('error', (err) => {
    res.statusCode = 500;
    console.log(err);
    res.end('File Not found');
  });
};
