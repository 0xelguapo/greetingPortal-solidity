const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    
    const Token = await hre.ethers.getContractFactory("GreetingPortal");
    const portal = await Token.deploy({
        value: hre.ethers.utils.parseEther(".1"),
    });
    await portal.deployed();

    console.log("GreetingPortal address:", portal.address);

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

runMain();