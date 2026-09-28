# 소분류 업종 마커

247개 소분류 코드에 SVG 아이콘을 명시적으로 매핑합니다. 업종군별 색상, 소분류 이름,
선택 상태를 지원합니다. 비슷한 업종은 같은 그림을 공유하되 이름으로 구분합니다.
상수에 소분류가 추가되면 `category-glyphs.ts`의 타입 검사가 누락된 매핑을 알려줍니다.

## 현재 지도 미리보기

탐색 페이지(`app/explore/page.tsx`)의 `previewMarkers`가 카페(`I21201`) 마커 하나를 전달합니다.
공통 `NaverMap`에는 임시 데이터나 마커 표시 로직이 없습니다.
실제 매장 목록 연동과 선택 상태 처리는 사용 방식이 정해진 후 추가할 예정입니다.
다른 업종을 확인하려면 임시 마커의 `smallCategoryCode`를 변경하세요.

## SDK에 직접 사용

```ts
import { createNaverIndustryMarkerIcon } from "@/src/shared/components/industry-marker/industry-marker";

new naver.maps.Marker({
  map,
  position: new naver.maps.LatLng(37.5665, 126.978),
  title: "예시 카페",
  icon: createNaverIndustryMarkerIcon({
    smallCategoryCode: "I21201",
    selected: false,
    showLabel: true,
  }),
});
```

[Naver HtmlIcon 문서](https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Marker.html#~HtmlIcon)
의 `content`, `size`, `anchor`를 사용합니다. 좌표는 말풍선 아래 꼭짓점에 맞춰집니다.
알 수 없는 코드는 회색 기본 매장 마커로 표시합니다. 외부 이미지나 아이콘 패키지는 필요 없습니다.

## React 범례/미리보기

```tsx
import IndustryMarker from "@/src/shared/components/industry-marker/IndustryMarker";

<IndustryMarker smallCategoryCode="I21201" />
<IndustryMarker smallCategoryCode="G21501" selected />
<IndustryMarker smallCategoryCode="S20701" showLabel={false} />
```

라벨은 긴 업종명에 말줄임을 적용하며 SVG의 title/접근성 이름에는 전체 업종명을 제공합니다.
`showLabel={false}`는 밀집 지역용으로, 비슷한 업종이 같은 아이콘을 사용할 수 있습니다.

## 밀집 지역 클러스터

`NaverMap`의 children인 `ClusterMarkerLayer`에 `markers`를 전달하면 화면상 80px 반경의 마커들을 숫자로 묶습니다.
지도 이동·확대 후 다시 계산하며, 줌 19(또는 지도 최대 줌)부터 개별 업종을 표시합니다.
클러스터 클릭 시 해당 좌표 영역으로 확대합니다. 같은 좌표의 매장은 개별 표시 시 겹칠 수 있습니다.
레이어를 넣지 않으면 지도만 표시합니다. 레이어의 `markers`는 필수이며 빈 배열이면 마커를 표시하지 않습니다.

```tsx
import NaverMap from "@/src/shared/components/NaverMap";
import ClusterMarkerLayer from "@/src/shared/components/naver-map/ClusterMarkerLayer";

<NaverMap latitude={37.5665} longitude={126.978} zoom={15}>
  <ClusterMarkerLayer
    markers={[
      { id: "preview-1", latitude: 37.5665, longitude: 126.978, smallCategoryCode: "I21201" },
      { id: "preview-2", latitude: 37.5667, longitude: 126.9782, smallCategoryCode: "G21501" },
    ]}
  />
</NaverMap>;
```

## 페이지별 지도 기능 추가

- `NaverMap`: SDK 로딩, 지도 생성·해제, 중심 좌표·줌, Context 제공
- `naver-map/ClusterMarkerLayer`: 마커 표시, 클러스터 재계산, 클릭 처리 및 이벤트 정리
- 페이지: 데이터 조회, 필터, 어떤 레이어를 사용할지 결정

추가 레이어는 `naver-map/NaverMapContext`의 `useNaverMap()`으로 가장 가까운 지도에 접근합니다.
초기화 전에는 `null`이므로 effect에서 확인하고, cleanup에서 추가한 오버레이·리스너를 정리하세요.
각 NaverMap의 Context는 독립적이므로 같은 화면에 지도 여러 개를 사용할 수도 있습니다.
지도 바깥에서 hook을 호출하면 사용 위치를 알려주는 오류가 발생합니다.
SDK가 관리하는 지도 DOM과 React children은 서로 별도로 렌더링됩니다.
