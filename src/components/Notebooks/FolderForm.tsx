'use client';
import style from './FolderForm.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '../LoadingButton';
import callAPI from '@/app/lib/callAPI';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { FolderData } from '@/lib/data';
import { useRouter } from 'next/navigation';

// 📌 Zod로 유효성 검사 스키마 정의
const formSchema = z.object({
  name: z.string().min(1),
  colorCode: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function FolderForm({
  onClose,
  mode,
  mutate,
  folderData,
}: {
  onClose: () => void;
  mode: string;
  mutate: () => void;
  folderData?: FolderData | null;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    defaultValues: {
      name: mode === 'UPDATE' ? folderData?.name : '',
      colorCode: mode === 'UPDATE' ? folderData?.colorCode : '#D3D3D3',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await callAPI('POST', 'folder', data);
      const { data: responseData } = response;
      const { id } = responseData;
      toast.success('폴더가 추가되었어요.');

      if (id) {
        mutate();
        router.push(`/notebook?folder=${id}`);
      }
      onClose();
    } catch (error) {
      toast.error(`폴더 추가에 실패했어요.`);
      alert(error);
    }
  };

  const onUpdate = async (data: FormSchema) => {
    const id = folderData?.id;

    try {
      if (id) {
        await callAPI('PATCH', `folder/${id}`, data);

        toast.success('폴더가 수정되었어요.');
        mutate();
        onClose();
      } else {
        throw new Error(`폴더 아이디가 없어요.`);
      }
    } catch (error) {
      toast.error(`폴더 수정에 실패했어요.`);
      alert(error);
    }
  };

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black/30"
    >
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
        <div className="relative w-[500px] bg-white rounded-lg shadow-sm ">
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-xl font-semibold">
              {mode === 'UPDATE' ? '폴더 수정' : '폴더 추가'}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form
              onSubmit={handleSubmit(mode === 'UPDATE' ? onUpdate : onSubmit)}
              className="flex flex-col gap-4 space-y-4"
            >
              <div>
                <input
                  type="text"
                  {...register('name')}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-primary-color focus:border-primary-color block w-full p-2.5 "
                  placeholder="폴더 이름을 입력하세요."
                />
              </div>
              <ul className="flex justify-between">
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-light-gray"
                    value="#D3D3D3"
                  ></input>
                  <label
                    htmlFor="folder-color-light-gray"
                    className={`${style.folder_color_chip}`}
                    data-color="#D3D3D3"
                  >
                    <span className={style.blind}>연한 그레이</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-dark-gray"
                    value="#8C8C8C"
                  ></input>
                  <label
                    htmlFor="folder-color-dark-gray"
                    className={`${style.folder_color_chip}`}
                    data-color="#8C8C8C"
                  >
                    <span className={style.blind}>어두운 회색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-light-lime"
                    value="#B9E6A1"
                  ></input>
                  <label
                    htmlFor="folder-color-light-lime"
                    className={`${style.folder_color_chip}`}
                    data-color="#B9E6A1"
                  >
                    <span className={style.blind}>연두색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-light-yellow"
                    value="#F2E1A3"
                  ></input>
                  <label
                    htmlFor="folder-color-light-yellow"
                    className={`${style.folder_color_chip}`}
                    data-color="#F2E1A3"
                  >
                    <span className={style.blind}>연한 노란색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-light-pink"
                    value="#F5B7D3"
                  ></input>
                  <label
                    htmlFor="folder-color-light-pink"
                    className={`${style.folder_color_chip}`}
                    data-color="#F5B7D3"
                  >
                    <span className={style.blind}>연한 핑크색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-little-pink"
                    value="#FAD0C9"
                  ></input>
                  <label
                    htmlFor="folder-color-little-pink"
                    className={`${style.folder_color_chip}`}
                    data-color="#FAD0C9"
                  >
                    <span className={style.blind}>파스텔 핑크색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-mint"
                    value="#A1D8D0"
                  ></input>
                  <label
                    htmlFor="folder-color-mint"
                    className={`${style.folder_color_chip}`}
                    data-color="#A1D8D0"
                  >
                    <span className={style.blind}>부드러운 민트색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-black-blue"
                    value="#B5D7F4"
                  ></input>
                  <label
                    htmlFor="folder-color-black-blue"
                    className={`${style.folder_color_chip}`}
                    data-color="#B5D7F4"
                  >
                    <span className={style.blind}>부드러운 파스텔 블루</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-light-purple"
                    value="#D6A9F1"
                  ></input>
                  <label
                    htmlFor="folder-color-light-purple"
                    className={`${style.folder_color_chip}`}
                    data-color="#D6A9F1"
                  >
                    <span className={style.blind}>연한 보라색</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    className={style.blind}
                    {...register('colorCode')}
                    id="folder-color-purple"
                    value="#845EC2"
                  ></input>
                  <label
                    htmlFor="folder-color-purple"
                    className={`${style.folder_color_chip}`}
                    data-color="#845EC2"
                  >
                    <span className={style.blind}>보라색</span>
                  </label>
                </li>
              </ul>
              <div className="flex gap-2 justify-center">
                <Button variant={'secondary'} className="w-[80px]" onClick={onClose}>
                  취소
                </Button>
                <Button disabled={isSubmitting} className="w-[80px]">
                  {!isSubmitting ? '추가' : <LoadingButton />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
