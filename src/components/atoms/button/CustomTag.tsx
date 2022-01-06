import { XIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'
import { Label } from 'types/postType'

type Props = {
  label: Label
}

export const CustomTag: VFC<Props> = memo(({ label }) => {
  const { deleteLabel } = useSearch()
  const { currentUser } = useMain()
  return (
    <div
      key={label.id}
      className={`flex flex-row justify-between h-8 items-center truncate overflow-ellipsis px-3 py-2 shadow text-white bg-blue-500 rounded ${
        label.userId === currentUser?.id && 'hover:bg-blue-600'
      }`}
    >
      <p
        className={`text-center ${
          label.userId === currentUser?.id && 'mr-1'
        } w-full`}
      >
        {label.name}
      </p>
      {label.userId === currentUser?.id && (
        <XIcon
          onClick={deleteLabel(label)}
          className="cursor-pointer text-white w-5"
        />
      )}
    </div>
  )
})
