const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
console.log(
  "--------------------------------------------------------------------------"
);

console.log("Instantiating new Public-Private Key Pair");

const myKey = ec.keyFromPrivate(
  "9da810dcbdcb4bb61cf710b2e9ff13b04362ddf240c5b2da76a4249f0d4d6034"
);
/**
 * STEPS TO RUN>>>>>>
 * >npm -v    //to check whether node is installed
 * >npm install
 * >node main.js
 * :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * To Add more transacting parties generate their key pair and pass the ec instance to various methods
 * In the current Example,
 * Address 1 and Address 2 are receivers
 * User is the System User who is transferring money and is also the miner
 * The Project has the following dependencies::
 *  nodejs
 *  cryptojs     (SHA256)
 *  elliptic
 */

const myWalletAddress = myKey.getPublic("hex");
console.log(
  "--------------------------------------------------------------------------"
);

console.log("Creating your Blockchain");

const myCoin = new Blockchain();

////////////////////////////////////////////////////////
console.log(
  "--------------------------------------------------------------------------"
);

console.log("#### Creating Sample Transactions ####");
// console.log("%%%%%%%%%%%%%%" + myCoin.getBalanceOfAddress(myWalletAddress));

console.log("USer gives addreess2, 100 coins");

const tx1 = new Transaction(myWalletAddress, "address2", 100);
tx1.signTransaction(myKey);
console.log("\tTransaction signed!\n\tAdded to blockchain");
myCoin.addTransaction(tx1);

console.log("\tMining........");
myCoin.minePendingTransactions(myWalletAddress);

// console.log("%%%%%%%%%%%%%%" + myCoin.getBalanceOfAddress(myWalletAddress));

console.log();
console.log("User gives address1, 50 coins");

const tx2 = new Transaction(myWalletAddress, "address1", 50);
tx2.signTransaction(myKey);
console.log("\tTransaction signed!\n\tAdded to blockchain");
myCoin.addTransaction(tx2);

console.log("\tMining.........");
myCoin.minePendingTransactions(myWalletAddress);

////////////////////////////////////////////////////////
console.log(
  "--------------------------------------------------------------------------"
);

console.log();
console.log(
  `Balance of User is ${myCoin.getBalanceOfAddress(myWalletAddress)}`
);
console.log();
console.log(
  "\nChecking Validity.....isValid()=>",
  myCoin.isChainValid() ? "Yes" : "No"
);
console.log("::::Current Balance::::");
console.log(
  "Address1\t" +
    myCoin.getBalanceOfAddress("address1") +
    "\nAddress2\t" +
    myCoin.getBalanceOfAddress("address2")
);
console.log(
  "--------------------------------------------------------------------------"
);

/////::TAMPERING TRANSACTIONS::
console.log();
console.log(
  "Hacking the Chain.....\n\tCreatinng false entries.....\nChanging Amount of 2nd Transaction to be 10"
);
myCoin.chain[1].transactions[0].amount = 10;
console.log();
console.log(
  "\nChecking Validity.....isValid()=>",
  myCoin.isChainValid() ? "Yes" : "No"
);
console.log(
  "--------------------------------------------------------------------------"
);
