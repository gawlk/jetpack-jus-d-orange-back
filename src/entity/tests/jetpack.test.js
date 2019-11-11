import {
    ErrorMessage,
    Jetpack,
} from '../jetpack';

describe('Jetpack', () => {
    describe('constructor', () => {
        test('() => Missing argument', () => {
            expect(() => new Jetpack()).toThrow(ErrorMessage.MissingArgument);
        });

        test('(string) => Missing argument', () => {
            expect(() => new Jetpack('id')).toThrow(ErrorMessage.MissingArgument);
        });

        test('(string, string) => Missing argument', () => {
            expect(() => new Jetpack('id', 'name')).toThrow(ErrorMessage.MissingArgument);
        });

        test('(!string, string, string) => Wrong type', () => {
            expect(() => new Jetpack(1, 'name', 'url')).toThrow(ErrorMessage.WrongType);
        });

        test('(string, !string, string) => Wrong type', () => {
            expect(() => new Jetpack('id', 1, 'url')).toThrow(ErrorMessage.WrongType);
        });

        test('(string, !string, !string) => Wrong type', () => {
            expect(() => new Jetpack('id', 1, 1)).toThrow(ErrorMessage.WrongType);
        });

        test('(!string, !string, string) => Wrong type', () => {
            expect(() => new Jetpack(1, 1, 'sht')).toThrow(ErrorMessage.WrongType);
        });

        test('(string, !string, !string) => Wrong type', () => {
            expect(() => new Jetpack('oenoe', 1, 1)).toThrow(ErrorMessage.WrongType);
        });

        test('(!string, !string, !string) => Wrong type', () => {
            expect(() => new Jetpack(1, 1, 1)).toThrow(ErrorMessage.WrongType);
        });

        test('(string, string, !string) => Wrong type', () => {
            expect(() => new Jetpack('id', 'name', 1)).toThrow(ErrorMessage.WrongType);
        });

        test('(string, string, ! image url) => Must be image url', () => {
            expect(() => new Jetpack('id', 'name', 'https')).toThrow(ErrorMessage.MustBeImageUrl);
        });

        test('(string, string, image url) => Ok', () => {
            new Jetpack('id', 'name', 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png');
        });
    });

    describe('toJson', () => {
        test(`("id", "name", "url") => {
            id: "id",
            name: "name",
            image: "image"
        }`, () => {
            const id = 'id';
            const name = 'name';
            const image = 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png';

            const jetpack = new Jetpack(id, name, image);

            expect(jetpack.toJson()).toMatchObject({
                id,
                name,
                image,
            })
        });
    });
});
