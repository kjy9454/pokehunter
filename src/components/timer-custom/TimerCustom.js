import React, {useEffect, useState} from 'react';
import {calculateTimer} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';

export default function TimerCustom({needSecond, onTimeOut, style, font}) {
  const [curSecond, setCurSecond] = useState(needSecond);

  useEffect(() => {
    if (curSecond === 0) {
      onTimeOut();
    }
    let tm = setTimeout(() => {
      setCurSecond(lastSeconds => lastSeconds - 1);
      clearTimeout(tm);
    }, 1000);
    return () => {
      clearTimeout(tm);
    };
  }, [curSecond]);

  return (
    <TextWrap style={style} font={font}>
      {calculateTimer(curSecond)}
    </TextWrap>
  );
}
