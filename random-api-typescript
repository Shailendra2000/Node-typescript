import { Request, Response } from "express";

const express=require("express")
const app=express();
const path=require("path")
const fs=require("fs")
const bodyparser=require("body-parser")
const parser = bodyparser.urlencoded({ extended: false });  


app.set("view engine","ejs")
app.get("/", (req:Request, res:Response )=> {
    const data=fs.readFileSync("../api/data.json")
    const person_details=JSON.parse(data);
    console.log(person_details);                         
    res.render("home",{
        name_feild:"",
        city_feild:"",
        state_feild:"",
        listnames: person_details.results
    })
})
app.post("/",parser,(req:any,res:any)=>{
    const data=fs.readFileSync("../api/data.json")
    const person_details=JSON.parse(data);
    let response={
        name:req.body.name,
        city:req.body.city,
        state:req.body.state,
        sort:req.body.sort
    }
    let new_records:any[]=[]
    person_details.results.forEach((element:any ) => {
        if((element.name.first+element.name.last).includes(response.name) && element.location.city.includes(response.city) && element.location.state.includes(response.state)){
            new_records.push(element);
        }
    });
    if(response.sort==="asc"){
        new_records.sort((a,b)=>{
            if (a.name.first.toLowerCase()<b.name.first.toLowerCase()){
                return -1
            }
            return 1
        })
    }
    else{
        new_records.sort((a,b)=>{
            if (a.name.first.toLowerCase()<b.name.first.toLowerCase()){
                return 1
            }
            return -1
        })
    }
    
    res.render("home",{
        listnames:new_records,
        name_feild:response.name,
        city_feild:response.city,
        state_feild:response.state,
    })
});


app.listen(3400,async (req:any,res:any)=>{
    const data=await fetch('https://randomuser.me/api/?results=50');
    const dataa=await data.json();
    const dataaa= JSON.stringify(dataa);
    fs.writeFileSync(path.join("../","api","data.json"),dataaa)
})
