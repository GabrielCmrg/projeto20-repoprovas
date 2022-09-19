import { faker } from '@faker-js/faker';

export function signupInfos() {
  const password: string = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  }
}
