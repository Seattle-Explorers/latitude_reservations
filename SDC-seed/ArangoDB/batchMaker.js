const fs = require('fs');
const writeListing = require('./dataGeneration.js');

const writeBatches = (fileName, start, stop) => {
  const writeListingJson = fs.createWriteStream(fileName);
  writeListingJson.write('[\n', 'utf8');

  writeListing(writeListingJson, 'utf-8', () => {
    writeListingJson.write(']');
    writeListingJson.end();
  }, start, stop);
};

writeBatches('./dataFiles/listing0to1M.json', 0, 1000000);
writeBatches('./dataFiles/listing1Mto2M.json', 1000001, 2000000);
writeBatches('./dataFiles/listing2Mto3M.json', 2000001, 3000000);
writeBatches('./dataFiles/listing3Mto4M.json', 3000001, 4000000);
writeBatches('./dataFiles/listing4Mto5M.json', 4000001, 5000000);
writeBatches('./dataFiles/listing5Mto6M.json', 5000001, 6000000);
writeBatches('./dataFiles/listing6Mto7M.json', 6000001, 7000000);
writeBatches('./dataFiles/listing7Mto8M.json', 7000001, 8000000);
writeBatches('./dataFiles/listing8Mto9M.json', 8000001, 9000000);
writeBatches('./dataFiles/listing9Mto10M.json', 9000001, 10000000);
