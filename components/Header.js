import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm border border-primary">
        <div class="container">
          <Link href="/" alt="Landing Page">
            <a className="navbar-brand d-flex align-items-center">
              <img
                class="me-2"
                src="icon-apple-touch.png"
                height="50"
                width="50"
                alt="PairUp Logo"
              />
              PairUp!
            </a>
          </Link>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <Link href="/sign_up" alt="Link to Sign-Up Page">
                  <a className="nav-link">Sign Up</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/login" alt="Link to Login Page">
                  <a className="nav-link">Login</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/profile" alt="Link to Profile Page">
                  <a className="nav-link">Welcome!</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link href="/logout" alt="Link to Logout Page">
                  <a className="nav-link">Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <img
        className="w-100"
        src="/images/headerPic.png"
        alt="dancing couple in nature"
      />
    </header>
  );
}
