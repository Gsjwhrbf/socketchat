import {existsSync} from "fs"
import {open} from "sqlite"
import sqlite3 from "sqlite3"
let dbfile = "./chat.db"
let exists = existsSync(dbfile)
let db;
sqlite3.verbose()

export default function(){
    open({
    filename: dbfile,
    driver: sqlite3.Database
}).then(async (dBase)=>{
    db = dBase
    try{
       if(!exists){
          await db.run(`
              CREATE TABLE user(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
              );
          `)
          await db.run(`
              CREATE TABLE message(
                msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                author INTENGER,
                FOREING KEY(author) REFERENCES user(user_id),
              );
          `)
          await db.run(`
              INSERT INTO user(login, password) VALUES
              ("admin", "admin"),
              ("danya", "danya"),
              ("danya", "lox");
          `)
       }else{
          await db.all(`SELECT * FROM user;`)
       }
    }catch(error){
        console.error(error)
    }
})


    
}

export async function getMessages(){
    try{
       return await db.all("SELECT * FROM user;")
    }catch(error){
        console.error(error)
    }
}