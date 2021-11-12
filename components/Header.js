import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import headerPic from '../public/images/headerPic.png';

const navStyles = css`
  display: flex;
  gap: 10px;
  background-color: #499be7;
  fill-opacity: 69%inherit;
  /* border-color: #499be7; */
  border-width: 2px;
  color: black;
  padding: 8px 15px;
  text-decoration: none;
  font-weight: bold;
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <Link href="/" alt="Landing Page">
          <a>PairUp!</a>
        </Link>
        <Link href="/sign_up" alt="Link to Sign-Up Page">
          <a>Sign Up</a>
        </Link>
        <Link href="/login" alt="Link to Login Page">
          <a>Login</a>
        </Link>
        <Link href="/profile" alt="Link to Profile Page">
          <a>My Profile</a>
        </Link>
        <Link href="/logout" alt="Link to Logout Page">
          <a>Logout</a>
        </Link>
      </nav>
      <Image src={headerPic} alt="dancing couple in nature" />
    </header>
  );
}
