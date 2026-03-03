import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { useMutation } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  createEpisodeSchema,
  type TCreateEpisode,
} from '../../shared/schemes/episode.schema.ts'
import { MAX_INT } from '../../constants/limits.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
}

const CreateEpisode = ({ closeModal, clearCheckBoxes }: Props) => {
  const onSuccess = useQuerySuccess(
    QUERY_KEYS.EPISODES,
    closeModal,
    clearCheckBoxes,
  )

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateEpisode) =>
      createData(data, API_ENDPOINTS.EPISODES),
    onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateEpisode>({
    resolver: zodResolver(createEpisodeSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      animeId: '',
      episodeNumber: 1,
      views: 0,
    },
  })

  const onFormSubmit: SubmitHandler<TCreateEpisode> = async (data) => {
    mutate(data)
  }

  return (
    <CreateModal
      id={`create-${LOWER_LABELS.EPISODES}`}
      label={`Create ${LOWER_LABELS.EPISODES}`}
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
                hasError={!!errors.animeId?.message}
                labelText={'Anime id'}
                id={'anime-id'}
                autoComplete={'on'}
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
            isPending ? 'Creating...' : `Create an ${UPPER_LABELS.EPISODES}`
          }
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateEpisode
