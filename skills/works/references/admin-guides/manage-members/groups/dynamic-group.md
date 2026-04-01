---
source: https://help.worksmobile.com/ko/admin-guides/manage-members/groups/dynamic-group/
crawled_at: 2026-03-16
last_modified: 2025-04-10
---
# 동적 그룹

이 기능은 네이버웍스 코어 상품의 Lite, Standard, Standard Plus 플랜 신청 후 사용 가능합니다.

동적 그룹은 사내 구성원으로만 구성된 그룹으로, 설정한 조건 또는 쿼리문에 따라 멤버가 자동으로 변경됩니다.

멤버 추가 방식 외 다른 기능은 일반적인 [그룹](/ko/use-guides/contacts/group/internal-group/)과 동일합니다.

동적 그룹은 관리자가 최대 200개까지 추가할 수 있습니다.

# 동적 그룹 추가

동적 그룹을 추가합니다.

동적 그룹은 관리자만 생성할 수 있으며, 생성된 동적 그룹의 상세 화면에는 동적 그룹 항목에 '설정됨'이 표시됩니다.

1. Admin 왼쪽 메뉴에서 '구성원'을 선택해 메뉴를 펼친 후 '그룹'을 누릅니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-admin-mobile-menu.png) 버튼을 탭하면 메뉴가 나타납니다.
2. 오른쪽 상단의 '그룹 추가'를 눌러 '그룹'을 선택합니다.
3. 멤버 항목에서 '동적 그룹 설정'을 켭니다.
4. '동적 그룹 멤버 조건 추가'에서 멤버 조건을 입력한 후 '확인'을 눌러 조건을 설정합니다.
   - 조건 입력
     - 간단 입력: 구성원 속성과 연산자로 간단하게 조건을 선택합니다.
     - 쿼리문으로 입력: 텍스트 입력창에 작성 규칙에 맞춰 쿼리문을 직접 입력합니다.
   - 예외 멤버: 조건(쿼리문)과 무관하게 그룹 멤버에서 무조건 제외할 멤버를 지정합니다.
   - 미리보기: 입력한 조건(쿼리문)에 부합하는 멤버를 사전에 확인합니다.
5. 멤버 외 다른 항목을 입력한 후 '추가'를 누릅니다.  
   '저장 후 계속 추가'를 선택하면 계속해서 그룹을 추가할 수 있습니다.

# 멤버 조건 간단 입력

간단 입력 방식은 설정 가능한 속성과 연산자, 값 입력 필드가 자동으로 제공되어 목록에서 선택하거나 자동 완성으로 조건을 만드는 방식입니다.

간단 입력으로 조건을 설정해 저장하면 중복된 조건을 자동으로 통합하는 조건 최적화 작업이 실행됩니다.

따라서 실제 설정했던 조건과 저장된 조건이 다를 수 있으나, 결과값은 동일합니다.

그룹사 소속 구성원이 다른 회사를 겸직하는 경우, 원직 회사와 겸직 회사 중 하나라도 조건을 만족하면 동적 그룹 멤버에 포함될 수 있습니다.

## 동적 그룹 멤버 조건

멤버 조건은 속성, 연산자, 값으로 구성되어 있습니다.

하나의 동적 그룹에는 최대 10개의 조건을 설정할 수 있습니다.

- 속성: 그룹 멤버로 포함 또는 제외시킬 조건의 기준입니다. 그룹사 여부와 Admin 기존 설정값에 따라 회사, 직책, 직급, 담당 업무 등 최대 10개의 속성을 지원합니다.
- 연산자
  - equals: 구성원의 속성이 입력한 값과 동일할 경우 그룹 멤버로 포함됩니다.
  - not: 구성원의 속성이 입력한 값과 동일할 경우 그룹 멤버에서 제외됩니다.
- 값 : 속성의 값을 지정합니다. 속성에 따라 값을 직접 입력하거나 목록에서 선택할 수 있습니다.

속성별 설명은 다음과 같습니다.

|  |  |  |
| --- | --- | --- |
| 속성 | 제공 연산자 | 설명 |
| 회사 | equals | 값으로 지정한 '회사'의 멤버를 포함합니다. 그룹사 설정을 사용 중일 때만 제공됩니다. |
| 조직(하위 조직 포함) | equals, not | 값으로 지정한 '조직(하위 조직 포함)'에 소속된 멤버를 포함 또는 제외합니다. |
| 조직(하위 조직 제외) | equals, not | 값으로 지정한 '조직(하위 조직 제외)'에 소속된 멤버를 포함 또는 제외합니다. |
| 그룹 | equals, not | 값으로 지정한 '그룹'에 소속된 멤버를 포함 또는 제외합니다. 단, 동적 그룹과 외부 그룹은 값으로 지정할 수 없습니다. |
| 사용자 유형 | equals, not | 값으로 지정한 '사용자 유형'에 해당하는 멤버를 포함 또는 제외합니다. 구성원 항목에서 '사용자 유형'을 사용 중인 경우만 제공됩니다. |
| 직급 | equals, not | 값으로 지정한 '직급'에 해당하는 멤버를 포함 또는 제외합니다. 구성원 항목에서 '직급'을 사용 중인 경우만 제공됩니다. |
| 직책 | equals, not | 값으로 지정한 '직책'에 해당하는 멤버를 포함 또는 제외합니다. 구성원 항목에서 '직책'을 사용 중인 경우만 제공됩니다. |
| 조직장 여부 | equals, not | 연산자가 equals일 경우 1개 이상의 소속 조직에서 조직장인 멤버가 포함되며, not일 경우 소속 조직이 없거나 모든 소속 조직에서 조직장이 아닌 멤버가 포함됩니다. |
| 근무처 | equals, not | 값으로 입력한 '근무처'에 해당하는 멤버를 포함 또는 제외합니다. |
| 담당 업무 | equals, not | 값으로 입력한 '담당 업무'에 해당하는 멤버를 포함 또는 제외합니다. |

## 조건 그룹

2개 이상의 조건을 AND 또는 OR 연산자로 묶어 조건 그룹을 만들 수 있습니다.

또한, 조건 그룹끼리도 연산자로 연결할 수 있습니다.

- AND: 묶인 조건 또는 조건 그룹 모두를 충족해야 그룹 멤버로 포함됩니다.
- OR: 묶인 조건 또는 조건 그룹 중 1개만 충족해도 그룹 멤버로 포함됩니다.

# 그룹 멤버 조건 쿼리문 작성

쿼리문 입력 방식은 텍스트 입력창에 함수 및 속성을 정해진 규칙에 맞춰 직접 입력해 조건을 만드는 방식입니다.

'간단 입력'에서 지원되는 형태의 쿼리문만 작성할 수 있습니다.

아래 정의된 함수와 속성에 부합하는 값을 지정하면, 해당하는 멤버가 동적 그룹 멤버로 포함됩니다.

함수는 크게 아래 3가지가 제공됩니다.

|  |  |  |  |
| --- | --- | --- | --- |
| 함수 | 설명 | 조건문 긍정 형태 | 조건문 부정 형태 |
| isMemberOfGroup | 지정한 그룹 ID와 일치하는 그룹의 멤버를 조회하며, 함수 1개당 그룹 ID는 1건만 입력할 수 있습니다. 아래처럼 쿼리문의 긍정(equalsequals) 또는 부정하는 형태로 활용할 수 있습니다. | user.isMemberOfGroup('groupit8e-70c3-46a8-22dd-03ef7c571975') | !(user.isMemberOfGroup('groupit8e-70c3-46a8-22dd-03ef7c571975')) |
| isMemberOrgUnit | 지정한 조직 ID와 일치하는 조직(하위 조직 포함)의 멤버를 조회하며, 함수 1개당 조직 ID는 1건만 입력할 수 있습니다. 아래처럼 쿼리문의 긍정(equals) 또는 부정하는 형태로 활용할 수 있습니다. | user.isMemberOfOrgUnit('orgunit8e-70c3-46a8-22dd-03ef7c571975') | !(user.isMemberOfOrgUnit('orgunit8e-70c3-46a8-22dd-03ef7c571975')) |
| user.organizations.orgunitsexist | 값을 목록으로 제공하는 속성(user.organizations, user.organizations.orgunits)에서 조건에 만족하는 항목이 있는지 판단할 때 사용합니다. 아래 형태로 활용할 수 있습니다. | user.organizations.exists(organization, organization.domainId == 123 && organization.primary == true)  user.organizations.orgUnits.exists(orgUnit, orgUnit.orgUnitId == 'orgunit8e-70c3-46a8-22dd-03ef7c571975' || orgUnit.isManager == true || orgUnit.positionId == positione-70c3-46a8-22dd-03ef7c571975') | 긍정 형태만 가능 |

속성이란 그룹 멤버의 선별 기준이 되는 값을 저장하는 변수이며, 속성에 해당하는 값을 ==(equals) 연산자로 연결해서 정의하는 것이 기본입니다.

만약 조건에 해당하지 않는 멤버를 연동하고 싶다면 '!(A)' 형태로 부정할 수 있습니다.

A에는 하나의 조건문(또는 memberOf 함수)을 넣을 수 있습니다.

- 가능한 표현: !(user.userTypeId=='usertypei-70c3-46a8-22dd-03ef7c571975')
- 불가능한 표현(에러 처리): !(user.userTypeId=='usertypei-70c3-46a8-22dd-03ef7c571975' || user.levelId == 'levelid8e-70c3-46a8-22dd-03ef7c571975')

부정 조건은 함수 밖에 위치하며, 함수 내부에는 올 수 없습니다.

- 가능한 표현: !(memberOf(orgUnit, orgUnit.isManager == true))
- 불가능한 표현(에러 처리): memberOf(orgUnit, !(orgUnit.isManager == true))

|  |  |  |
| --- | --- | --- |
| 속성 | 값 입력 형태 | 쿼리문 예시(긍정/부정) |
| organization.domainId 회사에 소속된 구성원 | Number 숫자(digit)의 묶음 | - 긍정문: user.organizations.exists(organization, organization.domainId == 12345) - 부정문은 지원하지 않음 |
| organization.primary 회사에 원직으로 소속된 구성원 | Boolean true만 가능 | - 긍정문: user.organizations.exists(organization, organization.domainId == 123 && organization.primary==true) - 부정문은 지원하지 않음 |
| orgUnit.isManager 소속된 조직에서 조직장 여부 | - 긍정문: user.organizations.orgUnits.exists(orgUnit, orgUnit.isManager == true) - 부정문: !(user.organizations.orgUnits.exists(orgUnit, orgUnit.isManager == true)) |
| orgUnit.orgUnitId 직속 조직의 구성원 | String 큰 따옴표(") 또는 작은 따옴표(')로 묶여 있는문자 | - 긍정문: user.organizations.orgUnits.exists(orgUnit, orgUnit.orgUnitId == 'orgunit8e-70c3-46a8-22dd-03ef7c571975') - 부정문: !(user.organizations.orgUnits.exists(orgUnit, orgUnit.orgUnitId == 'orgunit8e-70c3-46a8-22dd-03ef7c571975')) |
| user.userTypeId 구성원의 사용자 유형 | - 긍정문: user.userTypeId == 'usertypei-70c3-46a8-22dd-03ef7c571975' - 부정문: !(user.userTypeId=='usertypei-70c3-46a8-22dd-03ef7c571975') |
| user.levelId 구성원의 직급 | - 긍정문: user.levelId == 'levelid8e-70c3-46a8-22dd-03ef7c571975' - 부정문: !(user.levelId == 'levelid8e-70c3-46a8-22dd-03ef7c571975') |
| orgUnit.positionId 구성원의 직책 | - 긍정문: user.organizations.orgUnits.exists(orgUnit, orgUnit.positionId == 'positione-70c3-46a8-22dd-03ef7c571975') - 부정문: !(user.organizations.orgUnits.exists(orgUnit, orgUnit.positionId == 'positione-70c3-46a8-22dd-03ef7c571975')) |
| user.location 구성원의 근무처 | - 긍정문: user.location == 'ABC Buliding' - 부정문: !(user.location == 'ABC Buliding') |
| user.task 구성원의 담당 업무 | - 긍정문: user.task == 'Marketing' - 부정문: !(user.task == 'Marketing') |

2개 이상의 조건을 AND 또는 OR 연산자로 연결하고, 괄호로 묶을 수 있습니다.

- && : 조건을 AND로 묶기 위한 연산자이며, 모든 조건을 충족하는 것을 의미합니다.
- || : 조건을 OR로 묶기 위한 연산자이며, 1개 이상의 조건을 충족하는 것을 의미합니다.
- ({조건}{연산자}{조건}) : 조건을 괄호로 묶을 경우 더 우선순위 높게 처리합니다. 괄호는 2 depth까지 사용할 수 있으며 3depth 이상일 경우 에러 처리됩니다.

3개 이상의 조건이 연결될 경우 아래 순서로 우선 적용됩니다.

- 1순위: 괄호로 묶인 조건
- 2순위: &&로 연결된 조건
- 3순위: ||로 연결된 조건
- 4순위: (우선순위가 동일할 경우) 왼쪽에 위치한 조건

우선순위에 따른 조건 적용 예시는 다음과 같습니다.

- 1) 예시: A  ||  B  &&  C : B && C 조건이 먼저 처리 (&&이 ||보다 우선하기 때문)
- 2) 예시: (A || B) && C : A || B 조건이 먼저 처리 (괄호가 &&보다 우선하기 때문)
- 3) 예시: A || B || C : A || B 조건이 먼저 처리 (우선순위가 동일하므로 왼쪽부터 처리)

공공용 네이버웍스에서는 일부 기능이 제한됩니다. 자세한 내용은 [네이버웍스 기능 소개서](https://gov-naverworks.com/naver-works-function-list/)를 확인해주세요.
