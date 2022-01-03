const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // compiles contract, generates files we need to work with our contract under artifacts folder
  const greetingContractFactory = await hre.ethers.getContractFactory("GreetingPortal");
  const greetingContract = await greetingContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  }); //creates local eth network
  await greetingContract.deployed();

  console.log("Contract deployed to:", greetingContract.address);
  console.log("Contract deployed by:", owner.address);

  let greetingCount;
  let greetingTxn;
  let greetingToOwner;
  let allGreetings;
  
  let contractBalance = await hre.ethers.provider.getBalance(greetingContract.address);
  console.log("Our contract balance:", hre.ethers.utils.formatEther(contractBalance));

  greetingTxn = await greetingContract.greet("cobie", "check out my podcast, upOnly");
  await greetingTxn.wait();

  greetingCount = await greetingContract.getTotalGreetings();

  contractBalance = await hre.ethers.provider.getBalance(greetingContract.address);
  console.log("Our contract balance after 1 wave:", hre.ethers.utils.formatEther(contractBalance));

  greetingTxn = await greetingContract.connect(randomPerson).greet("hiro", "long the top");
  await greetingTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(greetingContract.address);
  console.log("Our contract balance 2 waves:", hre.ethers.utils.formatEther(contractBalance));

  greetingTxn = await greetingContract.greet("ledger", "you really need to watch us, #upOnly");
  await greetingTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(greetingContract.address);
  console.log("third wave, contract balance no format", contractBalance);
  console.log("Our contract balance after another wave:", hre.ethers.utils.formatEther(contractBalance));


  greetingCount = await greetingContract.getTotalGreetings();

  greetingToOwner = await greetingContract.getGreetings(0);

  greetingToOwner = await greetingContract.getGreetings(1);

  allGreetings = await greetingContract.getAllGreetings();
  console.log("new function allGreetings:", allGreetings);
  

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
