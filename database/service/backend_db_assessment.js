const {MongoClient, Double} = require('mongodb');
const {InfluxDB} = require('@influxdata/influxdb-client');
require('dotenv').config({ path: './config/.env' });


const mongodb_uri = `mongodb://localhost:27017/`;
const mongodb_client = new MongoClient(mongodb_uri);
const mongodb_db = "kreek";
const collection = "assessment";


async function newAssessment(projectId, date, score, codeQuality, securityAnalysis, explanation) {
    let result = {'status': 200};
    
    try {
        const assessment = {
            projectId: projectId,
            date: date,
            score: score,
            codeQuality: codeQuality,
            securityAnalysis: securityAnalysis,
            explanation: explanation
        }

        // connect to the database and insert the assessment
        await mongodb_client.connect();

        const assessment_collection = mongodb_client.db(mongodb_db).collection(collection);
        await assessment_collection.insertOne(assessment);

    } catch(error) {
        console.log("Error creating new assessment!");
        console.error(error);
        result = {'status': 0};
    }

    // await mongodb_client.close();
    return result;
}


async function getAssessmentByProjectId(projectId) {
    try {
        await mongodb_client.connect();
        const assessment_collection = mongodb_client.db(mongodb_db).collection(collection);
        const projection = {
            projectId: 1,
            score: 1,
            codeQuality: 1,
            securityAnalysis: 1,
            explanation: 1,
        };

        const assessment = await assessment_collection.findOne({"projectId": projectId}, projection);
        var result = null;
        console.log(assessment);

        if (assessment != null) {
            result = {
                status: 200,
                projectId: assessment.projectId,
                score: assessment.score,
                codeQuality: assessment.codeQuality,
                securityAnalysis: assessment.securityAnalysis,
                explanation: assessment.explanation,
            };
        }
        
        // await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("get assessment error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}


const db_assessment = {
    newAssessment: newAssessment,
    getAssessmentByProjectId: getAssessmentByProjectId,
}

module.exports = db_assessment;
