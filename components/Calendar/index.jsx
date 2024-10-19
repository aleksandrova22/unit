import { useState } from 'react';
import { Calendar } from './Calendar';
import { LocaleContext } from './LocaleContext';

export function CalendarDemo() {
  const
    [locale, setLocale] = useState('ru');
  return <>
    <label>
      locale:
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        {['ru', 'en', 'ar', 'zh', 'ko', 'ja']
          .map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </label>
    <LocaleContext.Provider value={locale}>
      <Test1 />
    </LocaleContext.Provider>

  </>;
}

function DateToYYYYMM(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
} '2024-10'

function YYYYMMToDate(str) {
  const [year, month] = str.split('-');
  return new Date(year, month - 1, 1);
}

function Test1() {
  const
    [date, setDate] = useState(new Date);
  return <fieldset>
    <input  type="month" value={DateToYYYYMM(date)} onChange={event => setDate(YYYYMMToDate(event.target.value))} />
    {/* {date.toString()} */}
    <Calendar date={date} />
  </fieldset>
}