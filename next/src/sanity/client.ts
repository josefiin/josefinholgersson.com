import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'no50snex',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
