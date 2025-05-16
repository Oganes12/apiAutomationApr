const { MongoClient, Db , ObjectId} = require('mongodb');
let connection: typeof MongoClient;
let db: typeof Db

export function connectionMongoDB() {
    beforeAll(async () => {
        try{
        connection = await MongoClient.connect(process.env.DATABASE_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
        console.log(process.env.DATABASE_URL, 'connection');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    });
}

export function closeConnection() {
    afterAll(async () => {
        await connection.close();
    });
}

export async function findUser()  { 
    const users = db.collection('users');
    console.log(users, 'users');
    // Retrieve the document in the collection
    const user = await users.findOne({name:'Madaline70'})
    console.log(user, 'user');
    // console.table(user);
    
}