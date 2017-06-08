import { manifest } from './manifest';
import { handler } from './handler';
import { test } from './test';

const provider = {
  name: 'starter-kit',
  manifest,
  handler,
  test,
};

export default provider;
