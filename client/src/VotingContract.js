import web3 from "./web3";

const address = "0xYourContractAddress";  // Замените на адрес развернутого контракта

const abi = [
  // Вставьте сюда ABI вашего смарт-контракта
  {
    "constant": false,
    "inputs": [
      {
        "name": "_candidate",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_candidate",
        "type": "uint256"
      },
    ],
    "name": "getResults",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  // Добавьте другие функции контракта
];

const VotingContract = new web3.eth.Contract(abi, address);

export default VotingContract;
