
import * as Strings from '../../../Data/Strings'

const today = new Date()

export default [
  {
    date: new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()),
    label: Strings.THREE_YEARS_HENCE
  },
  {
    date: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
    label: Strings.ONE_YEAR_HENCE
  },
  {
    date: new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()),
    label: Strings.SIX_MONTHS_HENCE
  },
  {
    date: new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()),
    label: Strings.THREE_MONTHS_HENCE
  },
  {
    date: new Date(today),
    label: Strings.TODAY
  },
  {
    date: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
    label: Strings.THREE_MONTHS_AGO
  },
  {
    date: new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
    label: Strings.SIX_MONTHS_AGO
  },
  {
    date: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
    label: Strings.ONE_YEAR_AGO
  },
  /*
  {
    date: new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()),
    label: Strings.THREE_YEARS_AGO
  }
  */
]
