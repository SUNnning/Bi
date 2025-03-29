import { get, post } from '@/utils/request';

export function init () {
  return get('./newEidt.json')
}

export function getInfo (data) {
  return post('/api/test/getList', data)
}
