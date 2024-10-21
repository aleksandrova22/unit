import { useContext, useState } from 'react';
import { Calendar } from './Calendar';
import { LocaleContext } from './LocaleContext';
import classes from './index.module.css';
import { PopupWindow } from '@/components/PopupWindow';

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
      <section className={classes.grid}>
        <Test1 />
        <TestPopUp />
        <Test3 />
        <Test4 />
        <Test2 />
      </section>
    </LocaleContext.Provider>

  </>;
}

function SelectYear({date, setYear}) {
  return <input  type="number" min={1} max={10000} defaultValue={date.getFullYear()} onChange={setYear}/>
}

function SelectMonth({date, setMonth}) {
  const
    locale = useContext(LocaleContext);
  return <select defaultValue={date.toLocaleDateString(locale,{month:'long'})} onChange={setMonth}>
    {Array.from({length:12},(_,index)=> <option key={index}>{(new Date(2024,index,1)).toLocaleDateString(locale,{month:'long'})}</option>)}
  </select>
}

function SelectDay({ date, setDate }) {
  const
    setYear = event => {
      date.setFullYear(event.target.value);
      setDate(new Date(date.getFullYear(), date.getMonth()));
    },
    setMonth = event => {
      date.setMonth(event.target.selectedIndex)
      setDate(new Date(date.getFullYear(), date.getMonth()));
    },
    onClick = event => {
      const 
        day = +event.target.closest('td[data-day]')?.dataset?.day;
      if (day)
        setDate(new Date(date.getFullYear(), date.getMonth(), day))
    };

  return <div onClick={onClick}>
    <SelectYear date={date} setYear={setYear}/>
    <SelectMonth date={date} setMonth={setMonth}/>
    <Calendar date={date} />
  </div>;
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
    <input type="month" value={DateToYYYYMM(date)} onChange={event => setDate(YYYYMMToDate(event.target.value))} />
    {/* {date.toString()} */}
    <Calendar date={date} classes={{selected:''}}/>
  </fieldset>;
}

function Test2() {
  return <fieldset>
    <LocaleContext.Provider value={"zh"}>
      <Calendar date={new Date} classes={{calendar:classes.pinkcalendar,selected:classes.selected}}/>
    </LocaleContext.Provider>
  </fieldset>;
}

function TestPopUp() {
  const
    [visible, setVisible] = useState(false);
  return <fieldset>
    <button onClick={() => setVisible(true)}>open</button>
    <input type="date" />
    {visible && <PopupWindow>
      <button onClick={() => setVisible(false)}>close</button>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
    </PopupWindow>}
  </fieldset>;
}

function Test3() {
  const
    locale = useContext(LocaleContext),
    [date, setDate] = useState(new Date);
  return <fieldset>
    <legend>test SelectDay</legend>
    date: {date.toLocaleDateString(locale)}
    <hr/>
   <SelectDay date={date} setDate={setDate} />
  </fieldset >;
}

function Test4() {
  const
    locale = useContext(LocaleContext),
    [date, setDate] = useState(new Date),
    [open, setOpen] = useState(false),
    onClick1 = () => setOpen(true),
    onClick2 = (event) =>  {
      const
        td = event.target.closest('td');
      if(td)
        setOpen(false);
    }
  return <fieldset onClick={onClick2}>
    <legend>Итог</legend>
    <div
      onClick={onClick1}
      className={classes.dateselector}
    >
      {date.toLocaleDateString(locale)}
    </div>
    <div >
      {open && <PopupWindow>
        <SelectDay date={date} setDate={setDate} />
      </PopupWindow>}
    </div>
  </fieldset>
}