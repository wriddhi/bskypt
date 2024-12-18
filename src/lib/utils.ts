import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  afr,
  ara,
  hye,
  eus,
  ben,
  bre,
  bul,
  cat,
  zho,
  hrv,
  ces,
  dan,
  nld,
  eng,
  epo,
  est,
  fin,
  fra,
  glg,
  deu,
  ell,
  guj,
  hau,
  heb,
  hin,
  hun,
  ind,
  gle,
  ita,
  jpn,
  kor,
  kur,
  lat,
  lav,
  lit,
  lgg,
  lggNd,
  msa,
  mar,
  mya,
  nob,
  fas,
  pol,
  por,
  porBr,
  panGu,
  ron,
  rus,
  slk,
  slv,
  som,
  sot,
  spa,
  swa,
  swe,
  tgl,
  tha,
  tur,
  ukr,
  urd,
  vie,
  yor,
  zul,
} from "stopword";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterCommonWords = (word: string) => {
  const commonWords = [
    ...afr,
    ...ara,
    ...hye,
    ...eus,
    ...ben,
    ...bre,
    ...bul,
    ...cat,
    ...zho,
    ...hrv,
    ...ces,
    ...dan,
    ...nld,
    ...eng,
    ...epo,
    ...est,
    ...fin,
    ...fra,
    ...glg,
    ...deu,
    ...ell,
    ...guj,
    ...hau,
    ...heb,
    ...hin,
    ...hun,
    ...ind,
    ...gle,
    ...ita,
    ...jpn,
    ...kor,
    ...kur,
    ...lat,
    ...lav,
    ...lit,
    ...lgg,
    ...lggNd,
    ...msa,
    ...mar,
    ...mya,
    ...nob,
    ...fas,
    ...pol,
    ...por,
    ...porBr,
    ...panGu,
    ...ron,
    ...rus,
    ...slk,
    ...slv,
    ...som,
    ...sot,
    ...spa,
    ...swa,
    ...swe,
    ...tgl,
    ...tha,
    ...tur,
    ...ukr,
    ...urd,
    ...vie,
    ...yor,
    ...zul,
  ];

  return word.length > 1 && !commonWords.includes(word);
};
