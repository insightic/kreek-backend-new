const {MongoClient, Double} = require('mongodb');
const {InfluxDB} = require('@influxdata/influxdb-client');
require('dotenv').config({ path: './config/.env' });


const mongodb_uri = `mongodb://localhost:27017/`;
const mongodb_client = new MongoClient(mongodb_uri);
const mongodb_db = "kreek_test";
const collection = "project";


async function newProject(projectId, name, types, tags, description, smartContracts, supportingMaterials) {
    let result = { status: 100 };

    try {
        const project = {
            projectId,
            name,
            types,
            tags,
            description,
            smartContracts,
            supportingMaterials,
        };
  
        // connect to the database and insert the new project
        await mongodb_client.connect();
  
        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        await project_collection.insertOne(project);
  
    } catch (error) {
        console.log('Error creating new project:', error);
        result = { status: 0 };
    }

    // close the database connection
    await client.close();
    return result;
}

async function getProjectByProjectId(projectId) {
    try {
        await mongodb_client.connect();
        const project_collection = mongodb_client.db(mongodb_db).collection(collection);
        const projection = {
            projectId: 1,
            name: 1,
            types: 1,
            tags: 1,
            description: 1,
            smartContracts: 1, 
            supportingMaterials: 1,
        };

        const project = await project_collection.findOne({"projectId": projectId}, projection);
        var result = null;

        if (project != null) {
            result = {
                status: 200,
                projectId: project.projectId,
                name: project.name,
                types: project.types,
                tags: project.tags,
                description: project.description,
            };
        }
        
        await mongodb_client.close();
        return result;
    }
    catch (error) {
        console.log("get project error!")
        console.log(error)
        result = {'status': 500};
        return result;
    }
}




const db_project = {
    newProject,
    getProjectByProjectId,
}

module.exports = db_project;
