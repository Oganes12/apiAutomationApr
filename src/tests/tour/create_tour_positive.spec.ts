import { getUser, signUp } from "../../../helper/user";
import * as supertest from 'supertest'; // Import supertest
const request = supertest('http://localhost:8001/api/v1'); // Define request with the base URL

let cookie: string;

describe('CREATE TOUR', () => {
    it('create tour', async () => {
        const userImport = getUser('admin');
        console.log('----------------userImport----------------', userImport);
        await signUp(userImport).then(res => {
            expect(res.statusCode).toBe(201);
            expect(res.body.data.user.email).toBe(userImport.email.toLowerCase());
            cookie = res.headers['set-cookie'][0].split(';')[0];
        });
        await request
            .post('/tours')
            .set('Cookie', cookie)
            .send({
                name: "TourForn753",
                duration: 10,
                description: "Could be",
                maxGroupSize: 10,
                summary: "Test tour",
                difficulty: "easy",
                price: 100,
                rating: 4.8,
                imageCover: "tour-3-cover.jpg",
                ratingsAverage: 4.9,
                guides: [],
                startDates: ["2024-04-04"],
                startLocation: {
                    type: "Point",
                    coordinates: [-74.005974, 40.712776], // [longitude, latitude]
                },
            }).then(tourRes => {
                console.log('tourRes', tourRes.body);
                expect(tourRes.statusCode).toBe(201);
                expect(tourRes.body.data.difficulty).toBe('easy');
            })
    });
});