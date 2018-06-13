Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// fs = require('fs');
/*jsonFile = "./build/contracts/Voting.json";
parsed= JSON.parse(fs.readFileSync(jsonFile));
abi = parsed.abi;
VotingContract= new web3.eth.Contract(abi);*/


//VotingContract = new web3.eth.Contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
//contractInstance = VotingContract.at('0xfb9cf189ce19c2df1ddd4c16640ca7cfbfe5020e');
candidates = {"rama": "candidate-1", "nick": "candidate-2", "bob": "candidate-3"};
/*window.addEventListener('load', function() {

  // 检查web3是否已经注入到(Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // 使用 Mist/MetaMask 的提供者
    web3js = new Web3(web3.currentProvider);
  } else {
    // 处理用户没安装的情况， 比如显示一个消息
    // 告诉他们要安装 MetaMask 来使用我们的应用
  }

  // 现在你可以启动你的应用并自由访问 Web3.js:
  voteForCandidate();

});*/

function voteForCandidate() {
  candidateName = $("#candidate").val();
  $("#"+"msgsender").html(web3.eth.accounts[0]);
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0], value: web3.utils.toWei("1", "ether")}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
  //contractInstance.method.voteForCandidate(candidateName).send({from:web3.eth.accounts[0],value: web3js.utils.toWei("1", "ether")});
  
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString();
    $("#" + candidates[name]).html(val);
  }
});


function test(argument) {
  console.log(argument)
}