import type { TEpisode } from '../../shared/types/episodes.type.ts'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import {
  type TUpdateEpisode,
  updateEpisodeSchema,
} from '../../shared/schemes/episode.schema.ts'
import { updateData } from '../../services/update-data.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import { MAX_INT } from '../../constants/limits.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  episode: TEpisode
}

const UpdateEpisode = ({ closeModal, episode, clearCheckBoxes }: Props) => {
  const { id, views, episodeNumber, title } = episode

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.EPISODES,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TUpdateEpisode) =>
      updateData(id, data, TABLE_KEY.EPISODES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TUpdateEpisode>({
    resolver: zodResolver(updateEpisodeSchema),
    mode: 'onChange',
    defaultValues: {
      episodeNumber,
      title,
      views,
    },
  })

  const onFormSubmit: SubmitHandler<TUpdateEpisode> = (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`update-${LOWER_LABELS.EPISODES}`}
      label={`Update ${LOWER_LABELS.EPISODES}`}
      closeModal={closeModal}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={'w-full flex flex-col gap-5'}
      >
        <div className={'flex flex-col w-full gap-3 items-start'}>
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.title?.message}
                autoComplete={'off'}
                labelText={'Title'}
                id={'title'}
              />
            )}
            name={'title'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'number'}
                min={1}
                max={MAX_INT}
                onChange={(event) => field.onChange(+event.target.value)}
                hasError={!!errors.episodeNumber?.message}
                labelText={'Episode number'}
                id={'episode-number'}
              />
            )}
            name={'episodeNumber'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'number'}
                min={0}
                max={MAX_INT}
                onChange={(event) => field.onChange(+event.target.value)}
                hasError={!!errors.views?.message}
                labelText={'Views'}
                id={'views'}
              />
            )}
            name={'views'}
          />
        </div>
        <LoginButton
          text={
            isPending ? 'Updating...' : `Update an ${UPPER_LABELS.EPISODES}`
          }
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateEpisode
