import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, setHours, setMinutes } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface CustomDateTimePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date | undefined;
    placeholderText: string;
}

const CustomDateTimePicker = ({
    selected,
    onChange,
    minDate,
    maxDate,
    placeholderText
}: CustomDateTimePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(selected || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected);
    const [selectedHour, setSelectedHour] = useState(selected ? selected.getHours() : 12);
    const [selectedMinute, setSelectedMinute] = useState(selected ? selected.getMinutes() : 0);
    const [view, setView] = useState<'date' | 'time'>('date');

    useEffect(() => {
        if (selected) {
            setSelectedDate(selected);
            setSelectedHour(selected.getHours());
            setSelectedMinute(selected.getMinutes());
        }
    }, [selected]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setView('time');
    };

    const handleTimeSelect = () => {
        if (selectedDate) {
            const finalDate = setMinutes(setHours(selectedDate, selectedHour), selectedMinute);
            onChange(finalDate);
            setIsOpen(false);
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            return {
                date,
                day,
                isDisabled:
                    (minDate && date < minDate) ||
                    (maxDate && date > maxDate)
            };
        });
    };

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#e41312]/50 cursor-pointer transition-colors"
            >
                {selected ? (
                    <span className="text-white">
                        {format(selected, "MMM d, yyyy h:mm aa")}
                    </span>
                ) : (
                    <span className="text-gray-400">{placeholderText}</span>
                )}
                <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-[#1e1f23] border border-white/10 rounded-xl shadow-xl w-[320px]">
                    {view === 'date' ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-white font-medium">
                                    {format(currentMonth, 'MMMM yyyy')}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                    <div key={day} className="text-center text-sm text-gray-400">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {getDaysInMonth(currentMonth).map(({ date, day, isDisabled }) => (
                                    <Button
                                        key={day}
                                        variant="ghost"
                                        size="icon"
                                        disabled={isDisabled}
                                        onClick={() => handleDateSelect(date)}
                                        className={cn(
                                            'h-8 w-8',
                                            selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                                ? 'bg-[#e41312] text-white hover:bg-[#c00303]'
                                                : 'hover:bg-white/10'
                                        )}
                                    >
                                        {day}
                                    </Button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setView('date')}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <span className="text-white font-medium">
                                    <Clock className="w-4 h-4 inline-block mr-2" />
                                    Select Time
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Hour</label>
                                    <div className="h-[200px] overflow-y-auto">
                                        {hours.map(hour => (
                                            <Button
                                                key={hour}
                                                variant="ghost"
                                                onClick={() => setSelectedHour(hour)}
                                                className={cn(
                                                    'w-full justify-start',
                                                    selectedHour === hour && 'bg-[#e41312] text-white hover:bg-[#c00303]'
                                                )}
                                            >
                                                {hour.toString().padStart(2, '0')}:00
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Minute</label>
                                    <div className="h-[200px] overflow-y-auto">
                                        {minutes.map(minute => (
                                            <Button
                                                key={minute}
                                                variant="ghost"
                                                onClick={() => setSelectedMinute(minute)}
                                                className={cn(
                                                    'w-full justify-start',
                                                    selectedMinute === minute && 'bg-[#e41312] text-white hover:bg-[#c00303]'
                                                )}
                                            >
                                                :{minute.toString().padStart(2, '0')}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-4 bg-[#e41312] hover:bg-[#c00303]"
                                onClick={handleTimeSelect}
                            >
                                Confirm
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDateTimePicker; 