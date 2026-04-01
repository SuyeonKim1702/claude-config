---
source: https://help.worksmobile.com/ko/
crawled_at: 2026-03-16
last_modified: 2025-11-26
---
# 헬프센터

## 무엇을 도와드릴까요?

검색

#### 추천 검색어

검색 중...

검색 결과가 없습니다

1/
3

공지

## [v4.4 네이버웍스 코어 & 웍스 드라이브 & 웍스 클로바노트 업데이트 소식](https://naver.worksmobile.com/notice/95487/)

공지

## [네이버웍스 경영지원 정기 업데이트 소식](https://naver.worksmobile.com/notice/91540/)

공지

## [클로바노트 업데이트 소식](https://naver.worksmobile.com/notice/91549/)

;(function ($) {
function cardUrl(parentCls, childCls) {
$(parentCls).click(function(e){
e.stopPropagation();
e.preventDefault();
$this = $(this);
var urldom = $this.find(childCls);
var url = urldom.attr('href');
if (urldom.attr('target') === '\_blank' ) {
window.open(url);
} else{
if (e.shiftKey || e.ctrlKey || e.metaKey) {
var w = window.open(url, '\_blank');
return;
}
window.location.href = url;
}
});
}
cardUrl('.index-card', '.index-card-title a');
cardUrl('.page\_service .page\_service\_card', '.elementor-image-box-title a');
})(jQuery);
