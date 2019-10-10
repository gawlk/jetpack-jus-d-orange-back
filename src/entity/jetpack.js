export class Jetpack {
    constructor(id, name, image) {
        if (! id || ! name || ! image) {
            throw 'ERROR: Need an id, a name and an image.';
        } else if (typeof id !== 'string' || typeof name !== 'string' || typeof image !== 'string') {
            throw 'ERROR: id, name and image should be strings'
        }

        this._id = id;
        this._name = name;
        this._image = image;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
            image: this.image
        }
    }
};
