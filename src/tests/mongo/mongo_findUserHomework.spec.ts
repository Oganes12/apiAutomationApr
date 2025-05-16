import { fi } from "@faker-js/faker";
import { closeConnection, connectionMongoDB, findUser } from "../../../helper/mongoDB";
import { getUser, signUp } from "../../../helper/user";

const { MongoClient, Db , ObjectId} = require('mongodb');
let db: typeof Db

const dotenv = require('dotenv');
dotenv.config();
describe('MONGODB connection', () => {
    connectionMongoDB();
    closeConnection()

            it.only('Connect to the collection and find user', () => {
                findUser();
        });          
    });

        it('Create new user with imported data', async () => {
            const userImport = getUser('admin');
            console.log(userImport, 'userImport');
            try{
                const res = await signUp(userImport);
                expect(res.statusCode).toBe(201);
                console.log(res.body)
                const users = db.collection('users');
                const userData = await users.findOne({email: userImport.email});
                console.log(userData, 'userData');
                if(!userData){
                    throw new Error('User not found in the database');
                }
                expect(userData.name).toBe(userImport.name);
                expect(userData.email).toBe(userImport.email.toLowerCase());
                expect(userData.role).toBe('admin');
                expect(userData._id.toString()).toEqual(res.body.data.user._id);
                let deleteData = await users.deleteOne({
                    _id: new ObjectId(userData._id)
                })
                console.log(deleteData, 'deleteData');
                let findUser = await users.findOne({_id: userData._id});
                console.log(findUser, 'findUser');
                expect(findUser).toBe(null);
                expect(findUser).toBeNull();
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
});