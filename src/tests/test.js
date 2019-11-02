import { db } from '../db';
import { JetpackRepository } from '../repository';

const repository = new JetpackRepository(db);
const jetpacks = repository.getAll();

console.log(jetpacks);
