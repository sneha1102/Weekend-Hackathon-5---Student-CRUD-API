const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
let studentList=require('./InitialData');
let studentCount=studentList.length;
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('./api/student',(req,res)=>{
    res.json(studentList);
})

app.get('./api/student/:id',(req,res)=>{
    const id=req.params.id;
    const student=studentList.filter((student)=>student.id===Number(id));
    if(student.length!==0){
        res.json(student[0]);
    }else{
        res.sendStatus(404);
        return;
    }
})
app.post('./api/student',(req,res)=>{
    const {name,currentClass,division}=req.body;
    if(name && currentClass && division){
        studentCount = studentCount !== 0 ? studentCount+1 : 0;
        const newStudent = {
            id:studentCount,
            name:name,
            currentClass:Number(currentClass),
            division:division,

        }
        studentArray.push(newStudent);
        res.json({'id':studentCount});
    }else{
        res.sendStatus(400);
        return;
    }
})

app.put('/api/student/:id',(req,res)=>{
    const data=req.body;
    const id=req.params.id;
    if(data){
        if(Object.is(parseInt(id),NaN)){
            res.sendStatus(400);
        }else{
            let found=false;
            let correctKeys=["name","currentClass","division"];
            for(let i=0;i<Object.keys(data).length;i++){
                found=correctKeys.includes(Object.keys(data)[i]);
            }
            if(!found){
                res.sendStatus(400);
                return;
            }else{
                let studentListCopy=[...studentList];
                let foundId=false;
                studentListCopy=studentListCopy.map((student)=>{
                    if(student.id===Number(id)){
                        foundId=true;
                        let studentCopy={...student};
                        for(let i=0;i<Object.keys(data);i++){
                            studentCopy[Object.keys(data)[i]]=Object.keys(data)[i]==="currentClass"?Number(data[Object.keys(data)[i]]):data[Object.keys(data)[i]];
                        }
                        return studentCopy;
                    }else{
                        return student;
                    }
                })
                if(!foundId){
                    if(Object.keys(data).length === 3){
                        const lastId = studentList.length !== 0 ? studentList[studentList.length -1].id : -1;
                        const {name,currentClass,division} = data;
                        studentCount = studentCount !== 0 ? studentCount+1 : 0;
                        const newStudent = {
                            id:studentCount,
                            name:name,
                            currentClass:Number(currentClass),
                            division:division

                        }

                        studentArray.push(newStudent);
                        res.json()
                    }else{
                        res.sendStatus(400)
                    }
            }
            if(!idFound){
                if(Object.keys(data).length === 3){
                    const lastId = studentList.length !== 0 ? studentList[studentList.length -1].id : -1;
                    const {name,currentClass,division} = data;
                    studentCount = studentCount !== 0 ? studentCount+1 : 0;
                    const newStudent = {
                        id:studentCount,
                        name:name,
                        currentClass:Number(currentClass),
                        division:division

                    }

                    studentList.push(newStudent);
                    res.json()
                }else{
                    res.sendStatus(400)
                }
            }else{
                studentArray = []
                studentArray = [...newStudents]
                res.json();
            }
            
        }
    }
    }else{
        res.sendStatus(400);
        return;
    }
})

app.delete('/api/student/:id',(req,res)=>{
    const id = req.params.id;
    const initialLength = studentArray.length;
    const filteredStudent = studentArray.filter((student)=> student.id !== Number(id));
    const finalLength = filteredStudent.length;

    if(initialLength > finalLength){
        studentArray = []
        studentArray = [...filteredStudent]
        res.json('deleted');
    }else{
        res.sendStatus(404)
    }

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   