---
source: https://help.worksmobile.com/ko/admin-guides/manage-service/bot/
crawled_at: 2026-03-16
last_modified: 2024-06-10
---
# Bot

이 기능은 네이버웍스 코어 상품 신청 후 사용 가능합니다.

Developer Console에 등록된 Bot을 불러와 구성원이 사용하도록 설정합니다.

# Bot 리스트

회사에서 이용 중인 Bot의 목록과 정보를 확인합니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 'Bot'을 눌러 'Bot'으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
   - 이미지: Developer Console에서 등록된 Bot의 이미지입니다.
   - Bot No.: Developer Console에서 등록된 일련 번호입니다.
   - Bot 이름: Developer Console에서 등록한 Bot의 이름입니다.
   - 설명: Developer Console에서 입력한 Bot에 대한 설명입니다.
   - 사용 권한: Bot을 사용할 수 있는 권한이 있는 구성원의 수가 표시됩니다. 구성원 전체가 사용 권한이 있는 경우에는 '전체'로 표시됩니다.
   - 담당자: Developer Console에서 등록한 Bot의 담당자입니다.

# Bot 추가

구성원들이 이용할 수 있도록 Bot을 추가합니다.

Developer Console의 준비 중 Bot을 불러와 추가할 수 있습니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 'Bot'을 눌러 'Bot'으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 페이지 상단의 'Bot 추가'를 선택하여 Bot 추가 화면으로 이동합니다.
3. 추가할 Bot을 선택한 후 'Bot 추가'를 눌러 Bot을 추가합니다.

# Bot의 사용 권한 및 공개 설정 값 수정

사용 중인 Bot의 사용 권한 및 공개 설정 값을 수정합니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 'Bot'을 눌러 'Bot'으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 목록에서 수정할 Bot을 클릭하여 'Bot 정보' 창을 띄웁니다.
3. '수정' 버튼을 선택하여 사용 권한 및 공개 설정 여부를 수정합니다.
   - 사용 권한
     - 전체: 사내의 모든 구성원이 이 Bot과 대화할 수 있습니다. Developer Console에서 1:N 메시지방 및 조직/그룹 메시지방에서 대화할 수 있는 타입으로 지정된 Bot은 전체 권한만 선택할 수 있습니다.
     - 지정한 구성원: 지정된 일부 구성원만 이 Bot과 대화할 수 있습니다. Developer Console에서 1:1 대화만 가능한 타입으로 지정된 Bot은 지정한 구성원 권한만 선택할 수 있습니다.
   - 공개 설정
     - 공개: 공개로 설정된 Bot은 권한이 있는 모든 구성원의 대화상대 목록에 노출되어, 구성원이 대화상대 목록에서 Bot을 선택하면 대화를 나눌 수 있습니다.
     - 비공개: 비공개로 설정된 Bot은 권한이 있는 구성원이라도 대화목록에 노출되지 않습니다. Bot이 먼저 메시지를 보내 대화를 시작하거나, Bot이 참여중인 대화방에서 Bot과 대화하거나 Bot과의 대화를 시작할 수 있습니다.
4. 하단의 '저장'을 누릅니다.

# Bot 삭제

선택한 Bot을 목록에서 삭제합니다. 삭제하면 삭제된 Bot과 대화중인 구성원은 더이상 해당 Bot을 이용할 수 없습니다. 단, 기존의 메시지방은 유지되며 목록에서 삭제하더라도 Developer Console에 등록되어 있는 Bot은 다시 추가할 수 있습니다.

Admin에서 Bot을 삭제하면 더 이상 구성원의 대화상대 목록에 삭제된 Bot은 노출되지 않습니다.

Admin에서 Bot을 삭제해도 기존에 대화중인 1:1 메시지방과 대화내역은 삭제되지 않습니다. 단, 더 이상 이 메시지방에서 Bot과 대화할 수 없습니다.

Admin에서 Bot을 삭제해도 1:N 메시지방 또는 조직/그룹 메시지방에 Bot이 초대되어 대화중인 경우는 이 Bot과 계속 대화할 수 있습니다. 단, 이 메시지방에서 Bot 프로필을 선택해도 더 이상 삭제된 Bot과의 대화를 시작할 수는 없습니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 'Bot'을 눌러 'Bot'으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 목록에서 삭제할 Bot을 여러 개 선택하여 한 번에 삭제하거나, Bot 정보 레이어 하단의 '삭제'를 선택하여 개별 삭제합니다.

# Bot 검색

목록에서 Bot 이름, Bot No., 설명을 대상으로 Bot을 검색합니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 'Bot'을 눌러 'Bot'으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 오른쪽 상단의 ![](/wp-content/uploads/2024/04/icon-admin-blue-search.png) 눌러 검색 카테고리(전체, Bot 이름, Bot No., 설명)에 맞게 검색어를 입력합니다.

공공용 네이버웍스에서는 일부 기능이 제한됩니다. 자세한 내용은 [네이버웍스 기능 소개서](https://gov-naverworks.com/naver-works-function-list/)를 확인해주세요.
