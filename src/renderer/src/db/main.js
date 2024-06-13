import { kyGet, kySet, random, randomAvatar, randomInt, uid } from '@/utils/main'
import { randomName } from '@lotusloli/random-names'
import Dexie from 'dexie'
import { pinyin } from 'pinyin-pro'
export const db = new Dexie('chatDB')

db.version(3).stores({
  users: '&id,username,nickname',
  relations: '++id,[fromId+targetId],fromId,targetId,alias,status',
  messages: '++id,[fromId+targetId],fromId,targetId,time',
  moments: '++id,fromId,title,content,time',

  fileStore: '&name,file'
})

const FAKE_STORE_PREPARED = 'FAKE_STORE_PREPARED'

export const prepareFakeData = async () => {
  const isPrepared = await kyGet(FAKE_STORE_PREPARED)
  if (isPrepared) return
  await prepareFakeStore()
  kySet(FAKE_STORE_PREPARED, true)
}

async function prepareFakeStore() {
  const users = new Array(100).fill().map(() => {
    const name = randomName(random() < 0.5 ? 1 : 2)
    return {
      id: uid(),
      username: pinyin(name),
      nickname: name,
      avatar: randomAvatar(randomInt(1, 100))
    }
  })

  try {
    await db.transaction('rw', db.users, async () => {
      return db.users.bulkPut(users).then(() => {
        console.log(`users数据已初始化：${users.length}条`)
      })
    })
  } catch (err) {
    console.error('Failed to insert data: ' + (err.stack || err))
  }
}
