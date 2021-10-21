import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  gap: 10px;
  background-color: turquoise;
  color: black;
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <Link href="/" alt="Landing Page">
          <a>Home</a>
        </Link>
        <Link href="/login" alt="Link to Login Page">
          <a>Login</a>
        </Link>
        <Link href="/sign-up" alt="Link to Sign-Up Page">
          <a>Sign Up!</a>
        </Link>
      </nav>
    </header>
  );
}
