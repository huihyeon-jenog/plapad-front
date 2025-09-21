'use client';

import { useEffect, useRef, useState } from 'react';
import Calendar from 'tui-calendar'; // Calendar 생성자
import 'tui-calendar/dist/tui-calendar.css'; // 기본 CSS
import 'tui-date-picker/dist/tui-date-picker.css'; // date-picker CSS
import 'tui-time-picker/dist/tui-time-picker.css'; // time-picker CSS
import { Button } from '../ui/button';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarView() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstance = useRef<Calendar | null>(null);
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 주간 뷰의 시작일과 끝일 계산
  const startOfSelectedWeek = startOfWeek(selectedDate);
  const endOfSelectedWeek = endOfWeek(selectedDate);

  // 월간 뷰의 시작일과 끝일 계산
  const startOfSelectedMonth = startOfMonth(selectedDate);
  const endOfSelectedMonth = endOfMonth(selectedDate);

  // 선택된 날짜 포맷팅
  const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');

  useEffect(() => {
    if (!calendarRef.current) return;

    // Calendar 생성
    calendarInstance.current = new Calendar(calendarRef.current, {
      defaultView: 'month', // 초기 뷰 설정 ('month', 'week', 'day')
      usageStatistics: false, // 통계 전송 안 함
      calendars: [
        {
          id: '1',
          name: '개인 일정',
          color: '#ffffff',
          bgColor: '#9e5fff',
          dragBgColor: '#9e5fff',
          borderColor: '#9e5fff',
        },
      ],
    });

    // 예시 일정 추가
    calendarInstance.current.createSchedules([
      {
        id: '1',
        calendarId: '1',
        title: '회의',
        category: 'time',
        dueDateClass: '',
        start: new Date().toISOString(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1시간 후
      },
    ]);

    return () => {
      // 언마운트 시 메모리 해제
      calendarInstance.current?.destroy();
    };
  }, []);

  const changeView = (view: 'month' | 'week' | 'day') => {
    setViewType(view);
    // Calendar 뷰 변경
    calendarInstance.current?.changeView(view, true);
  };

  const getDateRange = () => {
    if (viewType === 'month') {
      return format(startOfSelectedMonth, 'yyyy년 M월');
    }
    if (viewType === 'week') {
      return `${format(startOfSelectedWeek, 'yyyy년 M월 d일')} ~ ${format(
        endOfSelectedWeek,
        'yyyy년 M월 d일'
      )}`;
    }
    if (viewType === 'day') {
      return format(selectedDate, 'yyyy년 M월 d일');
    }
    return '';
  };

  // 날짜 이동 함수
  const handlePrevious = () => {
    calendarInstance.current?.prev();
    if (viewType === 'month') {
      setSelectedDate(subMonths(selectedDate, 1)); // 한 달 전
    } else if (viewType === 'week') {
      setSelectedDate(subDays(selectedDate, 7)); // 7일 전
    } else if (viewType === 'day') {
      setSelectedDate(subDays(selectedDate, 1)); // 하루 전
    }
  };

  const handleNext = () => {
    calendarInstance.current?.next();
    if (viewType === 'month') {
      setSelectedDate(addMonths(selectedDate, 1)); // 한 달 후
    } else if (viewType === 'week') {
      setSelectedDate(addDays(selectedDate, 7)); // 7일 후
    } else if (viewType === 'day') {
      setSelectedDate(addDays(selectedDate, 1)); // 하루 후
    }
  };

  const handleToday = () => {
    calendarInstance.current?.today();
    setSelectedDate(new Date()); // 오늘 날짜로 리셋
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center mb-1">
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-lg font-semibold">{getDateRange()}</h2>
          {/* 이전 / 다음/ 오늘 버튼 */}
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight />
            </Button>
            <Button variant="outline" onClick={handleToday}>
              오늘
            </Button>
          </div>
        </div>
        <div className="flex gap-2 absolute left-[50%] translate-x-[-50%]">
          <Button
            variant={viewType === 'month' ? 'default' : 'outline'}
            onClick={() => changeView('month')}
          >
            월간
          </Button>
          <Button
            variant={viewType === 'week' ? 'default' : 'outline'}
            onClick={() => changeView('week')}
          >
            주간
          </Button>
          <Button
            variant={viewType === 'day' ? 'default' : 'outline'}
            onClick={() => changeView('day')}
          >
            일간
          </Button>
        </div>
      </div>
      <div ref={calendarRef} className="h-full" />
    </div>
  );
}
