# Riv-Frontend 🖥️

Riv-Bot을 자신의 서버에 추가할 수 있고 회의록을 관리할 수 있는 RIV 관리자 페이지입니다.


![GitHub Repo stars](https://img.shields.io/github/stars/OpenRiv/riv-frontend?style=social)
![GitHub issues](https://img.shields.io/github/issues/OpenRiv/riv-frontend)
![GitHub license](https://img.shields.io/github/license/OpenRiv/riv-frontend)

Riv-Frontend는 React 기반의 웹 클라이언트 프로젝트입니다. 이 봇은 음성 채널에서의 대화를 녹음하고, 녹음된 내용을 자동으로 텍스트로 변환한 후, 중요한 내용을 요약하여 제공합니다. 이를 통해 회의의 효율성을 높이고, 회의 후 정리 시간을 절약할 수 있습니다.

## 주요 기능 ✨

- **✔️ 디스코드 Oauth2 로그인**
  - Discord Oauth2 로그인 시스템을 통해 온보딩을 구현하고, accessToken을 활용해 사용자의 프로필, 서버 정보 등을 활용할 수 있습니다.
  
- **👨‍💻 서버 조회 및 Bot 추가**
  - 초대 권한이 있는 서버 목록을 조회하고, Discord 봇이 있는지 유무를 파악합니다. 또한 봇이 없는 서버에 봇을 초대할 수 있습니다.
  
- **🗒️ 회의록 조회, 수정, 삭제**
  -  Discord 봇으로부터 등록된 회의록에 대한 조회, 수정, 삭제 기능을 제공합니다.
    
- **:dependabot: 디스코드 기반 UI**
  - 디스코드 디자인 UI를 제공하여 사용자에게 친숙하고 편리한 경험을 제공합니다.
   
# Riv-Frontend Manual 📖

## 목차
1. [설치 가이드](#1-설치-가이드)
2. [개발 환경 설정](#2-개발-환경-설정)
3. [사용자 가이드](#3-사용자-가이드)
4. [개발자 가이드](#4-개발자-가이드)
5. [문제 해결](#5-문제-해결)
6. [기여 가이드](#6-기여-가이드)

## 1. 설치 가이드

### 시스템 요구사항
- React 18
- 디스크 여유 공간: 최소 800MB
- RAM: 최소 512MB
- 안정적인 인터넷 연결

### 설치 단계
1. **리포지토리 클론**
   ```bash
   git clone https://github.com/OpenRiv/riv-frontend.git
   cd riv-frontend
   ```

2. **의존성 설치**
   ```bash
   yarn install
   ```

## 2. 개발 환경 설정

### 환경 변수 설정
1. `.env` 파일 생성:
   ```env
   VITE_BOT_TOKEN=your_bot_token_here
   VITE_REDIRECT_URI=your_oauth2_redirect_url_here
   VITE_CLIENT_SECRET=your_bot_client_secret_key_here
   VITE_CLIENT_ID=your_bot_client_id_here
   VITE_DISCORD_API_URL = https://discord.com/api
   VITE_API_URL = your_backend_url_here
   ```

## 3. 사용자 가이드

### '/' - 메인페이지
![Group 120](https://github.com/user-attachments/assets/e851065a-c63f-4d72-a4cf-52c15bbe5ab0)
1. **메인 캐릭터**

2. **서비스 소개 문구**

3. **디스코드 로그인 버튼**
   - 클릭 시 디스코드 로그인 창 생성
   - 디스코드 로그인 창 인증 후 서버페이지로 이동

4. **깃허브 버튼**
   - 클릭 시 https://github.com/OpenRiv 탭을 띄움

### '/server' - 서버페이지
![Frame 105](https://github.com/user-attachments/assets/2b5fa6dc-095b-4f14-b12a-7bf60cd9429c)
1. **헤더 로고 버튼**
   - 클릭 시 '/server' 경로로 이동
     
2. **헤더 프로필**
   - 디스코드 프로필, 이름 표시
   - 클릭 시 디스코드 앱 오픈
3. **서버 카드 목록**
   - 초대 권한이 있는 서버의 이름, 프로필, Owner 유/무, Bot 유/무 표시
4. **GO/Setup 버튼**
   - Bot이 초대된 서버는 GO, 그렇지 않은 서버는 Setup으로 표시
   - Go 버튼 클릭 시 회의록페이지로 이동
   - Setup 버튼 클릭 시 디스코드 봇 추가
  
### '/setup/:id' - 회의록페이지
![Frame 106](https://github.com/user-attachments/assets/b032fd06-a4bf-4b84-8f2b-61b3888ea510)
1. **서버 프로필 버튼**
   - 클릭 시 디스코드 앱 오픈(해당 서버 위치)
     
2. **사이드 네비게이션 버튼**
   - 저장된 회의록 : 회의 목록을 볼 수 있는 페이지 이동(default)
   - 사용 설명서 : 서비스 매뉴얼을 볼 수 있는 페이지 이동
     
3. **회의록 검색창**
   - 검색창에 입력한 키워드를 바탕으로 회의록 제공
     
4. **정렬, 카테고리 리스트**
   - 정렬 : 최신순, 오래된순 정렬
   - 카테고리 :  카테고리 별로 회의록 제공
  
5. **회의록 목록**
   - 리브 봇이 해당 서버에서 전송한 회의록 리스트

5. **수정/삭제**
   - 수정 : 클릭 시 해당 회의록을 수정할 수 있는 모달창 활성화
   - 삭제 : 클릭 시 해당 회의록 삭제
  
### '/setup/:id' - 회의록페이지(수정 모달 활성화)
![Frame 107 (1)](https://github.com/user-attachments/assets/120fba49-019b-49c0-8dfe-8ad7f4b0f02d)
1. **회의록 제목, 회의 시간**
     
2. **닫기 버튼**
   - 클릭 시 모달창이 닫힘
     
3. **에디터 툴바**
   - 회의록 수정에 필요한 도구 목록
     
4. **에디터 콘텐트**
   - 회의록 내용을 수정할 수 있는 영역
  
5. **회의록 목록**
   - 리브 봇이 해당 서버에서 전송한 회의록 리스트

5. **회의록 저장 버튼**
   - 클릭 시 회의록을 업데이트

## 4. 개발자 가이드

### 코드 구조
```
src/
├── common/
│   ├── api/
│   ├── component/
│   ├── hook/
│   ├── layout/
│   ├── utils/
│   └── view/
├── onboarding/
│   ├── component/
│   ├── hook/
│   └── view/
│       └── redirect/
├── route/
│   ├── outlet.tsx
│   ├── route.tsx
│   └── ScollToTop.tsx
├── server/
│   ├── component/
│   ├── hook/
│   └── view/
├── App.tsx
├── index.css
└── main.tsx
```
### 기술 스택
   - Typescript
   - Axios : API 통신 라이브러리
   - Tailwindcss : CSS 라이브러리
   - Recoil : 전역 상태 관리 라이브러리
   - React-Router-Dom : 페이지 이동 간편화 라이브러리
   - Tanstack : 데이터 관리 간편화 라이브러리

### 주요 코드
1. **QueryClient**
   ```typescript
   // src/App.tsx
   // tanstack 쿼리 캐시와 상호작용하는 객체. 캐싱 시간, 동기화, accessToken 갱신 로직을 설정
   const queryClient = new QueryClient({
     queryCache: new QueryCache({
       onError: (error) => {
        if (error instanceof APIResponseError) {
          if (error.body.code === "invalid_token") {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          }
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
   });
   ```

2. **axios-client**
   - 리브 관리자페이지는 두개의 API를 사용하므로 axios-client 함수가 두개로 나뉨
   ```typescript
   // 관리자페이지 API를 사용하기 위한 함수
   export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
      },
    });
    // 디스코드 API를 사용하기 위한 래퍼 함수
    export const discordClientAuth = async <T>(
      config: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return discordClientWithAuth(config, true, false);
    };
   ```

3. **API custom hook **
   - API를 사용하는 custom hook. 알맞은 axios-client 함수를 임포트
   - GET은 tanstack의 useQuery
   - 나머지 요청은 tanstack의 useMutation
   ```typescript
   export const useGetRecodingId = ({ recodingId }: Props) => {
    const getRecodingId = async ({ recodingId }: Props) => {
      const response = await client<RespType>({
        url: `/recoding/${recodingId}`,
        method: "get",
      });
      return response.data.data;
    };
    return useQuery({
      queryKey: ["get-recoding-id", recodingId],
      queryFn: () => getRecodingId({ recodingId }),
     });
   };
   ```

## 5. 문제 해결

### 일반적인 문제
1. **type error**
   ```typescript
   yarn run dev
   ```
   - 해당 명령어로 로그 확인
   - 타입 에러는 배포, 협업에 큰 이슈를 일으킴

2. **redirectUrl 문제**
![Group 121](https://github.com/user-attachments/assets/1693eb9f-cd27-4986-ba68-42e47f4bb972)
https://discord.com/developers/applications
   - 디스코드 개발자 포털 접속 -> application -> Oauth2에 알맞은 redirectUrl 등록

3. **yarn version 문제**
   - 패키지 매니저 corepack 제거

## 6. 기여 가이드

### 코드 스타일
- CamelCase 변수명
- 빈 인터페이스 사용 금지
- HTML 기본 태그 상속
```typescript
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isRiv?: boolean;
  }
  
  export default function Entry({
    isRiv = false,
    className,
    ...props
  }: ButtonProps) {
    const dftBtnStyle =
      "w-[5.8125rem] h-[4.0625rem] rounded-[0.75rem] text-medium hover:brightness-50 text-gray-09 transition duration-200";
    const typeStyle = isRiv ? "bg-primary hover:" : "bg-gray-05";

    return (
      <button className={cn(className, dftBtnStyle, typeStyle, "")} {...props}>
        {isRiv ? "Go" : "Setup"}
      </button>
    );
  }

```

### Pull Request 프로세스
1. Fork 저장소
2. Feature 브랜치 생성
3. 코드 작성 및 테스트
4. PR 생성
5. 코드 리뷰 진행

---

이 메뉴얼은 지속적으로 업데이트됩니다. 개선사항이나 제안사항이 있다면 Issue를 생성해주세요.

---
## 리브
생각은 회의에, 기록은 RIV에 맡기세요!

Riv는 AI 기술을 통해 어렵고, 복잡하고, 귀찮았던 우리의 회의를 쉽고, 간편하고, 즐거운 회의로 바꿔줍니다. Riv와 함께 우리의 세상을 바꿔나가고 싶지 않나요?
Riv는 오픈소스 프로젝트입니다. 우리 함께 열려있는 협업 세상을 만들어봐요!

**편유나** Chatbot&AI
**문세종** Frontend 
**김혜령** Backend
