web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_candidate","type":"bytes32"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whoVotesHim","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"totalValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"whoAmI","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"i","type":"address"}],"name":"IAmHere","type":"event"}]');
VotingContract = web3.eth.contract(abi).at("0x85aa2fc6caa76aed3a74c8bd8b81a439b7e5375e");
var accounts;
accounts = web3.eth.accounts;
var currentAccount;
$("#msgsender").html(VotingContract.whoAmI());
//currentAccount=accounts[0];
//$('#msgsender').html(VotingContract.whoAmI());
//console.log(web3.eth.defaultAccount)

/*$("#upload-file").change(function (e) {
  var fileList = $("#upload-file")[0].files,
    file = fileList.length ? fileList[0] : false


      var reader = new FileReader();
        reader.onload = function(e){
            var data = e.target.result;
            console.log(typeof data)
            console.log(JSON.parse(data))
            parsed= JSON.parse(data);
            abi = parsed.abi;
            VotingContract = web3.eth.contract(abi, "7f82147170d6991D9f831f7Cc56c9009538cF647");

        }
         // 以DataURL的形式读取文件:
        reader.readAsText(file);
        
        
})*/
candidates = {"rama": "candidate-1", "nick": "candidate-2", "bob": "candidate-3"};

function voteForCandidate() {
  candidateName = $("#candidate").val();
  accountNumber = $("#account").val();
  currentAccount = accounts[accountNumber];

  VotingContract.voteForCandidate(candidateName, {from: currentAccount, value: window.web3.toWei('2', 'ether')}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(VotingContract.totalVotesFor.call(candidateName).toString());
  });
/*
  VotingContract.IAmHere(function(e,r){
    $("#msgsender").html(r.i)
  })*/
}

function withdraw(){
  VotingContract.withdraw();
}


$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = VotingContract.totalVotesFor(name).toString();
    $("#" + candidates[name]).html(val);
  }
  //$("#"+"msgsender").html(VotingContract.whoAmI());
});





