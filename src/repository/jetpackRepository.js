import { Jetpack } from "../entity";

export class JetpackRepository {
    constructor(db) {
        if (! db) {
            throw 'ERROR: db object is missing';
        }

        this.db = db;
    }

    create(jetpack) {
        if (! jetpack) {
            throw 'ERROR: Jetpack object is missing';
        }

        if (jetpack.constructor.name !== 'Jetpack') {
            throw 'ERROR: The parameter must be a Jetpack object';
        }

        this.db
            .get('jetpacks')
            .push(jetpack.toJson())
            .write();
    }

    getAll() {
        return this.db
            .get('jetpacks')
            .value();
    }
};
