import { useContext, useMemo } from 'react';
import { LocaleContext } from './LocaleContext';
import defaultclasses from './Calendar.module.css';

export function Calendar({ date, classes = defaultclasses }) {
  const
    locale = useContext(LocaleContext),
    dayNames = useMemo(() => Array.from({ length: 7 }, (_, index) => <td key={index}>{(new Date(2019, 0, index)).toLocaleDateString(locale, { weekday: 'short' })}</td>), [locale]),
    caption = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
    year = date.getFullYear(),
    month = date.getMonth(),
    selected = date.getDate(),
    max = (new Date(year, month + 1, 0)).getDate(), // число предшествующее 1 числу (нулевое) следующего месяца и есть число дней в текущем
    firstDayOfWeek = (new Date(year, month, 1)).getDay(),   // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    shift = (-1 + firstDayOfWeek + 7) % 7;                  //      ПН=0 ВТ=1 .. СБ=5 ВС=6
  return <>
    <table className={classes.calendar}>
      <caption>{caption}</caption>
      <thead>
        <tr>{dayNames}</tr>
      </thead>
      <tbody>
        <Month shift={shift} max={max} selected={selected} />
      </tbody>
    </table>
  </>;


  function Month({ shift, max }) {
    const
      result = [];
    for (let start = 1 - shift; start <= +max; start += 7) {
      result.push(<Week key={start} start={start} max={max} selected={selected} />)
    }
    return <>{result}</>;
  }


  function Week({ start, max }) {
    return <tr>
      {Array.from({ length: 7 }, (_, index,) => {
        const
          day = start + index;
        return <td key={index} data-day={day} className={day === selected ? classes.selected : ''}>
          {day >= 1 && day <= max && day}
        </td>;
      }
      )}
    </tr>
  }
}