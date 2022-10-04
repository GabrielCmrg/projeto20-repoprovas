import {
  Test,
  TestData,
  TestCreationData,
  TestRequestData,
  buildTestData,
} from "../types/testTypes";
import { Category, CategoryData } from "../types/categoryTypes";
import { Discipline } from "../types/disciplineTypes";
import { Teacher } from "../types/teacherTypes";
import { TeacherDiscipline } from "../types/teacherDisciplineTypes";
import {
  teacherDisciplineRepository,
  testRepository,
  categoryRepository,
  disciplineRepository,
  teacherRepository,
} from "../repositories";
import { notFoundException, conflictException } from "../exceptions";

// locally used functions
async function checkCategoryExistance(categoryId: number): Promise<void> {
  const existingCategory: Category | null =
    await categoryRepository.getCategoryById(categoryId);
  if (!existingCategory) {
    throw notFoundException("There isn't a category with this id.");
  }
}

async function checkDisciplineExistance(disciplineId: number): Promise<void> {
  const existingDiscipline: Discipline | null =
    await disciplineRepository.getDisciplineById(disciplineId);
  if (!existingDiscipline) {
    throw notFoundException("There isn't a discipline with this id.");
  }
}

async function checkTeacherExistance(teacherId: number): Promise<void> {
  const existingTeacher: Teacher | null =
    await teacherRepository.getTeacherById(teacherId);
  if (!existingTeacher) {
    throw notFoundException("There isn't a teacher with this id.");
  }
}

// globally used functions
export async function registerNewTest(test: TestRequestData): Promise<Test> {
  await checkCategoryExistance(test.categoryId);
  await checkDisciplineExistance(test.disciplineId);
  await checkTeacherExistance(test.teacherId);
  const existingRelation: TeacherDiscipline | null =
    await teacherDisciplineRepository.getRelation(
      test.disciplineId,
      test.teacherId
    );
  if (!existingRelation) {
    throw conflictException("This teacher does not teach this discipline.");
  }
  const testToCreate: TestCreationData = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: test.categoryId,
    teacherDisciplineId: existingRelation.id,
  };
  const createdTest: Test = await testRepository.createTest(testToCreate);
  return createdTest;
}

// gets a list of relationships teacher/discipline and return a list of categories
// with tests nested to it
export function groupTestsByCategories(
  teacherDisciplines: TeacherDiscipline[]
): CategoryData[] {
  const groupedMap: { [key: number]: CategoryData } = {};
  teacherDisciplines.forEach((teacherDiscipline: TeacherDiscipline): void => {
    const tests: Test[] | undefined = teacherDiscipline.tests;
    tests!.forEach((test: Test): void => {
      if (!groupedMap[test.categoryId]) {
        groupedMap[test.categoryId] = {
          id: test.category!.id,
          name: test.category!.name,
          tests: [],
        };
      }
      // if we hadn't the reference on the test, we will need it
      test.teacherDiscipline = teacherDiscipline;
      const testData: TestData = buildTestData(test);
      groupedMap[test.categoryId].tests.push(testData);
    });
  });

  return Object.values(groupedMap);
}
