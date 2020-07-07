export class Lesson {
  constructor () {
    this.init()
  }
  init () {
    this.id = -1
    this.name = ''
    this.room = ''
    this.teacher = ''
    this.belongings = ''
    return this
  }
}

export class LessonInit extends Lesson {
  constructor (_id, _name, _room, _teacher, _belongings) {
    super()
    this.id = _id
    this.name = _name
    this.room = _room
    this.teacher = _teacher
    this.belongings = _belongings
  }
}
