const {MongoClient, Double} = require('mongodb');
const {InfluxDB} = require('@influxdata/influxdb-client');
require('dotenv').config({ path: './config/.env' });


const mongodb_uri = `mongodb://localhost:27017/`;
const mongodb_client = new MongoClient(mongodb_uri);
const mongodb_db = "kreek";
const collection = "suitability";


async function newSuitability(projectId, totalChecked, totalPassed, claims) {
    let result = {'status': 200};
    
    try {
        const suitability = {
            projectId,
            totalChecked,
            totalPassed,
            claims,
        }

        // connect to the database and insert the suitability
        await mongodb_client.connect();

        const suitability_collection = mongodb_client.db(mongodb_db).collection(collection);
        await suitability_collection.insertOne(suitability);

        console.log(suitability)

    } catch(error) {
        console.log("Error creating new suitability!");
        console.error(error);
        result = {'status': 0};
    }

    // await mongodb_client.close();
    return result;
}


async function getSuitabilityByProjectId(projectId) {
    try {
        await mongodb_client.connect();
        const suitability_collection = mongodb_client.db(mongodb_db).collection(collection);
        const projection = {
            projectId: 1,
            totalChecked: 1,
            totalPassed: 1,
            claims: 1,
        };

        const suitability = await suitability_collection.findOne({"projectId": projectId}, projection);
        var result = null;

        if (suitability != null) {
            result = {
                status: 200,
                projectId: suitability.projectId,
                totalChecked: suitability.totalChecked,
                totalPassed: suitability.totalPassed,
                claims: suitability.claims,
            };
        }
        
        // await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("get suitability error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}


const db_suitability = {
    newSuitability: newSuitability,
    getSuitabilityByProjectId: getSuitabilityByProjectId,
}

module.exports = db_suitability;
