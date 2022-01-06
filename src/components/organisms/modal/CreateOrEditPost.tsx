import { CustomButton } from 'components/atoms/button/CustomButton'
import { InputButton } from 'components/atoms/button/InputButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { TextArea } from 'components/atoms/form/TextArea'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { PostImageInput } from 'components/molecules/postImage/PostImageInput'
import { useApi } from 'hooks/useApi'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const CreateOrEditPost = memo(() => {
  const {
    editedPost,
    changePost,
    changeBody,
    submitPost,
    validationCreatePost,
  } = useMain()
  const {
    address,
    changeAddress,
    setAddressData,
    isNotValidData,
    isLoadingAddress,
    isRefetchingAddress,
  } = useApi()
  return (
    <>
      <form onSubmit={submitPost} className="md:p-3">
        <div className=" flex flex-col me:space-y-4 space-y-1 mt-2">
          <div className=" flex flex-col space-y-2 items-start">
            <CustomLabel title="タイトル" />
            <CustomInput
              name="title"
              value={editedPost.title}
              placeholder="タイトル"
              onChange={changePost}
              isError={editedPost.title.length > 30}
            />
            <ValidationMessage isError={editedPost.title.length > 30}>
              {editedPost.title.length > 30 && '30文字以内で入力してください'}
            </ValidationMessage>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <div className="flex flex-row">
              <CustomLabel title="本文" />
              <p className="ml-3 text-sm">
                {editedPost.body !== null ? editedPost.body.length : 0}/140
              </p>
            </div>
            <TextArea
              value={editedPost.body}
              placeholder="本文"
              onChange={changeBody}
              isError={editedPost.body !== null && editedPost.body.length > 140}
            />
          </div>
          <ValidationMessage
            isError={editedPost.body !== null && editedPost.body.length > 140}
          >
            140字以内で入力してください
          </ValidationMessage>
          <div className="flex md:flex-row md:space-x-7 flex-col">
            <div className="md:w-80 h-16 flex flex-col space-y-2 justify-between md:items-start">
              <div>
                <CustomLabel title="郵便番号" />
              </div>
              <div className="flex flex-row items-center">
                <div className="md:w-40 w-full">
                  <CustomInput
                    name="address"
                    value={address}
                    onChange={changeAddress}
                    placeholder="郵便番号"
                  />
                </div>
                <div className="md:w-24 w-32">
                  <InputButton
                    text="自動入力"
                    disabled={isNotValidData()}
                    loading={isLoadingAddress || isRefetchingAddress}
                    onClick={setAddressData}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2 md:mt-1 mt-3 items-start">
              <CustomLabel title="旅行先住所" />
              <CustomInput
                name="prefecture"
                value={
                  editedPost.prefecture + editedPost.city + editedPost.town
                }
                placeholder="郵便番号から自動入力されます"
                onChange={changePost}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-64 flex flex-col md:space-y-4 space-y-2 md:mt-3 mt-2 items-center">
          <PostImageInput />
          <CustomButton
            disabled={validationCreatePost()}
            type="submit"
            text={`${editedPost.id === 0 ? '投稿' : '編集'}`}
          />
        </div>
      </form>
    </>
  )
})
