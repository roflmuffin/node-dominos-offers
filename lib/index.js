#!/usr/bin/env node
;
var VOUCHER_URL, _, data, got, humanOutput, moment, options, program, retrieveVouchers;

got = require('got');

_ = require('lodash');

moment = require('moment');

VOUCHER_URL = 'https://services.dominos.com.au/OffersApp/Vouchers/vouchers';

data = {
  StoreNumber: 98003,
  DeviceId: '',
  RequestKey: {
    Country: 'AU',
    Application: '-',
    Version: '-',
    Culture: 'en'
  }
};

options = {
  headers: {
    'Content-Type': 'application/json'
  },
  json: true,
  body: JSON.stringify(data)
};

retrieveVouchers = function(storeCode) {
  data.StoreNumber = storeCode;
  return got.post(VOUCHER_URL, options).then(function(response) {
    var vouchers;
    vouchers = _.map(response.body.Vouchers, function(voucher) {
      delete voucher.Content;
      delete voucher.Disclaimer;
      return voucher;
    });
    return vouchers;
  });
};

humanOutput = function(vouchers) {
  var expiry, i, len, output, v;
  output = '';
  for (i = 0, len = vouchers.length; i < len; i++) {
    v = vouchers[i];
    expiry = moment(v.ExpiryDate, 'DD-MM-YYYY');
    output += v.VoucherCode + " | " + v.Description + " | Expires on " + (expiry.format('Do MMMM')) + " | " + v.ServiceMethod + "\n";
  }
  return output;
};

program = require('commander');

program.version('0.0.1').usage('-s store-number').option('-s --store [number]', 'store number to retrieve codes for', parseInt).option('-j --json', 'outputs JSON data of coupon codes').option('-r --readable', 'outputs human readable list of coupon codes').parse(process.argv);

if (program.store == null) {
  throw new Error('--store required');
}

retrieveVouchers(program.store).then(function(vouchers) {
  if (program.json) {
    return console.log(JSON.stringify(vouchers, null, 4));
  } else if (program.readable) {
    return console.log(humanOutput(vouchers));
  }
});
