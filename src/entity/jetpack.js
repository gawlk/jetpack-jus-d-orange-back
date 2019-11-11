import isImageUrl from 'is-image-url';

export const ErrorMessage = {
    MissingArgument: 'ERROR: Need an id, a name and an image.',
    WrongType: 'ERROR: id, name and image should be strings.',
    MustBeImageUrl: 'ERROR: Image parameter must a URL to an image',
}

export class Jetpack {
    constructor(id, name, image) {
        if (! id || ! name || ! image) {
            throw ErrorMessage.MissingArgument;
        } else if (typeof id !== 'string' || typeof name !== 'string' || typeof image !== 'string') {
            throw ErrorMessage.WrongType;
        } else if (! isImageUrl(image)) {
            throw ErrorMessage.MustBeImageUrl;
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

    get image() {
        return this._image;
    }

    toJson() {
        return {
            id : this.id,
            name: this.name,
            image: this.image,
        };
    }
};
