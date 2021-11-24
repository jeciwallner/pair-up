export default function Footer() {
  return (
    <footer className="text-white bg-primary fixed-bottom">
      <div className="container-fluid d-flex">
        <div className="ms-auto">&copy; PairUp! {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
