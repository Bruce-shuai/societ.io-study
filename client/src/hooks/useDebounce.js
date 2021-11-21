import {useState, useEffect} from 'react';

/**
 * 
 * @param {Any} param 参与防抖的值
 * @param {Number} delay 延迟的时间
 */
export const useDebounce = (param, delay) => {

  const [value, setValue] = useState(param);

  useEffect(() => {

    let timer = setTimeout(() => {
      setValue(param)
    }, delay)
    return () => {
      clearTimeout(timer);
    }

  }, [param, delay])
  return value;
}