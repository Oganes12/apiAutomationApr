import { faker } from "@faker-js/faker";
import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1');

export function createTour() {
    return {
        name: faker.internet.displayName(),
        duration: faker.number.int({ min: 1, max: 30 }),
        description: faker.lorem.paragraph(),
        maxGroupSize: faker.number.int({ min: 1, max: 100 }),
        summary: faker.lorem.sentence(),
        difficulty: faker.helpers.arrayElement(['easy', 'medium', 'difficult']),
        price: faker.number.int({ min: 100, max: 1000 }),
        rating: faker.number.float({ min: 1, max: 5 }),
        imageCover: "tour-3-cover.jpg",
        ratingsAverage: faker.number.float({ min: 1, max: 5 }),
        guides: [],
        startDates: [faker.date.future().toISOString().split('T')[0]],
        startLocation: {
            type: "Point",
            coordinates: [
                faker.number.float({ min: -180, max: 180 }),
                faker.number.float({ min: -90, max: 90 })
            ],
        },
    };
}