import { Model } from 'objection'

export class BaseModel extends Model {
  createdAt?: Date
  updatedAt?: Date

  $beforeInsert() {
    this.createdAt = new Date()
  }

  $beforeUpdate() {
    this.updatedAt = new Date()
  }
}
