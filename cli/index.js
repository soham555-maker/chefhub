#!/usr/bin/env node
import { program } from "commander"
import jwt from "jsonwebtoken"
import fs from "fs"
let fileSystem=()=>{
    fs.readFile('hello.txt','utf-8',(err,data)=>{
        if (err) {
            console.error('Error reading file:', err);
            return;
          }
        console.log(data);
    })
}
let createToken=(email,pass,date)=>{
  let data=email+':'+pass+':'+date
  let token=jwt.sign({data},process.env.JSON_TOKEN)
  return token
}
program
  .version('1.0.0')

program
  .command('commit')
  .description('It commits your staged code')
  .option('-m, --message <data>',"This command just gives it a message")
  .action(async (options)=>{
    if(options.message){ 
        console.log(`both commands are executed ${options.message}`)
        fileSystem()
    }
    else console.log("not executed")
})

program
  .command('add <data>')
  .description('It adds your code to the Staging Area')
  .action((data)=>{
    console.log(`your files are changes ${data}`)
})

program
  .command('remote')
  .description('Its just a set a remote ')
  .option('-o, --origin <data>','It sets the value of that the user is authenticated or not')
  .action(async(options)=>{
    let data=createToken('sync','man','212109')
    if(options.origin) console.log(options.origin,' ',data)
  })

program.parse(process.argv)

