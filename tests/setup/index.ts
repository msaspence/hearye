import { connection } from '@hearye/db'

import { Client } from 'pg'

import { expect } from 'vitest'

const TRUNCATE_ALL_TABLES_QUERY = `
  COMMENT ON SCHEMA public IS 'standard public schema';
  DO $$ DECLARE
      r RECORD;
  BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'ALTER TABLE ' || quote_ident(r.tablename) || ' DISABLE TRIGGER ALL';
        EXECUTE 'DELETE FROM ' || quote_ident(r.tablename) || '';
        EXECUTE 'ALTER TABLE ' || quote_ident(r.tablename) || ' ENABLE TRIGGER ALL';
      END LOOP;
  END $$;
  `

beforeEach(async () => {
  const client = new Client({
    connectionString: connection,
  })
  await client.connect()
  await client.query(TRUNCATE_ALL_TABLES_QUERY)
  await client.end()
})
