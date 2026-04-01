---
source: https://help.worksmobile.com/ko/admin-guides/settings/additional-domains/customize-urls/
crawled_at: 2026-03-16
last_modified: 2025-12-01
---
# 맞춤 URL 설정

이 기능은 네이버웍스 코어 상품의 Lite, Standard, Standard Plus 플랜 신청 후 사용 가능합니다.

  
네이버웍스 로그인 ID의 도메인과 동일한 도메인을 이용하여 네이버웍스 서비스에 바로 접속할 수 있습니다.

바로 접속하기 위해서는 도메인을 관리하는 호스팅 업체 사이트에서 CNAME 입력을 완료해야 합니다.

단, [기본 도메인](/ko/admin-guides/settings/company-information/#i)이 네이버웍스에서 제공하는 도메인(by-works.com 또는 by-works.net)인 경우, 맞춤 URL을 사용할 수 없습니다.

1. Admin 왼쪽 메뉴에서 '기본환경'을 선택해 메뉴를 펼친 후 '도메인'을 눌러 '도메인' 화면으로 이동합니다. 모바일에서는 ![](https://help.worksmobile.com//wp-content/uploads/2024/04/icon-admin-mobile-menu.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 기본 도메인에 있는 '맞춤 URL 설정'을 눌러, '맞춤 URL 설정' 화면으로 이동합니다.
3. 변경할 서비스의 ![](/wp-content/uploads/2024/04/icon-message-pc-web-contact-checkbox.png)를 선택하고 맞춤 URL을 입력합니다.
4. '저장'을 누릅니다.
5. 도메인을 관리하는 호스팅 업체 홈페이지로 이동합니다.
6. 네임서버 관리메뉴로 이동한 후 호스트명(도메인명)과 CNAME 레코드를 각각 입력합니다.
   - 1단계 호스트명(도메인명): Admin에서 입력한 맞춤 URL값 입력
   - 2단계 CNAME 레코드: hosts.worksmobile.com 입력

위의 방법으로 호스팅 업체 홈페이지에서 호스트명(도메인명)과 CNAME 레코드를 각각 입력하고, 일정 시간(최대 3일)이 지나면 변경된 주소로 서비스에 접속할 수 있습니다.

호스팅 업체별로 네임서버 관리 메뉴 및 명칭이 다를 수도 있습니다.

호스팅 업체에 문의하여 호스트명(도메인명)과 CNAME값 등록을 요청하면 더욱 쉽게 입력할 수 있습니다.

공공용 네이버웍스에서는 일부 기능이 제한됩니다. 자세한 내용은 [네이버웍스 기능 소개서](https://gov-naverworks.com/naver-works-function-list/)를 확인해주세요.
