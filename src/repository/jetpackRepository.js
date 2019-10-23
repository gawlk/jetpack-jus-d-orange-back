export const ErrorMessage = {
    MissingDatabase: 'ERROR: db object is missing.',
    MissingJetpack: 'ERROR: Jetpack object is missing.',
    WrongTypeJetpack: 'ERROR: The parameter must be a Jetpack object',
}

export class JetpackRepository {
    constructor(db) {
        if (! db) {
            throw ErrorMessage.MissingDatabase;
        }

        this.db = db;
    }

    create(jetpack) {
        if (! jetpack) {
            throw ErrorMessage.MissingJetpack;
        }

        if (jetpack.constructor.name !== 'Jetpack') {
            throw ErrorMessage.WrongTypeJetpack;
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
