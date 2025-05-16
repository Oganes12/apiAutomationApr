
import { createTour } from "../../../helper/tour";
import { getUser, signUp } from "../../../helper/user";
import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1');

const { MongoClient, Db , ObjectId} = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();
describe('MONGODB connection', () => {
    
        let connection: typeof MongoClient;
        let db: typeof Db
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
        afterAll(async () => {
            await connection.close();
        });
        it('Connect to the collection and find tour', async () => {
            const tours = db.collection('tours');
            console.log(tours, 'tours');
            // Retrieve the document in the collection
            const tour = await tours.findOne({name:'TourForn75'})
           console.log(tour, 'tour');
           
    });

        it.only('Create new tour with imported data', async () => {
            const tourImport = createTour();
            console.log(tourImport, 'tourImport');
            try{
                signUp
                const res = await request
                    .post('/tours')
                    .send(tourImport);
                expect(res.statusCode).toBe(200);
                console.log(res.body)
                const tours = db.collection('tours');
                const tourData = await tours.findOne({name: tourImport.name});
                console.log(tourData, 'tourData');
                // if(!userData){
                //     throw new Error('User not found in the database');
                // }
                // expect(userData.name).toBe(userImport.name);
                // expect(userData.email).toBe(userImport.email.toLowerCase());
                // expect(userData.role).toBe('admin');
                // expect(userData._id.toString()).toEqual(res.body.data.user._id);
                // let deleteData = await users.deleteOne({
                //     _id: new ObjectId(userData._id)
                // })
                // console.log(deleteData, 'deleteData');
                // let findUser = await users.findOne({_id: userData._id});
                // console.log(findUser, 'findUser');
                // expect(findUser).toBe(null);
                // expect(findUser).toBeNull();
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        })
});