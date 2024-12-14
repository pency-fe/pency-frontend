"use client";

import Left from "./left";
import Right from "./right";
import { redirect, useRouter } from "next/navigation";
import { Header, Main } from "@pency/ui/layouts";
import { isClient, useFirstMountState } from "@pency/util";
import { useUserAuthMeContext } from "_core/user";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  const router = useRouter();
  const me = useUserAuthMeContext();
  const isFirstMount = useFirstMountState();

  /**
   * 1. 사용자가 url를 입력한다.
   * 2. 브라우저는 해당 Url로 Get 요청을 보낼거야.
   * 3. Get 요청을 프론트엔드 서버가 받는다.
   * 4. 프론트엔드 서버는 해당 url에 대응되는 페이지까지 컴포넌트를 실행시켜버린다. (useEffect는 실행안한다.)
   * 5. 실행된 결과물을 가지고 Html 파일을 만들어.
   * 6. 그 html 파일을 응답으로 보내준다. 여기 까지가 서버 사이드 렌더링이야.
   * 7. 그 이후에 브라우저에서 NextLink를 클릭해서 이동되는 행위 또는 router.push()로 이동되는 행위들은 모두 클라이언트 사이드 렌더링이다.
   */
  if (isFirstMount && me.isLoggedIn) {
    if (isClient()) {
      router.push("/");
      return;
    } else {
      redirect("/");
    }
  }

  return (
    <>
      <Header
        slots={{
          left: <Left />,
          right: <Right />,
        }}
      />
      <Main variant="compact">{children}</Main>
    </>
  );
}
