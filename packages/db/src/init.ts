import { Model } from 'objection'
import Knex from 'knex'

import * as config from '../knexconfig'

const knex = Knex(config)

// Give the knex instance to objection.
Model.knex(knex)
