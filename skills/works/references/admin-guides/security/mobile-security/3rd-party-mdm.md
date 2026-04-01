---
source: https://help.worksmobile.com/ko/admin-guides/security/mobile-security/3rd-party-mdm/
crawled_at: 2026-03-16
last_modified: 2025-10-29
---
# 외부 MDM 연동

이 기능은 네이버웍스 코어 상품의 Lite, Standard, Standard Plus 플랜 또는 웍스 드라이브 상품, 웍스 결재 상품 신청 후 사용 가능합니다.

전문적인 MDM(Mobile Device Management) 솔루션을 도입해 이용하고 있다면, 네이버웍스의 '외부 MDM 연동' 설정을 통해 외부 MDM 솔루션으로 관리하고 있는 단말기에서만 아래 모바일 앱에 접근할 수 있도록 설정할 수 있습니다.

외부 MDM 연동을 적용할 수 있는 모바일 앱은 다음과 같습니다.

- 네이버웍스 앱
- 드라이브 앱
- ClovaNote 앱

# 활성화하기 전 확인 사항

- 이 기능은 MDM Framework의 (Managed) App Configuration 방식을 활용합니다. 이 기능을 활성화하기 전에 먼저 이용중인 MDM 솔루션에서 Managed App Configuration 설정을 지원하는지 확인해야 합니다.
- Android OS의 기기의 경우, Android Enterprise 환경에서만 이 기능을 사용할 수 있습니다. Android 기기를 사용하는 구성원이 있거나 Android 기기를 업무용 단말기로 제공한다면, 먼저 Android Enterprise 환경을 구축해야 합니다.
- 이 기능을 활성화하는 즉시, 모든 구성원들이 모바일앱에서 강제 로그아웃되고, 이후부터는 외부 MDM 솔루션을 통해 Key value가 연동된 경우에만 로그인할 수 있습니다. 이 기능을 켜기 전에 먼저 프로세스를 숙지해야 합니다.

# 연동 프로세스

연동 프로세스를 이용하기 위해서 관리자는 네이버웍스 Admin에서 기능을 활성화한 뒤, MDM 솔루션의 관리자 콘솔에서도 연동할 모바일 앱에 대한 App Configuration을 설정해야 합니다.

1. 네이버웍스의 Admin에서 외부 MDM 연동을 활성화하고 연동을 위한 Key Value를 발급합니다.
2. 외부 MDM 솔루션의 콘솔에서, 연동할 모바일 앱을 허용된 앱(Managed app)으로 등록합니다.
3. 외부 MDM 솔루션의 콘솔에서, 연동할 앱에 대하여 네이버웍스 Admin에서 발급한 App Configuration을 등록합니다.
   - App Configuration Key: LineworksAuthCode
   - App Configuration Type: String/문자 형식
   - App Configuration Value: 네이버웍스 Admin에서 발급한 고유한 값
   - 아래는 각 용어에 대한 설명입니다.  

     |  |  |
     | --- | --- |
     | 용어 | 설명 |
     | Configuration Key | - Managed App Configuration에서 활용되는 구성 키(Key)입니다. - 네이버웍스의 외부 MDM 연동을 위한 Configuration Key는  LineworksAuthCode입니다. |
     | Value Type | - Managed App Configuration에서 활용되는 값(Key value)의 형식입니다. - 네이버웍스의 외부 MDM 연동을 위한 Key Value는  'String'(문자) 형식입니다. |
     | Key Value | - Managed App Configuration에서 활용되는 값(Key Value)입니다. - 네이버웍스 Admin에서 발급하며, 자동으로 생성하거나 직접 입력할 수 있습니다.   - 자동 발급: Admin 자동으로 생성된 Key Value를 사용합니다.   - 직접 입력: 직접 입력 방식은 그룹사 내에서 동일한 Key Value를 사용하고 싶을 때, 혹은 미리 Key Value를 생성한 후 외부 MDM콘솔에 입력해둔 경우에 유용합니다. |
4. 외부 MDM 솔루션의 콘솔에서 구성원의 디바이스로 연동을 희망하는 앱을 배포하거나, 각 구성원이 외부 MDM을 통해 모바일 앱을 설치합니다.

3번을 통해 모바일 앱에 정상적으로 App Configuration의 Key(LineworksAuthCode)와 Value(각 도메인별 고유한 값)이 연동되어 있다면, 사용자는 모바일 앱에 정상적으로 로그인할 수 있습니다.

이하의 가이드는 모두 1번에 해당하는 과정입니다. 2~ 4번은 각 MDM 솔루션에서의 설정으로, 설정 방식은 각 솔루션 별로 상이하므로 각 솔루션의 매뉴얼을 참고하거나 솔루션 제공 업체에 문의해야 합니다.

# 사용 설정하기

외부 MDM 연동 기능을 켜고 저장하면 최대 10분 이내에 모든 구성원이 모바일앱에서 강제 로그아웃되며, 이후부터는 외부 MDM을 통해 Key value 값이 올바르게 연동된 모바일앱에서만 접속할 수 있습니다.

외부 MDM 연동을 활성화하기 이전, 혹은 이후에 (외부 MDM 연동 구축 프로세스의 2~4번 과정에 따라) 외부 MDM의 콘솔에서 App Configuration 설정을 완료해야 합니다.

네이버웍스 Admin에서는 아래와 같이 설정합니다.

1. Admin 왼쪽 메뉴에서 '보안'을 선택해 메뉴를 펼친 후 '모바일 보안' 메뉴로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-admin-mobile-menu.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 화면 하단의 '고급 설정'을 눌러 '외부 MDM 연동' 설정이 포함된 고급 기능을 펼칩니다.
3. 오른쪽의 '관리' 버튼을 눌러 설정 화면으로 이동합니다.
4. '외부 MDM 연동' 항목을 열어 설정을 켭니다.
5. 주의사항을 확인 후 '확인'을 누릅니다.
6. 다른 도메인으로 로그인을 제한할지 여부를 선택합니다.
7. 새로운 Key Value가 자동으로 발급된 상태입니다. 직접 key value를 설정하려면 '직접 입력'을 선택해서 새로운 값을 입력할 수 있습니다.
8. 오른쪽 상단의 '저장' 버튼을 눌러 변경사항을 저장합니다.

# Key Value 다시 발급하기

Key value가 유출되었거나, 사내 정책이 변경되었다면 새로운 Key Value를 발급할 수 있습니다.

Key value를 재발급하고 저장하면 모든 구성원이 최대 10분 이내에 모바일앱에서 강제 로그아웃되며, 외부 MDM을 통해 새로운 Key value 값이 연동되어야 모바일앱을 이용할 수 있습니다.

Key value를 변경하기 이전, 혹은 이후에 (외부 MDM 연동 구축 프로세스의 2~4번 과정에 따라) 외부 MDM의 콘솔에서 재발급받은 Key value로 App Configuration을 업데이트해야 합니다.

1. Admin 왼쪽 메뉴에서 '보안'을 선택해 메뉴를 펼친 후 '모바일 보안' 메뉴로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-admin-mobile-menu.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 화면 하단의 '고급 설정'을 눌러 '외부 MDM 연동' 설정이 포함된 고급 기능을 펼칩니다.
3. 오른쪽 의 '관리' 버튼을 눌러 설정 화면으로 이동합니다.
   - Key Value '자동 발급'인 경우: 입력란 오른쪽의 '재발급' 버튼을 누릅니다.
   - Key Value '직접 입력'인 경우: 기존 값을 제거하고 새로운 값을 입력합니다.
4. 상단의 '저장' 버튼을 눌러 변경사항을 저장합니다.

# 다른 도메인으로 로그인 제한

외부 MDM 연동 기능을 사용하는 상태에서 이 옵션을 활성화하면, 외부 MDM 기능으로 관리하고 있는 모바일 기기에서는 다른 도메인/그룹에 소속된 네이버웍스 계정으로 로그인을 차단할 수 있습니다**.**

'다른 도메인의 계정으로 로그인을 제한'을 활성화하기 전에 아래 사항을 숙지해야 합니다.

- 이 기능을 사용하기 위해서는 같은 그룹사 소속을 포함하여 다른 도메인과 중복되지 않는 고유 Key Value를 설정해야 합니다.
- 이 옵션을 켠 뒤로는 다른 도메인/그룹 소속의 계정으로 로그인할 수 없습니다**.**
- 이 옵션을 켜면 최대 10분 이내에, 같은 Key Value로 관리되고 있는 기기에서 같은 네이버웍스 도메인/그룹 소속이 아닌 계정을 강제로그아웃합니다. 단, 이 도메인/그룹 소속의 계정이 1개 이상 로그인되어있는 경우에만 즉시 로그아웃됩니다. 만약 이 기기에서 해당하는 계정이 로그인 되어있지 않고 타 도메인/그룹 계정만 로그인 되어있다면, 이후 이 도메인/그룹 소속의 계정이 로그인하는 시점에 타 도메인/그룹 계정이 로그아웃됩니다.

# 사용하지 않도록 설정하기

더 이상 외부 MDM 연동을 통해 접근을 통제하지 않으려면 외부 MDM 연동 설정을 비활성화합니다.

단, 이 기능을 비활성화하더라도 이미 MDM 솔루션을 통해 연동된 Configuration Key는 자동으로 해제되지 않습니다.

1. Admin 왼쪽 메뉴에서 '보안'을 선택해 메뉴를 펼친 후 '모바일 보안' 메뉴로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-admin-mobile-menu.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 화면 하단의 '고급 설정'을 눌러 '외부 MDM 연동' 설정이 포함된 고급 기능을 펼칩니다.
3. 오른쪽의 '관리' 버튼을 눌러 설정 화면으로 이동합니다.
4. '외부 MDM 연동' 항목을 열어 설정을 끕니다.
5. 상단의 '저장' 버튼을 눌러 변경사항을 저장합니다.

공공용 네이버웍스에서는 일부 기능이 제한됩니다. 자세한 내용은 [네이버웍스 기능 소개서](https://gov-naverworks.com/naver-works-function-list/)를 확인해주세요.
