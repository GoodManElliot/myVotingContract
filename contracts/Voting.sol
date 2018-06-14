pragma solidity ^0.4.23;

contract Voting {
  
  mapping (bytes32 => uint8) public votesReceived;

  mapping (address => bytes32) public whoVotesHim;
  
  bytes32[] public candidateList;

  address[] public voters;

  uint public fee = 1 ether;
  uint public totalValue = 0;
 

  event IAmHere(address i);

  constructor (bytes32[] candidateNames) public{
    candidateList = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) myValid(candidate) public view returns (uint8) {
    return votesReceived[candidate];
  }

  function voteForCandidate (bytes32 candidate) public payable myValid(candidate){
    require(msg.value >= fee);

    voters.push(msg.sender);
    whoVotesHim[msg.sender] = candidate;
    totalValue += msg.value;


    emit IAmHere(msg.sender);
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  modifier myValid(bytes32 candidate){
    require( validCandidate(candidate) == true );
    _;
  }

  function whoAmI() public view returns(address){
    return msg.sender;
  }

  function withdraw(bytes32 _candidate) external{
    uint8 winnerCount = votesReceived[_candidate];
    uint moneyD = totalValue / winnerCount; 
    //bytes32 a;
    voters[0].transfer(moneyD);
    /* for(uint i=0; i<voters.length; i++){
      a = whoVotesHim[voters[i]];
      if( a == _candidate ){
        voters[i].transfer(moneyD);
      }
    } */
  }

  function getVoters() external view returns(address[]){
    return voters;
  }

  function getWhoVotesHim(address _who) external view returns(bytes32){
    return whoVotesHim[_who];
  }

  function trans(address _test) external returns(address){
    _test.transfer(fee);
    return _test;
  }
  function mytrans() external{
    
  }
}
