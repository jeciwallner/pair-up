import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header user={props.user} />
      <div className="py-5">{props.children}</div>
      <Footer className="footer" />
    </>
  );
}
