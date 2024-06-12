import {
  kyGet,
  kySet,
  random,
  randomAvatar,
  randomInt,
  randomTime,
  uid,
} from '@/utils/main'
import { randomName } from '@lotusloli/random-names'
import Dexie from 'dexie'
import { pinyin } from 'pinyin-pro'
export const db = new Dexie('chatDB')

db.version(3).stores({
  users: '&id,username,nickname',
  relations: '++id,[fromId+targetId],fromId,targetId,alias,status',
  messages: '++id,[fromId+targetId],fromId,targetId,time',
  moments: '++id,fromId,title,content,time',

  fileStore: '&name,file',
})

const FAKE_STORE_PREPARED = 'FAKE_STORE_PREPARED'
kyGet(FAKE_STORE_PREPARED).then((v) => {
  if (!v) {
    prepareFakeStore()
    kySet(FAKE_STORE_PREPARED, true)
  }
})

async function prepareFakeStore() {
  const users = new Array(20).fill().map(() => {
    const name = randomName(random() < 0.5 ? 1 : 2)
    return {
      id: uid(),
      username: pinyin(name),
      nickname: name,
      avatar: randomAvatar(randomInt(1, 100)),
    }
  })

  const relations = []
  const messages = []
  for (let user of users) {
    for (let user2 of users) {
      if (user === user2 || Math.random() > 0.5) continue
      relations.push({
        fromId: user.id,
        targetId: user2.id,
        alias: user2.nickname,
        status: '0',
      })
      messages.push({
        fromId: user.id,
        targetId: user2.id,
        time: randomTime(),
        content: `你好，${user2.nickname}，我是${user.nickname}`,
      })
    }
  }

  try {
    await db.transaction(
      'rw',
      db.users,
      db.relations,
      db.messages,
      async () => {
        return Promise.all([
          db.users.bulkPut(users).then(() => {
            console.log(`users数据已初始化：${users.length}条`)
          }),
          db.relations.bulkPut(relations).then(() => {
            console.log(`relations数据已初始化：${relations.length}条`)
          }),
          db.messages.bulkPut(messages).then(() => {
            console.log(`messages数据已初始化：${messages.length}条`)
          }),
        ])
      }
    )
  } catch (err) {
    console.error('Failed to insert data: ' + (err.stack || err))
  }
}
