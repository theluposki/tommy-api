import { describe, test, expect} from 'vitest'
import { createUser } from './CreateUser.ts'

describe("createUser use case test suite", () => {

  test('should create a user with the provided parameters', async () => {
    const email = 'john@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';
    const existingUser = false;

    const result = await createUser(email, password, confirmPassword, existingUser);

    expect(result).toEqual({
      id: expect.any(String),
      email,
      password,
    });
  });

  test('should return an error if email is not provided', async () => {
    const password = 'password123';
    const confirmPassword = 'password123';
    const existingUser = false;

    const result = await createUser('', password, confirmPassword, existingUser);

    expect(result).toEqual({ error: 'email is required' });
  });

  test('should return an error if password is not provided', async () => {
    const email = 'john@example.com';
    const confirmPassword = 'password123';
    const existingUser = false;

    const result = await createUser(email, '', confirmPassword, existingUser);

    expect(result).toEqual({ error: 'password is required' });
  });

  test('should return an error if confirmPassword is not provided', async () => {
    const email = 'john@example.com';
    const password = 'password123';
    const existingUser = false;

    const result = await createUser(email, password, '', existingUser);

    expect(result).toEqual({ error: 'confirmPassword is required' });
  });

  test('should return an error if passwords do not match', async () => {
    const email = 'john@example.com';
    const password = 'password123';
    const confirmPassword = 'differentPassword123';
    const existingUser = false;

    const result = await createUser(email, password, confirmPassword, existingUser);

    expect(result).toEqual({ error: 'passwords do not match' });
  });

  test('should return an error if user already exists', async () => {
    const email = 'john@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';
    const existingUser = true;

    const result = await createUser(email, password, confirmPassword, existingUser);

    expect(result).toEqual({ error: 'user already exist' });
  });
})
