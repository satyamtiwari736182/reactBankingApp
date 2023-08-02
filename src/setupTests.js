// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
import { server } from './mocks/server.js'
import '@testing-library/jest-dom/extend-expect';
import { localStorageMock } from './mocks/localStorage.js';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());