import type { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { createData } from '../../services/create-data.ts'
import {
  dataEpisodeSchema,
  type TDataEpisode,
} from '../../shared/schemes/data-episode.schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import { updateData } from '../../services/update-data.ts'
import type { TEpisodeFormData } from './episodes-page.data.ts'
import { useQuerySuccess } from '../../lib/useQuerySuccess.ts'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  episode: TEpisodeFormData
  operationType: 'create' | 'update'
}

const EpisodeForm = ({ setIsOpen, episode, operationType }: Props) => {
  const { animeId, episodeNumber, title, views, id } = episode

  const onSuccess = useQuerySuccess(QUERY_KEYS.EPISODES, setIsOpen)

  const createMutation = useMutation({
    mutationFn: (data: TDataEpisode) =>
      createData(data, API_ENDPOINTS.EPISODES),
    onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataEpisode) =>
      updateData(id, data, API_ENDPOINTS.EPISODES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TDataEpisode>({
    resolver: zodResolver(dataEpisodeSchema),
    mode: 'onChange',
    defaultValues: {
      animeId,
      views,
      episodeNumber,
      title,
    },
  })

  const onFormSubmit: SubmitHandler<TDataEpisode> = async (data) => {
    if (operationType === 'create') {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate(data)
    }
  }

  return (
    <CreateModal
      id={operationType === 'create' ? 'create-episode' : 'update-episode'}
      label={operationType === 'create' ? 'Create episode' : 'Update episode'}
      setIsOpen={setIsOpen}
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
                isValid={!!errors.title?.message}
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
                isValid={!!errors.animeId?.message}
                labelText={'Anime id'}
                id={'anime-id'}
              />
            )}
            name={'animeId'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'number'}
                min={1}
                onChange={(event) => field.onChange(+event.target.value)}
                isValid={!!errors.episodeNumber?.message}
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
                onChange={(event) => field.onChange(+event.target.value)}
                isValid={!!errors.views?.message}
                labelText={'Views'}
                id={'views'}
              />
            )}
            name={'views'}
          />
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : 'Create an Episode'
              : updateMutation.isPending
                ? 'Updating...'
                : 'Update an Episode'
          }
          disabled={
            createMutation.isPending ||
            updateMutation.isPending ||
            !isValid ||
            (!isDirty && operationType === 'update')
          }
        />
      </form>
    </CreateModal>
  )
}

export default EpisodeForm
