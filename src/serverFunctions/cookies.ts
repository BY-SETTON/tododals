'use server'

import {cookies} from 'next/headers'

interface cookieObject {
  name: string,
  value: any,
}

export async function createCookie(data: cookieObject) {
  cookies().set(data.name, data.value)
}

export async function getCookie(name: string): Promise<any> {
  return cookies().get(name)
}


