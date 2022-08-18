import knex from 'knex';

const sqliteOptions ={
    client:'sqlite3',
    connection:{
        filename:'./sqliteDatabase.sqlite'
    },
    useNullAsDefault:true
}

let db = knex(sqliteOptions)

try{
    let exists = await db.schema.hasTable('users');
    if(exists){
        // await db('users').del();
    }
    else{
        await db.schema.createTable('users',table=>{
            table.primary('id');
            table.increments('id');
            table.string('nombre',30).nullable(false);
            table.string('apellido',20);
        })
    }
}catch(error){
    console.log(error);
}

export default db