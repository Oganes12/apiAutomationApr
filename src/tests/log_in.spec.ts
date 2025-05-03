import { faker } from "@faker-js/faker";
import { User } from "../../helper/interface";
import { deleteFunction, deleteFunction2, getUser, login, login2, signUp, signUp2 } from "../../helper/user";
import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1');
let cookie: string;

const user: User = getUser('admin');
describe('USER SIGNUP AND LOGIN', () => {
    describe('POSITIVE TESTING', () => {
        // ASync/Await + try/catch
        it('should signup, login and delete the user', async () => {


            try {
                // Make the POST request
                const res = await signUp(user);
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email)
                expect(res.body.status).toEqual('success');
                // login
                const loginRes = await login(user)
                expect(loginRes.statusCode).toBe(200);
                expect(loginRes.body.status).toBe('success');
                cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                // delete
                const deleteRes = await deleteFunction(cookie)
                expect(deleteRes.statusCode).toBe(200);
                expect(deleteRes.body.message).toBe('User deleted successfully');
                // login
                const loginAfterDeletion = await login(user)
                expect(loginAfterDeletion.statusCode).toBe(401);
                expect(loginAfterDeletion.body.message).toBe('Incorrect email or password');
            } catch (error) {
                console.error('Error during signup:', error);
                throw error; // Re-throw the error to fail the test
            }
        });

        it('should signup, login and delete the user using .then()', () => {
            return signUp(user)
                .then((res) => {
                    console.log(res.body);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email)
                    expect(res.body.status).toEqual('success');
                    return login(user)
                })
                .then((loginRes) => {
                    console.log(loginRes.body, 'loginRes');
                    expect(loginRes.statusCode).toBe(200);
                    expect(loginRes.body.status).toBe('success');
                    console.log('cookie', loginRes.headers['set-cookie'][0]);
                    cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                    return deleteFunction(cookie)
                })
                .then(deleteRes => {
                    expect(deleteRes.statusCode).toBe(200);
                    expect(deleteRes.body.message).toBe('User deleted successfully');
                    return login(user)
                })
                .then(loginAfterDelete => {
                    expect(loginAfterDelete.statusCode).toBe(401);
                    expect(loginAfterDelete.body.message).toBe('Incorrect email or password');
                })
        })

        it('should signup, login and delete the user using .end()(done callback', (done) => {
            signUp2(user)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);

                    login2(user)
                        .end((err, loginRes) => {
                            if (err) return done(err);
                            expect(loginRes.statusCode).toBe(200);
                            expect(loginRes.body.status).toBe('success');
                            console.log('cookie', loginRes.headers['set-cookie'][0]);
                            cookie = loginRes.headers['set-cookie'][0].split(';')[0];
                            return deleteFunction2(cookie)
                                .end((err, deleteRes) => {
                                    if (err) return done(err);
                                    expect(deleteRes.statusCode).toBe(200);
                                    expect(deleteRes.body.message).toBe('User deleted successfully');
                                    login2(user)
                                        .end((err, loginAfterDelete) => {
                                            if (err) return done(err);
                                            expect(loginAfterDelete.statusCode).toBe(401);
                                            expect(loginAfterDelete.body.message).toBe('Incorrect email or password');
                                            done();
                                        })
                                })
                        })
                })
        })
    })
})