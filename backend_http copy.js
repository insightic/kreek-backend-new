const express = require('express')
const db_smartcontract = require('./database/service/backend_db_smartcontract')

const app = express()
const port = 8080

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/test', async (req, res) => {
    
    res.send("hello");
})

app.post('/newProject', async (req, res) => {
    const result = await db_smartcontract.newProject(req.body.smartContractId, req.body.projectName, req.body.projectType, req.body.smartContracts, req.body.overallCodeQuality, req.body.explanation, req.body.securityAnalysis);
    res.send(result);
})

app.post('/getProjectName', async (req, res) => {
    const result = await db_smartcontract.getProjectName(req.body.smartContractId);
    res.send(result);
})

app.post('/getContracts', async (req, res) => {
    const result = await db_smartcontract.getSourceCode(req.body.smartContractId);
    res.send(result);
})

app.post('/getOverallCodeQualityScore', async (req, res) => {
    const result = await db_smartcontract.getOverallCodeQualityScore(req.body.smartContractId);
    res.send(result);
})

app.post('/getCodeExplanation', async (req, res) => {
    const result = await db_smartcontract.getCodeExplanation(req.body.smartContractId);
    res.send(result);
})

app.post('/getSecurityRisks', async (req, res) => {
    const result = await db_smartcontract.getSecurityRisks(req.body.smartContractId);
    res.send(result);
})

// app.post('/newNFT', async (req, res) => {
//     const nft = {
//         "collectionID": 1,
//         "address": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
//         "name": "Kreek Seasonal Plan 1",
//         "description": "This NFT card is the first seasonal investment plan launched by kreek on 1 March 2023. There are 1,000 cards in this collection, each with 500 USD credits. Kreek uses its DCA strategies to help you spend 50USD to purchase an index of ETH and BTC on Polygon.",
//         "image": "https://kreek.fi/nft/storage/season1.png",
//         "collectionGroup": "dolphin",
//         "drip": {
//             "dripTokenGenerationBaseSpeed": 5
//         },
//         "investmentInfo": {
//             "startDate": 1677600000,
//             "investmentType": "index",
//             "numOfTokens": 2,
//             "tokenList": {
//                 "ETH": 50,
//                 "BTC": 50
//             },
//             "payment": "USDC",
//             "chainName": "polygon",
//             "chainID": "137",
//             "amountPerRound": 500,
//             "investmentCyclePerRound": 10,
//             "amountPerCycle": 50,
//             "nftSupplyPerRound": 1000,
//             "maxInvestmentRounds": -1
//         },
//         "investmentUpdates": {
//             "updateDate": 1677670000,
//             "totalRounds": 4,
//             "numOfMinters": [
//                 1000,
//                 981,
//                 0,
//                 790
//             ],
//             "numOfHodlers": [
//                 792,
//                 781,
//                 0,
//                 690
//             ],
//             "investmentCycle": 0,
//             "log": {
//                 "0": [
//                     {
//                         "token": "ETH",
//                         "price": 1221.1,
//                         "percent": 50
//                     },
//                     {
//                         "token": "BTC",
//                         "price": 19932.7,
//                         "percent": 50
//                     }
//                 ],
//                 "1": [
//                     {
//                         "token": "ETH",
//                         "price": 1321.1,
//                         "percent": 70
//                     },
//                     {
//                         "token": "BTC",
//                         "price": 20932.7,
//                         "percent": 30
//                     }
//                 ],
//                 "3": [
//                     {
//                         "token": "ETH",
//                         "price": 1426.1,
//                         "percent": 60
//                     },
//                     {
//                         "token": "BTC",
//                         "price": 28932.7,
//                         "percent": 40
//                     }
//                 ]
//             }
//         }
//     }
//     const result = await db_nft.newNFT(nft);
//     res.send(result);
// })

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})