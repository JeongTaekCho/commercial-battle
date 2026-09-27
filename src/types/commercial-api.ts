export type CommercialCategoryItem = {
  indsLclsCd: string;
  indsLclsNm: string;
  indsMclsCd?: string;
  indsMclsNm?: string;
  indsSclsCd?: string;
  indsSclsNm?: string;
  stdrDt?: string;
};

export type CommercialApiHeader = {
  resultCode: string;
  resultMsg: string;
};

export type CommercialApiBody<T> = {
  items: { item: T | T[] };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};

export type CommercialApiResponse<T> = {
  header: CommercialApiHeader;
  body: CommercialApiBody<T>;
};

export type CommercialStoreItem = {
  bizesId: string;
  bizesNm: string;
  indsLclsCd: string;
  indsLclsNm: string;
  indsMclsCd: string;
  indsMclsNm: string;
  indsSclsCd: string;
  indsSclsNm: string;
  rdnmAdr?: string;
  lnoAdr?: string;
  bldNm?: string;
  lon?: string;
  lat?: string;
  x?: string;
  y?: string;
};

export type CommercialStoreSearchResponse = CommercialApiResponse<CommercialStoreItem>;
