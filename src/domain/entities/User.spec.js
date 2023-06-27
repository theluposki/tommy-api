import { describe, test, expect} from 'vitest'
import { User } from './User.ts'

describe("testing the user entity", () => {

  test("User should be an object", () => {
    expect(typeof User).toBe('object');
  })

  test("User is expected to have the createUser property", () => {
    expect(User.hasOwnProperty('createUser')).toBeTruthy();
  })

  test("the createUser property is expected to be a function", () => {
    expect(typeof User.createUser).toBe('function');
  })

  test("should create a user with the provided parameters", async () => {
      const email = 'lu@mail.com'
      const password = '123456'
      const confirmPassword = '123456'

      const result = await User.createUser(email, password, confirmPassword);

      expect(result).toBeDefined();
      expect(result.error).toBeUndefined();
      expect(result.id).toBeDefined();
      expect(result.email).toBe(email);
      expect(result.password).toBe(password);
  })

  test('should return an error if email is not provided', async () => {
    const password = 'password123';
    const confirmPassword = 'password123';

    const result = await User.createUser('', password, confirmPassword);

    expect(result).toBeDefined();
    expect(result.error).toBe('email is required');
    expect(result.id).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test('should return an error if password is not provided', async () => {
    const email = 'john@example.com';
    const confirmPassword = 'password123';

    const result = await User.createUser(email, '', confirmPassword);

    expect(result).toBeDefined();
    expect(result.error).toBe('password is required');
    expect(result.id).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test('should return an error if confirmPassword is not provided', async () => {
    const email = 'john@example.com';
    const password = 'password123';

    const result = await User.createUser(email, password, '');

    expect(result).toBeDefined();
    expect(result.error).toBe('confirmPassword is required');
    expect(result.id).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test('should return an error if passwords do not match', async () => {
    const email = 'john@example.com';
    const password = 'password123';
    const confirmPassword = 'differentPassword123';

    const result = await User.createUser(email, password, confirmPassword);

    expect(result).toBeDefined();
    expect(result.error).toBe('passwords do not match');
    expect(result.id).toBeUndefined();
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
  });
})
