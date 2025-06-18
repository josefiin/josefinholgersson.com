import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'no50snex',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
});
