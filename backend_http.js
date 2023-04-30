const express = require('express')
const db_smartcontract = require('./database/service/backend_db_smartcontract')
const db_assessment = require('./database/service/backend_db_assessment')
const db_suitability = require('./database/service/backend_db_suitability')
const db_project = require('./database/service/backend_db_project')

// CORS
const cors = require('cors')


const app = express()
const port = 8080

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// CORS
app.use(cors())

app.post('/test', async (req, res) => {
    res.send("hello world");
})

app.post('/newProject', async (req, res) => {
    const result = await db_project.newProject(req.body.projectId, req.body.name, req.body.types, req.body.tags, req.body.description, req.body.smartContracts, req.body.supportingMaterials, req.body.codeSimilarity, req.body.icon);
    res.send(result);
})

app.post('/getProjectByProjectId', async (req, res) => {
    const result = await db_project.getProjectByProjectId(req.body.projectId);
    res.send(result);
})

app.post('/getAllProjects', async (req, res) => {
    const result = await db_project.getAllProjects();
    res.send(result);
})

app.post('/getAll', async (req, res) => {
    const result = await db_smartcontract.getAll();
    res.send(result);
})

app.post('/getAllUsers', async (req, res) => {
    const result = await db_smartcontract.getAllUsers();
    res.send(result);
})

app.post('/newAssessment', async (req, res) => {
    const result = await db_assessment.newAssessment(req.body.projectId, req.body.date, req.body.score, req.body.codeQuality, req.body.securityAnalysis, req.body.explanation);
    res.send(result);
})

app.post('/getAssessmentByProjectId', async (req, res) => {
    const result = await db_assessment.getAssessmentByProjectId(req.body.projectId);
    res.send(result);
})

app.post('/newSuitability', async (req, res) => {
    const result = await db_suitability.newSuitability(req.body.projectId, req.body.totalChecked, req.body.totalPassed, req.body.claims);
    res.send(result);
})

app.post('/getSuitabilityByProjectId', async (req, res) => {
    const result = await db_suitability.getSuitabilityByProjectId(req.body.projectId);
    res.send(result);
})



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})