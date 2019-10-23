export const ErrorMessage = {
    MissingArgument: 'ERROR: Need an id, a name and an image.',
    WrongType: 'ERROR: id, name and image should be strings.',
}

export class Jetpack {
    constructor(id, name, image) {
        if (! id || ! name || ! image) {
            throw ErrorMessage.MissingArgument;
        } else if (typeof id !== 'string' || typeof name !== 'string' || typeof image !== 'string') {
            throw ErrorMessage.WrongType;
        }

        this._id = id;
        this._name = name;
        this._image = image;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    toJson() {
        return {
            id : this.id,
            name: this.name,
            image: this.image,
        };
    }
};
