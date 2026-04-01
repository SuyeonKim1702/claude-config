---
source: https://help.worksmobile.com/ko/admin-guides/manage-service/mail/mail-settings/
crawled_at: 2026-03-16
last_modified: 2025-05-27
---
# 메일 일반 설정

이 기능은 네이버웍스 코어 상품의 Standard, Standard Plus 플랜 신청 후 사용 가능합니다.

  
메일 서비스의 일반적인 사용 기능을 설정합니다.

# 수신 확인

구성원이 메일을 보낸 후, 상대가 해당 메일을 읽었는지 읽음 상태를 '수신 확인'에서 알 수 있도록 설정합니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 '메일'을 눌러 '메일' 화면으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. '일반'을 선택합니다.
3. '수신 확인' 항목 오른쪽 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-n-path.png) 아이콘을 눌러, '수신 확인'을 켭니다.
4. 오른쪽 상단의 '저장'을 눌러 선택한 값을 저장합니다.

# 파일 첨부

첨부한 모든 파일 합의 최대 용량을 설정합니다. 최대 25MB까지 설정할 수 있습니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 '메일'을 눌러 '메일' 화면으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. '일반'을 선택합니다.
3. 파일 첨부 항목 오른쪽의 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-n-path.png) 아이콘을 눌러 최대 첨부 용량으로 설정할 값을 입력합니다.
4. 오른쪽 상단의 '저장'을 눌러 입력한 값을 저장합니다.

# 다운로드 기한이 있는 파일

첨부하려는 파일이 제한된 용량을 초과하는 경우 ['Admin > 보안 > 메일 보안'](/ko/admin-guides/security/mail-security/) 페이지에서 만료 기한이 있는 파일로 첨부해 보내는 것을 허용할지 설정할 수 있습니다.  
 ['Admin > 보안 > 메일 보안'](/ko/admin-guides/security/mail-security/) 페이지에서 해당 설정이 '첨부 허용' 인 경우,  
메일의 '일반' 페이지에서 다운로드 기한이 있는 파일의 첨부 개수와 용량 제한을 설정할 수 있습니다.

또한 다운로드 기한이 있는 파일은 최대 10개의 파일을 각 2GB(2048MB)까지 첨부 가능하며, 전송된 파일은 7일간 100회까지 다운로드할 수 있습니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 '메일'을 눌러 '메일' 화면으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. '일반'을 선택합니다.
3. '다운로드 기한이 있는 파일' 항목 오른쪽 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/icon-n-path.png) 아이콘을 누릅니다.
4. 첨부 가능한 파일의 최대 개수와 개별 용량 제한을 입력한 후 '저장'을 선택하면 설정한 값으로 변경됩니다.

# IMAP 메일 이전 서버 정보 설정

구성원이 [IMAP 메일 이전](/ko/use-guides/mail/settings/import-external-mail/#i-2) 시 필요한 서버의 정보를 최대 3개까지 템플릿으로 저장할 수 있습니다.

IMAP 메일을 이전하려면 ['](/ko/admin-guides/security/mail-security/)[Admin > 보안 > 메일 보안'](/ko/admin-guides/security/mail-security/)에서 '외부 메일 가져오기' 설정을 허용해야 합니다.

1. Admin 왼쪽 메뉴에서 '서비스'를 선택해 메뉴를 펼친 후 '메일'을 눌러 '메일' 화면으로 이동합니다. 모바일에서는 ![](https://gsaas-help.pstatic.net/wp-content/uploads/2024/04/2020-07-03-164523.png) 버튼을 탭하면 메뉴가 나타납니다.
2. '일반'을 선택합니다.
3. 'IMAP 메일 이전 서버 정보' 항목에서 '서버 접속 정보 추가' 버튼을 클릭합니다.
4. 'IMAP 메일 이전 서버 정보'의 각 항목을 입력합니다.
   - 이름: 구성원의 메일 이전화면에 표시되는 템플릿 이름입니다.
   - IMAP 서버 주소: 메일데이터가 보관된 IMAP 서버의 주소를 입력합니다.
   - 연결 포트: IMAP 서버를 접속하기 위한 포트번호를 입력합니다.
   - 보안 연결: SSL(또는 TLS)를 사용하여 연결할지 선택합니다.
5. '확인' 버튼을 선택하여 저장합니다.

공공용 네이버웍스에서는 일부 기능이 제한됩니다. 자세한 내용은 [네이버웍스 기능 소개서](https://gov-naverworks.com/naver-works-function-list/)를 확인해주세요.
