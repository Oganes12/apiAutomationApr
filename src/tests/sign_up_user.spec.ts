import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1');

describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING', () => {
        it.skip('should sign up a new user', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body.message);
            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
        });
    });
    describe('NEGATIVE TESTING', () => {
        it('should get an error when all fields missing ', async () => {
            const userData = {}
            console.log(userData);
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body);
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: name, email, password, passwordConfirm');
        });

        it('should get an error when missing name ', async () => {
            const userData = {
                "email": "john6@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body);
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: name');
        });

        it('should get an error when missing email ', async () => {
            const userData = {
                "name": "John Doe",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body);
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: email');
        });

        it('should get an error when missing password ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john6@example.com",
                "passwordConfirm": "mypassword123"
            }
            console.log(userData);
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body);
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: password');
        });

        it('should get an error when missing passwordConfirm ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john6@example.com",
                "password": "mypassword123"
            }
            const res = await request.post('/users/signup').send(userData)
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: passwordConfirm');
        });

        it('should get an error when invalid email format ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john6example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123"
            }
            const res = await request.post('/users/signup').send(userData)
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: email: Please provide a valid email');
        });

        it('should get an error when password and passwordConfirm do not match ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john6@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword1232"
            }
            const res = await request.post('/users/signup').send(userData)
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: passwordConfirm: Passwords are not the same!');
        });

        it('should get an error when password longer than 30 characters ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john6@example.com",
                "password": "mypassword123456789012345678901",
                "passwordConfirm": "mypassword123456789012345678901"
            }
            const res = await request.post('/users/signup').send(userData)
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Password longer then 30 characters'); //ошибка 
        });

        it('should get an error when duplicate email ', async () => {
            const userData = {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123"
            }
            const res = await request.post('/users/signup').send(userData)
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('This email is already in use. Please use another email.'); 
        });
    });
});