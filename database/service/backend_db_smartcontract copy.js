const {MongoClient, Double} = require('mongodb');
const {InfluxDB} = require('@influxdata/influxdb-client');
require('dotenv').config({ path: './config/.env' });


const mongodb_uri = `mongodb://localhost:27017/`;
const mongodb_client = new MongoClient(mongodb_uri);
const mongodb_db = "kreek_test";
const collection_smartContract = "smartContract"; 

async function newSmartContract(smartContractId, srcCode, projectName, projectType, overallCodeQuality, explanation, securityAnalysis) {
    
    result = {'status': 100};
    
    try {
        const smartContract = {
            smartContractId: smartContractId,
            srcCode: srcCode,
            projectName: projectName,
            projectType: projectType,
            overallCodeQuality: overallCodeQuality,
            explanation: explanation,
            securityAnalysis: securityAnalysis,
        }

        // connect db and insert
        await mongodb_client.connect();

        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        await smartContract_collection.insertOne(smartContract);

    } catch(error) {
        console.log("create new smart contract error!");
        console.error(error);
        result = {'status': 0};
    }
    await mongodb_client.close();
    return result;
}

async function getProjectName(smartContractId) {
    try {
        await mongodb_client.connect();
        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        const projection = {
            smartContractId: 1,
            projectName: 1,
        };

        const projectNameInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
        var result = null;

        if (projectNameInfo != null) {
            result = {
                status: 200,
                smartContractId: projectNameInfo.smartContractId,
                projectName: projectNameInfo.projectName,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getprojectName error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getSourceCode(smartContractId) {
    try {
        await mongodb_client.connect();
        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        const projection = {
            smartContractId: 1,
            srcCode: 1,
        };

        const srcCodeInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
        var result = null;

        if (srcCodeInfo != null) {
            result = {
                status: 200,
                smartContractId: srcCodeInfo.smartContractId,
                srcCode: srcCodeInfo.srcCode,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getsrcCode error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getOverallCodeQualityScore(smartContractId) {
    try {
        await mongodb_client.connect();
        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        const projection = {
            smartContractId: 1,
            OverallCodeQuality: 1,
        };

        const OverallCodeQualityScoreInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
        var result = null;

        if (OverallCodeQualityScoreInfo != null) {
            result = {
                status: 200,
                smartContractId: OverallCodeQualityScoreInfo.smartContractId,
                OverallCodeQualityScore: OverallCodeQualityScoreInfo.overallCodeQuality,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getOverallCodeQualityScore error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getCodeExplanation(smartContractId) {
    try {
        await mongodb_client.connect();
        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        const projection = {
            smartContractId: 1,
            explanation: 1,
        };

        const ExplanationInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
        var result = null;

        if (ExplanationInfo != null) {
            result = {
                status: 200,
                smartContractId: ExplanationInfo.smartContractId,
                explanation: ExplanationInfo.explanation,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getCodeExplanation error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getSecurityRisks(smartContractId) {
    try {
        await mongodb_client.connect();
        const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
        const projection = {
            smartContractId: 1,
            securityAnalysis: 1,
        };

        const SecurityRisksInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
        var result = null;

        if (SecurityRisksInfo != null) {
            result = {
                status: 200,
                smartContractId: SecurityRisksInfo.smartContractId,
                securityAnalysis: SecurityRisksInfo.securityAnalysis,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getSecurityRisks error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}


const db_smartcontract = {
    newSmartContract: newSmartContract,
    getProjectName: getProjectName,
    getSourceCode: getSourceCode,
    getOverallCodeQualityScore: getOverallCodeQualityScore,
    getCodeExplanation: getCodeExplanation,
    getSecurityRisks: getSecurityRisks,
}
module.exports = db_smartcontract;
