import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { UpdateUserFormData, User } from 'types/userType'

type Data = {
  id: number | undefined
  formData: UpdateUserFormData
}

export const useMutationUser = () => {
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation(
    (data: Data) => client.put<User>(`users/${data.id}`, data.formData),
    {
      onSuccess: (res, variable) => {
        toast.success('ユーザーの更新に成功しました')
        const previousUsers = queryClient.getQueryData<User[]>('users')
        queryClient.setQueryData<User>('user', res.data)
        if (previousUsers) {
          queryClient.setQueryData<User[]>(
            'users',
            previousUsers.map((user) =>
              user.id === variable.id ? res.data : user
            )
          )
        }
      },
      onError: () => {
        toast.error('ユーザーの更新に失敗しました')
      },
    }
  )
  return { updateUserMutation }
}
