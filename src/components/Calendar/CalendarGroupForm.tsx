'use client';
import callAPI from '@/app/lib/callAPI';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import LoadingButton from '../LoadingButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const formSchema = z.object({
  name: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CalendarGroupForm(props: { reFetchGroups: () => void }) {
  const { reFetchGroups } = props;
  const [groupName, setGroupName] = useState('');
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    defaultValues: {
      name: groupName,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await callAPI('POST', 'group', data);
      toast.success('그룹이 추가되었어요.');
      reFetchGroups();
      setOpen(false);
    } catch (error) {
      toast.error(`그룹 추가에 실패했어요.`);
      alert(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={() => setOpen(true)}>
                <Plus size={16} color="gray" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <span>그룹추가</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>그룹 추가</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Input
                id="name"
                {...register('name')}
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isSubmitting} className="w-[80px]">
              {!isSubmitting ? '추가' : <LoadingButton />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
