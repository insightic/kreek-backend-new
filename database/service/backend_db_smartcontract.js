const {MongoClient, Double} = require('mongodb');
const {InfluxDB} = require('@influxdata/influxdb-client');
require('dotenv').config({ path: './config/.env' });


const mongodb_uri = `mongodb://localhost:27017/`;
const mongodb_client = new MongoClient(mongodb_uri);
const mongodb_db = "kreek_test";
const collection = "user";

// create new User
async function newUser(userId, userEmail, userPassword, projects) {
    result = {'status': 100};
    
    try {
        const user = {
            userId: userId,
            userEmail: userEmail,
            userPassword: userPassword,
            projects: projects,
        }

        // connect db and insert
        await mongodb_client.connect();

        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        await project_collection.insertOne(user);


    } catch(error) {
        console.log("create new user error!");
        console.error(error);
        result = {'status': 0};
    }
    await mongodb_client.close();
    return result;
}

// create new Project
async function newProject(userEmail, userPassword, projectId, projectName, projectType, smartContracts, overallCodeQuality, explanation, securityAnalysis) {
    result = {'status': 100};
    
    try {
        const project = {
            projectId: projectId,
            smartContracts: smartContracts,
            projectName: projectName,
            projectType: projectType,
            overallCodeQuality: overallCodeQuality,
            explanation: explanation,
            securityAnalysis: securityAnalysis,
        }

        // connect db and insert
        await mongodb_client.connect();

        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        let projectList = await project_collection.findOne({"userEmail": userEmail, "userPassword": userPassword})
        console.log(projectList)
        projectList = projectList['projects'];
        projectList.push(project);

        await project_collection.updateOne(
            {"userEmail": userEmail, "userPassword": userPassword}, 
            {$set: {"projects": projectList}}
        );

    } catch(error) {
        console.log("create new project error!");
        console.error(error);
        result = {'status': 0};
    }
    await mongodb_client.close();
    return result;
}

async function getAllProjects(userEmail, userPassword) {
    try {
        await mongodb_client.connect();
        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        let projectList = await project_collection.findOne({"userEmail": userEmail, "userPassword": userPassword});
        projectList = projectList['projects'];
        console.log(projectList)
        var result = null;

        if (projectList != null) {
            result = {
                status: 200,
                projects: projectList,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getProjectList error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getAll() {
    try {
        await mongodb_client.connect();
        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        const projectList = await project_collection.find().toArray();
        console.log(projectList)
        var result = null;

        if (projectList != null) {
            result = {
                status: 200,
                users: projectList,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getProjectList error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

async function getAllUsers() {
    try {
        await mongodb_client.connect();
        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        const userList = await project_collection.find({}, {projection: {"userEmail":1, "userPassword":1}}).toArray();
        console.log(userList)
        var result = null;

        if (userList != null) {
            result = {
                status: 200,
                users: userList,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("getUserList error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}

// async function getProjectDetails(projectId) {
//     try {
//         await mongodb_client.connect();
//         const project_collection = mongodb_client.db(mongodb_db).collection(collection);
//         const projectNameInfo = await project_collection.findOne({"projectId": projectId});
//         var result = null;

//         if (projectNameInfo != null) {
//             result = {
//                 status: 200,
//                 projectId: projectNameInfo.projectId,
//                 projectDetails: projectNameInfo,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getprojectName error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }

// async function getProjectName(projectId) {
//     try {
//         await mongodb_client.connect();
//         const project_collection = mongodb_client.db(mongodb_db).collection(collection);
//         const projection = {
//             projectId: 1,
//             projectName: 1,
//         };

//         const projectNameInfo = await project_collection.findOne({"projectId": projectId}, projection);
//         var result = null;

//         if (projectNameInfo != null) {
//             result = {
//                 status: 200,
//                 projectId: projectNameInfo.projectId,
//                 projectName: projectNameInfo.projectName,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getprojectName error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }

// async function getContracts(projectId) {
//     try {
//         await mongodb_client.connect();
//         const project_collection = mongodb_client.db(mongodb_db).collection(collection);
//         const projection = {
//             projectId: 1,
//             contracts: 1,
//         };

//         const srcCodeInfo = await project_collection.findOne({"projectId": projectId}, projection);
//         var result = null;

//         if (srcCodeInfo != null) {
//             result = {
//                 status: 200,
//                 smartContractId: srcCodeInfo.projectId,
//                 srcCode: srcCodeInfo.contracts,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getsrcCode error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }

// async function getOverallCodeQualityScore(smartContractId) {
//     try {
//         await mongodb_client.connect();
//         const project_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
//         const projection = {
//             projectId: 1,
//             OverallCodeQuality: 1,
//         };

//         const OverallCodeQualityScoreInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
//         var result = null;

//         if (OverallCodeQualityScoreInfo != null) {
//             result = {
//                 status: 200,
//                 smartContractId: OverallCodeQualityScoreInfo.smartContractId,
//                 OverallCodeQualityScore: OverallCodeQualityScoreInfo.overallCodeQuality,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getOverallCodeQualityScore error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }

// async function getCodeExplanation(smartContractId) {
//     try {
//         await mongodb_client.connect();
//         const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
//         const projection = {
//             smartContractId: 1,
//             explanation: 1,
//         };

//         const ExplanationInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
//         var result = null;

//         if (ExplanationInfo != null) {
//             result = {
//                 status: 200,
//                 smartContractId: ExplanationInfo.smartContractId,
//                 explanation: ExplanationInfo.explanation,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getCodeExplanation error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }

// async function getSecurityRisks(smartContractId) {
//     try {
//         await mongodb_client.connect();
//         const smartContract_collection = mongodb_client.db(mongodb_db).collection(collection_smartContract);
//         const projection = {
//             smartContractId: 1,
//             securityAnalysis: 1,
//         };

//         const SecurityRisksInfo = await smartContract_collection.findOne({"smartContractId": smartContractId}, projection);
//         var result = null;

//         if (SecurityRisksInfo != null) {
//             result = {
//                 status: 200,
//                 smartContractId: SecurityRisksInfo.smartContractId,
//                 securityAnalysis: SecurityRisksInfo.securityAnalysis,
//             };
//         }
        
//         await mongodb_client.close();
//         return result;
//     }
//     catch (error) {
//         console.log("getSecurityRisks error!")
//         console.log(error)
//         result = {'status': 500};
//         return result;
//     }
// }


const db_project = {
    newUser: newUser,
    newProject: newProject,
    //etProjectDetails: getProjectDetails,
    getAllProjects: getAllProjects,
    getAll: getAll,
    getAllUsers: getAllUsers
    // getProjectName: getProjectName,
    // getSourceCode: getSourceCode,
    // getOverallCodeQualityScore: getOverallCodeQualityScore,
    // getCodeExplanation: getCodeExplanation,
    // getSecurityRisks: getSecurityRisks,
}

module.exports = db_project;
