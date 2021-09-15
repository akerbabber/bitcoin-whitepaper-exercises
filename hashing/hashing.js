"use strict";

var crypto = require("crypto");
const { basename } = require("path");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
let i = 1;
for (let line of poem) {
	Blockchain.blocks[i] = {
		index: i,
		prevHash: Blockchain.blocks[i - 1].hash,
		data: line,
		timestamp: Date.now(),
	}
	Blockchain.blocks[i].hash = blockHash(Blockchain.blocks[i]);
	i++;
}

console.log(Blockchain);



// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		bl.index + bl.prevHash + bl.data + bl.timestamp
	).digest("hex");
}

const verifyBlock = bl => {
	if (bl.index >= 0) {
		if (bl.hash == "000000") {
			return true;
		}
		else if (bl.data && bl.prevHash && bl.hash == blockHash(bl)) {
		return true;
	}
} }

let checker = arr => arr.every(v => v === true); //checks if all elements of an array are true

const verifyChain = bc => {
	let res = []
	for (let i = 0;i < bc.blocks.length;i++) {
		if (i >= 1) {
			if (bc.blocks[i].prevHash == bc.blocks[i - 1].hash){
				res[i] = verifyBlock(bc.blocks[i]);	
		}
		//else res[i] = verifyBlock(bc.blocks[i]);
	} else res[i] = verifyBlock(bc.blocks[i]);}
	console.log(res);
	if (checker(res)){
		return 'Yes';
		}
	else return 'No';
}
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);