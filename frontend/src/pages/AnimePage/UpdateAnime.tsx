import type { Dispatch, SetStateAction } from 'react'
import type { TAnime } from '../../shared/types/anime.type.ts'
import { useAddToast } from '../../stores/useToastsStore.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { animeAgeLimits, animeStatuses, animeTypes } from './anime-page.data.ts'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  anime: TAnime
}

const UpdateAnime = ({ setIsOpen, anime }: Props) => {
  const {
    id,
    genres,
    status,
    episodesLength,
    episodesCount,
    episodesReleased,
    releaseDate,
    slug,
    type,
    originalTitle,
    ageLimit,
    title,
    image,
    description,
  } = anime

  const addToast = useAddToast()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TDataAnime) => updateData(id, data, API_ENDPOINTS.ANIME),
    onSuccess: async (data) => {
      addToast(data)
      if (data.isSuccess) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ANIME],
          exact: false,
        })
        setIsOpen(false)
      }
    },
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
      episodesReleased,
      slug,
      type,
      originalTitle,
      ageLimit,
      title,
      releaseDate: releaseDate.split('T')[0],
      description: description || '',
      image: image || '',
      genres: genres.map((item) => item.id).join(' '),
    },
  })

  const onFormSubmit: SubmitHandler<TDataAnime> = (data) => {
    const formatedDate = new Date(data.releaseDate).toISOString()
    const newData: TDataAnime = { ...data, releaseDate: formatedDate }
    mutate(newData)
  }

  return (
    <CreateModal id={'update-user'} label={'Update user'} setIsOpen={setIsOpen}>
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
                  isValid={!!errors.episodesReleased?.message}
                  labelText={'Episodes released'}
                  id={'episodes-released'}
                />
              )}
              name={'episodesReleased'}
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
                  isValid={!!errors.episodesLength?.message}
                  labelText={'Episodes length'}
                  id={'episodes-length'}
                />
              )}
              name={'episodesLength'}
            />
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
          </div>
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
          text={isPending ? 'Updating...' : 'Update an Anime'}
          disabled={!isValid || !isDirty || isPending}
        />
      </form>
    </CreateModal>
  )
}

export default UpdateAnime
