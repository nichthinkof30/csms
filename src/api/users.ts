import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

// sca : temporary hardcoded fro testing
export const login = (data: any) =>
  request({
    url: 'https://jomcharge.itstartechs.com/jomcharge-main/api/v1/auth/signin/staff',
    method: 'post',
    data: {
      email: 'admin@jomcharge.com',
      password: 'password',
      organization_id: '61a0ab6b-a586-44f4-83c7-06811da240fb'
    }
  })

// export const login = (data: any) =>
//   request({
//     url: '/users/login',
//     method: 'post',
//     data
//   })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
