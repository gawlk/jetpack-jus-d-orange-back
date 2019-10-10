import { Jetpack } from '.';

describe('Jetpack', () => {
    describe('constructor', () => {
        test('() => Error', () => {
            expect(() => new Jetpack()).toThrow();
        });

        test('(string) => Error', () => {
            expect(() => new Jetpack('id')).toThrow();
        });

        test('(string, string) => Error', () => {
            expect(() => new Jetpack('id', 'name')).toThrow();
        });

        test('(string, string, string) => Ok', () => {
            new Jetpack('id', 'name', 'url');
        });

        test('(!string, string, string) => Error', () => {
            expect(() => new Jetpack(1, 'name', 'url')).toThrow();
        });

        test('(string, !string, string) => Error', () => {
            expect(() => new Jetpack('id', 1, 'url')).toThrow();
        });

        test('(string, string, !string) => Error', () => {
            expect(() => new Jetpack('id', 'name', 1)).toThrow();
        });
    });

    describe('toJson', () => {
        test('("id", "name", "url") => { id: "id", name: "name", image: "image" }', () => {
            const id = 'id';
            const name = 'name';
            const image = 'url';

            const jetpack = new Jetpack(id, name, image);

            expect(jetpack.toJson()).toMatchObject({
                id,
                name,
                image,
            })
        });
    });
});
