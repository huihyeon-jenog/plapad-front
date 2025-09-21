'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, Gift, Plus, Settings } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import useSWR from 'swr';
import { fetchGroups, GroupData } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CalendarGroupForm from './CalendarGroupForm';

interface GroupDataWithChecked extends GroupData {
  isChecked: boolean;
}

export default function CalendarSidebar() {
  const { data: fetchGroupData, mutate: reFetchGroups } = useSWR('/api/groups', fetchGroups);
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const [groups, setGroups] = useState<GroupDataWithChecked[]>([]);

  // 체크박스 토글 함수
  const toggleGroupChecked = (id: number) => {
    setGroups(prevGroups =>
      prevGroups.map(group => (group.id === id ? { ...group, isChecked: !group.isChecked } : group))
    );
  };

  useEffect(() => {
    if (fetchGroupData) {
      const setGroupsAddChecked = fetchGroupData.map((group: GroupData) => ({
        ...group,
        isChecked: true,
      }));

      setGroups(setGroupsAddChecked);
    }
  }, [fetchGroupData]);

  return (
    <div className="flex flex-col p-2">
      {/* 위쪽 버튼 영역 */}
      <div className="flex flex-col gap-3">
        <Button>
          <Plus />
          일정 입력
        </Button>
        <Button variant={'outline'}>
          <Gift />
          기념일 관리
        </Button>
      </div>

      {/* 구분선 */}
      <div className="my-4 border-t border-gray-300"></div>

      {/* 그룹 리스트 */}
      <div className="overflow-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsGroupOpen(!isGroupOpen)}>
              {isGroupOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
            <h3 className="text-xs text-gray-500">그룹 리스트</h3>
          </div>
          <div className="flex gap-2">
            <CalendarGroupForm reFetchGroups={reFetchGroups} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button">
                    <Settings size={16} color="gray" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>그룹설정</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {isGroupOpen && (
          <ul className="flex flex-col gap-2 mt-4 pl-5">
            {groups.map(group => (
              <li
                key={group.id}
                className="flex rounded-md hover:bg-gray-100 cursor-pointer text-sm gap-2"
              >
                <Checkbox
                  id={`checkbox_${group.id}`}
                  checked={group.isChecked}
                  onClick={() => toggleGroupChecked(group.id)}
                />
                <label htmlFor={`checkbox_${group.id}`} className="w-full">
                  <span>{group.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
