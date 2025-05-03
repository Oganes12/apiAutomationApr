import * as supertest from 'supertest';
import { faker } from '@faker-js/faker';
const request = supertest('http://localhost:8001/api/v1');
import { Response } from 'superagent';
import { User } from '../../helper/interface';
import { getUser, signUp, signUp2 } from '../../helper/user';

const user: User = getUser('admin');

describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING with async/await', () => {
        it('should sign up a new user', async () => {
            try {
                const res = await signUp(user)
                expect(res.body.status).toBe('success');
                expect(res.body.data.user.name).toBe(user.name);
                expect(typeof res.body.data.user.name).toBe('string');
                expect(res.body.data.user.email).toBe(user.email.toLowerCase());
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
            return signUp(user)
                .then((res) => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.data.user.name).toBe(user.name);
                    expect(typeof res.body.data.user.name).toBe('string');
                    expect(res.body.data.user.email).toBe(user.email.toLowerCase());
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

    describe.only('POSITIVE TESTING with .end() and done()', () => {
        it('should sign up a new user', (done) => {
            signUp2(user)
                .end((err, res) => {
                    if (err) return done(err);
                    console.log(res.body);
                    expect(res.statusCode).toBe(201);
                    expect(res.body.data.user.email).toEqual(user.email);
                    done()
                })
        });
    })

    describe('NEGATIVE TESTING', () => { });
});