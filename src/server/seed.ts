import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { parse } from 'yaml';

import client, { Prisma } from './db.js';

interface Medication extends Omit<Prisma.MedicationCreateInput, 'conditions'> {
  conditions: string[];
}

type Condition = Prisma.ConditionCreateInput;

type SeedData = {
  medications: Medication[];
  conditions: Record<string, Condition>;
};

function parseData(): SeedData {
  try {
    // @ts-expect-error
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filepath = join(__dirname, 'seed.yml');
    const contents = readFileSync(filepath, 'utf8');

    return parse(contents);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function main() {
  const yaml = parseData();
  const mapping: Record<string, number> = {};

  // seed the conditions into the db
  await Promise.all(
    Object.keys(yaml.conditions).map(async (conditionKey) => {
      const condition = yaml.conditions[conditionKey];

      const created = await client.condition.upsert({
        where: { name: condition.name },
        update: condition,
        create: condition,
      });

      mapping[conditionKey] = created.id;
    }),
  );

  // seed the medications into the db
  await Promise.all(
    yaml.medications.map(async (medication) => {
      const data: Prisma.MedicationCreateInput = {
        ...medication,
        conditions: {
          connect: medication.conditions.map((conditionKey) => ({
            id: mapping[conditionKey],
          })),
        },
      };

      return client.medication.upsert({
        where: { nameGeneric: data.nameGeneric },
        update: data,
        create: data,
      });
    }),
  );
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
