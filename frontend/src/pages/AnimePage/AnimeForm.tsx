import type { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateData } from '../../services/update-data.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import {
  DataAnimeSchema,
  type TDataAnime,
} from '../../shared/schemes/data-anime.schema.ts'
import {
  animeAgeLimits,
  animeStatuses,
  animeTypes,
  type TAnimeFormData,
} from './anime-page.data.ts'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'
import { useQuerySuccess } from '../../lib/useQuerySuccess.ts'
import { createData } from '../../services/create-data.ts'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  anime: TAnimeFormData
  operationType: 'create' | 'update'
}

const AnimeForm = ({ setIsOpen, anime, operationType }: Props) => {
  const {
    id,
    genres,
    status,
    episodesLength,
    episodesCount,
    releaseDate,
    slug,
    type,
    originalTitle,
    ageLimit,
    title,
    image,
    description,
  } = anime

  const onSuccess = useQuerySuccess(QUERY_KEYS.ANIME, setIsOpen)

  const createMutation = useMutation({
    mutationFn: (data: TDataAnime) => createData(data, API_ENDPOINTS.ANIME),
    onSuccess: onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataAnime) => updateData(id, data, API_ENDPOINTS.ANIME),
    onSuccess: onSuccess,
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm<TDataAnime>({
    resolver: zodResolver(DataAnimeSchema),
    mode: 'onChange',
    defaultValues: {
      status,
      episodesLength,
      episodesCount,
      slug,
      type,
      originalTitle,
      ageLimit,
      title,
      releaseDate,
      description,
      image,
      genres,
    },
  })

  const onFormSubmit: SubmitHandler<TDataAnime> = (data) => {
    const formatedDate = new Date(data.releaseDate).toISOString()
    const newData: TDataAnime = { ...data, releaseDate: formatedDate }
    if (operationType === 'create') {
      createMutation.mutate(newData)
    } else {
      updateMutation.mutate(newData)
    }
  }

  return (
    <CreateModal
      id={operationType === 'create' ? 'create-anime' : 'update-anime'}
      label={operationType === 'create' ? 'Create anime' : 'Update anime'}
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
              <LoginTextArea
                {...field}
                isValid={!!errors.description?.message}
                labelText={'Description'}
                id={'description'}
              />
            )}
            name={'description'}
          />
          <div className={'flex justify-between w-full gap-2 flex-wrap'}>
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'age-limit'} values={animeAgeLimits} />
              )}
              name={'ageLimit'}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'status'} values={animeStatuses} />
              )}
              name={'status'}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'type'} values={animeTypes} />
              )}
              name={'type'}
            />
          </div>
          <div className={'flex w-full gap-2'}>
            <Controller
              control={control}
              render={({ field }) => (
                <LoginInput
                  {...field}
                  type={'number'}
                  min={0}
                  onChange={(event) => field.onChange(+event.target.value)}
                  isValid={!!errors.episodesCount?.message}
                  labelText={'Episodes count'}
                  id={'episodes-count'}
                />
              )}
              name={'episodesCount'}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <LoginInput
                  {...field}
                  type={'number'}
                  min={0}
                  onChange={(event) => field.onChange(+event.target.value)}
                  isValid={!!errors.episodesLength?.message}
                  labelText={'Episodes length (mins)'}
                  id={'episodes-length'}
                />
              )}
              name={'episodesLength'}
            />
          </div>
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                type={'date'}
                isValid={!!errors.releaseDate?.message}
                labelText={'Release date'}
                id={'release-date'}
              />
            )}
            name={'releaseDate'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.image?.message}
                labelText={'Image'}
                id={'image'}
              />
            )}
            name={'image'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.originalTitle?.message}
                labelText={'Original title'}
                id={'original-title'}
              />
            )}
            name={'originalTitle'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.slug?.message}
                labelText={'Slug'}
                id={'slug'}
              />
            )}
            name={'slug'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                isValid={!!errors.genres?.message}
                labelText={'Genres'}
                id={'genres'}
              />
            )}
            name={'genres'}
          />
          <small className={'text-xs leading-4 font-semibold py-1'}>
            Enter genre IDs separated by spaces.
          </small>
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : 'Create an Anime'
              : updateMutation.isPending
                ? 'Updating...'
                : 'Update an Anime'
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

export default AnimeForm
