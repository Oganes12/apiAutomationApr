import { de } from "@faker-js/faker";
import { User } from "../../helper/interface";
import { deleteFunction, getUser, login, signUp} from "../../helper/user";
let user: User;
let cookie: string;

import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1');

describe('USER UPDATE - /users/updateMe - POSITIVE', () => {
    beforeAll(async() => {
        user = getUser('admin');

        const signUpRes = await signUp(user);
        expect(signUpRes.statusCode).toBe(201);

        const loginRes = await login(user);
        expect(loginRes.statusCode).toBe(200);
        cookie = loginRes.headers['set-cookie'][0].split(';')[0];
        console.log('User was created')
    });

    afterAll(async() => {
        await deleteFunction(cookie).then((res) => {
            expect(res.statusCode).toBe(200);
        })
        console.log('User was deleted')
    })
    it('should update the user name and email', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            name: 'John Doe',
            email: 'oganes@gmail.com'
        })
        expect(res.statusCode).toBe(200);
    })

    it('should update the user photo', async() => {
        const resPhoto = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .attach('photo', 'data/photo/pasv.png')
        expect(resPhoto.statusCode).toBe(200);
    })
    it('should update the user password', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            password: 'test1234',
            passwordConfirm: 'test1234'
        })
        expect(res.statusCode).toBe(200);
    })
});
describe('USER UPDATE - NEGATIVE', () => {
    beforeAll(async() => {
        user = getUser('admin');

        const signUpRes = await signUp(user);
        expect(signUpRes.statusCode).toBe(201);

        const loginRes = await login(user);
        expect(loginRes.statusCode).toBe(200);
        cookie = loginRes.headers['set-cookie'][0].split(';')[0];
        console.log('User was created')
    });

    afterAll(async() => {
        await deleteFunction(cookie).then((res) => {
            expect(res.statusCode).toBe(200);
        })
        console.log('User was deleted')
    })
    it('should get an error when missing passwordConfirm', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            password: 'test1234',
            passwordConfirm: ''
        })
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when missing password', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            password: '',
            passwordConfirm: 'test1234'
        })
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when missing email', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            name: 'John Doe',
            email: ''
        })
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when missing name', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            name: '',
        })
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when missing photo', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .attach('photo', '')
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when trying to update with invalid email', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            name: 'John Doe',
            email: 'invalid-email'
        })
        expect(res.statusCode).toBe(400);
    })
    it('should get an error when trying to update with invalid password', async() => {
        const res = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .send({
            password: '123',
            passwordConfirm: '123'
        })
        expect(res.statusCode).toBe(400);
    })
<<<<<<< invalidPass
    it('should get an error when trying to update with invalid photo', async() => {
        const resPhoto = await request
        .patch('/users/updateMe')
        .set('Cookie', cookie)
        .attach('photo', 'data/photo/invalid.txt')
        expect(resPhoto.statusCode).toBe(400);
    })
=======
>>>>>>> master
})