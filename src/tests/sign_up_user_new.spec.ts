import * as supertest from 'supertest';
import { faker } from '@faker-js/faker';
const request = supertest('http://localhost:8001/api/v1');
import { Response } from 'superagent';

interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING with async/await', () => {
        it('should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            };
            console.log(userData);
            try {
                // Make the POST request
                const res = await request.post('/users/signup').send(userData).expect(201);
                // Log the response 
                console.log(res.body);
                // Validate the response body
                expect(res.body.status).toBe('success');
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe('string');
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe('string');
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe('string');
                expect(res.body.data.user).toHaveProperty('_id');
                expect(res.body.data.user).not.toHaveProperty('password');
            } catch (error) {
                console.error('Error during signup:', error);
                throw error; // Re-throw the error to fail the test
            }
        });
    });

    describe('POSITIVE TESTING with .then', () => {
        it('should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            };
            console.log(userData);
                // Make the POST request using .then
            return request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .then((res) => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe('string');
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe('string');
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe('string');
                    expect(res.body.data.user).toHaveProperty('_id');
                    expect(res.body.data.user).not.toHaveProperty('password');
            })
            .catch((error) => {
                console.error('Error during signup:', error);
                throw error; // Re-throw the error to fail the test
            });
        });
    });

    describe('POSITIVE TESTING with .end() and done()', () => {
        it('should sign up a new user', (done) => {
            const userData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: 'test1234',
                passwordConfirm: 'test1234'
            };
            console.log(userData);
                // Make the POST request using .end
            request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .end((err:Error | null, res:Response) => {
                    if(err){
                        console.error('Error during signup:', err);
                        return done(err); 
                    }
                    try{
                    expect(res.body.status).toBe('success');
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe('string');
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe('string');
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe('string');
                    expect(res.body.data.user).toHaveProperty('_id');
                    expect(res.body.data.user).not.toHaveProperty('password');
                    done()
                    }catch(err){
                        console.error('Error during signup:', err);
                        done(err);
                    }
              })
        });
    });

    describe('NEGATIVE TESTING', () => {});
});