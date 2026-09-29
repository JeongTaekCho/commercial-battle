export interface ShopType {
  adongCd: string;
  adongNm: string;
  bizesId: string;
  bizesNm: string;
  bldMngNo: string;
  bldMnno: number;
  bldNm: string;
  bldSlno: number | "";
  brchNm: string;
  ctprvnCd: string;
  ctprvnNm: string;
  dongNo: string;
  flrNo: string;
  hoNo: string;
  indsLclsCd: string;
  indsLclsNm: string;
  indsMclsCd: string;
  indsMclsNm: string;
  indsSclsCd: string;
  indsSclsNm: string;
  ksicCd: string;
  ksicNm: string;
  lat: number;
  ldongCd: string;
  ldongNm: string;
  lnoAdr: string;
  lnoCd: string;
  lnoMnno: number;
  lnoSlno: number | "";
  lon: number;
  newZipcd: string;
  oldZipcd: string;
  plotSctCd: string;
  plotSctNm: string;
  rdnm: string;
  rdnmAdr: string;
  rdnmCd: string;
  signguCd: string;
  signguNm: string;
}

export interface StoreListType {
  header: {
    columns: string[];
    description: string;
    resultCode: string;
    resultMsg: string;
    stdrYm: string;
  };
  body: {
    items: ShopType[];
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
}
