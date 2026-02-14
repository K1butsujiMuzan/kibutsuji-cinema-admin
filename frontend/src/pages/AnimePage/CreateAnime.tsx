import type { Dispatch, SetStateAction } from 'react'
import { useAddToast } from '../../stores/useToastsStore.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createData } from '../../services/create-data.ts'
import { QUERY_KEYS } from '../../constants/query-keys.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import {
  DataAnimeSchema,
  type TDataAnime,
} from '../../shared/schemes/data-anime.schema.ts'
import Select from '../../components/ui/Select/Select.tsx'
import { animeAgeLimits, animeStatuses, animeTypes } from './anime-page.data.ts'
import { API_ENDPOINTS } from '../../configs/api-endpoints.config.ts'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateAnime = ({ setIsOpen }: Props) => {
  const addToast = useAddToast()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TDataAnime) => createData(data, API_ENDPOINTS.ANIME),
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
    formState: { isValid, errors },
  } = useForm<TDataAnime>({
    resolver: zodResolver(DataAnimeSchema),
    mode: 'onChange',
    defaultValues: {
      slug: '',
      type: 'TVSERIES',
      ageLimit: 'AGE_6',
      description: '',
      episodesCount: 0,
      episodesLength: 0,
      episodesReleased: 0,
      image: '',
      genres: '',
      releaseDate: new Date().toISOString().split('T')[0],
      originalTitle: '',
      title: '',
      status: 'ANNOUNCEMENT',
    },
  })

  const onFormSubmit: SubmitHandler<TDataAnime> = async (data) => {
    const formatedDate = new Date(data.releaseDate).toISOString()
    const newData: TDataAnime = { ...data, releaseDate: formatedDate }
    mutate(newData)
  }

  return (
    <CreateModal
      id={'create-anime'}
      label={'Create anime'}
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
          text={isPending ? 'Creating...' : 'Create an Anime'}
          disabled={isPending || !isValid}
        />
      </form>
    </CreateModal>
  )
}

export default CreateAnime
