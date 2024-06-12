import { chatWithOther, getMoment } from './ai'
import { db } from './main'

const avatarCache = {}
class FakeServer {
  constructor() {
    this.db = db
  }

  async getActiveContacts(fromId) {
    const relations = await db.relations
      .where({ fromId })
      .toArray((arr) => arr.filter((d) => d.status === '1'))
    return Promise.all(relations.map((d) => this.getContact(d.id))).then(
      (arr) => arr.filter((d) => d)
    )
  }

  async getContacts(fromId) {
    const relations = await db.relations.where({ fromId }).toArray()
    return Promise.all(relations.map((d) => this.getContact(d.id))).then(
      (arr) => {
        arr.sort((a, b) =>
          new Intl.Collator('zh-CN').compare(a.username, b.username)
        )
        return arr
      }
    )
  }

  async getContact(id) {
    const relation = await this.db.relations.get(id)
    if (!relation) return
    const user = await this.db.users.get(relation.targetId)
    return {
      ...user,
      ...relation,
    }
  }

  async deactiveContact(id) {
    return this.db.relations.update(id, { status: '0' })
  }

  async activeContact(id) {
    return this.db.relations.update(id, { status: '1' })
  }

  async addRelation(fromId, targetId) {
    const user = await this.getUser(targetId)
    return this.db.relations.put({ fromId, targetId, alias: user.nickname })
  }

  async deleteRelation(id) {
    return this.db.relations.delete(id)
  }

  async getRelation(id) {
    return this.db.relations.get(id)
  }

  async setRelation(id, data) {
    const { alias, character } = data
    return this.db.relations.update(id, { alias, character })
  }

  async setCharacter(id, character) {
    return this.setRelation(id, { character })
  }

  async getFirstUser() {
    return this.db.users.orderBy('username').first()
  }

  async getUser(id) {
    return this.db.users.get(id)
  }

  async getUsers() {
    return this.db.users.orderBy('username').toArray()
  }

  async getRelationUsers(fromId) {
    if (!fromId) return []
    const users = await this.getUsers()
    const targetIds = await this.db.relations
      .where({ fromId })
      .toArray((arr) => arr.map((d) => d.targetId))
    for (const user of users) {
      user.inRelation = targetIds.includes(user.id)
    }
    return users
  }

  async getAvatar(id) {
    if (avatarCache[id]) return avatarCache[id]
    return this.db.users.get(id).then((d) => {
      avatarCache[id] = d.avatar
      return d.avatar
    })
  }

  async getMessages(relationId) {
    if (!relationId) return []
    const { fromId, targetId } = await this.db.relations.get(relationId)
    return Promise.all([
      this.db.messages.where({ fromId, targetId }).toArray(),
      this.db.messages.where({ fromId: targetId, targetId: fromId }).toArray(),
    ]).then(([a, b]) => {
      a.forEach((d) => (d.type = 'from'))
      b.forEach((d) => (d.type = 'target'))
      return [...a, ...b].sort((a, b) => a.time - b.time)
    })
  }

  async sendMessage(relationId, content) {
    const { fromId, targetId } = await this.db.relations.get(relationId)
    return Promise.all([
      this.db.messages.put({
        fromId,
        targetId,
        content,
        time: Date.now(),
      }),
      this.getRelation(relationId).then(async (d) => {
        const character = d?.character || ''
        return chatWithOther(fromId + targetId, character, content).then(
          (res) => {
            return this.db.messages.put({
              fromId: targetId,
              targetId: fromId,
              content: res,
              time: Date.now() + 10,
            })
          }
        )
      }),
    ])
  }

  async deleteMessage(id) {
    return this.db.messages.delete(id)
  }

  async deleteAllMessages(relationId) {
    const { fromId, targetId } = await this.db.relations.get(relationId)
    return Promise.all([
      this.db.messages.where({ fromId, targetId }).delete(),
      this.db.messages.where({ fromId: targetId, targetId: fromId }).delete(),
    ])
  }

  async uploadFile(file) {
    const { size, lastModified } = file
    const name = `${size}${lastModified}`
    const _file = await this.db.fileStore.get(name)
    const desc = `fileStore:${name}`
    if (_file) return desc
    return this.db.fileStore.put({ name, file }).then(() => desc)
  }

  async readFile(desc) {
    if (!desc.startsWith('fileStore:')) return '#'
    return this.db.fileStore
      .get(desc.slice(10))
      .then((d) => readFileAsUrl(d.file))
  }

  async getMoments(fromId) {
    const targetIds = await this.db.relations
      .where({ fromId })
      .toArray((arr) => arr.map((d) => d.targetId))
    return this.db.moments
      .where('fromId')
      .anyOf(targetIds)
      .reverse()
      .sortBy('time')
  }

  async addMoment(fromId, title, content) {
    return this.db.moments.put({
      fromId,
      title,
      content,
      time: Date.now(),
    })
  }

  async fakeAddMoment(fromId) {
    return getMoment(fromId).then((d) => {
      return this.addMoment(fromId, '日常', d)
    })
  }
}

const readFileAsUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

export const server = new FakeServer()
