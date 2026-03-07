import { useMutation } from '@tanstack/react-query'
import { updateData } from '../../services/update-data.ts'
import { QUERY_KEYS } from '../../configs/query-keys.config.ts'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginInput from '../../components/ui/LoginInput/LoginInput.tsx'
import Select from '../../components/ui/Select/Select.tsx'
import LoginButton from '../../components/ui/LoginButton/LoginButton.tsx'
import CreateModal from '../../components/ui/CreateModal/CreateModal.tsx'
import {
  DataAnimeSchema,
  type TDataAnime,
  type TDataSubmitAnime,
} from '../../shared/schemes/anime.schema.ts'
import { type TAnimeFormData } from './anime-page.data.ts'
import LoginTextArea from '../../components/ui/LoginTextArea/LoginTextArea.tsx'
import { useQuerySuccess } from '../../hooks/useQuerySuccess.ts'
import { createData } from '../../services/create-data.ts'
import { MAX_INT } from '../../constants/limits.ts'
import { ANIME_TYPES } from '../../shared/types/anime-type.type.ts'
import { ANIME_AGE_LIMITS } from '../../shared/types/anime-age-limit.type.ts'
import { ANIME_STATUSES } from '../../shared/types/anime-status.type.ts'
import {
  LOWER_LABELS,
  UPPER_LABELS,
} from '../../constants/service-message-labels.ts'
import { TABLE_KEY } from '../../configs/table-key.config.ts'

interface Props {
  closeModal: () => void
  clearCheckBoxes: () => void
  anime: TAnimeFormData
  operationType: 'create' | 'update'
}

const AnimeForm = ({
  closeModal,
  anime,
  operationType,
  clearCheckBoxes,
}: Props) => {
  const {
    id,
    genreNames,
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

  const onSuccess = useQuerySuccess(
    QUERY_KEYS.ANIME,
    closeModal,
    clearCheckBoxes,
  )

  const createMutation = useMutation({
    mutationFn: (data: TDataSubmitAnime) => createData(data, TABLE_KEY.ANIME),
    onSuccess: onSuccess,
  })

  const updateMutation = useMutation({
    mutationFn: (data: TDataSubmitAnime) =>
      updateData(id, data, TABLE_KEY.ANIME),
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
      genreNames,
    },
  })

  const onFormSubmit: SubmitHandler<TDataAnime> = (data) => {
    const formatedDate = new Date(data.releaseDate).toISOString()
    const formatedGenres =
      data.genreNames.length > 0 ? data.genreNames.split(' ') : []
    const newData: TDataSubmitAnime = {
      ...data,
      releaseDate: formatedDate,
      genreNames: formatedGenres,
    }
    if (operationType === 'create') {
      createMutation.mutate(newData)
    } else {
      updateMutation.mutate(newData)
    }
  }

  return (
    <CreateModal
      id={
        operationType === 'create'
          ? `create-${LOWER_LABELS.ANIME}`
          : `update-${LOWER_LABELS.ANIME}`
      }
      label={
        operationType === 'create'
          ? `Create ${LOWER_LABELS.ANIME}`
          : `Update ${LOWER_LABELS.ANIME}`
      }
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
                labelText={'Title'}
                id={'title'}
                autoComplete={'off'}
              />
            )}
            name={'title'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginTextArea
                {...field}
                hasError={!!errors.description?.message}
                labelText={'Description'}
                id={'description'}
                autoComplete={'off'}
              />
            )}
            name={'description'}
          />
          <div className={'flex justify-between w-full gap-2 flex-wrap'}>
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'age-limit'} values={ANIME_AGE_LIMITS} />
              )}
              name={'ageLimit'}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'status'} values={ANIME_STATUSES} />
              )}
              name={'status'}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <Select {...field} id={'type'} values={ANIME_TYPES} />
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
                  max={MAX_INT}
                  onChange={(event) => field.onChange(+event.target.value)}
                  hasError={!!errors.episodesCount?.message}
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
                  max={MAX_INT}
                  onChange={(event) => field.onChange(+event.target.value)}
                  hasError={!!errors.episodesLength?.message}
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
                hasError={!!errors.releaseDate?.message}
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
                hasError={!!errors.image?.message}
                labelText={'Image'}
                id={'image'}
                autoComplete={'off'}
              />
            )}
            name={'image'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.originalTitle?.message}
                labelText={'Original title'}
                id={'original-title'}
                autoComplete={'off'}
              />
            )}
            name={'originalTitle'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.slug?.message}
                labelText={'Slug'}
                id={'slug'}
                autoComplete={'off'}
              />
            )}
            name={'slug'}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <LoginInput
                {...field}
                hasError={!!errors.genreNames?.message}
                labelText={'Genre names'}
                id={'genre-names'}
                autoComplete={'off'}
              />
            )}
            name={'genreNames'}
          />
          <small className={'text-xs leading-4 font-semibold py-1'}>
            Enter genre names separated by spaces.
          </small>
        </div>
        <LoginButton
          text={
            operationType === 'create'
              ? createMutation.isPending
                ? 'Creating...'
                : `Create an ${UPPER_LABELS.ANIME}`
              : updateMutation.isPending
                ? 'Updating...'
                : `Update an ${UPPER_LABELS.ANIME}`
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
