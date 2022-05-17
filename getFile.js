const bs=require('buffer');
const buffer=new Buffer.alloc(bs.constants.MAX_STRING_LENGTH);
const fs=require('fs');
const { resolve } = require('path');
// const file='logfile.txt';
// const events=require('events');
// var eventEmitter=new events.EventEmitter();

const start=(fileName)=>{
    let store=[];
    return new Promise((resolve,reject)=>{
        fs.open(fileName,(err,fd)=>{
            if(err){
                reject(err);
            }
            fs.read(fd,buffer,0,buffer.length,0,(err,bytes)=>{
                if(err){
                    reject(err);
                }
                const data=buffer.slice(0,bytes).toString();
                let logs=data.split(`\n`);
               logs= logs.slice(-10);
                logs.forEach(ele=>{
                    store.push(ele);
                });
                resolve(store);
            });
        });
   });
}



// eventEmitter.on('send-update',(ele)=>{
//     console.log(ele);
// });

module.exports={
    start
}