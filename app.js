const file='logfile.log';
const fs=require('fs');
const events=require('events');
const eventEmitter=new events.EventEmitter();
const {start}=require('./getFile');
const bs=require('buffer');
const buffer=bs.Buffer.alloc(bs.constants.MAX_STRING_LENGTH);

const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const io=require('socket.io')(server);
const path = require('path');
const { Socket } = require('socket.io');

app.get('/log', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = './client/log.html';
    res.sendFile(fileName, options);
})

io.on('connection',(Socket)=>{
    start(file).then((ele)=>{
        let store=ele;
        Socket.emit('log-receive',ele);
        fs.watchFile(file,{"interval":1000},(curr,prev)=>{
            fs.open(file,(err,fd)=>{
                fs.read(fd,buffer,0,buffer.length,prev.size,(err,bytes)=>{
                    let data=buffer.slice(0,bytes).toString();
                    let logs=[];
                    logs=data.split('\n');
                    logs=logs.slice(1);
                    logs.forEach(ele=>{
                        if(store.length==10){
                            store.shift();
                        }
                        store.push(ele);
                    })
                    eventEmitter.emit('send-update',store);
                });
            });
        });
    });
    eventEmitter.on('send-update',logs=>{
        Socket.emit('log-receive',logs);
    });
})

const port=5000;
server.listen(port,()=>console.log(`server listening at ${port}`));
