import { useState, useEffect } from 'react';
import { differenceInYears, addYears, getYear, parse } from 'date-fns';

export const useNextTenYearsTotalAge = (birthdate: Date) => {
  const [nextTenYearsTotalAge, setNextTenYearsTotalAge] = useState<number>(0);

  useEffect(() => {
    const currentYear = getYear(new Date());
    const birthYear = getYear(birthdate);
  }, [birthdate]);

  return { nextTenYearsTotalAge };
};
