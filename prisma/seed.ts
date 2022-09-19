import prisma from '@prisma/client';

const { PrismaClient } = prisma;
const client = new PrismaClient();

async function main() {
  // disciplines modules
  await client.term.upsert({ where: { number: 1 }, update: {}, create: { number: 1 } });
  await client.term.upsert({ where: { number: 2 }, update: {}, create: { number: 2 } });
  await client.term.upsert({ where: { number: 3 }, update: {}, create: { number: 3 } });
  await client.term.upsert({ where: { number: 4 }, update: {}, create: { number: 4 } });
  await client.term.upsert({ where: { number: 5 }, update: {}, create: { number: 5 } });
  await client.term.upsert({ where: { number: 6 }, update: {}, create: { number: 6 } });

  // tests types
  await client.category.upsert({
    where: { name: 'Projeto' },
    update: {},
    create: { name: 'Projeto' }
  });
  await client.category.upsert({
    where: { name: 'Prática' },
    update: {},
    create: { name: 'Prática' }
  });
  await client.category.upsert({
    where: { name: 'Recuperação' },
    update: {},
    create: { name: 'Recuperação' }
  });

  // teachers
  await client.teacher.upsert({
    where: { name: 'Diego Pinho' },
    update: {},
    create: { name: 'Diego Pinho' }
  });
  await client.teacher.upsert({
    where: { name: 'Bruna Hamori' },
    update: {},
    create: { name: 'Bruna Hamori' }
  });

  // disciplines
  await client.discipline.upsert({
    where: { name: 'HTML e CSS' },
    update: {},
    create: { name: 'HTML e CSS', termId: 1 }
  });
  await client.discipline.upsert({
    where: { name: 'JavaScript' },
    update: {},
    create: { name: 'JavaScript', termId: 2 }
  });
  await client.discipline.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React', termId: 3 }
  });
  await client.discipline.upsert({
    where: { name: 'Humildade' },
    update: {},
    create: { name: 'Humildade', termId: 1 }
  });
  await client.discipline.upsert({
    where: { name: 'Planejamento' },
    update: {},
    create: { name: 'Planejamento', termId: 2 }
  });
  await client.discipline.upsert({
    where: { name: 'Autoconfiança' },
    update: {},
    create: { name: 'Autoconfiança', termId: 3 }
  });

  // teachers and disciplines
  await client.teachersDisciplines.upsert({
    where: { id: 1 },
    update: {},
    create: { teacherId: 1, disciplineId: 1 }
  });
  await client.teachersDisciplines.upsert({
    where: { id: 2 },
    update: {},
    create: { teacherId: 1, disciplineId: 2 }
  });
  await client.teachersDisciplines.upsert({
    where: { id: 3 },
    update: {},
    create: { teacherId: 1, disciplineId: 3 }
  });
  await client.teachersDisciplines.upsert({
    where: { id: 4 },
    update: {},
    create: { teacherId: 2, disciplineId: 4 }
  });
  await client.teachersDisciplines.upsert({
    where: { id: 5 },
    update: {},
    create: { teacherId: 2, disciplineId: 5 }
  });
  await client.teachersDisciplines.upsert({
    where: { id: 6 },
    update: {},
    create: { teacherId: 2, disciplineId: 6 }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
  });
