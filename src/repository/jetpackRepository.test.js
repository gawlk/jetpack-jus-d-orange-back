import { JetpackRepository } from '.';
import { Jetpack } from '../entity';
import { defaultJetpack } from '../db';

describe('JetpackRepository', () => {
    describe('constructor', () => {
        test('() => Error', () => {
            expect(() => new JetpackRepository()).toThrow();
        });
    });

    describe('create', () => {
        const db = {
            get: jest.fn().mockReturnThis(),
            push: jest.fn().mockReturnThis(),
            write: jest.fn().mockReturnThis(),
        };

        const repository = new JetpackRepository(db);

        test('() => Error', () => {
            expect(() => repository.create()).toThrow();
        });

        test('(! jetpack) => Error', () => {
            expect(() => repository.create(1)).toThrow();
            expect(() => repository.create("test")).toThrow();
            expect(() => repository.create({})).toThrow();
        });

        test('(jetpack) => Ok', () => {
            repository.create(new Jetpack('test', 'test', 'test'));
            expect(db.write.mock.calls.length).toBe(1);
        });
    });

    describe('getAll', () => {
        test('[] => []', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getAll()).toStrictEqual([]);
        });

        test('[ defaultJetpack ] => [ defaultJetpack ]', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getAll()).toStrictEqual([ defaultJetpack ]);
        });
    });    
});